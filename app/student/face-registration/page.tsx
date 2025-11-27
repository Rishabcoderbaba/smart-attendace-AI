"use client"

import { useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FaceRegistrationPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [registrationStep, setRegistrationStep] = useState(0) // 0: initial, 1: scanning, 2: completed
  const [isRegistering, setIsRegistering] = useState(false)
  const [capturedFrames, setCapturedFrames] = useState(0)
  const [message, setMessage] = useState("")

  const startFaceRegistration = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsRegistering(true)
        setRegistrationStep(1)
        setMessage("Position your face in the circle and stay still...")
        startCapturingFrames()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setMessage("Could not access camera. Please check permissions.")
    }
  }

  const startCapturingFrames = () => {
    let frames = 0
    const captureInterval = setInterval(() => {
      frames++
      setCapturedFrames(frames)

      if (frames >= 10) {
        clearInterval(captureInterval)
        stopRegistration()
      }
    }, 500)
  }

  const stopRegistration = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsRegistering(false)
      setRegistrationStep(2)
      setMessage("Face registration completed successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Face Registration</h1>
        <p className="text-gray-600 mb-8">Register your face for biometric attendance system</p>

        <Card>
          <CardHeader>
            <CardTitle>Biometric Face Registration</CardTitle>
            <CardDescription>
              {registrationStep === 0 && "Complete one-time face registration"}
              {registrationStep === 1 && "Capturing face data..."}
              {registrationStep === 2 && "Registration complete!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {registrationStep === 0 && (
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <div className="text-5xl mb-4">👤</div>
                  <p className="text-gray-700 mb-6 text-lg">Register your face to use biometric attendance</p>
                  <Button onClick={startFaceRegistration} className="bg-blue-600 hover:bg-blue-700">
                    Start Face Registration
                  </Button>
                </div>
              )}

              {registrationStep === 1 && (
                <div className="space-y-4">
                  <div className="relative">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Face detection overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                      <div className="w-48 h-48 border-4 border-green-500 rounded-full opacity-70 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <p className="text-sm text-blue-800 text-center">{message}</p>
                    <div className="mt-4 bg-white rounded h-2 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${(capturedFrames / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-600 text-center mt-2">{capturedFrames}/10 frames captured</p>
                  </div>
                </div>
              )}

              {registrationStep === 2 && (
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="text-5xl mb-4">✓</div>
                    <p className="text-lg font-semibold text-green-800 mb-2">Registration Successful!</p>
                    <p className="text-green-600">
                      Your face has been registered. You can now use face recognition for attendance.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Use Face Recognition for Attendance
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Ensure good lighting on your face</li>
              <li>Look directly at the camera</li>
              <li>Keep your face in the circle throughout the process</li>
              <li>Remove any sunglasses or heavy makeup</li>
              <li>You can re-register anytime if needed</li>
              <li>Your face data is encrypted and stored securely</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
