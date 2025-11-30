"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserRound, Mail, Instagram, Hash } from "lucide-react";
import { useFoundingCreator } from "@/lib/hooks/useFoundingCreator";
import { toast } from "sonner";

export default function FoundingCreatorForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [handle, setHandle] = useState("")
  const [niche, setNiche] = useState("")
  const { apply, loading, err, isSuccess } = useFoundingCreator()

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thanks for applying! We'll review your application and be in touch soon.");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, [err]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      return
    }

    if (loading) {
      return
    }

    try {
      await apply(
        name.trim(),
        email.trim(),
        handle.trim() || undefined,
        niche.trim() || undefined
      )
      setName("")
      setEmail("")
      setHandle("")
      setNiche("")
    } catch (error) {
    }
  }

  return (
    <div id="apply" className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-white font-semibold text-sm mb-2"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Name
          </label>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus-within:border-[#F8E71C] transition-colors">
            <UserRound className="text-white text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
              style={{ fontFamily: "var(--font-satoshi)" }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-white font-semibold text-sm mb-2"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Email
          </label>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus-within:border-[#F8E71C] transition-colors">
            <Mail className="text-white text-lg flex-shrink-0" />
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
              style={{ fontFamily: "var(--font-satoshi)" }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-white font-semibold text-sm mb-2"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Instagram / TikTok Handle <span className="text-white/70 font-normal text-xs" style={{ fontFamily: "var(--font-satoshi)" }}>(optional)</span>
          </label>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus-within:border-[#F8E71C] transition-colors">
            <Instagram className="text-white text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="@yourhandle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
              style={{ fontFamily: "var(--font-satoshi)" }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-white font-semibold text-sm mb-2"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Your Niche <span className="text-white/70 font-normal text-xs" style={{ fontFamily: "var(--font-satoshi)" }}>(optional)</span>
          </label>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus-within:border-[#F8E71C] transition-colors">
            <Hash className="text-white text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="e.g., Streetwear, Modest Fashion, Thrift..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
              style={{ fontFamily: "var(--font-satoshi)" }}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || isSuccess}
          className="w-full bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] font-semibold py-3 rounded-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-whyte-inktrap)" }}
        >
          {loading ? "Applying..." : isSuccess ? "Application Submitted!" : "Apply Now"}
        </Button>
      </form>
    </div>
  );
}

