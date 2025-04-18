"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { logout } from "@/lib/auth"

export function AuthButtons() {
  const { isAuthenticated: isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/")
    } catch {
      toast.error("Logout failed")
    } finally {
      setIsLoggingOut(false)
    }
  }

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
            <Link href="/account" className="w-full px-2 py-1.5 text-sm hover:text-pink-600">
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/premium" className="w-full px-2 py-1.5 text-sm hover:text-pink-600">
              Upgrade to Premium
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="cursor-pointer w-full px-2 py-1.5 text-sm hover:text-red-500"
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
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
      <Link href="/login">
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
