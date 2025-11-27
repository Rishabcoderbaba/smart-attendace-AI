"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeesPage() {
  const [fees] = useState([
    {
      id: 1,
      title: "Tuition Fee - Semester 1",
      amount: 50000,
      dueDate: "2025-12-31",
      paidDate: null,
      status: "pending",
    },
    {
      id: 2,
      title: "Tuition Fee - Semester 2",
      amount: 50000,
      dueDate: "2026-05-31",
      paidDate: null,
      status: "pending",
    },
    {
      id: 3,
      title: "Lab Fee",
      amount: 5000,
      dueDate: "2025-12-15",
      paidDate: "2025-12-10",
      status: "paid",
    },
    {
      id: 4,
      title: "Library Fee",
      amount: 2000,
      dueDate: "2025-12-20",
      paidDate: null,
      status: "overdue",
    },
  ])

  const totalPending = fees.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount, 0)
  const totalPaid = fees.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0)
  const totalOverdue = fees.filter((f) => f.status === "overdue").reduce((sum, f) => sum + f.amount, 0)

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    }
    return styles[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fees & Payments</h1>
          <p className="text-gray-600 mt-2">Manage your tuition and college fees</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">₹{totalOverdue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Fees Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => (
                    <tr key={fee.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-medium">{fee.title}</td>
                      <td className="py-4 px-4 text-gray-900">₹{fee.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-600">{fee.dueDate}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(fee.status)}`}
                        >
                          {fee.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {fee.status !== "paid" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Pay Now
                          </Button>
                        )}
                        {fee.status === "paid" && (
                          <Button size="sm" variant="outline">
                            Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Accepted Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <p className="font-semibold text-gray-900">💳 Credit/Debit Card</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <p className="font-semibold text-gray-900">💰 Bank Transfer</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <p className="font-semibold text-gray-900">📱 UPI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Link href="/student/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
