"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SystemLogsPage() {
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2025-11-25 14:30:22",
      action: "User Login",
      user: "student@college.edu",
      status: "success",
      type: "AUTH",
    },
    {
      id: 2,
      timestamp: "2025-11-25 14:25:15",
      action: "Attendance Marked",
      user: "CS101",
      status: "success",
      type: "ATTENDANCE",
    },
    {
      id: 3,
      timestamp: "2025-11-25 14:20:08",
      action: "Assignment Submitted",
      user: "student@college.edu",
      status: "success",
      type: "ASSIGNMENT",
    },
    {
      id: 4,
      timestamp: "2025-11-25 14:15:42",
      action: "QR Code Generated",
      user: "teacher@college.edu",
      status: "success",
      type: "QR_CODE",
    },
    {
      id: 5,
      timestamp: "2025-11-25 14:10:33",
      action: "User Registration",
      user: "newuser@college.edu",
      status: "success",
      type: "USER",
    },
  ])

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      AUTH: "bg-blue-100 text-blue-800",
      ATTENDANCE: "bg-green-100 text-green-800",
      ASSIGNMENT: "bg-purple-100 text-purple-800",
      QR_CODE: "bg-orange-100 text-orange-800",
      USER: "bg-pink-100 text-pink-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-600 mt-2">Monitor system activities and user actions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Activity Log</CardTitle>
              <Button variant="outline" size="sm">
                Export Logs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${getTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-500">{log.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{log.timestamp}</p>
                    <span className="text-xs font-medium text-green-600">✓ {log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
