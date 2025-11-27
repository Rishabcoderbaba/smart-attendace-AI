"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CoursesPage() {
  const [courses] = useState([
    {
      id: 1,
      code: "CS101",
      name: "Data Structures",
      department: "Computer Science",
      credits: 4,
      students: 28,
      teacher: "Dr. Rajesh Kumar",
    },
    {
      id: 2,
      code: "CS102",
      name: "Web Development",
      department: "Computer Science",
      credits: 3,
      students: 32,
      teacher: "Prof. Priya Sharma",
    },
    {
      id: 3,
      code: "CS103",
      name: "Database Systems",
      department: "Computer Science",
      credits: 4,
      students: 30,
      teacher: "Dr. Arun Singh",
    },
    {
      id: 4,
      code: "EC101",
      name: "Digital Electronics",
      department: "Electronics & Communication",
      credits: 4,
      students: 25,
      teacher: "Prof. Anita Verma",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(
    (course) => course.code.includes(searchTerm) || course.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600 mt-2">Manage all courses across departments</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Course</Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <Input
              placeholder="Search by course code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Course Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Credits</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Students</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Teacher</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-blue-600">{course.code}</td>
                      <td className="py-4 px-4 text-gray-900">{course.name}</td>
                      <td className="py-4 px-4 text-gray-600">{course.department}</td>
                      <td className="py-4 px-4 text-center text-gray-900">{course.credits}</td>
                      <td className="py-4 px-4 text-center text-gray-900">{course.students}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{course.teacher}</td>
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
