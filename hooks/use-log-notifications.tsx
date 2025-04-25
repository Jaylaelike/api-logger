"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { fetchLatestLogs } from "@/lib/api"

export interface LogNotification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

export function useLogNotifications() {
  const [notifications, setNotifications] = useState<LogNotification[]>([])
  const { toast } = useToast()

  const { data: latestLogs } = useQuery({
    queryKey: ["latestLogs"],
    queryFn: fetchLatestLogs,
    refetchInterval: 10000, // Poll every 10 seconds
  })

  useEffect(() => {
    if (latestLogs && latestLogs.length > 0) {
      const newNotifications = latestLogs
        .filter((log) => {
          // Check if this log is already in notifications
          return !notifications.some((n) => n.id === log.id.toString())
        })
        .map((log) => {
          const isError = log.status >= 400
          return {
            id: log.id.toString(),
            title: isError ? `Error in ${log.service}` : `New ${log.method} request`,
            message: `${log.method} ${log.path} - Status: ${log.status}`,
            timestamp: log.timestamp,
            read: false,
          }
        })

      if (newNotifications.length > 0) {
        // Show toast for the most recent notification
        const mostRecent = newNotifications[0]
        toast({
          title: mostRecent.title,
          description: mostRecent.message,
        })

        // Add new notifications to the state
        setNotifications((prev) => [...newNotifications, ...prev].slice(0, 50))
      }
    }
  }, [latestLogs, notifications, toast])

  const markAsRead = (ids: string[]) => {
    setNotifications((prev) =>
      prev.map((notification) => (ids.includes(notification.id) ? { ...notification, read: true } : notification)),
    )
  }

  return { notifications, markAsRead }
}
