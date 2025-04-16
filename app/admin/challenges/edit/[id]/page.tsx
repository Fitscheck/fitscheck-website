"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
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
    hashtag: "SummerVacationFits",
    winnerSelection: "votes",
    stylePoints: 50,
    premiumOnly: false,
    featured: true,
  },
  {
    id: 2,
    title: "Office Chic",
    status: "Active",
    entries: 87,
    startDate: "2023-06-05",
    endDate: "2023-06-20",
    description: "Business casual or formal - what's your office style?",
    hashtag: "OfficeChic",
    winnerSelection: "manual",
    stylePoints: 40,
    premiumOnly: false,
    featured: false,
  },
  {
    id: 3,
    title: "Festival Fashion",
    status: "Upcoming",
    entries: 0,
    startDate: "2023-06-25",
    endDate: "2023-07-10",
    description: "Get ready for festival season with your most creative looks!",
    hashtag: "FestivalFashion",
    winnerSelection: "random",
    stylePoints: 60,
    premiumOnly: true,
    featured: true,
  },
  {
    id: 4,
    title: "Vintage Vibes",
    status: "Completed",
    entries: 156,
    startDate: "2023-05-10",
    endDate: "2023-05-25",
    description: "Throwback styles from any era - show us your vintage inspiration!",
    hashtag: "VintageVibes",
    winnerSelection: "votes",
    stylePoints: 45,
    premiumOnly: false,
    featured: true,
  },
  {
    id: 5,
    title: "Monochrome Magic",
    status: "Completed",
    entries: 92,
    startDate: "2023-05-01",
    endDate: "2023-05-15",
    description: "One color, head to toe - show us your best monochromatic outfit!",
    hashtag: "MonochromeMagic",
    winnerSelection: "votes",
    stylePoints: 35,
    premiumOnly: false,
    featured: false,
  },
]

export default function EditChallenge() {
  const router = useRouter()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [challenge, setChallenge] = useState<(typeof challenges)[0] | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtag: "",
    startDate: "",
    endDate: "",
    winnerSelection: "votes",
    stylePoints: 50,
    premiumOnly: false,
    featured: false,
  })

  useEffect(() => {
    // In a real app, you would fetch the challenge data from an API
    const id = Number(params.id)
    const foundChallenge = challenges.find((c) => c.id === id)

    if (foundChallenge) {
      setChallenge(foundChallenge)
      setFormData({
        title: foundChallenge.title,
        description: foundChallenge.description,
        hashtag: foundChallenge.hashtag,
        startDate: foundChallenge.startDate,
        endDate: foundChallenge.endDate,
        winnerSelection: foundChallenge.winnerSelection,
        stylePoints: foundChallenge.stylePoints,
        premiumOnly: foundChallenge.premiumOnly,
        featured: foundChallenge.featured,
      })
    } else {
      // Handle challenge not found
      router.push("/admin")
    }
  }, [params.id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // In a real app, you would update the challenge in the database
      alert("Challenge updated successfully!")
      router.push("/admin")
    }, 1500)
  }

  if (!challenge) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex-1 flex items-center justify-center">
          <p>Loading challenge...</p>
        </div>
        <Footer />
      </div>
    )
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
            <h1 className="text-2xl font-bold tracking-tight">Edit Challenge</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
              <CardDescription>Edit the details for "{challenge.title}"</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Challenge Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Summer Vacation Fits"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                      <Input
                        id="hashtag"
                        name="hashtag"
                        value={formData.hashtag}
                        onChange={handleChange}
                        placeholder="SummerVacationFits"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <div className="relative">
                        <Input
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          type="date"
                          required
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <div className="relative">
                        <Input
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          type="date"
                          required
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="winnerSelection">Winner Selection Method</Label>
                    <Select
                      value={formData.winnerSelection}
                      onValueChange={(value) => handleSelectChange("winnerSelection", value)}
                    >
                      <SelectTrigger id="winnerSelection">
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
                    <Label htmlFor="stylePoints">Style Points Reward</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="stylePoints"
                        name="stylePoints"
                        value={formData.stylePoints}
                        onChange={(e) =>
                          handleChange({
                            ...e,
                            target: {
                              ...e.target,
                              value: e.target.value.replace(/\D/g, ""),
                            },
                          })
                        }
                        type="number"
                        min="1"
                        required
                      />
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
                      <Label htmlFor="premiumOnly">Premium Users Only</Label>
                      <p className="text-sm text-gray-500">Restrict this challenge to premium users only.</p>
                    </div>
                    <Switch
                      id="premiumOnly"
                      checked={formData.premiumOnly}
                      onCheckedChange={(checked) => handleSwitchChange("premiumOnly", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="grid gap-1.5">
                      <Label htmlFor="featured">Featured Challenge</Label>
                      <p className="text-sm text-gray-500">Highlight this challenge on the home screen.</p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Link href="/admin">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
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
