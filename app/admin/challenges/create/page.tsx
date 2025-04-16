"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CreateChallenge() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to admin dashboard would happen here
      window.location.href = "/admin"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/admin" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Create New Challenge</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
              <CardDescription>Create a new style challenge for users to participate in.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Challenge Title</Label>
                    <Input id="title" placeholder="e.g., Summer Vacation Fits" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the challenge and what participants should submit..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="hashtag">Challenge Hashtag</Label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-gray-500">
                        #
                      </span>
                      <Input id="hashtag" placeholder="SummerVacationFits" className="rounded-l-none" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <div className="relative">
                        <Input id="start-date" type="date" required />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <div className="relative">
                        <Input id="end-date" type="date" required />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="winner-selection">Winner Selection Method</Label>
                    <Select defaultValue="votes">
                      <SelectTrigger id="winner-selection">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="votes">Highest Votes</SelectItem>
                        <SelectItem value="manual">Manual Selection</SelectItem>
                        <SelectItem value="random">Random from Top 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="style-points">Style Points Reward</Label>
                    <div className="flex items-center gap-2">
                      <Input id="style-points" type="number" defaultValue="50" min="1" required />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" type="button">
                              <Info className="h-4 w-4 text-gray-500" />
                              <span className="sr-only">Style points info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Style points awarded to the winner(s) of the challenge.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="grid gap-1.5">
                      <Label htmlFor="premium-only">Premium Users Only</Label>
                      <p className="text-sm text-gray-500">Restrict this challenge to premium users only.</p>
                    </div>
                    <Switch id="premium-only" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="grid gap-1.5">
                      <Label htmlFor="featured">Featured Challenge</Label>
                      <p className="text-sm text-gray-500">Highlight this challenge on the home screen.</p>
                    </div>
                    <Switch id="featured" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Link href="/admin">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Challenge"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
