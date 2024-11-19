'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileText, AlertCircle } from 'lucide-react'

export default function ProcessingOverview() {
  const [scheduledRuns, setScheduledRuns] = useState([
    { date: "2023-06-20", time: "09:00", status: "Scheduled" },
    { date: "2023-06-21", time: "14:30", status: "Scheduled" },
    { date: "2023-06-22", time: "11:00", status: "Scheduled" },
  ])

  const handleScheduleRun = () => {
    // Logic to add a new scheduled run
    console.log("Scheduling new run")
  }

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

      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Schedule Configuration</h3>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Input type="time" className="w-[180px]" />
          <Button onClick={handleScheduleRun}>Set Schedule</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Upcoming Scheduled Runs</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700 dark:text-blue-300">Date</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Time</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Status</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledRuns.map((run, index) => (
              <TableRow key={index}>
                <TableCell>{run.date}</TableCell>
                <TableCell>{run.time}</TableCell>
                <TableCell>{run.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}