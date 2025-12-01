"use client";

import { StickyBanner } from "@/components/ui/sticky-banner";

export default function FoundingCreatorBanner() {
    const scrollToApply = () => {
        const section = document.getElementById("apply");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <StickyBanner className="bg-gradient-to-r from-[#003366] to-[#F8E71C]">
            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                <p className="text-xs sm:text-sm md:text-base font-medium text-white drop-shadow-md leading-tight">
                    <span className="hidden sm:inline">✨ Become a Founding Creator - Limited to first 100</span>
                    <span className="sm:hidden">✨ Apply as Founding Creator</span>
                </p>
                <button
                    onClick={scrollToApply}
                    className="shrink-0 rounded-full bg-white px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-[#003366] transition hover:bg-gray-100 hover:scale-105 shadow-sm"
                >
                    <span className="hidden sm:inline">Apply Now →</span>
                    <span className="sm:hidden">Apply →</span>
                </button>
            </div>
        </StickyBanner>
    );
}


