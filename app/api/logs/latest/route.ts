import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const latestLogs = await prisma.apiLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

    return NextResponse.json(
      latestLogs.map((log) => ({
        id: log.id,
        service: log.service,
        method: log.method,
        path: log.path,
        status: log.status,
        duration: log.duration,
        timestamp: log.createdAt.toISOString(),
      })),
    )
  } catch (error) {
    console.error("Error fetching latest logs:", error)
    return NextResponse.json({ error: "Failed to fetch latest logs" }, { status: 500 })
  }
}
