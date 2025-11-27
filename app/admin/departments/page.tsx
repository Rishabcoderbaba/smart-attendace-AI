"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DepartmentsPage() {
  const [departments] = useState([
    {
      id: 1,
      code: "CS",
      name: "Computer Science",
      college: "Engineering College of Technology",
      courses: 12,
      students: 180,
      head: "Dr. Rajesh Kumar",
    },
    {
      id: 2,
      code: "EC",
      name: "Electronics & Communication",
      college: "Engineering College of Technology",
      courses: 10,
      students: 140,
      head: "Dr. Priya Sharma",
    },
    {
      id: 3,
      code: "ME",
      name: "Mechanical Engineering",
      college: "Engineering College of Technology",
      courses: 11,
      students: 130,
      head: "Prof. Arun Singh",
    },
    {
      id: 4,
      code: "MBA",
      name: "Master of Business Admin",
      college: "Institute of Management Studies",
      courses: 8,
      students: 280,
      head: "Dr. Anita Verma",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600 mt-2">Manage all departments across colleges</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Department</Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">College</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Courses</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Students</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Head</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-blue-600">{dept.code}</td>
                      <td className="py-4 px-4 text-gray-900">{dept.name}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{dept.college}</td>
                      <td className="py-4 px-4 text-center text-gray-900">{dept.courses}</td>
                      <td className="py-4 px-4 text-center text-gray-900">{dept.students}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{dept.head}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
