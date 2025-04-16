"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, CreditCard, LogOut, Settings, User, Shield, ChevronRight, CheckCircle2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AccountPage() {
  const router = useRouter()
  const [isPremium, setIsPremium] = useState(false)

  // Simulate checking subscription status
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const checkSubscription = () => {
      const hasPremium = localStorage.getItem("premium_subscription")
      setIsPremium(!!hasPremium)
    }

    checkSubscription()

    // For demo purposes, let's add a way to toggle premium status with a key combination
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        setIsPremium((prev) => {
          const newState = !prev
          if (newState) {
            localStorage.setItem("premium_subscription", "active")
          } else {
            localStorage.removeItem("premium_subscription")
          }
          return newState
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleLogout = () => {
    // In a real app, you would clear tokens, cookies, etc.
    localStorage.removeItem("auth_token")
    localStorage.removeItem("premium_subscription")

    // Redirect to home page
    router.push("/logout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-500">Manage your account settings and subscription</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <User className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>john.doe@example.com</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    onClick={() => document.querySelector('[data-value="subscription"]')?.click()}
                    className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span>Subscription</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => document.querySelector('[data-value="notifications"]')?.click()}
                    className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <span>Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => document.querySelector('[data-value="security"]')?.click()}
                    className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <span>Security</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => document.querySelector('[data-value="settings"]')?.click()}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-gray-500" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </nav>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="subscription" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Subscription</CardTitle>
                    <CardDescription>
                      {isPremium ? "You're currently on the Premium plan" : "You're currently on the Free plan"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isPremium ? (
                      <div className="space-y-6">
                        <div className="rounded-lg bg-green-50 p-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                              <h3 className="font-medium text-green-700">Premium Plan Active</h3>
                              <p className="text-sm text-green-600">
                                Your subscription is active and will renew automatically.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">Plan Details</h3>
                              <p className="text-sm text-gray-500">Monthly Premium</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$4.99/month</p>
                              <p className="text-sm text-gray-500">Next billing date: June 15, 2023</p>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">Payment Method</h3>
                              <p className="text-sm text-gray-500">Visa ending in 4242</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // In a real app, this would open a payment method update form
                                alert("This would open a payment method update form in a real application.")
                              }}
                            >
                              Update
                            </Button>
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">Billing History</h3>
                              <p className="text-sm text-gray-500">View your past invoices</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // In a real app, this would show billing history
                                alert("This would show your billing history in a real application.")
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <div>
                              <h3 className="font-medium">Free Plan</h3>
                              <p className="text-sm text-gray-500">
                                You're currently on the free plan with limited features.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="font-medium">Premium Benefits</h3>
                          <ul className="mt-3 space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>Unlimited fit posts</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>Add affiliate links to earn commission</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>Unlimited challenge entries</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>Premium badge on profile</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    {isPremium ? (
                      <>
                        <Button
                          variant="outline"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => {
                            if (confirm("Are you sure you want to cancel your subscription?")) {
                              // In a real app, this would call an API to cancel the subscription
                              localStorage.removeItem("premium_subscription")
                              setIsPremium(false)
                              alert("Your subscription has been canceled.")
                            }
                          }}
                        >
                          Cancel Subscription
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            // In a real app, this would navigate to a plan selection page
                            router.push("/premium")
                          }}
                        >
                          Change Plan
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                        <Link href="/premium">Upgrade to Premium</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications from FitsCheck</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-500">Receive promotional emails and offers</p>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Button
                      className="bg-pink-500 hover:bg-pink-600"
                      onClick={() => {
                        // In a real app, this would save notification preferences
                        alert("Notification preferences saved successfully!")
                      }}
                    >
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert("This would enable two-factor authentication in a real application.")
                        }}
                      >
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Change Email</h3>
                        <p className="text-sm text-gray-500">Update your email address</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert("This would allow you to update your email in a real application.")
                        }}
                      >
                        Update
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Connected Accounts</h3>
                        <p className="text-sm text-gray-500">Manage social accounts connected to your profile</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert("This would show your connected accounts in a real application.")
                        }}
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                          alert("In a real application, your account would be scheduled for deletion.")
                          // In a real app, this would call an API to delete the account
                          localStorage.removeItem("auth_token")
                          localStorage.removeItem("premium_subscription")
                          router.push("/")
                        }
                      }}
                    >
                      Delete Account
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your general account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-sm text-gray-500">Set your preferred language</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert("This would allow you to change your language in a real application.")
                        }}
                      >
                        English
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-gray-500">Toggle dark mode for the website</p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Privacy Settings</h3>
                        <p className="text-sm text-gray-500">Manage who can see your activity</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert("This would allow you to configure privacy settings in a real application.")
                        }}
                      >
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <Button
                      className="bg-pink-500 hover:bg-pink-600"
                      onClick={() => {
                        alert("Settings saved successfully!")
                      }}
                    >
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
