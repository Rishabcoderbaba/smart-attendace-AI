"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExamsPage() {
  const [exams] = useState([
    {
      id: 1,
      course: "CS101",
      title: "Data Structures Midterm",
      date: "2025-12-08",
      time: "10:00 AM",
      duration: 120,
      totalMarks: 100,
      status: "upcoming",
      syllabus: "Arrays, Linked Lists, Stacks",
    },
    {
      id: 2,
      course: "CS102",
      title: "Web Development Quiz",
      date: "2025-12-05",
      time: "02:00 PM",
      duration: 60,
      totalMarks: 50,
      status: "upcoming",
      syllabus: "HTML, CSS, JavaScript basics",
    },
    {
      id: 3,
      course: "CS103",
      title: "Database Midterm",
      date: "2025-11-25",
      time: "11:00 AM",
      duration: 120,
      totalMarks: 100,
      status: "completed",
      marksObtained: 85,
      grade: "A",
      syllabus: "SQL, Normalization, Queries",
    },
    {
      id: 4,
      course: "CS104",
      title: "AI/ML Assignment",
      date: "2025-12-15",
      time: "03:00 PM",
      duration: 180,
      totalMarks: 100,
      status: "upcoming",
      syllabus: "Regression, Classification, Neural Networks",
    },
  ])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      missed: "bg-red-100 text-red-800",
    }
    return styles[status] || "bg-gray-100 text-gray-800"
  }

  const getDaysUntilExam = (examDate: string) => {
    const exam = new Date(examDate)
    const today = new Date()
    const diff = exam.getTime() - today.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exams & Results</h1>
          <p className="text-gray-600 mt-2">View upcoming exams and your results</p>
        </div>

        <div className="space-y-4">
          {exams.map((exam) => (
            <Card key={exam.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{exam.title}</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(exam.status)}`}
                      >
                        {exam.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Course</p>
                        <p className="font-medium text-gray-900">{exam.course}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date & Time</p>
                        <p className="font-medium text-gray-900">
                          {exam.date} at {exam.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{exam.duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Marks</p>
                        <p className="font-medium text-gray-900">{exam.totalMarks}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Syllabus Coverage:</p>
                      <p className="text-sm text-gray-600">{exam.syllabus}</p>
                    </div>

                    {exam.status === "completed" && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-800">
                              <strong>Your Score:</strong> {exam.marksObtained}/{exam.totalMarks}
                            </p>
                            <p className="text-sm text-green-700">
                              Grade: <strong className="text-lg">{exam.grade}</strong>
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )}

                    {exam.status === "upcoming" && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>{getDaysUntilExam(exam.date)} days</strong> remaining to prepare
                        </p>
                      </div>
                    )}
                  </div>

                  {exam.status === "upcoming" && (
                    <Button className="ml-4 bg-blue-600 hover:bg-blue-700">Study Material</Button>
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
