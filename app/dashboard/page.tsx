"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Filter,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Sample data for posts
const posts = [
  {
    id: 1,
    user: {
      name: "Jessica Parker",
      username: "jess_style",
      avatar: "/placeholder.svg?height=40&width=40&query=woman fashion profile",
    },
    image:
      "/placeholder.svg?height=600&width=400&query=woman in summer dress outfit",
    title: "Summer Vibes",
    description: "My go-to outfit for beach days! What do you think?",
    likes: 128,
    comments: 24,
    tags: ["summer", "beach", "casual"],
  },
  {
    id: 2,
    user: {
      name: "Marcus Chen",
      username: "marcus_fits",
      avatar: "/placeholder.svg?height=40&width=40&query=man fashion profile",
    },
    image:
      "/placeholder.svg?height=600&width=400&query=man in business casual outfit",
    title: "Office Ready",
    description: "Business casual for a big meeting today. Feeling confident!",
    likes: 95,
    comments: 18,
    tags: ["office", "business", "formal"],
  },
  {
    id: 3,
    user: {
      name: "Zoe Williams",
      username: "zoe_style",
      avatar:
        "/placeholder.svg?height=40&width=40&query=woman fashion profile with short hair",
    },
    image:
      "/placeholder.svg?height=600&width=400&query=woman in streetwear outfit",
    title: "Street Style",
    description: "Trying out a new streetwear look. Thoughts?",
    likes: 210,
    comments: 42,
    tags: ["streetwear", "urban", "casual"],
  },
];

// Sample data for challenges
const challenges = [
  {
    id: 1,
    title: "Summer Vacation Fits",
    entries: 124,
    daysLeft: 5,
    image:
      "/placeholder.svg?height=200&width=200&query=summer vacation outfits collage",
  },
  {
    id: 2,
    title: "Office Chic",
    entries: 87,
    daysLeft: 10,
    image:
      "/placeholder.svg?height=200&width=200&query=office professional outfits collage",
  },
  {
    id: 3,
    title: "Festival Fashion",
    entries: 56,
    daysLeft: 15,
    image:
      "/placeholder.svg?height=200&width=200&query=music festival fashion outfits collage",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40&query=fashion profile"
                        alt="@username"
                      />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Username</div>
                      <div className="text-sm text-gray-500">@username</div>
                    </div>
                  </div>
                  <Badge className="bg-pink-500 hover:bg-pink-600">
                    Premium
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-medium">125</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div>
                      <div className="font-medium">1.2k</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="font-medium">348</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-sm font-medium">Style Points</div>
                      <div className="text-2xl font-bold text-pink-500">
                        2,456
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Rank</div>
                      <div className="text-2xl font-bold">#42</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="font-medium">Active Challenges</div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-12 w-12 overflow-hidden rounded-md">
                          <Image
                            src={challenge.image || "/placeholder.svg"}
                            alt={challenge.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium line-clamp-1">
                            {challenge.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{challenge.entries} entries</span>
                            <span>•</span>
                            <span>{challenge.daysLeft} days left</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">
                    View All Challenges
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <Tabs
              defaultValue="feed"
              className="space-y-6"
              onValueChange={setActiveTab}
            >
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="discover">Discover</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                  <Button className="h-9 gap-1 bg-pink-500 hover:bg-pink-600">
                    <Plus className="h-4 w-4" />
                    <span>New Post</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search posts, users, or tags..."
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>

              <TabsContent value="feed" className="space-y-6 mt-0">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={post.user.avatar || "/placeholder.svg"}
                            alt={post.user.name}
                          />
                          <AvatarFallback>
                            {post.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.user.name}</div>
                          <div className="text-sm text-gray-500">
                            @{post.user.username}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Save</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Not interested</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-4">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Like</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span className="sr-only">Comment</span>
                          </Button>
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.likes} likes • {post.comments} comments
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="font-medium">{post.title}</div>
                        <p className="mt-1 text-sm text-gray-500">
                          {post.description}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="discover" className="mt-0">
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center text-center">
                    <Search className="h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">
                      Discover New Fits
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Find trending outfits and popular users.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="following" className="mt-0">
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center text-center">
                    <User className="h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">Following Feed</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      See posts from users you follow.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader className="p-4">
                  <div className="font-medium">Leaderboard</div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                          {i}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&query=fashion profile ${i}`}
                            alt={`User ${i}`}
                          />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">User{i}</div>
                          <div className="text-xs text-gray-500">@user{i}</div>
                        </div>
                        <div className="text-sm font-medium">
                          {10000 - i * 500}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full">
                    View Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="font-medium">Suggested Users</div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&query=fashion profile suggested ${i}`}
                            alt={`Suggested User ${i}`}
                          />
                          <AvatarFallback>S{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            SuggestedUser{i}
                          </div>
                          <div className="text-xs text-gray-500">
                            @suggested{i}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="font-medium">Trending Tags</div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "summer",
                      "casual",
                      "streetwear",
                      "formal",
                      "vintage",
                      "minimalist",
                      "colorful",
                      "accessories",
                      "shoes",
                      "denim",
                    ].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
