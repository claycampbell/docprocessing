import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Cell } from 'recharts'

const dashboardData = [
  { name: 'Jan', documents: 65, fields: 240, completed: 50, processing: 10, queued: 5 },
  { name: 'Feb', documents: 59, fields: 218, completed: 45, processing: 8, queued: 6 },
  { name: 'Mar', documents: 80, fields: 280, completed: 60, processing: 15, queued: 5 },
  { name: 'Apr', documents: 81, fields: 290, completed: 70, processing: 8, queued: 3 },
  { name: 'May', documents: 56, fields: 200, completed: 40, processing: 10, queued: 6 },
  { name: 'Jun', documents: 55, fields: 210, completed: 35, processing: 15, queued: 5 },
  { name: 'Jul', documents: 40, fields: 180, completed: 30, processing: 5, queued: 5 },
]

const documentTypesData = [
  { name: 'Contracts', value: 350 },
  { name: 'Invoices', value: 275 },
  { name: 'Reports', value: 200 },
  { name: 'Agreements', value: 150 },
  { name: 'Others', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fields Extracted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Documents Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="documents" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Processing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#8884d8" name="Completed" />
                <Bar dataKey="processing" stackId="a" fill="#82ca9d" name="Processing" />
                <Bar dataKey="queued" stackId="a" fill="#ffc658" name="Queued" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Document Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={documentTypesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Count">
                {documentTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}