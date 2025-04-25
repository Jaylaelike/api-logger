import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import logger from "@/lib/logger"

const prisma = new PrismaClient()
export async function POST(request: Request) {
  try {
    const logData = await request.json()

    // Log to console with Pino
    logger[logData.status >= 400 ? "error" : "info"]({
      ...logData,
      msg: `${logData.method} ${logData.path} - ${logData.status}`,
      responseDetails: logData.responseBody 
        ? typeof logData.responseBody === 'object' 
          ? logData.responseBody 
          : JSON.parse(logData.responseBody)
        : null
    })

    // Store in database
    const apiLog = await prisma.apiLog.create({
      data: {
        service: logData.service,
        method: logData.method,
        path: logData.path,
        status: logData.status,
        duration: logData.duration,
        requestBody: logData.requestBody ? JSON.stringify(logData.requestBody) : null,
        responseBody: logData.responseBody ? JSON.stringify(logData.responseBody) : null,
        error: logData.error || null,
      },
    })

    return NextResponse.json({ success: true, id: apiLog.id })
  } catch (error) {
    console.error("Error creating log:", error)
    logger.error({
      msg: "Failed to create log entry",
      error: error instanceof Error ? error.message : String(error)
    })
    return NextResponse.json({ error: "Failed to create log entry" }, { status: 500 })
  }
}
