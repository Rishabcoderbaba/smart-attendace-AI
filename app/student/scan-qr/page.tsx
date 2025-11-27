"use client"

import { useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ScanQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState("")
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        setStatus("scanning")
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setStatus("error")
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setScanning(false)
      setStatus("idle")
    }
  }

  const simulateQRScan = () => {
    // Simulate QR code scanning
    const qrCode = `QR_${Date.now()}`
    setResult(qrCode)
    setStatus("success")
    stopScanning()

    // Simulate API call to mark attendance
    setTimeout(() => {
      setStatus("idle")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
        <p className="text-gray-600 mb-8">Scan the QR code provided by your teacher</p>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Scanner</CardTitle>
            <CardDescription>Point your camera at the QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!scanning ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">Camera is not active</p>
                  <Button onClick={startScanning} className="bg-blue-600 hover:bg-blue-700">
                    Start Camera
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
                  <div className="flex gap-2">
                    <Button onClick={simulateQRScan} className="flex-1 bg-green-600 hover:bg-green-700">
                      Simulate Scan
                    </Button>
                    <Button onClick={stopScanning} variant="outline" className="flex-1 bg-transparent">
                      Stop Camera
                    </Button>
                  </div>
                </div>
              )}

              {status === "success" && result && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 font-medium">✓ Attendance Marked Successfully!</p>
                  <p className="text-sm text-green-600 mt-1">QR Code: {result}</p>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 font-medium">✗ Error accessing camera</p>
                  <p className="text-sm text-red-600 mt-1">Please check camera permissions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Your teacher generates a QR code at the start of class</li>
              <li>You point your camera at the code</li>
              <li>The code is automatically scanned and your attendance is marked</li>
              <li>You'll receive a confirmation notification</li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
