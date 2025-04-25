import type { LogEntry, LogStats } from "@/types/logs"

// Fetch logs from the database
export async function fetchLogs({ status }: { status?: "success" | "error" } = {}): Promise<LogEntry[]> {
  let url = "/api/logs"

  if (status) {
    url += `?status=${status}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch logs")
  }

  const data = await response.json()
  return data.logs
}

// Get latest logs for notifications
export async function fetchLatestLogs(): Promise<LogEntry[]> {
  const response = await fetch("/api/logs/latest")
  if (!response.ok) {
    throw new Error("Failed to fetch latest logs")
  }

  return await response.json()
}

// Get statistics for dashboard
export async function fetchLogStats(): Promise<LogStats> {
  const response = await fetch("/api/logs/stats")
  if (!response.ok) {
    throw new Error("Failed to fetch log statistics")
  }

  return await response.json()
}
