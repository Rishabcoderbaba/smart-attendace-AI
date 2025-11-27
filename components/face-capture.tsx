"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FaceCaptureProps {
  onComplete: () => void
  title: string
  description?: string
}

export function FaceCapture({ onComplete, title, description }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureProgress, setCaptureProgress] = useState(0)
  const [message, setMessage] = useState("")

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
        setMessage("Position your face in the circle and stay still...")
        simulateCapture()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setMessage("Could not access camera. Please check permissions.")
    }
  }

  const simulateCapture = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setCaptureProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        stopCapture()
      }
    }, 300)
  }

  const stopCapture = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsCapturing(false)
      setCaptureProgress(0)
      setMessage("Capture complete! Processing...")
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

        <div className="space-y-4">
          {!isCapturing ? (
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <p className="text-gray-600 mb-4 text-lg">Camera is not active</p>
              <Button onClick={startCapture} className="bg-blue-600 hover:bg-blue-700">
                Start Capture
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
                {/* Face detection overlay */}
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                  <div className="w-48 h-48 border-4 border-green-500 rounded-full opacity-70"></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-sm text-blue-800 text-center mb-2">{message}</p>
                <div className="bg-white rounded h-2 overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all" style={{ width: `${captureProgress}%` }} />
                </div>
                <p className="text-xs text-blue-600 text-center mt-2">{captureProgress}% complete</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
