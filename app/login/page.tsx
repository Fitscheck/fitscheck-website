"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { requestMagicCode, verifyMagicCode } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSendingCode(true)

    try {
      await requestMagicCode(email)
      setIsCodeSent(true)
    } catch (err: any) {
      setError(err.message || "Failed to send code")
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("") // clear old errors
  
    try {
      const res = await verifyMagicCode(email, code)
      localStorage.setItem("auth_token", res.token)
      router.push("/account")
    } catch (err: any) {
      const message = err?.response?.data?.error || "Something went wrong"
      setError(message) // ✅ show error
    } finally {
      setIsVerifying(false)
    }
  }
  
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to FitsCheck</h1>
            <p className="text-gray-500">Enter your email to continue</p>
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <div className="w-full">
            {!isCodeSent ? (
              <form onSubmit={handleSendCode} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isSendingCode}>
                  {isSendingCode ? "Sending..." : "Continue with Email"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Enter the 6-digit code sent to {email}</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="text-center text-xl tracking-widest"
                  />
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify Code"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gray-500"
                  onClick={() => setIsCodeSent(false)}
                >
                  Back to email
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
