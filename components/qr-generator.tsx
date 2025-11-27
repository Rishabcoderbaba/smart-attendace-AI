"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateQRCode, storeQRCode, downloadQRCode, getQRCodeExpirationMinutes } from "@/lib/qr-code"

interface QRGeneratorProps {
  courseId: string
  courseName: string
  teacherEmail: string
  onGenerate?: (code: string) => void
}

export function QRGenerator({ courseId, courseName, teacherEmail, onGenerate }: QRGeneratorProps) {
  const [generatedQR, setGeneratedQR] = useState<any>(null)
  const [message, setMessage] = useState("")

  const handleGenerateQR = () => {
    try {
      const qrData = generateQRCode(courseId, courseName, teacherEmail)
      storeQRCode(qrData)
      setGeneratedQR(qrData)
      setMessage("QR Code generated successfully!")
      onGenerate?.(qrData.code)
    } catch (error) {
      setMessage("Error generating QR code")
      console.error(error)
    }
  }

  const handleDownload = () => {
    if (generatedQR) {
      downloadQRCode(generatedQR)
      setMessage("QR Code downloaded successfully!")
    }
  }

  const handleCopy = () => {
    if (generatedQR) {
      navigator.clipboard.writeText(generatedQR.code)
      setMessage("QR Code copied to clipboard!")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!generatedQR ? (
          <Button onClick={handleGenerateQR} className="w-full bg-green-600 hover:bg-green-700">
            Generate QR Code Now
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center">
              <div className="w-48 h-48 bg-white border-4 border-blue-600 rounded flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-600 break-all mb-2">{generatedQR.code}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(generatedQR.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Expires in: {getQRCodeExpirationMinutes(generatedQR.expiresAt)} minutes
              </p>
            </div>

            <div className="space-y-2">
              <Button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-700">
                Download QR Code
              </Button>
              <Button onClick={handleCopy} variant="outline" className="w-full bg-transparent">
                Copy Code
              </Button>
            </div>

            {message && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">{message}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
