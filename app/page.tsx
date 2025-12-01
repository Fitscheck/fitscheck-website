import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import WaitlistBanner from '@/components/waitlist-banner'
import WaitlistForm from '@/components/waitlistForm'
import JoinersCarousel from '@/components/joiners-carousel'
import WhatToExpectSection from '@/components/what-expect'
import FAQSection from '@/components/faq'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: "FitsCheck - Fashion Community App & Outfit Voting Platform",
  description: "Join FitsCheck - the social fashion platform where the community votes on your outfits through crowd-sourced style decisions. Post fits, compete in challenges, climb leaderboards.",
  keywords: [
    "fashion community app",
    "outfit voting platform",
    "social fashion challenges",
    "fashion leaderboard app",
    "this or that fashion app",
    "crowd-sourced style decisions",
    "fashion competition app",
    "fit check platform",
    "outfit voting",
    "style challenges",
    "OOTD community",
    "fashion app",
    "style decisions",
    "fashion influencer",
    "best fashion community 2025",
    "TikTok style alternatives",
    "Instagram fashion community"
  ],
}

export default function Waitlist() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FitsCheck",
    "applicationCategory": "LifestyleApplication",
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
    "description": "Join FitsCheck - the social fashion platform where the community votes on your outfits through crowd-sourced style decisions. Post fits, compete in challenges, climb leaderboards.",
    "screenshot": "https://fitscheck.com/mockups/full_mockup.svg",
    "featureList": [
      "Outfit Voting & Community Feedback",
      "Fit Check Platform",
      "Style Challenges",
      "Fashion Community",
      "OOTD Sharing",
      "Fashion Feedback",
      "Shop This Look with Affiliate Links",
      "Style Points & Leaderboards"
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FitsCheck",
    "url": "https://fitscheck.com",
    "logo": "https://fitscheck.com/branding/FitsCheck.svg",
    "description": "FitsCheck - the social fashion platform where the community votes on your outfits through crowd-sourced style decisions",
    "sameAs": [
      "https://www.instagram.com/fitscheckofficial",
      "https://www.tiktok.com/@fitscheckofficial",
      "https://x.com/fitscheckapp"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <WaitlistBanner />

      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero/hero_img.webp"
            alt="Young fashion creators sharing outfits and getting ratings on FitsCheck app"
            fill
            priority
            className="object-cover object-[center_20%] sm:object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="text-center space-y-6">
              <Image
              src="/branding/FitsCheck.svg"
              alt="FitsCheck Logo - Fashion Community App"
              width={200}
              height={60}
              className="w-32 sm:w-40 md:w-52 lg:w-64 h-auto drop-shadow-2xl mx-auto"
              priority
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              The Social Platform for Outfit Ratings & Fashion Community Voting
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Post your fits. Community votes. You win.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-8 h-[52px] border-4 border-white rounded-full flex items-start justify-center p-2 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="lg:min-h-screen flex flex-col items-center bg-[#F9FAFB] text-black mt-20 lg:mt-[118px] mb-10 lg:mb-[118px]">
        <WaitlistForm />
      </section>

      <section className=" mb-6">
        <JoinersCarousel />
      </section>

      <section id="features" className="w-full bg-[#FEFBD7]" style={{ fontFamily: "var(--font-satoshi)" }}><WhatToExpectSection />
      </section>

      <section id="how-it-works" className="w-full py-20 lg:py-[118px] bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              How It Works
            </h2>
            <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Join thousands of fashion enthusiasts using our fashion community app to make crowd-sourced style decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Post Your Outfit
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                Share your OOTD (Outfit of the Day) or style options on our fit check platform. Upload photos and add details about your look.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Get Instant Ratings
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                The fashion community votes on your posts, providing real-time feedback and crowd-sourced style decisions to help you make better fashion choices.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Join Style Challenges
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                Participate in themed fashion challenges, compete with other creators, and showcase your unique style to win style points.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#003366] text-white text-3xl font-bold mb-4">
                4
              </div>
              <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Earn & Grow
              </h3>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                Earn style points, climb leaderboards, monetize with affiliate links, and build your presence in the fashion community.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/how-it-works" 
              className="inline-block text-lg font-semibold text-[#003366] hover:text-[#F8E71C] transition-colors"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Learn more about how FitsCheck works →
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-20 lg:py-[118px] bg-[#F0F7FF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-8 text-center" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              About FitsCheck
            </h2>
            <div className="space-y-6 text-lg text-[#A3A3A3] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
              <p>
                FitsCheck is the premier fashion community app and outfit voting platform designed for fashion enthusiasts, content creators, and style lovers worldwide. Our mission is to revolutionize how people make fashion decisions by connecting them with a vibrant community that provides honest, crowd-sourced style decisions on their fashion choices.
              </p>
              <p>
                Unlike AI-only styling apps, FitsCheck is built around real people, real opinions, and social competition—making fashion decisions fun, social, and community-driven. Whether you're looking for outfit voting on your latest OOTD, seeking fashion feedback from experienced stylists, or wanting to participate in exciting style challenges, FitsCheck offers a comprehensive fashion community app experience. We've built a platform that combines the best aspects of social media, fashion blogging, and community engagement into one seamless application.
              </p>
              <p>
                As an alternative to traditional fashion platforms like Instagram and TikTok, FitsCheck focuses specifically on crowd-sourced style decisions and community engagement. Our unique features include outfit voting, social fashion challenge competitions, affiliate link integration for monetization, and fashion leaderboards that celebrate the most stylish creators in our community.
              </p>
              <p>
                Join thousands of fashion-forward individuals who are already using FitsCheck to elevate their style game, connect with like-minded fashion lovers, and turn their passion for fashion into a thriving community presence. Whether you're in the UK, US, or anywhere else in the world, FitsCheck is your go-to destination for fashion community engagement in 2025 and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <FAQSection />
      </section>
      <Footer />

    </>
  )
}
