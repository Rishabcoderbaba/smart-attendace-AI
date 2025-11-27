"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              SA
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Smart Attendance</h1>
          </div>
          {role ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 capitalize">Role: {role}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.clear()
                  setRole(null)
                }}
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-16">
        {role ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
              <p className="text-xl text-gray-600 mb-8">Access your {role} portal to manage attendance and academics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {role === "student" && (
                <>
                  <Link href="/student/dashboard">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                        <CardDescription>View your attendance & grades</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/student/scan-qr">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Scan QR Code</CardTitle>
                        <CardDescription>Mark attendance instantly</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/student/face-recognition">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Face Recognition</CardTitle>
                        <CardDescription>Biometric attendance</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </>
              )}

              {role === "teacher" && (
                <>
                  <Link href="/teacher/dashboard">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                        <CardDescription>Manage your classes</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/teacher/generate-qr">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Generate QR</CardTitle>
                        <CardDescription>Create attendance QR codes</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/teacher/manage-students">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Students</CardTitle>
                        <CardDescription>Manage enrolled students</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link href="/admin/dashboard">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                        <CardDescription>College overview</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/admin/manage-users">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage all users</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/admin/colleges">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle>Colleges</CardTitle>
                        <CardDescription>Manage colleges</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/login?role=student">
              <Card className="cursor-pointer hover:shadow-xl transition-shadow hover:scale-105 transform h-full">
                <CardHeader className="bg-blue-50">
                  <div className="text-4xl mb-2">👨‍🎓</div>
                  <CardTitle>Student Portal</CardTitle>
                  <CardDescription>View attendance, grades, and assignments</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full">Enter as Student</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login?role=teacher">
              <Card className="cursor-pointer hover:shadow-xl transition-shadow hover:scale-105 transform h-full">
                <CardHeader className="bg-green-50">
                  <div className="text-4xl mb-2">👨‍🏫</div>
                  <CardTitle>Teacher Portal</CardTitle>
                  <CardDescription>Manage classes and student attendance</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full">Enter as Teacher</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login?role=admin">
              <Card className="cursor-pointer hover:shadow-xl transition-shadow hover:scale-105 transform h-full">
                <CardHeader className="bg-purple-50">
                  <div className="text-4xl mb-2">👨‍💼</div>
                  <CardTitle>Admin Portal</CardTitle>
                  <CardDescription>Manage college and all operations</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full">Enter as Admin</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
