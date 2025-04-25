
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Helper function to convert BigInt values to numbers
function convertBigIntToNumber(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === "bigint") {
    return Number(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber)
  }

  if (typeof obj === "object") {
    const result: any = {}
    for (const key in obj) {
      result[key] = convertBigIntToNumber(obj[key])
    }
    return result
  }

  return obj
}

export async function GET() {
  try {
    // Get total logs count
    const totalLogsResult = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM ApiLog
    `
    const totalLogs = Number((totalLogsResult as any)[0].count)

    // Get method distribution
    const methodDistribution = await prisma.$queryRaw`
      SELECT method as name, COUNT(*) as value
      FROM ApiLog
      GROUP BY method
    `

    // Get status distribution grouped by status code range
    const statusCounts = await prisma.$queryRaw`
      SELECT 
        CASE 
          WHEN status >= 200 AND status < 300 THEN '2xx'
          WHEN status >= 300 AND status < 400 THEN '3xx'
          WHEN status >= 400 AND status < 500 THEN '4xx'
          WHEN status >= 500 THEN '5xx'
          ELSE 'other'
        END as name,
        COUNT(*) as value
      FROM ApiLog
      GROUP BY name
    `

    // Get service distribution
    const serviceDistribution = await prisma.$queryRaw`
      SELECT service as name, COUNT(*) as value
      FROM ApiLog
      GROUP BY service
    `

    // Get time distribution (logs per hour for the last 24 hours)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    const timeDistribution = []
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now)
      hour.setHours(now.getHours() - i)
      hour.setMinutes(0, 0, 0)

      const nextHour = new Date(hour)
      nextHour.setHours(nextHour.getHours() + 1)

      const countResult = await prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM ApiLog
        WHERE createdAt >= ${hour} AND createdAt < ${nextHour}
      `
      const count = Number((countResult as any)[0].count)

      timeDistribution.push({
        time: hour.toLocaleTimeString([], { hour: "2-digit", hour12: true }),
        count,
      })
    }

    // Convert all BigInt values to regular numbers
    const response = {
      totalLogs,
      methodDistribution: convertBigIntToNumber(methodDistribution),
      statusDistribution: convertBigIntToNumber(statusCounts),
      serviceDistribution: convertBigIntToNumber(serviceDistribution),
      timeDistribution: timeDistribution.reverse(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching log stats:", error)
    return NextResponse.json({ error: "Failed to fetch log statistics" }, { status: 500 })
  }
}
