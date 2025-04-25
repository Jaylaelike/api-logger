import { createApiLogger } from "./logger"

// Create a wrapper for the center API service
export function wrapCenterApi() {
  // Import the original API functions
  const originalApi = require("../app/api/center/route")
  const logger = createApiLogger("center")

  // Wrap each function with logging
  return {
    fetchCenters: async () => {
      return logger.logApiCall("GET", "/api/center", originalApi.fetchCenters)
    },

    fetchCenter: async (id: number) => {
      return logger.logApiCall("GET", `/api/center/${id}`, () => originalApi.fetchCenter(id))
    },

    createCenter: async (data: any) => {
      return logger.logApiCall("POST", "/api/center", () => originalApi.createCenter(data), data)
    },

    updateCenter: async (id: number, data: any) => {
      return logger.logApiCall("PUT", `/api/center/${id}`, () => originalApi.updateCenter(id, data), data)
    },

    deleteCenter: async (id: number) => {
      return logger.logApiCall("DELETE", `/api/center/${id}`, () => originalApi.deleteCenter(id))
    },
  }
}

// Export the wrapped API
export const centerApi = wrapCenterApi()
