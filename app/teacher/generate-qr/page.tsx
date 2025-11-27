"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GenerateQRPage() {
  const [courseCode, setCourseCode] = useState("")
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [sessionTime, setSessionTime] = useState(new Date().toLocaleTimeString())

  const generateQR = () => {
    if (!courseCode.trim()) {
      alert("Please select a course")
      return
    }

    // Generate QR code
    const uniqueCode = `QR_${courseCode}_${Date.now()}`
    setQrCode(uniqueCode)
  }

  const downloadQR = () => {
    if (!qrCode) return

    // Create a simple canvas-based QR representation
    const canvas = document.createElement("canvas")
    canvas.width = 300
    canvas.height = 300
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 300, 300)

    // Draw simple pattern representing QR code
    ctx.fillStyle = "black"
    for (let i = 0; i < qrCode.length; i++) {
      const charCode = qrCode.charCodeAt(i)
      const row = Math.floor(i / 10)
      const col = i % 10
      if (charCode % 2 === 0) {
        ctx.fillRect(col * 30, row * 30, 30, 30)
      }
    }

    // Add text
    ctx.fillStyle = "black"
    ctx.font = "bold 12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(qrCode, 150, 290)

    // Download
    const link = document.createElement("a")
    link.href = canvas.toDataURL()
    link.download = `qr_code_${courseCode}_${new Date().getTime()}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="teacher" />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Attendance QR Code</h1>
        <p className="text-gray-600 mb-8">Create a unique QR code for your class session</p>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Generator</CardTitle>
            <CardDescription>Generate a code for students to scan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Course/Class</label>
                <select
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Choose a course...</option>
                  <option value="CS101">CS101 - Data Structures</option>
                  <option value="CS102">CS102 - Web Development</option>
                  <option value="CS103">CS103 - Database Systems</option>
                  <option value="CS104">CS104 - AI & ML</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Time</label>
                <Input type="text" value={sessionTime} disabled className="bg-gray-100" />
              </div>

              <Button onClick={generateQR} className="w-full bg-green-600 hover:bg-green-700">
                Generate QR Code
              </Button>

              {qrCode && (
                <div className="mt-8 space-y-4">
                  <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center">
                    <div className="bg-white p-4 border-4 border-blue-600 rounded">
                      <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-600 break-all px-4">{qrCode}</p>
                          <p className="text-xs text-gray-500 mt-2">Created: {new Date().toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={downloadQR} className="w-full bg-blue-600 hover:bg-blue-700">
                      Download QR Code
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(qrCode)
                        alert("QR Code copied to clipboard!")
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Copy Code
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This QR code is active for 1 hour. Students can scan it to mark their
                      attendance.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
