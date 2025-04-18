"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const user = localStorage.getItem("user") // assume this contains { _id, username, email }
    const parsed = user ? JSON.parse(user) : null

    setIsAuthenticated(!!token)
    setUserId(parsed?._id || null)
    setIsLoading(false)

    const handleStorageChange = () => {
      const user = localStorage.getItem("user")
      setUserId(user ? JSON.parse(user)?._id : null)
      setIsAuthenticated(!!localStorage.getItem("auth_token"))    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const logout = async () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    localStorage.removeItem("premium_subscription")
    setIsAuthenticated(false)
    router.push("/") // ✅ ensures redirect after logout
  }

  return { isAuthenticated, isLoading, logout, userId }
}
