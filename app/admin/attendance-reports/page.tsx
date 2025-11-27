"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AttendanceReportsPage() {
  const [reports] = useState([
    {
      id: 1,
      course: "CS101 - Data Structures",
      totalClasses: 45,
      avgAttendance: 88,
      highestAttendance: 95,
      lowestAttendance: 72,
      generatedDate: "2025-11-25",
    },
    {
      id: 2,
      course: "CS102 - Web Development",
      totalClasses: 42,
      avgAttendance: 85,
      highestAttendance: 98,
      lowestAttendance: 65,
      generatedDate: "2025-11-25",
    },
    {
      id: 3,
      course: "CS103 - Database Systems",
      totalClasses: 40,
      avgAttendance: 82,
      highestAttendance: 92,
      lowestAttendance: 58,
      generatedDate: "2025-11-25",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
          <p className="text-gray-600 mt-2">View attendance analytics across all courses</p>
        </div>

        <div className="space-y-6">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{report.course}</h3>
                    <p className="text-sm text-gray-500">Generated on {report.generatedDate}</p>
                  </div>
                  <Button size="sm">Download Report</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Total Classes</p>
                    <p className="text-2xl font-bold text-blue-600">{report.totalClasses}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Average Attendance</p>
                    <p className="text-2xl font-bold text-green-600">{report.avgAttendance}%</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Highest</p>
                    <p className="text-2xl font-bold text-orange-600">{report.highestAttendance}%</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Lowest</p>
                    <p className="text-2xl font-bold text-red-600">{report.lowestAttendance}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
