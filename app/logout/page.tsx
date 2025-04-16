"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate logout process
    setTimeout(() => {
      // In a real app, you would clear tokens, cookies, etc.
      console.log("User logged out")

      // Redirect to home page
      router.push("/")
    }, 500)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Logging out...</h1>
        <p className="mt-2 text-gray-500">Please wait while we log you out.</p>
      </div>
    </div>
  )
}
