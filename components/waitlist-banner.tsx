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
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-sm font-medium text-white drop-shadow-md">
                    🚀 Launching Soon! Join the waitlist for early access
                </p>
                <button
                    onClick={scrollToWaitlist}
                    className="ml-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#003366] transition hover:bg-gray-100"
                >
                    Join Waitlist →
                </button>
            </div>
        </StickyBanner>
    );
}
