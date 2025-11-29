"use client"

import React from 'react'
import FoundingCreatorForm from '@/components/founding-creator-form'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function FoundingCreatorPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#003366]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Become a <span className="text-[#F8E71C]">Founding Creator</span>
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Join the first 100 fashion creators shaping the future of style.
          </p>
          
          <p 
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            We're building a new fashion-only platform designed for creators, influencers, affiliates, and everyday style lovers. If you love posting outfits, giving style advice, or sharing affiliate links — this is your new home.
          </p>
          
          <div className="mt-8 inline-block px-6 py-2 bg-[#F8E71C]/20 text-white rounded-full text-sm border border-[#F8E71C]/30">
            Only the First 100 Creators
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

      {/* Why Become a Founding Creator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-12 text-center"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Why Become a Founding Creator?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Lifetime Founding Creator Badge</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Only given to the first wave of creators. Displayed permanently on your profile.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Guaranteed Home Page Feature</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Your posts will be highlighted during launch week.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Grow Faster Than Instagram</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                This is a niche community built ONLY for fashion — not a crowded algorithm.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Post "This or That" & Shop-The-Look Content</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Let people vote on your outfits. Attach affiliate links. Share styling tips. Earn commissions from your links.
              </p>
            </div>
            
            {/* Benefit 5 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Early Access to Challenges & Leaderboards</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Founding creators get boosted style points and priority in featured challenges.
              </p>
            </div>
            
            {/* Benefit 6 */}
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50">
              <h3 className="text-xl font-semibold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>Private Access to the Creator Circle</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                A private group for feedback, updates, collabs, and early features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4 text-center"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Who Can Join?
          </h2>
          
          <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
            You don't need 10k followers. You just need passion.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Fashion creators',
              'TikTok / Instagram outfit posters',
              'Fashion Nova, PLT, Amazon affiliates',
              'Style lovers',
              'Outfit inspo girls',
              'Micro-influencers',
              'Modest fashion creators',
              'Streetwear creators',
              'Thrift / aesthetic creators'
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
              >
                <span className="text-[#003366] text-sm">✓</span>
                <span className="text-gray-700 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>{item}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-base text-gray-600 mt-10" style={{ fontFamily: "var(--font-satoshi)" }}>
            If fashion is your thing — you belong here.
          </p>
        </div>
      </section>

      {/* What You'll Be Able to Do Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-10 text-center"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            What You'll Be Able to Do Inside the App
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Post outfits',
              'Ask "This or That?" and get instant votes',
              'Attach affiliate links to your looks',
              'Share styling tips',
              'Join fashion challenges',
              'Earn style points',
              'Climb global and friends leaderboards',
              'Build your following in a fashion-focused community',
              'Tag your favorite brands',
              'Discover new creators'
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50/50"
              >
                <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>{feature}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-lg text-[#003366] mt-10 font-semibold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
            This is where fashion creators shine.
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-[#003366]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Apply for Early Access
            </h2>
            <p className="text-base text-white/90 mb-6" style={{ fontFamily: "var(--font-satoshi)" }}>
              Enter your details to get your invitation
            </p>
            <div className="inline-block px-4 py-1.5 bg-[#F8E71C]/20 text-white rounded-full text-xs border border-[#F8E71C]/30">
              We're Only Taking the First 100 Creators
            </div>
            <p className="text-white/70 mt-4 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
              Once the slots are full, the badge disappears forever.
            </p>
          </div>
          
          <FoundingCreatorForm />
          
          <div className="mt-10 text-center text-white/80">
            <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>After You Apply</h3>
            <p className="mb-3 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>You'll receive:</p>
            <ul className="list-none space-y-1.5 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
              <li>• A confirmation email</li>
              <li>• Your invite link when approved</li>
              <li>• Access to our private Creator Circle</li>
              <li>• Your Founding Creator badge on launch day</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-[#F8E71C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Be Part of Fashion History
          </h2>
          <p className="text-lg text-[#003366] mb-8" style={{ fontFamily: "var(--font-satoshi)" }}>
            Join the creators shaping the future of style.
          </p>
          <a 
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('apply');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block px-6 py-3 bg-[#003366] text-white rounded-full font-semibold text-base hover:bg-[#002244] transition-colors cursor-pointer"
          >
            Apply as a Founding Creator →
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

