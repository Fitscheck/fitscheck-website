import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Users, TrendingUp, Award, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: "How It Works - FitsCheck Fashion Community App",
  description: "Learn how FitsCheck works - the outfit voting platform where you post outfits, get crowd-sourced style decisions, join social fashion challenges, and build your fashion community presence.",
  keywords: [
    "how does fit check work",
    "fashion community app how it works",
    "outfit voting platform features",
    "social fashion challenges",
    "crowd-sourced style decisions",
    "fashion competition app"
  ],
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Sign up for FitsCheck and create your fashion profile. Customize your style preferences, follow other fashion creators, and start building your presence in the fashion community.",
      icon: Users,
    },
    {
      number: 2,
      title: "Post Your Outfits",
      description: "Share your OOTD (Outfit of the Day) or style options. Upload high-quality photos, add descriptions, and optionally include affiliate links to monetize your content. Our fit check platform makes it easy to showcase your style.",
      icon: MessageSquare,
    },
    {
      number: 3,
      title: "Get Instant Feedback",
      description: "The fashion community votes on your posts, providing real-time crowd-sourced style decisions and feedback. See which looks resonate most with fashion lovers and get valuable insights to improve your style decisions.",
      icon: TrendingUp,
    },
    {
      number: 4,
      title: "Join Style Challenges",
      description: "Participate in themed fashion challenges to showcase your creativity. Compete with other creators, earn style points, and climb the leaderboards. Winners get featured and gain recognition in the fashion community.",
      icon: Award,
    },
    {
      number: 5,
      title: "Earn & Monetize",
      description: "Build your fashion influence, earn commissions from affiliate sales, and grow your following. Premium users can add shop links, promo codes, and monetize their fashion content effectively.",
      icon: Award,
    },
  ]

  const features = [
    {
      title: "Outfit Voting System",
      description: "Get instant feedback on your style choices through our community voting platform. See real-time crowd-sourced style decisions and comments from fashion enthusiasts worldwide.",
    },
    {
      title: "Fit Check Platform",
      description: "Post your outfit options and get honest feedback before you step out. Our fit check feature helps you make confident style decisions.",
    },
    {
      title: "Style Challenges",
      description: "Participate in weekly and monthly style challenges with specific themes. Compete for style points and showcase your unique fashion sense.",
    },
    {
      title: "Fashion Community",
      description: "Connect with fashion lovers, content creators, and style influencers. Build your network and get inspired by the best outfits in the community.",
    },
    {
      title: "Monetization Tools",
      description: "Premium users can add affiliate links, promo codes, and shop links to monetize their fashion content. Earn commissions on purchases made through your posts.",
    },
    {
      title: "Leaderboards",
      description: "Compete globally or with friends. Earn style points based on votes, engagement, and challenge wins. Climb the rankings and become a top fashion creator.",
    },
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

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              How FitsCheck Works
            </h1>
            <p className="text-xl text-[#A3A3A3] text-center mb-12 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Discover how our fashion community app and outfit voting platform helps fashion enthusiasts make crowd-sourced style decisions and build their fashion community presence.
            </p>

            <div className="space-y-12 mb-16">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#003366] text-white text-2xl font-bold">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="h-6 w-6 text-[#003366]" />
                          <h2 className="text-2xl md:text-3xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                            {step.title}
                          </h2>
                        </div>
                        <p className="text-lg text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Key Features of Our Fit Check Platform
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      {feature.title}
                    </h3>
                    <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Ready to Get Started?
              </h2>
              <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join thousands of fashion enthusiasts using FitsCheck to make better style decisions and build their fashion community presence.
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
                  <Link href="/for-creators">For Fashion Creators</Link>
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

