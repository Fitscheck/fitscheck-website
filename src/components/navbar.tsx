"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

// Import the AuthButtons component
import { AuthButtons } from "@/components/auth-buttons"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-pink-500">FitsCheck</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium ${isActive("/") ? "text-pink-500" : "text-gray-500 hover:text-gray-900"}`}
          >
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Pricing
          </Link>
          <Link
            href="/admin"
            className={`text-sm font-medium ${isActive("/admin") ? "text-pink-500" : "text-gray-500 hover:text-gray-900"}`}
          >
            Admin
          </Link>
        </nav>
        {/* Replace the login/premium buttons with the AuthButtons component */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <AuthButtons />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              className={`text-sm font-medium ${isActive("/") ? "text-pink-500" : "text-gray-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium text-gray-500" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-500" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link
              href="/admin"
              className={`text-sm font-medium ${isActive("/admin") ? "text-pink-500" : "text-gray-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-500" onClick={() => setIsMenuOpen(false)}>
              Log In
            </Link>
            <Link href="/premium" className="text-sm font-medium text-gray-500" onClick={() => setIsMenuOpen(false)}>
              Upgrade to Premium
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
