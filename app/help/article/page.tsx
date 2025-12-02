"use client"

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

function HelpArticleContent() {
  const searchParams = useSearchParams()
  const articleId = searchParams.get('id')

  // If the article ID is "create-account", show the create account content
  if (articleId === 'create-account') {
    return (
      <>
        {/* Hero Section */}
        <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#003366] to-[#002244]">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              How to Create an Account
            </h1>
            
            <p 
              className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              FitsCheck is currently in development, but you can get early access in two ways:
            </p>
          </div>
        </section>

        {/* Options Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Choose Your Path to Early Access
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join us as we build the future of fashion community engagement
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Founding Creator Option */}
              <div className="border-2 border-[#003366] rounded-lg p-8 bg-gradient-to-br from-[#003366] to-[#002244] text-white">
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-[#F8E71C]/20 text-white rounded-full text-sm border border-[#F8E71C]/30 mb-4">
                    Limited to First 100
                  </div>
                  <h3 
                    className="text-2xl sm:text-3xl font-extrabold mb-4"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Become a Founding Creator
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Join the first 100 fashion creators shaping the future of style. Get exclusive benefits, lifetime badge, and priority access.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8" style={{ fontFamily: "var(--font-satoshi)" }}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F8E71C] mt-1">✓</span>
                    <span>Lifetime Founding Creator Badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F8E71C] mt-1">✓</span>
                    <span>Priority Support & Direct Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F8E71C] mt-1">✓</span>
                    <span>Early Access to Challenges & Leaderboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F8E71C] mt-1">✓</span>
                    <span>Private Creator Circle Access</span>
                  </li>
                </ul>

                <Link href="/founding-creator">
                  <Button
                    className="w-full bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] font-semibold py-3 rounded-full text-base"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Apply as Founding Creator →
                  </Button>
                </Link>
              </div>

              {/* Waitlist Option */}
              <div className="border-2 border-gray-200 rounded-lg p-8 bg-gray-50">
                <div className="mb-6">
                  <h3 
                    className="text-2xl sm:text-3xl font-extrabold text-[#003366] mb-4"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Join the Waitlist
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Be among the first to know when FitsCheck launches. Get early access to the app and start your fashion journey.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8" style={{ fontFamily: "var(--font-satoshi)" }}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#003366] mt-1">✓</span>
                    <span>Early Access When We Launch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#003366] mt-1">✓</span>
                    <span>Updates on App Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#003366] mt-1">✓</span>
                    <span>Exclusive Launch Offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#003366] mt-1">✓</span>
                    <span>Join a Growing Fashion Community</span>
                  </li>
                </ul>

                <Link href="/#waitlist">
                  <Button
                    className="w-full bg-[#003366] hover:bg-[#002244] text-white font-semibold py-3 rounded-full text-base"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Join Waitlist →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Apply Section */}
        <section className="py-16 bg-[#F0F7FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Choose one of the options above, or scroll down to apply directly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-4"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Apply for Founding Creator
                </h3>
                <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Limited to the first 100 creators. Apply now to secure your spot.
                </p>
                <Link href="/founding-creator">
                  <Button
                    variant="outline"
                    className="w-full border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Learn More →
                  </Button>
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-4"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Join the Waitlist
                </h3>
                <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Be notified when FitsCheck launches and get early access.
                </p>
                <Link href="/#waitlist">
                  <Button
                    variant="outline"
                    className="w-full border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Join Now →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-10 text-center"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-2"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  When will FitsCheck be available?
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                  We're currently in development and working hard to launch soon. Founding Creators and waitlist members will be the first to get access when we launch.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-2"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  What's the difference between Founding Creator and Waitlist?
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Founding Creators are the first 100 creators who get exclusive benefits like a lifetime badge, priority support, and early access to features. The waitlist is open to everyone and provides early access when we launch.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-2"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Can I join both?
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Yes! You can apply for Founding Creator status and also join the waitlist. If you're accepted as a Founding Creator, you'll automatically get all waitlist benefits plus the exclusive Founding Creator perks.
                </p>
              </div>

              <div className="pb-6">
                <h3 
                  className="text-xl font-bold text-[#003366] mb-2"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  How do I create an account once the app launches?
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                  Once FitsCheck launches, you'll receive an email with instructions on how to create your account. Founding Creators will get priority access, followed by waitlist members, and then the general public.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    )
  }

  // Default content if article ID doesn't match
  return (
    <>
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#003366] to-[#002244]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Help Article Not Found
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            The article you're looking for doesn't exist.
          </p>

          <Link href="/">
            <Button
              className="bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] font-semibold py-3 px-6 rounded-full"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Go to Homepage
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default function HelpArticlePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#003366]">
        <div className="text-center">
          <div className="text-white text-xl" style={{ fontFamily: "var(--font-satoshi)" }}>
            Loading...
          </div>
        </div>
      </div>
    }>
      <HelpArticleContent />
    </Suspense>
  )
}

