"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"

export function AuthButtons() {
  // In a real app, you would check for authentication status from a context or API
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simulate checking auth status
  useEffect(() => {
    // Check if user is logged in (e.g., by checking for a token in localStorage)
    const checkAuth = () => {
      // This is just a placeholder. In a real app, you would check for a token or session
      const hasToken = localStorage.getItem("auth_token")
      setIsLoggedIn(!!hasToken)
    }

    checkAuth()

    // Set up an interval to check auth status periodically
    const interval = setInterval(checkAuth, 1000)

    // For demo purposes, let's add a way to toggle login state with a key combination
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") {
        setIsLoggedIn((prev) => {
          const newState = !prev
          if (newState) {
            localStorage.setItem("auth_token", "demo_token")
          } else {
            localStorage.removeItem("auth_token")
          }
          return newState
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [])

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/premium">Upgrade to Premium</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/logout">Log Out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <Link href="/login" className="">
        <Button variant="outline" size="sm">
          Log In
        </Button>
      </Link>
      <Link href="/" className="">
        <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
          Upgrade to Premium
        </Button>
      </Link>
    </div>
  )
}
