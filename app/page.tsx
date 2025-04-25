import { LogsTable } from "@/components/logs-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogsOverview } from "@/components/logs-overview"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">API Service Logs</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Service Logs</CardTitle>
              <CardDescription>View all API service calls logged in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <LogsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="errors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>View API service calls that resulted in errors</CardDescription>
            </CardHeader>
            <CardContent>
              <LogsTable filterStatus="error" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="overview" className="mt-4">
          <LogsOverview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
