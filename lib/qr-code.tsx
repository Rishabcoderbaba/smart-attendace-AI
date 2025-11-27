"use client"

export interface QRCodeData {
  code: string
  courseId: string
  courseName: string
  timestamp: number
  expiresAt: number
  createdBy: string
}

export interface QRScanResult {
  success: boolean
  data?: QRCodeData
  message: string
}

// Generate unique QR code
export function generateQRCode(courseId: string, courseName: string, teacherEmail: string): QRCodeData {
  const timestamp = Date.now()
  const expiresAt = timestamp + 60 * 60 * 1000 // Expires in 1 hour

  const code = `QR_${courseId}_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return {
    code,
    courseId,
    courseName,
    timestamp,
    expiresAt,
    createdBy: teacherEmail,
  }
}

// Store QR code in localStorage
export function storeQRCode(qrData: QRCodeData): boolean {
  try {
    const stored = localStorage.getItem("qr_codes")
    const codes = stored ? JSON.parse(stored) : []
    codes.push(qrData)
    localStorage.setItem("qr_codes", JSON.stringify(codes))
    return true
  } catch (error) {
    console.error("Error storing QR code:", error)
    return false
  }
}

// Validate and retrieve QR code
export function validateQRCode(code: string): QRScanResult {
  try {
    const stored = localStorage.getItem("qr_codes")
    if (!stored) {
      return { success: false, message: "No QR codes found" }
    }

    const codes: QRCodeData[] = JSON.parse(stored)
    const qrData = codes.find((c) => c.code === code)

    if (!qrData) {
      return { success: false, message: "QR code not found" }
    }

    const now = Date.now()
    if (now > qrData.expiresAt) {
      return { success: false, message: "QR code has expired" }
    }

    return {
      success: true,
      data: qrData,
      message: "QR code validated successfully",
    }
  } catch (error) {
    console.error("Error validating QR code:", error)
    return { success: false, message: "Error validating QR code" }
  }
}

// Record attendance from QR code scan
export function recordAttendanceFromQR(studentId: string, qrData: QRCodeData): boolean {
  try {
    const attendance = {
      studentId,
      courseId: qrData.courseId,
      courseName: qrData.courseName,
      scannedAt: new Date().toISOString(),
      qrCode: qrData.code,
      method: "QR_CODE",
    }

    const stored = localStorage.getItem("attendance_records")
    const records = stored ? JSON.parse(stored) : []
    records.push(attendance)
    localStorage.setItem("attendance_records", JSON.stringify(records))
    return true
  } catch (error) {
    console.error("Error recording attendance:", error)
    return false
  }
}

// Generate QR code image as SVG
export function generateQRCodeSVG(text: string, size = 200): string {
  // Simple SVG representation - in production, use a library like qrcode.react
  const padding = 20
  const moduleCount = Math.ceil(text.length / 2) + 4

  let svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="${size}" height="${size}" fill="white"/>`

  // Create a simple pattern based on the text
  for (let i = 0; i < text.length; i++) {
    const x = (i % 10) * (size / 10)
    const y = Math.floor(i / 10) * (size / 10)
    const charCode = text.charCodeAt(i)
    const fill = charCode % 2 === 0 ? "black" : "white"
    svg += `<rect x="${x}" y="${y}" width="${size / 10}" height="${size / 10}" fill="${fill}"/>`
  }

  svg += `</svg>`
  return svg
}

// Download QR code as image
export function downloadQRCode(qrData: QRCodeData): void {
  try {
    const svg = generateQRCodeSVG(qrData.code)
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `qr_code_${qrData.courseId}_${new Date().getTime()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloading QR code:", error)
  }
}

// Get active QR code for a course
export function getActiveQRCode(courseId: string): QRCodeData | null {
  try {
    const stored = localStorage.getItem("qr_codes")
    if (!stored) return null

    const codes: QRCodeData[] = JSON.parse(stored)
    const now = Date.now()

    const activeCode = codes.find((c) => c.courseId === courseId && c.expiresAt > now)

    return activeCode || null
  } catch (error) {
    console.error("Error getting active QR code:", error)
    return null
  }
}

// Get expiration time in minutes
export function getQRCodeExpirationMinutes(expiresAt: number): number {
  const now = Date.now()
  const minutesLeft = Math.ceil((expiresAt - now) / (1000 * 60))
  return Math.max(0, minutesLeft)
}
