"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function DatabaseSettings() {
  const [settings, setSettings] = useState({
    retentionPeriod: "30",
    enablePruning: true,
    pruneInterval: "7",
    maxLogEntries: "10000",
  })

  const handleSave = () => {
    // In a real app, this would save to the server
    toast({
      title: "Settings saved",
      description: "Your database settings have been updated",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Configuration</CardTitle>
        <CardDescription>Configure how logs are stored and managed in the database</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retentionPeriod">Log Retention Period (days)</Label>
            <Input
              id="retentionPeriod"
              type="number"
              value={settings.retentionPeriod}
              onChange={(e) => setSettings({ ...settings, retentionPeriod: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">Logs older than this will be automatically deleted</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enablePruning">Automatic Log Pruning</Label>
              <p className="text-sm text-muted-foreground">Automatically delete old logs based on retention period</p>
            </div>
            <Switch
              id="enablePruning"
              checked={settings.enablePruning}
              onCheckedChange={(checked) => setSettings({ ...settings, enablePruning: checked })}
            />
          </div>

          {settings.enablePruning && (
            <div className="space-y-2">
              <Label htmlFor="pruneInterval">Pruning Interval (days)</Label>
              <Input
                id="pruneInterval"
                type="number"
                value={settings.pruneInterval}
                onChange={(e) => setSettings({ ...settings, pruneInterval: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">How often the system should check for and delete old logs</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="maxLogEntries">Maximum Log Entries</Label>
            <Input
              id="maxLogEntries"
              type="number"
              value={settings.maxLogEntries}
              onChange={(e) => setSettings({ ...settings, maxLogEntries: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              Maximum number of log entries to keep (oldest will be deleted first)
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
