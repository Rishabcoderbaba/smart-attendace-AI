"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CollegesPage() {
  const [colleges] = useState([
    {
      id: 1,
      name: "Engineering College of Technology",
      email: "admin@ect.edu",
      city: "New Delhi",
      departments: 8,
      students: 450,
      teachers: 25,
    },
    {
      id: 2,
      name: "Institute of Management Studies",
      email: "admin@ims.edu",
      city: "Mumbai",
      departments: 5,
      students: 280,
      teachers: 18,
    },
    {
      id: 3,
      name: "Science & Arts College",
      email: "admin@sac.edu",
      city: "Bangalore",
      departments: 6,
      students: 320,
      teachers: 22,
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Colleges</h1>
            <p className="text-gray-600 mt-2">Manage all affiliated colleges</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Add College</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colleges.map((college) => (
            <Card key={college.id}>
              <CardHeader>
                <CardTitle>{college.name}</CardTitle>
                <CardDescription>{college.city}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Departments</p>
                      <p className="font-semibold text-gray-900">{college.departments}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-semibold text-gray-900">{college.students}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Teachers</p>
                      <p className="font-semibold text-gray-900">{college.teachers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900 text-xs">{college.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
