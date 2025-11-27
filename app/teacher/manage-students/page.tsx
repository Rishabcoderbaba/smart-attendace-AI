"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      email: "amit@college.edu",
      studentId: "CS001",
      attendance: 90,
      assignmentScore: 85,
      enrollmentDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@college.edu",
      studentId: "CS002",
      attendance: 95,
      assignmentScore: 92,
      enrollmentDate: "2024-01-15",
    },
    {
      id: 3,
      name: "Rajesh Patel",
      email: "rajesh@college.edu",
      studentId: "CS003",
      attendance: 75,
      assignmentScore: 68,
      enrollmentDate: "2024-01-15",
    },
    {
      id: 4,
      name: "Ananya Sharma",
      email: "ananya@college.edu",
      studentId: "CS004",
      attendance: 88,
      assignmentScore: 88,
      enrollmentDate: "2024-01-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId.includes(searchTerm),
  )

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return "text-green-600"
    if (attendance >= 75) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="teacher" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600 mt-2">View and manage enrolled students</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students - {filteredStudents.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Student ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Attendance %</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Assignments</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-medium">{student.name}</td>
                      <td className="py-4 px-4 text-gray-600">{student.studentId}</td>
                      <td className="py-4 px-4 text-gray-600">{student.email}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600">{student.assignmentScore}/100</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          Mark Attendance
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
