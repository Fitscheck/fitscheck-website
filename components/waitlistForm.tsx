"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useWaitlist } from "@/lib/hooks/useWaitlist";
import { toast } from "sonner";

export default function WaitlistForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const { joinWaitlist, loading, err, isSuccess } = useWaitlist()

  useEffect(() => {
    if (isSuccess) {
      toast.success("🎉 Thanks for joining! We'll be in touch soon.");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

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
      setFullName("")
      setEmail("")
    } catch (error) {
    }
  }


  return (
    <div className="relative w-full">
      <div className="absolute left-0 top-[119px] hidden lg:block pointer-events-none">
        <Image src="/mockups/phone_mockup.svg" alt="Phone Mockup" width={200} height={400} className="object-contain" />
      </div>
      <div className="absolute right-0 top-[119px] hidden lg:block pointer-events-none">
        <Image src="/mockups/phone_mockup2.svg" alt="Phone Mockup" width={200} height={400} className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4" style={{ fontFamily: "var(--font-satoshi)" }}>
        <div className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.06em] font-black mb-6 text-[#003366]"
            style={{ fontFamily: "var(--font-whyte-inktrap)", fontWeight: 950 }}
          >
            Join the
            <br />
            <span className="text-[#F8E71C]">FitsCheck</span> Waitlist
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-[20px] leading-[1.2] font-medium text-[#A3A3A3] max-w-3xl mx-auto">
            Post your fits. Community votes. You win. <br /> Be the first to join our social fashion platform.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[#003366] font-bold text-xl mb-[7px]">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg">
                  <Image src="/icon/user-icon.svg" alt="User" width={20} height={20} />
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

              <div>
                <label className="block text-[#003366] font-bold text-xl mb-[7px]">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg">
                  <Image src="/icon/mail-icon.svg" alt="Mail" width={20} height={20} />
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

              <Button
                type="submit"
                disabled={loading || isSuccess}
                className="w-full bg-[#003366] hover:bg-[#003366]/90 text-primary-foreground font-bold py-8 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed !mt-10"
              >
                {loading ? "Adding..." : isSuccess ? "Added to Waitlist! ✓" : "Join Waitlist"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


