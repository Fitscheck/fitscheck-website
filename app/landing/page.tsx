import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Star, CheckCircle2, Users, TrendingUp, ShoppingBag, MessageSquare } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FAQSection from '@/components/faq'
import WhatToExpectSection from '@/components/what-expect'

export const metadata: Metadata = {
  title: "FitsCheck - Make Fashion Decisions with Community Voting | Download Now",
  description: "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, earn style points, and compete on global leaderboards. Download FitsCheck for iOS and Android.",
  keywords: [
    "fashion app",
    "style decisions",
    "outfit voting",
    "fashion community",
    "affiliate links",
    "fashion influencer",
    "style tips",
    "fashion leaderboard",
    "this or that fashion",
    "shop this look",
    "fashion monetization",
    "style points"
  ],
  authors: [{ name: "FitsCheck Team" }],
  creator: "FitsCheck",
  publisher: "FitsCheck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fitscheck.com/landing",
    siteName: "FitsCheck",
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content.",
    images: [
      {
        url: "/hero1.webp",
        width: 1200,
        height: 630,
        alt: "FitsCheck - Fashion Decision Making App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content. Download now!",
    images: ["/hero1.webp"],
    creator: "@fitscheck",
  },
  alternates: {
    canonical: "https://fitscheck.com/landing",
  },
  category: "Fashion",
  classification: "Social Media App",
}

export default function LandingPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FitsCheck",
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1240"
    },
    "description": "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, earn style points, and compete on global leaderboards.",
    "screenshot": "https://fitscheck.com/hero1.webp",
    "featureList": [
      "This or That Voting",
      "Shop This Look with Affiliate Links",
      "Fashion Tips & Style",
      "Style Points & Leaderboards"
    ]
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When will Fitscheck launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We're planning to launch the beta version in December 2025, with a full public release in Autumn 2025."
        }
      },
      {
        "@type": "Question",
        "name": "Will the app be free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, FitsCheck will be completely free to use for all members."
        }
      },
      {
        "@type": "Question",
        "name": "What platforms will FitsCheck be available on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FitsCheck will be available on both iOS and Android, as well as web browsers for desktop access."
        }
      },
      {
        "@type": "Question",
        "name": "Will waitlist members get early access?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Waitlist members will get an early creators badge and access to the beta version."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FEFBD7] to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/new_hero.png')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center rounded-full border border-[#003366]/20 bg-[#003366]/5 px-4 py-2 text-sm font-medium text-[#003366]">
                <span>Now Available on iOS & Android</span>
                <div className="ml-2 h-2 w-2 rounded-full bg-[#F8E71C] animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <h1
                  className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#003366] leading-tight"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Make Fashion Decisions with{' '}
                  <span className="text-[#F8E71C]">FitsCheck</span>
                </h1>
                <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                  Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions,
                  share your affiliate links, earn style points, and compete on global and friends leaderboards.
                </p>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for Android
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-[#003366]">10K+</div>
                  <div className="text-sm text-[#A3A3A3]">Active Users</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-[#003366]">50K+</div>
                  <div className="text-sm text-[#A3A3A3]">Style Decisions</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-[#003366]">4.8★</div>
                  <div className="text-sm text-[#A3A3A3]">App Rating</div>
                </div>
              </div>
            </div>

            {/* Right - Phone Mockups */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -left-8 top-1/4 hidden lg:block">
                  <Image
                    src="/mockups/phone_mockup.svg"
                    alt="FitsCheck App"
                    width={200}
                    height={400}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="relative z-10">
                  <Image
                    src="/mockups/phone_mockup2.svg"
                    alt="FitsCheck App"
                    width={300}
                    height={600}
                    className="object-contain drop-shadow-2xl mx-auto"
                  />
                </div>
                <div className="absolute -right-8 top-1/3 hidden lg:block">
                  <Image
                    src="/mockups/phone_mockup.svg"
                    alt="FitsCheck App"
                    width={200}
                    height={400}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-[118px] bg-white">
        <WhatToExpectSection />
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-[118px] bg-[#F0F7FF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              How It Works
            </h2>
            <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "Satoshi Variable" }}>
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Create Your Post
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Post your outfit options, OOTD, or fashion tips. Add affiliate links to monetize your content.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Get Feedback
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                The community votes on your posts, helping you make the perfect style decision.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Earn & Compete
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Earn style points, climb leaderboards, and get commissions from affiliate sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 lg:py-[118px] bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Why Choose FitsCheck?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-[#FEFBD7] rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Community Driven
              </h3>
              <p className="text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Get real feedback from a community of fashion enthusiasts and style experts.
              </p>
            </div>

            <div className="bg-[#FEFBD7] rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Monetize Content
              </h3>
              <p className="text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Share affiliate links and promo codes to earn commissions from your fashion content.
              </p>
            </div>

            <div className="bg-[#FEFBD7] rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Leaderboards
              </h3>
              <p className="text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Compete globally or with friends. Earn style points and showcase your fashion influence.
              </p>
            </div>

            <div className="bg-[#FEFBD7] rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Style Tips
              </h3>
              <p className="text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                Share your fashion expertise and help others elevate their style game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-[118px] bg-[#F0F7FF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah M.",
                role: "Fashion Influencer",
                content: "FitsCheck has completely changed how I make style decisions. The community feedback is invaluable!",
                rating: 5
              },
              {
                name: "Jessica K.",
                role: "Content Creator",
                content: "I love being able to monetize my OOTD posts with affiliate links. The 'Shop This Look' feature is a game-changer!",
                rating: 5
              },
              {
                name: "Emily R.",
                role: "Fashion Enthusiast",
                content: "The leaderboards make it so fun! I love competing with my friends and seeing who has the best style.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#F8E71C] text-[#F8E71C]" />
                  ))}
                </div>
                <p className="text-[#A3A3A3]" style={{ fontFamily: "Satoshi Variable" }}>
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-[#003366]">{testimonial.name}</div>
                  <div className="text-sm text-[#A3A3A3]">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Download Section */}
      <section className="py-20 lg:py-[118px] bg-gradient-to-b from-[#003366] to-[#002244] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2
              className="text-3xl md:text-4xl lg:text-7xl font-bold mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Ready to Transform Your Fashion Game?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: "Satoshi Variable" }}>
              Join thousands of fashion enthusiasts making better style decisions and monetizing their content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-[#F8E71C] hover:bg-[#F8E71C]/90 text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for iOS
              </Button>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </>
  )
}