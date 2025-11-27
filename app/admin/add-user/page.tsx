"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    studentId: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate adding user
    console.log("User added:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", password: "", role: "student", studentId: "" })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
          <p className="text-gray-600 mt-2">Create a new account in the system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Registration Form</CardTitle>
            <CardDescription>Fill in the details to create a new user account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@college.edu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {formData.role === "student" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <Input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="CS2024001" />
                </div>
              )}

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Create User
                </Button>
                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800">✓ User created successfully!</p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Link href="/admin/manage-users">
            <Button variant="outline">Back to Users</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
