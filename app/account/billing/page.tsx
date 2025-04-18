"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Calendar, CheckCircle, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Sample billing history data
const invoices = [
  {
    id: "INV-001",
    date: "May 15, 2023",
    amount: "$4.99",
    status: "Paid",
    description: "Monthly Premium Subscription",
  },
  {
    id: "INV-002",
    date: "April 15, 2023",
    amount: "$4.99",
    status: "Paid",
    description: "Monthly Premium Subscription",
  },
  {
    id: "INV-003",
    date: "March 15, 2023",
    amount: "$4.99",
    status: "Paid",
    description: "Monthly Premium Subscription",
  },
  {
    id: "INV-004",
    date: "February 15, 2023",
    amount: "$4.99",
    status: "Paid",
    description: "Monthly Premium Subscription",
  },
  {
    id: "INV-005",
    date: "January 15, 2023",
    amount: "$4.99",
    status: "Paid",
    description: "Monthly Premium Subscription",
  },
]

export default function BillingHistoryPage() {
  const router = useRouter()

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real app, this would trigger a download of the invoice PDF
    alert(`Downloading invoice ${invoiceId}...`)
  }

  const handleManagePaymentMethods = () => {
    // In a real app, this would redirect to Stripe Customer Portal
    alert("This would redirect to Stripe Customer Portal in a real application.")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/account" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Billing History</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Invoices</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {invoice.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                              className="h-8 gap-1"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Next Billing Date</h3>
                      <p className="text-sm text-gray-500">Your next payment will be processed on June 15, 2023</p>
                    </div>
                    <div className="rounded-full bg-pink-100 p-2">
                      <Calendar className="h-5 w-5 text-pink-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
                <CardDescription>Overview of your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Current Plan</span>
                    <span>Monthly Premium ($4.99/month)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Billing Cycle</span>
                    <span>Monthly (15th of each month)</span>
                  </div>
                  {/* <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Payment Method</span>
                    <span>Visa ending in 4242</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="font-medium">Subscription Start Date</span>
                    <span>January 15, 2023</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => router.push("/premium")}>
                    Change Plan
                  </Button>
                  {/* <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleManagePaymentMethods}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Manage Payment Methods
                  </Button> */}
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      if (confirm("Are you sure you want to cancel your subscription?")) {
                        alert("Your subscription has been canceled.")
                        router.push("/account")
                      }
                    }}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
