"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("overview")

  const reports = [
    { id: "overview", name: "College Overview Report", description: "Complete overview of all colleges" },
    { id: "attendance", name: "Attendance Summary", description: "Overall attendance statistics" },
    { id: "performance", name: "Student Performance", description: "Academic performance metrics" },
    { id: "financial", name: "Financial Report", description: "Fees collection and expenses" },
  ]

  const generateReport = (reportType: string) => {
    alert(`Generating ${reportType} report...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
          <p className="text-gray-600 mt-2">Create custom reports for analysis and auditing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card
              key={report.id}
              className={`cursor-pointer transition-all ${selectedReport === report.id ? "ring-2 ring-blue-600" : ""}`}
              onClick={() => setSelectedReport(report.id)}
            >
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generateReport(report.name)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">450</p>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <p className="text-sm text-gray-600">Total Teachers</p>
                <p className="text-3xl font-bold text-green-600">25</p>
              </div>
              <div className="p-4 bg-orange-50 rounded">
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-3xl font-bold text-orange-600">48</p>
              </div>
              <div className="p-4 bg-purple-50 rounded">
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-purple-600">84%</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">Download as PDF</Button>
              <Button variant="outline">Download as Excel</Button>
              <Button variant="outline">Print</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
