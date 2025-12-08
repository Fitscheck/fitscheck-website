import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, DollarSign, TrendingUp, Users, Award, Link2, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: "For Fashion Content Creators - FitsCheck",
  description: "FitsCheck is the perfect fashion community app for fashion content creators. Get crowd-sourced style decisions from community votes, monetize your OOTD posts, and earn commissions with affiliate links.",
  keywords: [
    "fashion content creators",
    "fashion community app for creators",
    "outfit voting platform for creators",
    "monetize fashion content",
    "fashion influencer platform",
    "OOTD monetization",
    "fashion affiliate links",
    "style creator app"
  ],
}

export default function ForCreatorsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize Your Content",
      description: "Add affiliate links to your OOTD posts and earn commissions on purchases. You can include shop links, promo codes, and monetize their fashion content effectively.",
    },
    {
      icon: Users,
      title: "Grow Your Fashion Community",
      description: "Build a dedicated following of fashion enthusiasts who appreciate your style. Connect with other creators and expand your reach in the fashion community.",
    },
    {
      icon: TrendingUp,
      title: "Increase Engagement",
      description: "Get instant feedback and ratings on your outfits. High-performing posts get featured, increasing your visibility and engagement rates.",
    },
    {
      icon: Award,
      title: "Compete in Style Challenges",
      description: "Participate in themed fashion challenges to showcase your creativity. Winners get featured and gain recognition, helping you stand out in the fashion community.",
    },
    {
      icon: BarChart3,
      title: "Track Your Performance",
      description: "Monitor your outfit voting performance, engagement metrics, and earnings. See which content performs best and optimize your posting strategy.",
    },
    {
      icon: Link2,
      title: "Shop This Look Feature",
      description: "Make it easy for your followers to shop your looks. Add direct links to products, making it seamless for users to purchase items from your outfits.",
    },
  ]

  const features = [
    "Early access to beta features",
    "Affiliate link integration",
    "Advanced analytics and insights",
    "Priority support",
    "Featured placement opportunities",
    "Exclusive creator challenges",
    "Higher commission rates",
    "Custom profile customization"
  ]

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#FEFBD7] to-white">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#003366] hover:text-[#F8E71C] mb-8 transition-colors"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                For Fashion Content Creators
              </h1>
              <p className="text-xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                FitsCheck is the ultimate fashion community app for fashion content creators. Monetize your OOTD posts, grow your fashion community, and turn your passion for style into a thriving business.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Why Fashion Creators Love FitsCheck
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="bg-[#F0F7FF] rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                            {benefit.title}
                          </h3>
                          <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-[#003366] rounded-2xl p-8 md:p-12 mb-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Founding Creator Benefits
              </h2>
              <p className="text-lg text-white/80 mb-8 text-center max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join as a Founding Creator and unlock exclusive benefits designed to help you succeed on our fit check platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F8E71C] flex-shrink-0" />
                    <span className="text-white/90" style={{ fontFamily: "var(--font-satoshi)" }}>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F8E71C] hover:bg-[#F8E71C]/90 text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/founding-creator">Become a Founding Creator</Link>
                </Button>
              </div>
            </div>

            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                How to Get Started
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Join the Waitlist
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Sign up for early access and get notified when FitsCheck launches. Waitlist members receive priority access and exclusive benefits.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Apply for Founding Creator Status
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      If you're an established fashion content creator, apply to become a Founding Creator and unlock features from day one.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Start Creating & Monetizing
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Once launched, start posting your OOTD content, add affiliate links, participate in style challenges, and build your fashion community presence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Ready to Grow Your Fashion Brand?
              </h2>
              <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join FitsCheck today and start monetizing your fashion content while building a dedicated community of style enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/#waitlist">Join the Waitlist</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

