"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FaceRecognitionWidgetProps {
  onSuccess: (result: { message: string; confidence: number }) => void
  onError: (error: string) => void
}

export function FaceRecognitionWidget({ onSuccess, onError }: FaceRecognitionWidgetProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [status, setStatus] = useState<"idle" | "recognizing" | "processing">("idle")

  const startRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsRecognizing(true)
        setStatus("recognizing")

        // Simulate recognition after 3 seconds
        setTimeout(() => {
          performRecognition()
        }, 3000)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      onError("Could not access camera")
    }
  }

  const performRecognition = () => {
    setStatus("processing")

    // Simulate recognition processing
    setTimeout(() => {
      const isMatch = Math.random() > 0.2 // 80% success rate for demo
      const confidence = 0.75 + Math.random() * 0.24

      if (isMatch) {
        onSuccess({
          message: "Face recognized successfully!",
          confidence,
        })
      } else {
        onError("Face not recognized. Please try again.")
      }

      stopRecognition()
    }, 2000)
  }

  const stopRecognition = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsRecognizing(false)
      setStatus("idle")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {!isRecognizing ? (
            <Button onClick={startRecognition} className="w-full bg-blue-600 hover:bg-blue-700">
              Start Face Recognition
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-600" />
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                  <div className="w-48 h-48 border-4 border-green-500 rounded-full opacity-50"></div>
                </div>
                {status === "recognizing" && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>

              {status === "processing" && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Processing face data...</p>
                </div>
              )}

              <Button onClick={stopRecognition} variant="outline" className="w-full bg-transparent">
                Stop Recognition
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
