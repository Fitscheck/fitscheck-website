import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Trophy, Calendar, Users, Award, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: "Style Challenges - Fashion Competition Platform | FitsCheck",
  description: "Participate in exciting style challenges on FitsCheck. Compete in themed fashion competitions, win style points, and showcase your creativity to the fashion community.",
  keywords: [
    "style challenges",
    "fashion challenges",
    "online fashion challenges",
    "outfit competition",
    "fashion contest",
    "style competition app",
    "fashion challenge platform"
  ],
}

export default function StyleChallengesPage() {
  const challengeTypes = [
    {
      icon: Calendar,
      title: "Weekly Challenges",
      description: "New themed challenges every week. From seasonal styles to trend-based competitions, there's always something exciting to participate in.",
    },
    {
      icon: Trophy,
      title: "Monthly Competitions",
      description: "Bigger prizes, more recognition. Monthly challenges feature special themes and offer greater rewards for winners.",
    },
    {
      icon: Users,
      title: "Community Challenges",
      description: "User-created challenges where the community votes on themes. The most popular ideas become official challenges.",
    },
    {
      icon: TrendingUp,
      title: "Trend Challenges",
      description: "Stay ahead of fashion trends. Participate in challenges based on current fashion movements and viral styles.",
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Challenge Announcement",
      description: "New challenges are announced with specific themes, rules, and prizes. Check the app regularly or enable notifications to never miss a challenge.",
    },
    {
      step: 2,
      title: "Create Your Entry",
      description: "Post your outfit following the challenge theme. Use your creativity to interpret the theme in your unique style. Add descriptions and tags to maximize visibility.",
    },
    {
      step: 3,
      title: "Community Voting",
      description: "The fashion community votes on all entries. Get as many votes as possible by sharing your post and engaging with the community.",
    },
    {
      step: 4,
      title: "Winners & Rewards",
      description: "Top performers win style points, get featured on leaderboards, and receive special badges. Monthly challenge winners may also receive exclusive prizes.",
    },
  ]

  const benefits = [
    "Showcase your unique style to a global fashion community",
    "Earn style points and climb the leaderboards",
    "Get featured and increase your visibility",
    "Connect with other fashion enthusiasts",
    "Win exclusive badges and recognition",
    "Build your reputation as a style creator"
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Style Challenges
              </h1>
              <p className="text-xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Compete in exciting fashion challenges, showcase your creativity, and win style points on FitsCheck's premier style challenge platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Types of Style Challenges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challengeTypes.map((challenge, index) => {
                  const Icon = challenge.icon
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
                            {challenge.title}
                          </h3>
                          <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                How Style Challenges Work
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        {item.title}
                      </h3>
                      <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#003366] rounded-2xl p-8 md:p-12 mb-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Benefits of Participating
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-[#F8E71C] flex-shrink-0" />
                    <span className="text-white/90" style={{ fontFamily: "var(--font-satoshi)" }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Example Challenge Themes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Summer Vibes",
                  "Street Style",
                  "Minimalist Chic",
                  "Bold Colors",
                  "Vintage Revival",
                  "Athleisure",
                  "Formal Elegance",
                  "Casual Comfort",
                  "Trending Now"
                ].map((theme, index) => (
                  <div key={index} className="bg-[#FEFBD7] rounded-lg p-4 text-center">
                    <span className="font-semibold text-[#003366]" style={{ fontFamily: "var(--font-satoshi)" }}>{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Ready to Compete?
              </h2>
              <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join FitsCheck and start participating in style challenges today. Showcase your creativity and compete with fashion enthusiasts worldwide.
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
                  <Link href="/how-it-works">Learn More</Link>
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

