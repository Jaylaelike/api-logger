import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoggingSettings } from "@/components/settings/logging-settings"
import { DatabaseSettings } from "@/components/settings/database-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your API logging preferences</p>
      </div>

      <Tabs defaultValue="logging">
        <TabsList>
          <TabsTrigger value="logging">Logging</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="logging" className="mt-4">
          <LoggingSettings />
        </TabsContent>
        <TabsContent value="database" className="mt-4">
          <DatabaseSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
