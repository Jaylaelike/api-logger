"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function LoggingSettings() {
  const [settings, setSettings] = useState({
    logLevel: "info",
    enableConsoleLogging: true,
    enableFileLogging: false,
    filePath: "./logs",
    maxLogAge: "7",
    logRequestBody: true,
    logResponseBody: true,
  })

  const handleSave = () => {
    // In a real app, this would save to the server
    toast({
      title: "Settings saved",
      description: "Your logging settings have been updated",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logging Configuration</CardTitle>
        <CardDescription>Configure how API calls are logged in the system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <Select value={settings.logLevel} onValueChange={(value) => setSettings({ ...settings, logLevel: value })}>
              <SelectTrigger id="logLevel">
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trace">Trace</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="fatal">Fatal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableConsoleLogging">Console Logging</Label>
              <p className="text-sm text-muted-foreground">Output logs to the console</p>
            </div>
            <Switch
              id="enableConsoleLogging"
              checked={settings.enableConsoleLogging}
              onCheckedChange={(checked) => setSettings({ ...settings, enableConsoleLogging: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableFileLogging">File Logging</Label>
              <p className="text-sm text-muted-foreground">Save logs to files on disk</p>
            </div>
            <Switch
              id="enableFileLogging"
              checked={settings.enableFileLogging}
              onCheckedChange={(checked) => setSettings({ ...settings, enableFileLogging: checked })}
            />
          </div>

          {settings.enableFileLogging && (
            <div className="space-y-2">
              <Label htmlFor="filePath">Log File Path</Label>
              <Input
                id="filePath"
                value={settings.filePath}
                onChange={(e) => setSettings({ ...settings, filePath: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="maxLogAge">Maximum Log Age (days)</Label>
            <Input
              id="maxLogAge"
              type="number"
              value={settings.maxLogAge}
              onChange={(e) => setSettings({ ...settings, maxLogAge: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="logRequestBody">Log Request Body</Label>
              <p className="text-sm text-muted-foreground">Include request body in logs</p>
            </div>
            <Switch
              id="logRequestBody"
              checked={settings.logRequestBody}
              onCheckedChange={(checked) => setSettings({ ...settings, logRequestBody: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="logResponseBody">Log Response Body</Label>
              <p className="text-sm text-muted-foreground">Include response body in logs</p>
            </div>
            <Switch
              id="logResponseBody"
              checked={settings.logResponseBody}
              onCheckedChange={(checked) => setSettings({ ...settings, logResponseBody: checked })}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
