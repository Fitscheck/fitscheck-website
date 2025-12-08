import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import WaitlistForm from '@/components/waitlistForm'
import { ArrowLeft, Upload, Users, TrendingUp, Award, MessageSquare, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: "Rate My Outfit Online – Free Fit Check Tool | FitsCheck",
  description: "Get instant feedback on your outfits from a real fashion community. Upload your fits, get community scores, and make confident style decisions with FitsCheck's free fit check tool.",
  keywords: [
    "rate my outfit online",
    "free fit check tool",
    "outfit rating",
    "community outfit feedback",
    "fit check platform",
    "outfit voting",
    "fashion feedback",
    "get outfit scores"
  ],
}

export default function RateMyOutfitPage() {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              Rate My Outfit Online – Free Fit Check Tool
            </h1>
            <p className="text-xl text-[#A3A3A3] text-center mb-12 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Get instant feedback on your outfits from a real fashion community. Upload your fits, get community scores, and make confident style decisions with FitsCheck.
            </p>

            {/* How It Works Section */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                How FitsCheck Works
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#003366] text-white">
                      <Upload className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      1. Upload Your Outfit
                    </h3>
                    <p className="text-lg text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Simply upload photos of your outfit to FitsCheck. You can post single looks or create "This or That" polls to get feedback on multiple outfit options. Add a description, tag your style, and share your fit with the community.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#003366] text-white">
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      2. Community Votes & Scores
                    </h3>
                    <p className="text-lg text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                      The FitsCheck community votes on your outfit in real-time. See instant feedback, community scores, and detailed comments from fashion lovers worldwide. Unlike AI styling apps, you get authentic opinions from real people who understand style.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#003366] text-white">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      3. Get Actionable Feedback
                    </h3>
                    <p className="text-lg text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Receive detailed feedback on what works and what doesn't. See which elements of your outfit resonate most with the community, get styling suggestions, and learn how to improve your future looks. Build your style confidence with every post.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Why Use FitsCheck for Outfit Ratings?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-6 w-6 text-[#F8E71C]" />
                    <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Real Community Feedback
                    </h3>
                  </div>
                  <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Get authentic opinions from real fashion lovers, not algorithms. Our community understands style, trends, and what looks good in real life.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-6 w-6 text-[#003366]" />
                    <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Instant Voting & Scores
                    </h3>
                  </div>
                  <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    See real-time votes and community scores as soon as you post. Get immediate feedback to help you make style decisions quickly.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-[#003366]" />
                    <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Free to Use
                    </h3>
                  </div>
                  <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    FitsCheck is completely free. Upload unlimited outfits, get community feedback, and participate in style challenges without any cost.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-[#003366]" />
                    <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Fashion-Focused Community
                    </h3>
                  </div>
                  <p className="text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Join a community built exclusively for fashion. Unlike generic social media, everyone here is passionate about style and outfit feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Perfect For Every Style Situation
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-[#F0F7FF] rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Deciding Between Outfit Options
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Can't decide between two outfits? Post a "This or That" poll and let the community help you choose. Get instant votes to see which look the fashion community prefers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F0F7FF] rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Getting Pre-Event Feedback
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Planning a special event? Upload your outfit options before the big day and get community feedback to ensure you look your best. Perfect for dates, parties, job interviews, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F0F7FF] rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Building Your Style Confidence
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Share your daily outfits and get positive feedback from the community. Build confidence in your style choices and discover what looks best on you through community ratings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F0F7FF] rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Improving Your Fashion Sense
                    </h3>
                    <p className="text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Learn from community feedback. See what elements of your outfits get the most votes and use that knowledge to refine your style and make better fashion decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waitlist Form Section */}
            {/* <div className="bg-[#003366] rounded-2xl p-8 md:p-12 mb-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  Ready to Get Your Outfits Rated?
                </h2>
                <p className="text-lg text-white/90 mb-8 text-center" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Join the FitsCheck waitlist to be among the first to upload your fits and get community scores. Start building your style confidence today.
                </p>
                <WaitlistForm />
              </div>
            </div> */}

            {/* CTA Section */}
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Start Getting Outfit Feedback Today
              </h2>
              <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join thousands of fashion lovers using FitsCheck to get real community feedback on their outfits. Make confident style decisions with the help of our fashion community.
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

