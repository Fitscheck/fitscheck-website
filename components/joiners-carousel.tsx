"use client"

import { useState, useEffect } from "react"

const joiners = [
    { name: "Tatiana Baptista", color: "bg-[#FF5D5D]", initials: "TB" },
    { name: "Zain Siphron", color: "bg-[#868EFF]", initials: "ZS" },
    { name: "Corey Levin", color: "bg-[#00FFFF]", initials: "CL" },
    { name: "Alena Carder", color: "bg-[#C8A2FF]", initials: "AC" },
    { name: "Kianna Schleifer", color: "bg-[#A8E6CF]", initials: "KS" },
    { name: "Jaylon Vaccaro", color: "bg-[#FF007F]", initials: "JV" },
    { name: "Marcus Ekstrom", color: "bg-yellow-400", initials: "ME" },
    { name: "Sofia Rodriguez", color: "bg-indigo-500", initials: "SR" },
    { name: "Alex Chen", color: "bg-orange-500", initials: "AC" },
    { name: "Emma Wilson", color: "bg-violet-500", initials: "EW" },
]

export default function JoinersCarousel() {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => (prev + 1) % (joiners.length * 2))
        }, 30)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-4" style={{ fontFamily: "Satoshi Variable" }}>
            {/* Left moving carousel */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-3 sm:gap-4"
                    style={{
                        animation: `scroll 60s linear infinite`,
                        transform: `translateX(-${offset * 8}px)`,
                    }}
                >
                    {[...joiners, ...joiners].map((joiner, idx) => (
                        <div
                            key={idx}
                            className={`${joiner.color} rounded-full px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-white font-bold text-sm sm:text-base flex items-center gap-2 flex-shrink-0`}
                        >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">
                                {joiner.initials[0]}
                            </div>
                            {joiner.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right moving carousel */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-3 sm:gap-4"
                    style={{
                        animation: `scrollReverse 60s linear infinite`,
                        transform: `translateX(${offset * 8}px)`,
                    }}
                >
                    {[...joiners, ...joiners].map((joiner, idx) => (
                        <div
                            key={idx}
                            className={`${joiner.color} rounded-full px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-white font-bold text-sm sm:text-base flex items-center gap-2 flex-shrink-0`}
                        >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">
                                {joiner.initials[0]}
                            </div>
                            {joiner.name}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${joiners.length * 150}px);
                    }
                }

                @keyframes scrollReverse {
                    0% {
                        transform: translateX(-${joiners.length * 150}px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    )
}
