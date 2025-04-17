"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Search,
  Trophy,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  const router = useRouter()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedChallenge, setSelectedChallenge] = useState<(typeof challenges)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filter challenges based on search query and status filter
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? challenge.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (challenge: (typeof challenges)[0]) => {
    setSelectedChallenge(challenge)
    setIsDetailsOpen(true)
  }

  const handleEdit = (challenge: (typeof challenges)[0]) => {
    // In a real app, this would navigate to an edit page with the challenge ID
    router.push(`/admin/challenges/edit/${challenge.id}`)
  }

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

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/admin/challenges/create">
              <Card className="hover:bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Trophy className="mb-2 h-8 w-8 text-pink-500" />
                  <p className="text-center font-medium">New Challenge</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/subscriptions">
              <Card className="hover:bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CreditCard className="mb-2 h-8 w-8 text-pink-500" />
                  <p className="text-center font-medium">Manage Subscriptions</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/users">
              <Card className="hover:bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Users className="mb-2 h-8 w-8 text-pink-500" />
                  <p className="text-center font-medium">User Management</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/reports">
              <Card className="hover:bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BarChart3 className="mb-2 h-8 w-8 text-pink-500" />
                  <p className="text-center font-medium">View Reports</p>
                </CardContent>
              </Card>
            </Link>
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
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(challenge)}>
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(challenge)}>
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
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(challenge)}>
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(challenge)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="h-9" />
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
                      <DropdownMenuItem>All Users</DropdownMenuItem>
                      <DropdownMenuItem>Premium Users</DropdownMenuItem>
                      <DropdownMenuItem>Free Users</DropdownMenuItem>
                      <DropdownMenuItem>New Users</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" className="h-9 bg-pink-500 hover:bg-pink-600">
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add User
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="grid grid-cols-7 border-b bg-gray-50 p-4 font-medium">
                  <div className="col-span-2">User</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Joined</div>
                  <div className="text-center">Posts</div>
                  <div className="text-center">Points</div>
                  <div className="text-right">Actions</div>
                </div>

                {/* User 1 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="font-medium text-pink-500">SL</span>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Lee</div>
                      <div className="text-sm text-gray-500">sarah.lee@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Premium
                    </span>
                  </div>
                  <div className="text-center text-sm">Jan 15, 2023</div>
                  <div className="text-center">42</div>
                  <div className="text-center">1,250</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 2 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-500">JD</span>
                    </div>
                    <div>
                      <div className="font-medium">James Davis</div>
                      <div className="text-sm text-gray-500">james.davis@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">Free</span>
                  </div>
                  <div className="text-center text-sm">Mar 22, 2023</div>
                  <div className="text-center">18</div>
                  <div className="text-center">430</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 3 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="font-medium text-purple-500">EW</span>
                    </div>
                    <div>
                      <div className="font-medium">Emma Wilson</div>
                      <div className="text-sm text-gray-500">emma.wilson@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Premium
                    </span>
                  </div>
                  <div className="text-center text-sm">Feb 8, 2023</div>
                  <div className="text-center">67</div>
                  <div className="text-center">2,140</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 4 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="font-medium text-orange-500">MJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Michael Johnson</div>
                      <div className="text-sm text-gray-500">michael.j@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">New</span>
                  </div>
                  <div className="text-center text-sm">Apr 3, 2023</div>
                  <div className="text-center">5</div>
                  <div className="text-center">120</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 5 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="font-medium text-green-500">OT</span>
                    </div>
                    <div>
                      <div className="font-medium">Olivia Thompson</div>
                      <div className="text-sm text-gray-500">olivia.t@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">Free</span>
                  </div>
                  <div className="text-center text-sm">Jan 30, 2023</div>
                  <div className="text-center">24</div>
                  <div className="text-center">680</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 6 */}
                <div className="grid grid-cols-7 items-center border-b p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="font-medium text-red-500">RB</span>
                    </div>
                    <div>
                      <div className="font-medium">Ryan Brown</div>
                      <div className="text-sm text-gray-500">ryan.brown@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Premium
                    </span>
                  </div>
                  <div className="text-center text-sm">Dec 12, 2022</div>
                  <div className="text-center">93</div>
                  <div className="text-center">3,450</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* User 7 */}
                <div className="grid grid-cols-7 items-center p-4">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="font-medium text-teal-500">SM</span>
                    </div>
                    <div>
                      <div className="font-medium">Sophia Martinez</div>
                      <div className="text-sm text-gray-500">sophia.m@example.com</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">Free</span>
                  </div>
                  <div className="text-center text-sm">Feb 18, 2023</div>
                  <div className="text-center">31</div>
                  <div className="text-center">890</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Showing 7 of 12,546 users</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
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

      {/* Challenge Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedChallenge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedChallenge.title}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      selectedChallenge.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : selectedChallenge.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {selectedChallenge.status}
                  </span>
                </DialogTitle>
                <DialogDescription>{selectedChallenge.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Start Date</h3>
                    <p>{new Date(selectedChallenge.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">End Date</h3>
                    <p>{new Date(selectedChallenge.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500">Entries</h3>
                  <p>{selectedChallenge.entries} submissions</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-500">Participation</h3>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{ width: `${Math.min(selectedChallenge.entries / 2, 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedChallenge.status === "Completed"
                      ? "Final participation rate"
                      : "Current participation rate"}
                  </p>
                </div>

                {selectedChallenge.status === "Active" && (
                  <div>
                    <h3 className="font-medium text-gray-500">Time Remaining</h3>
                    <p>
                      {Math.max(
                        0,
                        Math.ceil(
                          (new Date(selectedChallenge.endDate).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        ),
                      )}{" "}
                      days
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <Button
                  className="bg-pink-500 hover:bg-pink-600"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    handleEdit(selectedChallenge)
                  }}
                >
                  Edit Challenge
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
