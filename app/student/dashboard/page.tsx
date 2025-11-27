"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentDashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [stats, setStats] = useState({
    attendancePercentage: 85,
    totalClasses: 45,
    classesAttended: 38,
    upcomingAssignments: 3,
    upcomingExams: 2,
    pendingFees: 5000,
  })

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || ""
    const name = localStorage.getItem("userName") || ""
    setUserEmail(email)
    setUserName(name)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" userName={userName} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
          <p className="text-gray-600 mt-2">Here's your academic overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.attendancePercentage}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.classesAttended} of {stats.totalClasses} classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">₹{stats.pendingFees}</div>
              <p className="text-xs text-gray-500 mt-1">Due within 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tasks Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.upcomingAssignments + stats.upcomingExams}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.upcomingAssignments} assignments, {stats.upcomingExams} exams
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Use QR code or face recognition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/student/scan-qr" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Scan QR Code</Button>
              </Link>
              <Link href="/student/face-recognition" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Face Recognition
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Info</CardTitle>
              <CardDescription>Syllabus, assignments & exams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/student/syllabus" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  View Syllabus
                </Button>
              </Link>
              <Link href="/student/assignments" className="block">
                <Button className="w-full bg-transparent" variant="outline">
                  Assignments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/student/exams" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardContent className="pt-6">
                <p className="font-semibold text-gray-900 mb-1">Exams & Results</p>
                <p className="text-sm text-gray-600">View upcoming exams and your results</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/fees" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardContent className="pt-6">
                <p className="font-semibold text-gray-900 mb-1">Fees & Payments</p>
                <p className="text-sm text-gray-600">Manage your fees and payments</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/student/face-registration" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardContent className="pt-6">
                <p className="font-semibold text-gray-900 mb-1">Face Registration</p>
                <p className="text-sm text-gray-600">Register your face for biometric attendance</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded">
                  <div>
                    <p className="font-medium text-gray-900">Assignment {i}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href="/student/assignments">
                    <Button variant="ghost" size="sm">
                      View
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
