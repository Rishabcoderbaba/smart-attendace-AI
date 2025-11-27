"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AssignmentsPage() {
  const [assignments] = useState([
    {
      id: 1,
      title: "Data Structures Assignment 1",
      course: "CS101",
      description: "Implement array operations and analyze complexity",
      dueDate: "2025-12-05",
      status: "pending",
      marks: 100,
      submitted: false,
    },
    {
      id: 2,
      title: "Web Dev Project - Personal Portfolio",
      course: "CS102",
      description: "Create a responsive personal portfolio website",
      dueDate: "2025-12-12",
      status: "pending",
      marks: 100,
      submitted: false,
    },
    {
      id: 3,
      title: "Database Assignment 2",
      course: "CS103",
      description: "Design and implement database schema",
      dueDate: "2025-11-30",
      status: "submitted",
      marks: 100,
      submitted: true,
      submittedDate: "2025-11-28",
      feedback: "Good implementation, excellent normalization",
    },
    {
      id: 4,
      title: "AI/ML Mini Project",
      course: "CS104",
      description: "Build a simple classification model",
      dueDate: "2025-11-28",
      status: "overdue",
      marks: 100,
      submitted: false,
    },
  ])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      submitted: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    }
    return styles[status] || "bg-gray-100 text-gray-800"
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diff = due.getTime() - today.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-2">Track your assignments and submissions</p>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{assignment.title}</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(assignment.status)}`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Course</p>
                        <p className="font-medium text-gray-900">{assignment.course}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Marks</p>
                        <p className="font-medium text-gray-900">{assignment.marks}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Due Date</p>
                        <p className="font-medium text-gray-900">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Days Left</p>
                        <p
                          className={`font-medium ${getDaysUntilDue(assignment.dueDate) > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {getDaysUntilDue(assignment.dueDate)} days
                        </p>
                      </div>
                    </div>

                    {assignment.submitted && assignment.feedback && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Feedback:</strong> {assignment.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {!assignment.submitted && <Button className="ml-4 bg-blue-600 hover:bg-blue-700">Submit Now</Button>}
                  {assignment.submitted && (
                    <Button variant="outline" className="ml-4 bg-transparent">
                      View Submission
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/student/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
