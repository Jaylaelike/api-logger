export interface LogEntry {
  id: number
  service: string
  method: string
  path: string
  status: number
  duration: number
  error: string | null
  requestBody: string | null
  responseBody: string | null
  timestamp: string
}

export interface LogStats {
  totalLogs: number
  methodDistribution: { name: string; value: number }[]
  statusDistribution: { name: string; value: number }[]
  serviceDistribution: { name: string; value: number }[]
  timeDistribution: { time: string; count: number }[]
}
