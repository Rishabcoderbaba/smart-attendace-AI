"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface NavbarProps {
  userRole?: string
  userName?: string
}

export function Navbar({ userRole = "student", userName = "User" }: NavbarProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <span className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center">SA</span>
          Smart Attendance
        </Link>

        <div className="flex items-center gap-4">
          {mounted && (
            <>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
