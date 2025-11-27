"use client"

import { useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FaceRecognitionPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [status, setStatus] = useState<"idle" | "recognizing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const startFaceRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsRecognizing(true)
        setStatus("recognizing")
        simulateFaceRecognition()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setStatus("error")
      setMessage("Could not access camera. Please check permissions.")
    }
  }

  const stopRecognition = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsRecognizing(false)
    }
  }

  const simulateFaceRecognition = () => {
    // Simulate face recognition process
    setTimeout(() => {
      setStatus("success")
      setMessage("Face recognized! Attendance marked successfully.")
      setTimeout(() => {
        stopRecognition()
        setStatus("idle")
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Face Recognition Attendance</h1>
        <p className="text-gray-600 mb-8">Use your face to mark attendance</p>

        <Card>
          <CardHeader>
            <CardTitle>Face Biometric Scanner</CardTitle>
            <CardDescription>Position your face in front of the camera</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isRecognizing ? (
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <p className="text-gray-600 mb-4 text-lg">Camera is not active</p>
                  <Button onClick={startFaceRecognition} className="bg-blue-600 hover:bg-blue-700">
                    Start Face Recognition
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
                    <canvas ref={canvasRef} className="hidden" />
                    {/* Face detection overlay circle */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                      <div className="w-48 h-48 border-2 border-green-500 rounded-full opacity-50"></div>
                    </div>
                    {status === "recognizing" && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>

                  {status !== "recognizing" && (
                    <Button onClick={stopRecognition} variant="outline" className="w-full bg-transparent">
                      Stop Recognition
                    </Button>
                  )}
                </div>
              )}

              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 font-medium">✓ {message}</p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 font-medium">✗ Error</p>
                  <p className="text-sm text-red-600 mt-1">{message}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">How Face Recognition Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Ensure good lighting on your face</li>
              <li>Face should be clearly visible in the circle</li>
              <li>The system will capture and recognize your face</li>
              <li>Attendance is automatically marked on recognition</li>
              <li>Process takes 2-3 seconds</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">First Time Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              If this is your first time using face recognition, you'll need to register your face first.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Register Face
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
