"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ManageAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Array Operations Implementation",
      description: "Implement array search, sort, and manipulation",
      dueDate: "2025-12-05",
      totalMarks: 100,
      submissions: 18,
      totalStudents: 20,
      status: "active",
    },
    {
      id: 2,
      title: "Linked List Project",
      description: "Create a complete linked list implementation",
      dueDate: "2025-12-12",
      totalMarks: 100,
      submissions: 5,
      totalStudents: 20,
      status: "active",
    },
    {
      id: 3,
      title: "Stack Implementation",
      description: "Implement stack with applications",
      dueDate: "2025-11-28",
      totalMarks: 100,
      submissions: 20,
      totalStudents: 20,
      status: "closed",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    marks: 100,
  })

  const handleAddAssignment = () => {
    if (formData.title.trim()) {
      setAssignments([
        ...assignments,
        {
          id: assignments.length + 1,
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          totalMarks: formData.marks,
          submissions: 0,
          totalStudents: 20,
          status: "active",
        },
      ])
      setFormData({ title: "", description: "", dueDate: "", marks: 100 })
      setShowModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="teacher" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Assignments</h1>
            <p className="text-gray-600 mt-2">Create and manage student assignments</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700">
            Create Assignment
          </Button>
        </div>

        {/* Create Assignment Modal */}
        {showModal && (
          <Card className="mb-6 border-2 border-blue-600">
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Assignment description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                  <Input
                    type="number"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddAssignment} className="bg-green-600 hover:bg-green-700">
                  Create
                </Button>
                <Button onClick={() => setShowModal(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{assignment.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assignment.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Due Date</p>
                        <p className="font-medium text-gray-900">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Marks</p>
                        <p className="font-medium text-gray-900">{assignment.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Submissions</p>
                        <p className="font-medium text-gray-900">
                          {assignment.submissions}/{assignment.totalStudents}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Submission Rate</p>
                        <p className="font-medium text-blue-600">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 space-y-2">
                    <Button size="sm" variant="outline">
                      View Submissions
                    </Button>
                    <Button size="sm" variant="outline">
                      Grade
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/teacher/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
