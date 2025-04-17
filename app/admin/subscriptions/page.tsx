"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, DollarSign, Edit, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Sample subscription plans data
const initialPlans = [
  {
    id: "monthly",
    name: "Monthly Premium",
    price: 4.99,
    interval: "month",
    stripePriceId: "price_monthly_123456",
    features: [
      { id: "unlimited_posts", name: "Unlimited Fit Posts", enabled: true },
      { id: "affiliate_links", name: "Affiliate Links", enabled: true },
      { id: "unlimited_challenges", name: "Unlimited Challenge Entries", enabled: true },
      { id: "premium_badge", name: "Premium Badge", enabled: true },
      { id: "analytics", name: "Advanced Analytics", enabled: false },
    ],
    isActive: true,
  },
  {
    id: "annual",
    name: "Annual Premium",
    price: 49.99,
    interval: "year",
    stripePriceId: "price_annual_123456",
    features: [
      { id: "unlimited_posts", name: "Unlimited Fit Posts", enabled: true },
      { id: "affiliate_links", name: "Affiliate Links", enabled: true },
      { id: "unlimited_challenges", name: "Unlimited Challenge Entries", enabled: true },
      { id: "premium_badge", name: "Premium Badge", enabled: true },
      { id: "analytics", name: "Advanced Analytics", enabled: true },
    ],
    isActive: true,
  },
]

export default function SubscriptionManagement() {
  const [plans, setPlans] = useState(initialPlans)
  const [editingPlan, setEditingPlan] = useState<(typeof initialPlans)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleEditPlan = (plan: (typeof initialPlans)[0]) => {
    setEditingPlan({ ...plan })
    setIsEditing(true)
  }

  const handleSavePlan = () => {
    if (!editingPlan) return

    setIsSaving(true)

    // Simulate API call to update plan
    setTimeout(() => {
      setPlans(plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)))
      setIsEditing(false)
      setEditingPlan(null)
      setIsSaving(false)
    }, 1000)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingPlan(null)
  }

  const handleToggleFeature = (featureId: string, enabled: boolean) => {
    if (!editingPlan) return

    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.map((feature) => (feature.id === featureId ? { ...feature, enabled } : feature)),
    })
  }

  const handlePriceChange = (value: string) => {
    if (!editingPlan) return

    // Allow only numbers and decimal point
    const price = value.replace(/[^0-9.]/g, "")

    setEditingPlan({
      ...editingPlan,
      price: Number.parseFloat(price) || 0,
    })
  }

  const handleTogglePlanActive = (planId: string, isActive: boolean) => {
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, isActive } : plan)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container flex-1 px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/admin" className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Subscription Management</h1>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">Manage Subscription Plans</h2>
                <p className="text-sm text-gray-500">Configure pricing and features for your subscription plans</p>
              </div>
              <Button className="bg-pink-500 hover:bg-pink-600">
                <Plus className="mr-2 h-4 w-4" />
                Add New Plan
              </Button>
            </div>

            {isEditing && editingPlan ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Plan: {editingPlan.name}</CardTitle>
                  <CardDescription>Modify plan details and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plan-name">Plan Name</Label>
                      <Input
                        id="plan-name"
                        value={editingPlan.name}
                        onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plan-interval">Billing Interval</Label>
                      <select
                        id="plan-interval"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={editingPlan.interval}
                        onChange={(e) => setEditingPlan({ ...editingPlan, interval: e.target.value })}
                      >
                        <option value="month">Monthly</option>
                        <option value="year">Annual</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plan-price">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="plan-price"
                          className="pl-9"
                          value={editingPlan.price}
                          onChange={(e) => handlePriceChange(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-price-id">Stripe Price ID</Label>
                      <Input
                        id="stripe-price-id"
                        value={editingPlan.stripePriceId}
                        onChange={(e) => setEditingPlan({ ...editingPlan, stripePriceId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Features</Label>
                    <div className="rounded-md border">
                      {editingPlan.features.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between border-b p-4 last:border-0">
                          <div className="font-medium">{feature.name}</div>
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={(checked) => handleToggleFeature(feature.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleSavePlan} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Interval</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>${plan.price.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{plan.interval}</TableCell>
                        <TableCell>{plan.features.filter((f) => f.enabled).length} enabled</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={`mr-2 h-2 w-2 rounded-full ${plan.isActive ? "bg-green-500" : "bg-gray-300"}`}
                            ></span>
                            <span>{plan.isActive ? "Active" : "Inactive"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTogglePlanActive(plan.id, !plan.isActive)}
                            >
                              {plan.isActive ? (
                                <X className="h-4 w-4 text-red-500" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                              <span className="sr-only">{plan.isActive ? "Deactivate" : "Activate"}</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">Premium Subscribers</h2>
                <p className="text-sm text-gray-500">View and manage users with active premium subscriptions</p>
              </div>
              <Input className="max-w-xs" placeholder="Search subscribers..." />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                          <span className="font-medium text-pink-500">SL</span>
                        </div>
                        <div>
                          <div className="font-medium">Sarah Lee</div>
                          <div className="text-sm text-gray-500">sarah.lee@example.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Monthly Premium</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>Jan 15, 2023</TableCell>
                    <TableCell>Jun 15, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="font-medium text-purple-500">EW</span>
                        </div>
                        <div>
                          <div className="font-medium">Emma Wilson</div>
                          <div className="text-sm text-gray-500">emma.wilson@example.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Annual Premium</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>Feb 8, 2023</TableCell>
                    <TableCell>Feb 8, 2024</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="font-medium text-red-500">RB</span>
                        </div>
                        <div>
                          <div className="font-medium">Ryan Brown</div>
                          <div className="text-sm text-gray-500">ryan.brown@example.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Monthly Premium</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                        Past Due
                      </span>
                    </TableCell>
                    <TableCell>Dec 12, 2022</TableCell>
                    <TableCell>May 12, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stripe Integration</CardTitle>
                <CardDescription>Configure your Stripe payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                    <Input id="stripe-public-key" defaultValue="pk_test_51..." type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                    <Input id="stripe-secret-key" defaultValue="sk_test_51..." type="password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      defaultValue="https://fitscheck.com/api/webhooks/stripe"
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Add this URL to your Stripe dashboard to receive payment events
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Test Mode</h3>
                    <p className="text-sm text-gray-500">When enabled, all payments will use Stripe test mode</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="bg-pink-500 hover:bg-pink-600">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
