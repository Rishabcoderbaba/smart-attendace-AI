"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const [userName, setUserName] = useState("")
  const [stats, setStats] = useState({
    totalStudents: 450,
    totalTeachers: 25,
    totalCourses: 48,
    overallAttendance: 84,
  })

  useEffect(() => {
    const name = localStorage.getItem("userName") || ""
    setUserName(name)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" userName={userName} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">College Administration</h1>
          <p className="text-gray-600 mt-2">Overview and management of all operations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.totalTeachers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.totalCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.overallAttendance}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/manage-users" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Users</Button>
              </Link>
              <Link href="/admin/add-user" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Add New User
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>College Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/colleges" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Manage Colleges
                </Button>
              </Link>
              <Link href="/admin/departments" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Departments
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/courses" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Courses
                </Button>
              </Link>
              <Link href="/admin/attendance-reports" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Attendance Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/system-logs" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  System Logs
                </Button>
              </Link>
              <Link href="/admin/reports" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Generate Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded text-center">
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">Healthy</p>
              </div>
              <div className="p-4 bg-blue-50 rounded text-center">
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-blue-600">99.9%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded text-center">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <div className="p-4 bg-orange-50 rounded text-center">
                <p className="text-sm text-gray-600">Last Backup</p>
                <p className="text-2xl font-bold text-orange-600">2 hrs ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
