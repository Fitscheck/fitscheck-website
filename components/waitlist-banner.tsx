"use client";

import { StickyBanner } from "@/components/ui/sticky-banner";

export default function WaitlistBanner() {
    const scrollToWaitlist = () => {
        const section = document.getElementById("waitlist");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <StickyBanner className="bg-gradient-to-r from-[#003366] to-[#F8E71C]">
            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                <p className="text-xs sm:text-sm md:text-base font-medium text-white drop-shadow-md leading-tight">
                    <span className="hidden sm:inline">🚀 Launching Soon! Join the waitlist for early access</span>
                    <span className="sm:hidden">🚀 Join waitlist for early access</span>
                </p>
                <button
                    onClick={scrollToWaitlist}
                    className="shrink-0 rounded-full bg-white px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-[#003366] transition hover:bg-gray-100 hover:scale-105 shadow-sm"
                >
                    <span className="hidden sm:inline">Join Waitlist →</span>
                    <span className="sm:hidden">Join →</span>
                </button>
            </div>
        </StickyBanner>
    );
}
