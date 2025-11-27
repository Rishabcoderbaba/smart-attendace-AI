"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AttendanceRecordsPage() {
  const [attendanceRecords] = useState([
    {
      date: "2025-11-25",
      day: "Monday",
      totalStudents: 20,
      present: 18,
      absent: 2,
      late: 0,
      method: "QR Code",
    },
    {
      date: "2025-11-24",
      day: "Sunday",
      totalStudents: 20,
      present: 19,
      absent: 1,
      late: 0,
      method: "Face Recognition",
    },
    {
      date: "2025-11-23",
      day: "Saturday",
      totalStudents: 20,
      present: 17,
      absent: 2,
      late: 1,
      method: "QR Code",
    },
    {
      date: "2025-11-22",
      day: "Friday",
      totalStudents: 20,
      present: 20,
      absent: 0,
      late: 0,
      method: "Face Recognition",
    },
  ])

  const [selectedDate, setSelectedDate] = useState("")

  const filteredRecords = selectedDate ? attendanceRecords.filter((r) => r.date === selectedDate) : attendanceRecords

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="teacher" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Records</h1>
          <p className="text-gray-600 mt-2">View detailed attendance history</p>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
              {selectedDate && (
                <Button variant="outline" onClick={() => setSelectedDate("")}>
                  Clear Filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Average Attendance</p>
              <p className="text-3xl font-bold text-green-600">88%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-3xl font-bold text-blue-600">{filteredRecords.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Total Absents</p>
              <p className="text-3xl font-bold text-red-600">{filteredRecords.reduce((sum, r) => sum + r.absent, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="text-3xl font-bold text-orange-600">
                {filteredRecords.reduce((sum, r) => sum + r.late, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Day</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Total</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Present</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Absent</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Late</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Method</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-medium">{record.date}</td>
                      <td className="py-4 px-4 text-gray-600">{record.day}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{record.totalStudents}</td>
                      <td className="py-4 px-4 text-center text-green-600 font-semibold">{record.present}</td>
                      <td className="py-4 px-4 text-center text-red-600 font-semibold">{record.absent}</td>
                      <td className="py-4 px-4 text-center text-orange-600 font-semibold">{record.late}</td>
                      <td className="py-4 px-4 text-center text-blue-600">{record.method}</td>
                      <td className="py-4 px-4 text-right">
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Link href="/teacher/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
