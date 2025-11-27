"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ManageUsersPage() {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@college.edu", role: "student", joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@college.edu", role: "teacher", joinDate: "2023-08-20", status: "active" },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert@college.edu",
      role: "student",
      joinDate: "2024-02-10",
      status: "active",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@college.edu",
      role: "teacher",
      joinDate: "2023-07-05",
      status: "inactive",
    },
  ])

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "teacher":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600 mt-2">View and manage all system users</p>
          </div>
          <Link href="/admin/add-user">
            <Button className="bg-blue-600 hover:bg-blue-700">Add New User</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Role</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Join Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-gray-600">{user.email}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadgeColor(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
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
