"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PremiumPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)

      // Set premium subscription in localStorage for demo purposes
      localStorage.setItem("premium_subscription", "active")

      // Redirect to account page instead of home
      router.push("/account")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
                <p className="mt-2 text-gray-500">Unlock all features and take your style game to the next level.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Unlimited Fit Posts</h3>
                    <p className="text-sm text-gray-500">Post as many outfits as you want, no more 5-post limit.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Affiliate Links</h3>
                    <p className="text-sm text-gray-500">
                      Add affiliate links to your posts and earn commission on purchases.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Unlimited Challenge Entries</h3>
                    <p className="text-sm text-gray-500">
                      Join as many challenges as you want, no more 2-challenge limit.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Badge</h3>
                    <p className="text-sm text-gray-500">Stand out with a premium badge on your profile and posts.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Free vs Premium</h3>
                    <p className="text-sm text-gray-500">See what you're missing out on</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Comparison
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-3 items-center rounded-lg bg-white p-3">
                    <div className="text-sm">Fit Posts</div>
                    <div className="text-center text-sm">5 max</div>
                    <div className="text-center text-sm font-medium text-pink-500">Unlimited</div>
                  </div>

                  <div className="grid grid-cols-3 items-center rounded-lg bg-white p-3">
                    <div className="text-sm">Challenge Entries</div>
                    <div className="text-center text-sm">2 max</div>
                    <div className="text-center text-sm font-medium text-pink-500">Unlimited</div>
                  </div>

                  <div className="grid grid-cols-3 items-center rounded-lg bg-white p-3">
                    <div className="text-sm">Affiliate Links</div>
                    <div className="text-center text-sm">❌</div>
                    <div className="text-center text-sm font-medium text-pink-500">✅</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>Select a billing cycle and enter your payment details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Billing Cycle</Label>
                        <div className="flex rounded-lg border p-1">
                          <button
                            type="button"
                            className={`flex-1 rounded-md px-3 py-2 text-center text-sm ${
                              billingCycle === "monthly" ? "bg-pink-500 text-white" : "text-gray-500 hover:bg-gray-100"
                            }`}
                            onClick={() => setBillingCycle("monthly")}
                          >
                            Monthly
                            <div className="mt-1 text-xs">
                              {billingCycle === "monthly" ? "Current plan" : "$4.99/month"}
                            </div>
                          </button>
                          <button
                            type="button"
                            className={`flex-1 rounded-md px-3 py-2 text-center text-sm ${
                              billingCycle === "annual" ? "bg-pink-500 text-white" : "text-gray-500 hover:bg-gray-100"
                            }`}
                            onClick={() => setBillingCycle("annual")}
                          >
                            Annual
                            <div className="mt-1 text-xs">
                              {billingCycle === "annual" ? "Current plan" : "$49.99/year (save 16%)"}
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                          <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <Label htmlFor="cvc">CVC</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" type="button" className="h-4 w-4 p-0">
                                    <Info className="h-3 w-3 text-gray-500" />
                                    <span className="sr-only">CVC info</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">The 3-digit security code on the back of your card.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Smith" required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex justify-between">
                          <span>Premium Plan ({billingCycle === "monthly" ? "Monthly" : "Annual"})</span>
                          <span>{billingCycle === "monthly" ? "$4.99" : "$49.99"}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {billingCycle === "monthly"
                            ? "You'll be charged $4.99 today and on a monthly basis until you cancel."
                            : "You'll be charged $49.99 today and annually until you cancel."}
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isProcessing}>
                        {isProcessing
                          ? "Processing..."
                          : `Subscribe for ${billingCycle === "monthly" ? "$4.99/month" : "$49.99/year"}`}
                      </Button>

                      <p className="text-center text-xs text-gray-500">
                        By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel anytime
                        from your account settings.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
