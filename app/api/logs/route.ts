import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const service = searchParams.get("service")
  const method = searchParams.get("method")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const skip = (page - 1) * limit

  try {
    // Build the where clause based on query parameters
    const where: any = {}

    if (status) {
      if (status === "error") {
        where.status = { gte: 400 }
      } else if (status === "success") {
        where.status = { lt: 400 }
      }
    }

    if (service) {
      where.service = service
    }

    if (method) {
      where.method = method
    }

    // Get logs with pagination
    const logs = await prisma.apiLog.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip,
    })

    // Get total count for pagination
    const total = await prisma.apiLog.count({ where })

    return NextResponse.json({
      logs: logs.map((log) => ({
        id: log.id,
        service: log.service,
        method: log.method,
        path: log.path,
        status: log.status,
        duration: log.duration,
        error: log.error || null,
        requestBody: log.requestBody ? JSON.parse(log.requestBody) : null,
        responseBody: log.responseBody ? JSON.parse(log.responseBody) : null,
        timestamp: log.createdAt.toISOString(),
      })),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
