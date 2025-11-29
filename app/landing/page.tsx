import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Download, CheckCircle2 } from 'lucide-react'
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
      <section className="relative min-h-[auto] md:min-h-[85vh] flex items-center justify-center bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-12 md:py-20">
          <div className="grid gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-4 md:space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center rounded-full border border-[#003366]/10 bg-[#003366]/5 px-3 py-1.5 text-xs font-medium text-[#003366] tracking-wide uppercase">
                <span>Now Available</span>
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-[#F8E71C]"></div>
              </div>

              <div className="space-y-3 md:space-y-5">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] leading-[1.2] tracking-tight"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Your Fashion. Your Community. Your Decisions.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                  A new fashion-only platform for creators, influencers, affiliates and everyday style lovers.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                  Post outfits, get real-time "This or That" votes, share affiliate links, join challenges, and earn style points — all in one place.
                </p>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button
                  size="default"
                  className="bg-[#003366] hover:bg-[#003366]/90 text-white px-5 py-2.5 sm:px-6 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download App
                </Button>
                <Link href="/founding-creator" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    variant="outline"
                    className="border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-5 py-2.5 sm:px-6 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto"
                  >
                    Become a Creator
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-full">
                <div className="relative z-10 w-full">
                  <Image
                    src="/hero/hero_img.webp"
                    alt="FitsCheck App"
                    width={600}
                    height={800}
                    className="object-cover w-full h-auto rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FitsCheck Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center space-y-3 md:space-y-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366]"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Why FitsCheck?
            </h2>
            <h3
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#003366]"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              A Home Built for Fashion. Not the Algorithm.
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-2xl mx-auto px-2" style={{ fontFamily: "Satoshi Variable" }}>
              FitsCheck is the first platform designed ONLY for fashion creators and enthusiasts.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-2xl mx-auto px-2" style={{ fontFamily: "Satoshi Variable" }}>
              No noise. No random content. Just pure style.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] mb-2"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Core Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* This or That Voting */}
            <div className="bg-[#FAFAFA] rounded-lg p-4 md:p-6 space-y-3 border border-[#E5E5E5]">
              <h3 className="text-base md:text-lg font-semibold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                This or That Voting
              </h3>
              <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                Can't decide between two outfits? Post both and get instant votes from real fashion lovers.
              </p>
            </div>

            {/* Shop This Look */}
            <div className="bg-[#FAFAFA] rounded-lg p-4 md:p-6 space-y-3 border border-[#E5E5E5]">
              <h3 className="text-base md:text-lg font-semibold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Shop This Look
              </h3>
              <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                Attach your Fashion Nova, PLT, Amazon, Shein or any affiliate link to your outfit. Earn when people shop your look.
              </p>
            </div>

            {/* Outfit Posts & Style Tips */}
            <div className="bg-[#FAFAFA] rounded-lg p-4 md:p-6 space-y-3 border border-[#E5E5E5]">
              <h3 className="text-base md:text-lg font-semibold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Outfit Posts & Style Tips
              </h3>
              <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                Share your OOTDs, beauty looks, tips, and aesthetic inspiration.
              </p>
            </div>

            {/* Style Points & Leaderboards */}
            <div className="bg-[#FAFAFA] rounded-lg p-4 md:p-6 space-y-3 border border-[#E5E5E5]">
              <h3 className="text-base md:text-lg font-semibold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Style Points & Leaderboards
              </h3>
              <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                Earn points for posting, engaging and participating in challenges. Climb the global & friends leaderboards.
              </p>
            </div>

            {/* Creator Challenges */}
            <div className="bg-[#FAFAFA] rounded-lg p-4 md:p-6 space-y-3 border border-[#E5E5E5] md:col-span-2 lg:col-span-1">
              <h3 className="text-base md:text-lg font-semibold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Creator Challenges
              </h3>
              <p className="text-sm text-[#666] leading-relaxed" style={{ fontFamily: "Satoshi Variable" }}>
                Join weekly style challenges hosted by the FitsCheck team. Get featured and grow your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Everyone Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] mb-2"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Designed for Everyone Who Loves Fashion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {[
              "Creators",
              "Fashion enthusiasts",
              "Affiliates",
              "Stylists",
              "Content creators",
              "Everyday people asking \"what should I wear?\""
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2.5 md:p-3 border border-[#E5E5E5]">
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#003366] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[#003366] font-medium" style={{ fontFamily: "Satoshi Variable" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Community Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366]"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Built for Community
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#003366] font-medium" style={{ fontFamily: "Satoshi Variable" }}>
              FitsCheck is where fashion feels fun again.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#666]" style={{ fontFamily: "Satoshi Variable" }}>
              Vote. Comment. Inspire. Be inspired.
            </p>
          </div>
        </div>
      </section>


      {/* CTA Download Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-[#003366] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-2"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Join the fashion community built just for you.
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                size="default"
                className="bg-[#F8E71C] hover:bg-[#F8E71C]/90 text-[#003366] px-5 py-2.5 sm:px-6 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Get the App
              </Button>
              <Link href="/founding-creator" className="w-full sm:w-auto">
                <Button
                  size="default"
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-[#003366] px-5 py-2.5 sm:px-6 rounded-full text-sm font-medium tracking-wide w-full sm:w-auto"
                >
                  Become a Founding Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 lg:py-24 bg-white">
        <FAQSection />
      </section>

      <Footer />
    </>
  )
}

