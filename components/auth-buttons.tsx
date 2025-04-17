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
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const hasToken = localStorage.getItem("auth_token")
      setIsLoggedIn(!!hasToken)
    }

    checkAuth()
    const interval = setInterval(checkAuth, 1000)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") {
        setIsLoggedIn((prev) => {
          const newState = !prev
          newState
            ? localStorage.setItem("auth_token", "demo_token")
            : localStorage.removeItem("auth_token")
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
          <Button
            variant="outline"
            size="sm"
            className="gap-2 px-3 text-sm font-medium text-gray-700 hover:border-pink-500 hover:text-pink-600"
          >
            <User className="h-4 w-4" />
            Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl shadow-lg border border-gray-100 animate-fadeIn">
          <DropdownMenuItem asChild>
            <Link href="/account" className="w-full px-2 py-1.5 text-sm hover:text-pink-600">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/premium" className="w-full px-2 py-1.5 text-sm hover:text-pink-600">Upgrade to Premium</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/logout" className="w-full px-2 py-1.5 text-sm hover:text-red-500">Log Out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <Link href="/login">
        <Button variant="outline" size="sm" className="text-sm hover:border-pink-500 hover:text-pink-600">
          Log In
        </Button>
      </Link>
      <Link href="/premium">
        <Button
          size="sm"
          className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4"
        >
          Upgrade to Premium
        </Button>
      </Link>
    </div>
  )
}
