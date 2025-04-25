"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    enableNotifications: true,
    notifyOnErrors: true,
    notifyOnWarnings: false,
    notifyOnInfo: false,
    emailNotifications: false,
    emailAddress: "",
    slackNotifications: false,
    slackWebhook: "",
  })

  const handleSave = () => {
    // In a real app, this would save to the server
    toast({
      title: "Settings saved",
      description: "Your notification settings have been updated",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how and when you receive notifications about API events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Enable Notifications</Label>
              <p className="text-sm text-muted-foreground">Show notifications for API events</p>
            </div>
            <Switch
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
            />
          </div>

          {settings.enableNotifications && (
            <>
              <div className="space-y-3">
                <Label>Notification Triggers</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyOnErrors"
                      checked={settings.notifyOnErrors}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifyOnErrors: checked === true })}
                    />
                    <Label htmlFor="notifyOnErrors" className="font-normal">
                      Error events (status 4xx, 5xx)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyOnWarnings"
                      checked={settings.notifyOnWarnings}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifyOnWarnings: checked === true })}
                    />
                    <Label htmlFor="notifyOnWarnings" className="font-normal">
                      Warning events
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifyOnInfo"
                      checked={settings.notifyOnInfo}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifyOnInfo: checked === true })}
                    />
                    <Label htmlFor="notifyOnInfo" className="font-normal">
                      Informational events
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Notification Channels</Label>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>

                  {settings.emailNotifications && (
                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={settings.emailAddress}
                        onChange={(e) => setSettings({ ...settings, emailAddress: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slackNotifications">Slack Notifications</Label>
                    <Switch
                      id="slackNotifications"
                      checked={settings.slackNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, slackNotifications: checked })}
                    />
                  </div>

                  {settings.slackNotifications && (
                    <div className="space-y-2">
                      <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                      <Input
                        id="slackWebhook"
                        value={settings.slackWebhook}
                        onChange={(e) => setSettings({ ...settings, slackWebhook: e.target.value })}
                        placeholder="https://hooks.slack.com/services/..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
