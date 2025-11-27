"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { validateQRCode, recordAttendanceFromQR } from "@/lib/qr-code"

interface QRScannerProps {
  onSuccess: (result: { message: string; courseName: string; code: string }) => void
  onError: (error: string) => void
  studentId?: string
}

export function QRScanner({ onSuccess, onError, studentId = "STU001" }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [status, setStatus] = useState<"idle" | "scanning" | "processing">("idle")
  const [message, setMessage] = useState("")

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
        setStatus("scanning")
        setMessage("Point camera at QR code...")

        // Simulate QR code detection
        simulateQRDetection()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      onError("Could not access camera")
    }
  }

  const simulateQRDetection = () => {
    setTimeout(() => {
      performScan()
    }, 3000)
  }

  const performScan = () => {
    setStatus("processing")
    setMessage("Processing QR code...")

    // Simulate detecting a QR code
    setTimeout(() => {
      // In real app, you would decode actual QR code from video frame
      const mockQRCode = `QR_CS101_${Date.now()}_ABC123`

      const result = validateQRCode(mockQRCode)

      if (result.success && result.data) {
        // Record attendance
        recordAttendanceFromQR(studentId, result.data)
        onSuccess({
          message: "Attendance marked successfully!",
          courseName: result.data.courseName,
          code: result.data.code,
        })
      } else {
        onError("Invalid or expired QR code")
      }

      stopScanning()
    }, 2000)
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsScanning(false)
      setStatus("idle")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Scanner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning ? (
          <Button onClick={startScanning} className="w-full bg-blue-600 hover:bg-blue-700">
            Start Scanner
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
              {/* QR scanning frame */}
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <div className="w-40 h-40 border-2 border-yellow-400 opacity-70"></div>
              </div>
              {status === "processing" && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {message && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800 text-center">{message}</p>
              </div>
            )}

            <Button onClick={stopScanning} variant="outline" className="w-full bg-transparent">
              Stop Scanning
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
