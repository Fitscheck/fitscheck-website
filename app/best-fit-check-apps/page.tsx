import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Check, X, Star, Users, TrendingUp, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: "Best Fit Check Apps in 2025 (Outfit Rating & Fashion Feedback)",
  description: "Discover the best fit check apps in 2025 for outfit rating and fashion feedback. Compare top platforms including FitsCheck, the community-powered fashion app where real people vote on your outfits.",
  keywords: [
    "best fit check apps 2025",
    "outfit rating apps",
    "fashion feedback apps",
    "fit check platform",
    "outfit voting apps",
    "fashion community apps",
    "style feedback apps",
    "this or that fashion app"
  ],
}

interface AppComparison {
  name: string
  type: string
  communityVoting: boolean
  free: boolean
  styleChallenges: boolean
  leaderboards: boolean
  affiliateLinks: boolean
  description: string
  pros: string[]
  cons: string[]
}

const apps: AppComparison[] = [
  {
    name: "FitsCheck",
    type: "Community-Powered Fashion Platform",
    communityVoting: true,
    free: true,
    styleChallenges: true,
    leaderboards: true,
    affiliateLinks: true,
    description: "A fashion-focused social platform where the community votes on your outfits through real-time crowd-sourced style decisions. Built exclusively for fashion creators and style lovers.",
    pros: [
      "Real community feedback from fashion lovers",
      "Free to use with unlimited outfit posts",
      "Style challenges and leaderboards",
      "This or That voting feature",
      "Fashion-focused community (not generic social media)",
      "Affiliate link support for creators",
      "No algorithm - community-driven",
      "Grow faster than Instagram for fashion content"
    ],
    cons: [
      "Currently in waitlist (launching soon)",
      "Newer platform (less established user base)"
    ]
  },
  {
    name: "Instagram",
    type: "General Social Media",
    communityVoting: false,
    free: true,
    styleChallenges: false,
    leaderboards: false,
    affiliateLinks: true,
    description: "Popular social media platform with fashion content, but not built specifically for outfit feedback or fit checks.",
    pros: [
      "Large existing user base",
      "Established platform",
      "Good for general fashion content",
      "Affiliate link support"
    ],
    cons: [
      "No dedicated fit check or voting features",
      "Algorithm-driven (not community-focused)",
      "Crowded with non-fashion content",
      "Harder to get fashion-specific feedback",
      "No style challenges or leaderboards"
    ]
  },
  {
    name: "TikTok",
    type: "Video Social Media",
    communityVoting: false,
    free: true,
    styleChallenges: false,
    leaderboards: false,
    affiliateLinks: true,
    description: "Video-first platform popular for fashion content, but lacks dedicated outfit rating or fit check features.",
    pros: [
      "Great for video fashion content",
      "Large user base",
      "Trending fashion content",
      "Affiliate link support"
    ],
    cons: [
      "No fit check or voting features",
      "Video-focused (not ideal for outfit photos)",
      "Algorithm-driven feed",
      "No style challenges or fashion leaderboards",
      "Mixed content (not fashion-only)"
    ]
  },
  {
    name: "AI Styling Apps",
    type: "AI-Powered",
    communityVoting: false,
    free: false,
    styleChallenges: false,
    leaderboards: false,
    affiliateLinks: false,
    description: "Various AI-powered styling apps that use algorithms to suggest outfits, but lack real community feedback.",
    pros: [
      "Instant AI suggestions",
      "Available 24/7",
      "No waiting for community response"
    ],
    cons: [
      "No real human feedback",
      "Often requires paid subscription",
      "Algorithm-based (not authentic opinions)",
      "No community interaction",
      "No style challenges or social features",
      "Limited understanding of real-world style"
    ]
  }
]

export default function BestFitCheckAppsPage() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              Best Fit Check Apps in 2025
            </h1>
            <p className="text-xl text-[#A3A3A3] text-center mb-4 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Outfit Rating & Fashion Feedback
            </p>
            <p className="text-lg text-[#A3A3A3] text-center mb-12 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Looking for the best platform to get outfit feedback? Compare the top fit check apps and fashion feedback platforms available in 2025.
            </p>

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12 overflow-x-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Platform Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#003366]">
                      <th className="text-left p-4 text-[#003366] font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Feature</th>
                      <th className="text-center p-4 text-[#003366] font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>FitsCheck</th>
                      <th className="text-center p-4 text-[#003366] font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Instagram</th>
                      <th className="text-center p-4 text-[#003366] font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>TikTok</th>
                      <th className="text-center p-4 text-[#003366] font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>AI Apps</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Community Voting</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Free to Use</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Style Challenges</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Leaderboards</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Fashion-Focused</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-4 text-[#003366] font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>Affiliate Links</td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="h-6 w-6 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed App Reviews */}
            <div className="space-y-8 mb-12">
              {apps.map((app, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        {app.name}
                      </h2>
                      <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                        {app.type}
                      </p>
                    </div>
                    {app.name === "FitsCheck" && (
                      <span className="px-4 py-2 bg-[#F8E71C] text-[#003366] rounded-full text-sm font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        Best for Fit Checks
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg text-[#A3A3A3] mb-6 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    {app.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#003366] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        <Check className="h-5 w-5 text-green-600" />
                        Pros
                      </h3>
                      <ul className="space-y-2">
                        {app.pros.map((pro, i) => (
                          <li key={i} className="text-[#A3A3A3] flex items-start gap-2" style={{ fontFamily: "var(--font-satoshi)" }}>
                            <span className="text-green-600 mt-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#003366] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        <X className="h-5 w-5 text-red-500" />
                        Cons
                      </h3>
                      <ul className="space-y-2">
                        {app.cons.map((con, i) => (
                          <li key={i} className="text-[#A3A3A3] flex items-start gap-2" style={{ fontFamily: "var(--font-satoshi)" }}>
                            <span className="text-red-500 mt-1">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why FitsCheck Section */}
            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Why FitsCheck Stands Out
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center">
                  <Users className="h-12 w-12 text-[#003366] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Real Community Feedback
                  </h3>
                  <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Get authentic opinions from real fashion lovers, not algorithms or AI. Our community understands style and provides genuine feedback.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-[#003366] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Fashion-Focused Platform
                  </h3>
                  <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Built exclusively for fashion. No mixed content, no algorithm confusion—just a community passionate about style and outfit feedback.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Award className="h-12 w-12 text-[#003366] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Style Challenges & Leaderboards
                  </h3>
                  <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Compete in style challenges, earn style points, and climb leaderboards. Features you won't find on generic social media platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#003366] rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Try FitsCheck – Join the Waitlist
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Ready to experience the best fit check app in 2025? Join thousands of fashion lovers waiting to get community feedback on their outfits. Be among the first to access FitsCheck when we launch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/#waitlist">Join the Waitlist</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
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

