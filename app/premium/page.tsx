"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PremiumPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isRedirecting, setIsRedirecting] = useState(false)

  // In a real app, these would be fetched from your backend
  const pricingPlans = {
    monthly: {
      price: "$4.99",
      period: "month",
      stripePriceId: "price_monthly_123456",
    },
    annual: {
      price: "$49.99",
      period: "year",
      stripePriceId: "price_annual_123456",
    },
  }

  const handleCheckout = async () => {
    setIsRedirecting(true)

    // In a real app, this would call your backend to create a Stripe checkout session
    try {
      // Simulate API call to create Stripe checkout session
      setTimeout(() => {
        // This would normally redirect to Stripe's checkout page
        alert("In a production app, you would be redirected to Stripe's checkout page now.")

        // For demo purposes, we'll simulate a successful payment
        localStorage.setItem("premium_subscription", "active")
        router.push("/account")

        setIsRedirecting(false)
      }, 1500)

      // Real implementation would look something like this:
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: pricingPlans[billingCycle].stripePriceId,
        }),
      });
      
      const { url } = await response.json();
      window.location.href = url;
      */
    } catch (error) {
      console.error("Error creating checkout session:", error)
      setIsRedirecting(false)
      alert("Something went wrong. Please try again.")
    }
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
                  {/* <Button variant="outline" size="sm">
                    View Full Comparison
                  </Button> */}
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
                  <CardDescription>Select a billing cycle to continue to checkout.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 block">Billing Cycle</div>
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
                            {billingCycle === "monthly" ? "Current plan" : pricingPlans.monthly.price + "/month"}
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
                            {billingCycle === "annual"
                              ? "Current plan"
                              : pricingPlans.annual.price + "/year (save 16%)"}
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between">
                        <span>Premium Plan ({billingCycle === "monthly" ? "Monthly" : "Annual"})</span>
                        {/* <span>{pricingPlans[billingCycle].price}</span> */}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {billingCycle === "monthly"
                          ? `You'll be charged ${pricingPlans.monthly.price} today and on a monthly basis until you cancel.`
                          : `You'll be charged ${pricingPlans.annual.price} today and annually until you cancel.`}
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-pink-500 hover:bg-pink-600"
                      disabled={isRedirecting}
                    >
                      {isRedirecting ? (
                        "Redirecting to checkout..."
                      ) : (
                        <>
                          Continue to Checkout
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="16"
                        viewBox="0 0 40 16"
                        fill="none"
                        className="h-4"
                      >
                        <path
                          d="M7.272 3.5H4.397C4.222 3.5 4.047 3.5 3.872 3.675C3.697 3.85 3.697 4.025 3.697 4.2V6.725C3.697 6.9 3.697 7.075 3.872 7.25C4.047 7.425 4.222 7.425 4.397 7.425H7.272C7.447 7.425 7.622 7.425 7.797 7.25C7.972 7.075 7.972 6.9 7.972 6.725V4.2C7.972 4.025 7.972 3.85 7.797 3.675C7.622 3.5 7.447 3.5 7.272 3.5Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M7.272 8.575H4.397C4.222 8.575 4.047 8.575 3.872 8.75C3.697 8.925 3.697 9.1 3.697 9.275V11.8C3.697 11.975 3.697 12.15 3.872 12.325C4.047 12.5 4.222 12.5 4.397 12.5H7.272C7.447 12.5 7.622 12.5 7.797 12.325C7.972 12.15 7.972 11.975 7.972 11.8V9.275C7.972 9.1 7.972 8.925 7.797 8.75C7.622 8.575 7.447 8.575 7.272 8.575Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M13.022 3.5H10.147C9.972 3.5 9.797 3.5 9.622 3.675C9.447 3.85 9.447 4.025 9.447 4.2V11.8C9.447 11.975 9.447 12.15 9.622 12.325C9.797 12.5 9.972 12.5 10.147 12.5H13.022C13.197 12.5 13.372 12.5 13.547 12.325C13.722 12.15 13.722 11.975 13.722 11.8V4.2C13.722 4.025 13.722 3.85 13.547 3.675C13.372 3.5 13.197 3.5 13.022 3.5Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M18.772 3.5H15.897C15.722 3.5 15.547 3.5 15.372 3.675C15.197 3.85 15.197 4.025 15.197 4.2V6.725C15.197 6.9 15.197 7.075 15.372 7.25C15.547 7.425 15.722 7.425 15.897 7.425H18.772C18.947 7.425 19.122 7.425 19.297 7.25C19.472 7.075 19.472 6.9 19.472 6.725V4.2C19.472 4.025 19.472 3.85 19.297 3.675C19.122 3.5 18.947 3.5 18.772 3.5Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M18.772 8.575H15.897C15.722 8.575 15.547 8.575 15.372 8.75C15.197 8.925 15.197 9.1 15.197 9.275V11.8C15.197 11.975 15.197 12.15 15.372 12.325C15.547 12.5 15.722 12.5 15.897 12.5H18.772C18.947 12.5 19.122 12.5 19.297 12.325C19.472 12.15 19.472 11.975 19.472 11.8V9.275C19.472 9.1 19.472 8.925 19.297 8.75C19.122 8.575 18.947 8.575 18.772 8.575Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M36.772 5.4H35.372V4.2C35.372 3.85 35.197 3.5 34.847 3.5C34.497 3.5 34.322 3.85 34.322 4.2V5.4H33.097C32.747 5.4 32.397 5.575 32.397 5.925C32.397 6.275 32.747 6.45 33.097 6.45H34.322V7.65C34.322 8 34.497 8.35 34.847 8.35C35.197 8.35 35.372 8 35.372 7.65V6.45H36.772C37.122 6.45 37.472 6.275 37.472 5.925C37.472 5.575 37.122 5.4 36.772 5.4Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M38.347 0H1.647C0.772 0 0.072 0.7 0.072 1.575V14.425C0.072 15.3 0.772 16 1.647 16H38.347C39.222 16 39.922 15.3 39.922 14.425V1.575C39.922 0.7 39.222 0 38.347 0ZM38.872 14.425C38.872 14.775 38.697 14.95 38.347 14.95H1.647C1.297 14.95 1.122 14.775 1.122 14.425V1.575C1.122 1.225 1.297 1.05 1.647 1.05H38.347C38.697 1.05 38.872 1.225 38.872 1.575V14.425Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M29.697 5.75C29.697 5.225 29.347 4.875 28.822 4.875C28.297 4.875 27.947 5.225 27.947 5.75C27.947 6.275 28.297 6.625 28.822 6.625C29.347 6.625 29.697 6.275 29.697 5.75Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M28.822 7.675C28.297 7.675 27.947 8.025 27.947 8.55C27.947 9.075 28.297 9.425 28.822 9.425C29.347 9.425 29.697 9.075 29.697 8.55C29.697 8.025 29.347 7.675 28.822 7.675Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M28.822 10.475C28.297 10.475 27.947 10.825 27.947 11.35C27.947 11.875 28.297 12.225 28.822 12.225C29.347 12.225 29.697 11.875 29.697 11.35C29.697 10.825 29.347 10.475 28.822 10.475Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M31.447 5.75C31.447 5.225 31.097 4.875 30.572 4.875C30.047 4.875 29.697 5.225 29.697 5.75C29.697 6.275 30.047 6.625 30.572 6.625C31.097 6.625 31.447 6.275 31.447 5.75Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M30.572 7.675C30.047 7.675 29.697 8.025 29.697 8.55C29.697 9.075 30.047 9.425 30.572 9.425C31.097 9.425 31.447 9.075 31.447 8.55C31.447 8.025 31.097 7.675 30.572 7.675Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M30.572 10.475C30.047 10.475 29.697 10.825 29.697 11.35C29.697 11.875 30.047 12.225 30.572 12.225C31.097 12.225 31.447 11.875 31.447 11.35C31.447 10.825 31.097 10.475 30.572 10.475Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M26.197 5.75C26.197 5.225 25.847 4.875 25.322 4.875C24.797 4.875 24.447 5.225 24.447 5.75C24.447 6.275 24.797 6.625 25.322 6.625C25.847 6.625 26.197 6.275 26.197 5.75Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M25.322 7.675C24.797 7.675 24.447 8.025 24.447 8.55C24.447 9.075 24.797 9.425 25.322 9.425C25.847 9.425 26.197 9.075 26.197 8.55C26.197 8.025 25.847 7.675 25.322 7.675Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M25.322 10.475C24.797 10.475 24.447 10.825 24.447 11.35C24.447 11.875 24.797 12.225 25.322 12.225C25.847 12.225 26.197 11.875 26.197 11.35C26.197 10.825 25.847 10.475 25.322 10.475Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M27.947 5.75C27.947 5.225 27.597 4.875 27.072 4.875C26.547 4.875 26.197 5.225 26.197 5.75C26.197 6.275 26.547 6.625 27.072 6.625C27.597 6.625 27.947 6.275 27.947 5.75Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M27.072 7.675C26.547 7.675 26.197 8.025 26.197 8.55C26.197 9.075 26.547 9.425 27.072 9.425C27.597 9.425 27.947 9.075 27.947 8.55C27.947 8.025 27.597 7.675 27.072 7.675Z"
                          fill="#6772E5"
                        />
                        <path
                          d="M27.072 10.475C26.547 10.475 26.197 10.825 26.197 11.35C26.197 11.875 26.547 12.225 27.072 12.225C27.597 12.225 27.947 11.875 27.947 11.35C27.947 10.825 27.597 10.475 27.072 10.475Z"
                          fill="#6772E5"
                        />
                      </svg>
                      <span>Secure payment via Stripe</span>
                    </div>

                    <p className="text-center text-xs text-gray-500">
                      By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel anytime from
                      your account settings.
                    </p>
                  </div>
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
