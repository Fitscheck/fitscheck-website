"use client"

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRound, Mail } from "lucide-react";
import { useWaitlist } from "@/lib/hooks/useWaitlist";

export default function WaitlistForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const { joinWaitlist, loading, err, isSuccess } = useWaitlist()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName.trim() || !email.trim()) {
      return
    }

    if (loading) {
      return
    }

    try {
      await joinWaitlist(fullName.trim(), email.trim())
      // Only clear form if successful
      setFullName("")
      setEmail("")
    } catch (error) {
      // Error is handled by the hook - it will display the error message
      // Form fields are kept so user can fix and resubmit
    }
  }


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4"
      style={{ fontFamily: "Satoshi Variable" }}
      >
        {/* Header */}
        <div className="text-center mb-12" >
          <h1
            className="text-3xl md:text-4xl lg:text-[96px] text-[#003366] lg:leading-[96px] lg:tracking-[-6%] font-extrabold "
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Join the <span className="text-[#F8E71C]">FitsCheck</span>
            <br />
            Waitlist
          </h1>
          <p className="text-lg sm:text-[20px] text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed font-medium">
            Perfect for content creators, influencers, fashion enthusiasts, and anyone who loves fashion. 
            Get crowd-sourced style decisions, share your affiliate links, earn style points, and compete on global and friends leaderboards.
          </p>
        </div>

        {/* Main Content: Form + Phone Mockups */}
        <div className="flex items-center justify-center gap-8 lg:gap-12 flex-col lg:flex-row">
          {/* Center Form */}
          <div className="w-full max-w-xl flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  className="block text-[#003366] font-bold text-base  md:text-xl mb-3"
                >
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg">
                  <UserRound className="text-[#003366] text-xl"/>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="lock text-[#003366] font-bold text-base md:text-xl mb-4"
                >
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg">
                  <Mail className="text-[#003366] text-xl" />
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || isSuccess}
                className="w-full bg-[#003366] hover:bg-[#003366]/90 text-primary-foreground font-bold py-8 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : isSuccess ? "Added to Waitlist! ✓" : "Join Waitlist"}
              </Button>

              {/* Messages */}
              <div className="min-h-[60px] flex items-center justify-center">
                {isSuccess && (
                  <div className="w-full p-4 bg-green-50 border-2 border-green-200 rounded-lg animate-fade-in">
                    <p className="text-center text-green-700 text-base font-semibold">
                      🎉 Thanks for joining! We'll be in touch soon.
                    </p>
                  </div>
                )}

                {err && !isSuccess && (
                  <div className="w-full p-4 bg-red-50 border-2 border-red-200 rounded-lg animate-fade-in">
                    <p className="text-center text-red-700 text-base font-semibold">
                      {err}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
