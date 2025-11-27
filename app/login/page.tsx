"use client"

import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get("role") || "student"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login - store role in localStorage
      localStorage.setItem("userRole", role)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", email.split("@")[0])

      // Redirect to appropriate dashboard
      if (role === "student") {
        router.push("/student/dashboard")
      } else if (role === "teacher") {
        router.push("/teacher/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="capitalize">Login as {role}</CardTitle>
          <CardDescription className="text-blue-100">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-4">
              Demo credentials:
              <br />
              Email: demo@example.com
              <br />
              Password: demo123
            </p>
          </div>

          <Link href="/">
            <Button variant="ghost" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
