"use client"

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRound, Mail } from "lucide-react";

export default function WaitlistForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setFullName("")
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 3000)
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
            Be the first to know when our social fashion platform launches.
            Share your style, get feedback, and join style challenges.
          </p>
        </div>

        {/* Main Content: Form + Phone Mockups */}
        <div className="flex items-center justify-center gap-8 lg:gap-12 flex-col lg:flex-row mb-16">
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
                className="w-full bg-[#003366] hover:bg-[#003366]/90 text-primary-foreground font-bold py-8 rounded-full text-lg"
                
              >
                {isSubmitted ? "Added to Waitlist!" : "Join Waitlist"}
              </Button>

              {isSubmitted && (
                <p className="text-center text-green-600 text-sm font-medium animate-fade-in">
                  Thanks for joining! We'll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
