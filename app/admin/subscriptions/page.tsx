"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  CreditCard,
  DollarSign,
  Edit,
  Plus,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  fetchSubscriptions,
  updateSubscription,
  createSubscription,
  deleteSubscription,
} from "@/lib/subscription"
import toast from "react-hot-toast"


const normalizeFeatures = (rawFeatures: Record<string, any>) => {
  const featureMap: Record<string, { name: string; type: "boolean" | "string" }> = {
    fitPostsLimit: { name: "Unlimited Fit Posts", type: "string" },
    affiliateLink: { name: "Affiliate Links", type: "boolean" },
    challengeEntries: { name: "Unlimited Challenge Entries", type: "string" },
    badge: { name: "Premium Badge", type: "boolean" },
    analytics: { name: "Advanced Analytics", type: "boolean" },
  }

  return Object.entries(rawFeatures || {}).map(([key, value]) => ({
    id: key,
    name: featureMap[key]?.name || key,
    type: featureMap[key]?.type || "boolean",
    enabled: value,
  }))
}


export default function SubscriptionManagement() {
  const [plans, setPlans] = useState<any[]>([])
  const [editingPlan, setEditingPlan] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isAddingPlan, setIsAddingPlan] = useState(false)
  const [newPlan, setNewPlan] = useState(getDefaultNewPlan())
  const [planToDelete, setPlanToDelete] = useState<any | null>(null)


  function getDefaultNewPlan() {
    return {
      id: `plan_${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      interval: "month",
      stripePriceId: "",
      features: [
        { id: "fitPostsLimit", name: "Unlimited Fit Posts", enabled: "Unlimited", type: "string" },
        { id: "affiliateLink", name: "Affiliate Links", enabled: false, type: "boolean" },
        { id: "challengeEntries", name: "Unlimited Challenge Entries", enabled: "Unlimited", type: "string" },
        { id: "badge", name: "Premium Badge", enabled: true, type: "boolean" },
        { id: "analytics", name: "Advanced Analytics", enabled: false, type: "boolean" },
      ],
      isActive: true,
    }
  }
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const subs = await fetchSubscriptions()
        const normalized = subs.map((plan: any) => ({
          ...plan,
          name: plan.name || plan.title || "", // Fallback to `title`
          features: Array.isArray(plan.features)
            ? plan.features
            : normalizeFeatures(plan.features),
        }))
        setPlans(normalized)
      } catch (err) {
        console.error("❌ Failed to load plans", err)
      }
    }
    loadPlans()
  }, [])


  const handleEditPlan = (plan: any) => {
    setEditingPlan({ ...plan })
    setIsEditing(true)
  }

  const handleSavePlan = async () => {
    if (!editingPlan) return
    setIsSaving(true)
    try {
      const updated = await updateSubscription(editingPlan._id, {
        ...editingPlan,
        features: editingPlan.features.reduce((acc: any, f: any) => {
          acc[f.id] = f.enabled
          return acc
        }, {})
      })
      setPlans(plans.map((p) => (p.id === updated.id ? updated : p)))
      setEditingPlan(null)
      setIsEditing(false)
    } catch (err) {
      console.error("❌ Failed to update plan", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNewPlan = async () => {
    setIsSaving(true)
    if (!newPlan.name || newPlan.price <= 0 || !newPlan.description) {
      alert("Please fill in all required fields")
      setIsSaving(false)
      return
    }

    try {
      const { id, isActive, features, name, ...rest } = newPlan

      const payload = {
        ...rest,
        title: name,
        description: newPlan.description,
        features: features.reduce((acc, feature) => {
          acc[feature.id] = feature.enabled
          return acc
        }, {} as Record<string, boolean | string>)
      }

      const created = await createSubscription(payload)
      const normalized = {
        ...created,
        id: created._id,
        name: created.name || created.title || "",
        features: Array.isArray(created.features)
          ? created.features
          : normalizeFeatures(created.features),
      }
      setPlans([...plans, normalized])
      setIsAddingPlan(false)
      setNewPlan(getDefaultNewPlan())
    } catch (err) {
      console.error("❌ Failed to create plan", err)
    } finally {
      setIsSaving(false)
    }
  }


  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingPlan(null)
  }

  const handleToggleFeature = (featureId: string, value: boolean | string) => {
    if (!editingPlan) return
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.map((f: any) =>
        f.id === featureId ? { ...f, enabled: value } : f
      ),
    })
  }


  const handlePriceChange = (value: string, isNew = false) => {
    const price = Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0
    if (isNew) {
      setNewPlan({ ...newPlan, price })
    } else if (editingPlan) {
      setEditingPlan({ ...editingPlan, price })
    }
  }

  const handleTogglePlanActive = (planId: string, isActive: boolean) => {
    setPlans(plans.map((p) => (p.id === planId ? { ...p, isActive } : p)))
  }

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return
    try {
      await deleteSubscription(id)
  
      // Try matching against both _id and id
      setPlans((prev) =>
        prev.filter((plan) => plan._id !== id && plan.id !== id)
      )
  
      toast.success("Subscription plan deleted successfully", {
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          padding: "12px 16px",
          fontSize: "14px",
        },
        iconTheme: {
          primary: "#ec4899", // Tailwind pink-500
          secondary: "#fff",
        },
      })
    } catch (err) {
      console.error("❌ Failed to delete plan", err)
  
      toast.error("Failed to delete the plan", {
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          padding: "12px 16px",
          fontSize: "14px",
        },
        iconTheme: {
          primary: "#f87171", // Tailwind red-400
          secondary: "#fff",
        },
      })
    }
  }
  
  
  const handleAddPlan = () => {
    setIsAddingPlan(true)
    setNewPlan(getDefaultNewPlan())
  }
  const handleNewPlanPriceChange = (value: string) => {
    const price = Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0
    setNewPlan({ ...newPlan, price })
  }
  const handleToggleNewPlanFeature = (featureId: string, value: boolean | string) => {
    setNewPlan({
      ...newPlan,
      features: newPlan.features.map((f) =>
        f.id === featureId ? { ...f, enabled: value } : f
      ),
    })
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
              <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleAddPlan}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Plan
              </Button>
            </div>

            {isAddingPlan ? (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Plan</CardTitle>
                  <CardDescription>Configure details and features for the new subscription plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-plan-name">Plan Name</Label>
                      <Input
                        id="new-plan-name"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                        placeholder="e.g. Premium Monthly"
                        required
                      />
                    </div>
                    <Label htmlFor="new-plan-description">Description</Label>
                    <Input
                      id="new-plan-description"
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    />

                    {/* <div className="space-y-2">
                      <Label htmlFor="new-plan-interval">Billing Interval</Label>
                      <select
                        id="new-plan-interval"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newPlan.interval}
                        onChange={(e) => setNewPlan({ ...newPlan, interval: e.target.value })}
                      >
                        <option value="month">Monthly</option>
                        <option value="year">Annual</option>
                      </select>
                    </div> */}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-plan-price">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="new-plan-price"
                          className="pl-9"
                          value={newPlan.price}
                          onChange={(e) => handleNewPlanPriceChange(e.target.value)}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="new-stripe-price-id">Stripe Price ID</Label>
                      <Input
                        id="new-stripe-price-id"
                        value={newPlan.stripePriceId}
                        onChange={(e) => setNewPlan({ ...newPlan, stripePriceId: e.target.value })}
                        placeholder="price_..."
                        required
                      />
                    </div> */}
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Features</Label>
                    <div className="rounded-md border">
                      {newPlan.features.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between border-b p-4 last:border-0">
                          <div className="font-medium">{feature.name}</div>
                          {feature.type === "boolean" ? (
                            <Switch
                              checked={!!feature.enabled}
                              onCheckedChange={(checked) => handleToggleNewPlanFeature(feature.id, checked)}
                            />
                          ) : (
                            <Input
                              className="w-32"
                              value={String(feature.enabled)}
                              onChange={(e) => handleToggleNewPlanFeature(feature.id, e.target.value)}
                            />

                          )}
                        </div>

                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingPlan(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleSaveNewPlan} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Create Plan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : isEditing && editingPlan ? (
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
                      <Label htmlFor="plan-description">Description</Label>
                      <Input
                        id="plan-description"
                        value={editingPlan.description}
                        onChange={(e) =>
                          setEditingPlan({ ...editingPlan, description: e.target.value })
                        }
                        placeholder="Short description of this plan"
                      />
                    </div>

                    {/* <div className="space-y-2">
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
                    </div> */}
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
                    {/* <div className="space-y-2">
                      <Label htmlFor="stripe-price-id">Stripe Price ID</Label>
                      <Input
                        id="stripe-price-id"
                        value={editingPlan.stripePriceId}
                        onChange={(e) => setEditingPlan({ ...editingPlan, stripePriceId: e.target.value })}
                      />
                    </div> */}
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Features</Label>
                    <div className="rounded-md border">
                      {Array.isArray(editingPlan.features) &&
                        editingPlan.features.map((feature: { id: string; name: string; enabled: string | boolean; type?: string }) => (
                          <div key={feature.id} className="flex items-center justify-between border-b p-4 last:border-0">

                            <div className="font-medium">{feature.name}</div>
                            {feature.type === "boolean" ? (
                              <Switch
                                checked={!!feature.enabled}
                                onCheckedChange={(checked) => handleToggleFeature(feature.id, checked)}
                              />
                            ) : (
                              <Input
                                className="w-32"
                                value={String(feature.enabled)}
                                onChange={(e) => handleToggleFeature(feature.id, e.target.value)}
                              />

                            )}
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
                      {/* <TableHead>Interval</TableHead> */}
                      <TableHead>Features</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan, idx) => (
                      <TableRow key={plan.id || `plan-${idx}`}>

                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>${plan.price.toFixed(2)}</TableCell>
                        {/* <TableCell className="capitalize">{plan.interval}</TableCell> */}
                        <TableCell>
                          {Array.isArray(plan.features)
                            ? plan.features.filter((f: { id: string; name: string; enabled: boolean }) => f.enabled).length
                            : 0}{" "}
                          enabled
                        </TableCell>

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
                           <Button variant="ghost" size="sm" onClick={() => setPlanToDelete(plan)}>
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
      {planToDelete && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg animate-fadeIn">
        <h2 className="text-lg font-semibold mb-2">Delete Plan</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>{planToDelete.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPlanToDelete(null)}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={async () => {
              try {
                await deleteSubscription(planToDelete._id || planToDelete.id)
                setPlans((prev) =>
                  prev.filter((p) => p._id !== planToDelete._id && p.id !== planToDelete.id)
                )
                toast.success("Subscription plan deleted successfully", {
                  style: {
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#333",
                    padding: "12px 16px",
                    fontSize: "14px",
                  },
                  iconTheme: {
                    primary: "#ec4899",
                    secondary: "#fff",
                  },
                })
              } catch (err) {
                toast.error("Failed to delete the plan")
              } finally {
                setPlanToDelete(null)
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )}
      <Footer />
    </div>
  )
}
