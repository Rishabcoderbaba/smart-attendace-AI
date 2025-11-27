"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SyllabusPage() {
  const [selectedCourse, setSelectedCourse] = useState("CS101")
  const [syllabusData] = useState([
    {
      course: "CS101",
      name: "Data Structures",
      weeks: [
        {
          week: 1,
          title: "Introduction & Arrays",
          topics: ["Basic concepts", "Array operations", "Complexity analysis"],
          resources: ["Lecture slides", "Video tutorial", "Practice problems"],
        },
        {
          week: 2,
          title: "Linked Lists",
          topics: ["Node structure", "Insertion/Deletion", "Traversal"],
          resources: ["Lecture slides", "Code examples"],
        },
        {
          week: 3,
          title: "Stacks & Queues",
          topics: ["LIFO & FIFO", "Operations", "Applications"],
          resources: ["Lecture slides", "Interactive demos"],
        },
      ],
    },
    {
      course: "CS102",
      name: "Web Development",
      weeks: [
        {
          week: 1,
          title: "HTML Basics",
          topics: ["Tags & elements", "Forms", "Semantic HTML"],
          resources: ["MDN docs", "Tutorials"],
        },
        {
          week: 2,
          title: "CSS Styling",
          topics: ["Selectors", "Flexbox", "Grid"],
          resources: ["CSS tricks", "Video guides"],
        },
      ],
    },
  ])

  const courses = syllabusData.map((c) => ({ code: c.course, name: c.name }))
  const currentSyllabus = syllabusData.find((s) => s.course === selectedCourse)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Syllabus</h1>
          <p className="text-gray-600 mt-2">View course content and learning materials</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>

        {currentSyllabus && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentSyllabus.code} - {currentSyllabus.name}
                </CardTitle>
                <CardDescription>Complete course outline and learning materials</CardDescription>
              </CardHeader>
            </Card>

            {currentSyllabus.weeks.map((week) => (
              <Card key={week.week}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Week {week.week}: {week.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Topics Covered:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {week.topics.map((topic, i) => (
                        <li key={i} className="text-gray-600">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Resources:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {week.resources.map((resource, i) => (
                        <Button key={i} variant="outline" className="text-left bg-transparent" size="sm">
                          📄 {resource}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/student/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
