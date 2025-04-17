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
      <div className="container flex h-16 items-center px-4 md:px-6 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-pink-500">FitsCheck</span>
        </Link>
        <nav className="gap-6 hidden md:flex items-center">

          <Link
            href="/"
            className={`text-sm font-medium ${isActive("/") ? "text-pink-500" : "text-gray-700 hover:text-gray-900"}`}
          >
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Pricing
          </Link>
          {/* <Link
            href="/admin"
            className={`text-sm font-medium ${isActive("/admin") ? "text-pink-500" : "text-gray-700 hover:text-gray-900"}`}
          >
            Admin
          </Link> */}
        </nav>
        {/* Replace the login/premium buttons with the AuthButtons component */}
        <div className="ml-auto flex items-center gap-6 md:ml-0">
          <div className="hidden md:block gap-6">
            <AuthButtons />
          </div>
          <div className="flex items-center justify-center md:hidden h-10 w-10 rounded-xl  hover:bg-gray-100 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            <span className="sr-only">Toggle menu</span>
          </div>
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
            <AuthButtons />
          </nav>
        </div>
      )}
    </header>
  )
}
