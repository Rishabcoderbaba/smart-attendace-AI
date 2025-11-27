"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeacherDashboard() {
  const [userName, setUserName] = useState("")
  const [stats, setStats] = useState({
    totalClasses: 12,
    totalStudents: 85,
    avgAttendance: 82,
    pendingAssignments: 5,
  })

  useEffect(() => {
    const name = localStorage.getItem("userName") || ""
    setUserName(name)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="teacher" userName={userName} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Prof. {userName}!</h1>
          <p className="text-gray-600 mt-2">Manage your classes and students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalClasses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.avgAttendance}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.pendingAssignments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/teacher/generate-qr" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate QR Code</Button>
              </Link>
              <Link href="/teacher/attendance-records" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  View Records
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/teacher/manage-students" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Manage Students
                </Button>
              </Link>
              <Link href="/teacher/manage-assignments" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Manage Assignments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Your Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { code: "CS101", name: "Data Structures", students: 28 },
                { code: "CS102", name: "Web Development", students: 32 },
                { code: "CS104", name: "AI & ML", students: 25 },
              ].map((course) => (
                <div
                  key={course.code}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {course.code} - {course.name}
                    </p>
                    <p className="text-sm text-gray-500">{course.students} students enrolled</p>
                  </div>
                  <Link href="/teacher/manage-students">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
