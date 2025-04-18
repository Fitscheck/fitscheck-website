"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth({ redirectTo }: { redirectTo?: string } = {}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const authed = !!token
    setIsAuthenticated(authed)
    setLoading(false)

    if (!authed && redirectTo) {
      router.replace(redirectTo)
    }
  }, [redirectTo, router])

  return { isAuthenticated, loading }
}
