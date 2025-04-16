"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, ChevronDown, Filter, LayoutGrid, List, Plus, Search, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Sample data for challenges
const challenges = [
  {
    id: 1,
    title: "Summer Vacation Fits",
    status: "Active",
    entries: 124,
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    description: "Show off your best vacation outfits for the summer season!",
  },
  {
    id: 2,
    title: "Office Chic",
    status: "Active",
    entries: 87,
    startDate: "2023-06-05",
    endDate: "2023-06-20",
    description: "Business casual or formal - what's your office style?",
  },
  {
    id: 3,
    title: "Festival Fashion",
    status: "Upcoming",
    entries: 0,
    startDate: "2023-06-25",
    endDate: "2023-07-10",
    description: "Get ready for festival season with your most creative looks!",
  },
  {
    id: 4,
    title: "Vintage Vibes",
    status: "Completed",
    entries: 156,
    startDate: "2023-05-10",
    endDate: "2023-05-25",
    description: "Throwback styles from any era - show us your vintage inspiration!",
  },
  {
    id: 5,
    title: "Monochrome Magic",
    status: "Completed",
    entries: 92,
    startDate: "2023-05-01",
    endDate: "2023-05-15",
    description: "One color, head to toe - show us your best monochromatic outfit!",
  },
]

export default function AdminDashboard() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Filter challenges based on search query and status filter
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? challenge.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500">Manage challenges, users, and app content</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,546</div>
                <p className="text-xs text-gray-500">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
                <Trophy className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">2 ending this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-gray-500">22.6% conversion rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="challenges" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="challenges" className="relative">
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Date Range</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  {view === "grid" ? (
                    <List className="h-3.5 w-3.5" onClick={() => setView("list")} />
                  ) : (
                    <LayoutGrid className="h-3.5 w-3.5" onClick={() => setView("grid")} />
                  )}
                  <span className="sr-only">Toggle view</span>
                </Button>
              </div>
            </div>

            <TabsContent value="challenges" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search challenges..."
                    className="h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Status</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Upcoming")}>Upcoming</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/admin/challenges/create">
                    <Button size="sm" className="h-9 bg-pink-500 hover:bg-pink-600">
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      New Challenge
                    </Button>
                  </Link>
                </div>
              </div>

              {view === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredChallenges.map((challenge) => (
                    <Card key={challenge.id} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              challenge.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : challenge.status === "Upcoming"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {challenge.status}
                          </span>
                        </div>
                        <CardDescription className="line-clamp-2 mt-2">{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="font-medium">{new Date(challenge.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">{new Date(challenge.endDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Entries</p>
                            <p className="font-medium">{challenge.entries}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50 p-4">
                        <div className="flex w-full justify-between">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border">
                  <div className="grid grid-cols-6 border-b bg-gray-50 p-4 font-medium">
                    <div className="col-span-2">Challenge</div>
                    <div className="text-center">Status</div>
                    <div className="text-center">Entries</div>
                    <div className="text-center">Dates</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {filteredChallenges.map((challenge) => (
                    <div key={challenge.id} className="grid grid-cols-6 items-center border-b p-4 last:border-0">
                      <div className="col-span-2">
                        <div className="font-medium">{challenge.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{challenge.description}</div>
                      </div>
                      <div className="text-center">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            challenge.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : challenge.status === "Upcoming"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {challenge.status}
                        </span>
                      </div>
                      <div className="text-center">{challenge.entries}</div>
                      <div className="text-center text-sm">
                        {new Date(challenge.startDate).toLocaleDateString()} -{" "}
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-10 w-10 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">User Management</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View and manage user accounts, permissions, and activity.
                  </p>
                  <Button className="mt-4 bg-pink-500 hover:bg-pink-600">View Users</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-10 w-10 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Analytics & Reports</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Access detailed analytics and generate reports on app usage and engagement.
                  </p>
                  <Button className="mt-4 bg-pink-500 hover:bg-pink-600">View Reports</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
