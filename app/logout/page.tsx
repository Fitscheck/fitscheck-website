"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear auth token
    localStorage.removeItem("auth_token")

    // Show success toast
    toast.success("Logged out successfully")

    // Redirect to homepage
    setTimeout(() => {
      router.push("/")
    }, 1000)
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
