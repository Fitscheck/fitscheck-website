"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    setIsAuthenticated(!!token)
    setIsLoading(false)

    const handleStorageChange = () => {
      const token = localStorage.getItem("auth_token")
      setIsAuthenticated(!!token)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const logout = async () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("premium_subscription")
    setIsAuthenticated(false)
    router.push("/") // ✅ ensures redirect after logout
  }

  return { isAuthenticated, isLoading, logout }
}
