import pino from "pino"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create a Pino logger instance
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
})

// Create a wrapper for API service functions
export function createApiLogger(serviceName: string) {
  return {
    logApiCall: async <T>(
      method: string,
      path: string,
      fn: () => Promise<T>,
      requestBody?: any
    ): Promise<T> => {
      const startTime = Date.now();
  let status = 0
  let responseBody = null
  let error: any = null

  try {
    // Execute the API call
    const response = await fn()

    // Assume success status if not explicitly set
    status = 200
    responseBody = response

    return response
  } catch (err: any) {
    // Handle error
    error = err
    status = err.status || 500
    responseBody = { error: err.message }

    throw err
  } finally {
    const duration = Date.now() - startTime

    // Log to console with Pino
    logger[status >= 400 ? "error" : "info"]({
      service: serviceName,
      method,
      path,
      status,
      duration,
      requestBody,
      responseBody,
      ...(error && { error: error.message, stack: error.stack }),
    })

    // Store in database
    try {
      await prisma.apiLog.create({
            data: {
              service: serviceName,
              method,
              path,
              status,
              duration,
              requestBody: requestBody ? JSON.stringify(requestBody) : null,
              responseBody: responseBody ? JSON.stringify(responseBody) : null,
              error: error ? error.message : null,
            },
          })
    } catch (dbError) {
      logger.error({ msg: "Failed to store API log in database", error: dbError })
    }
  }
}
,
  }
}

export default logger
