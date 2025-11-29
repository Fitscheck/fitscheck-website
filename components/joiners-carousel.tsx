"use client"

import { useState, useEffect } from "react"

const joiners = [
    { name: "Lionel Emmanuel", color: "bg-[#FF5D5D]", initials: "LE" },
    { name: "Elijah Victor", color: "bg-[#868EFF]", initials: "EV" },
    { name: "Mercy Johnson", color: "bg-[#00FFFF]", initials: "MJ" },
    { name: "Ummi Nash", color: "bg-[#C8A2FF]", initials: "UN" },
    { name: "James Thompson", color: "bg-[#A8E6CF]", initials: "JT" },
    { name: "Elizabeth Bennett", color: "bg-[#FF007F]", initials: "EB" },
    { name: "William Harrison", color: "bg-yellow-400", initials: "WH" },
    { name: "Charlotte Edwards", color: "bg-indigo-500", initials: "CE" },
    { name: "Thomas Morris", color: "bg-orange-500", initials: "TM" },
    { name: "Amelia Walker", color: "bg-violet-500", initials: "AW" },
    { name: "Oliver Clarke", color: "bg-[#FF5D5D]", initials: "OC" },
    { name: "Victoria Hughes", color: "bg-[#868EFF]", initials: "VH" },
    { name: "Henry Baker", color: "bg-[#00FFFF]", initials: "HB" },
    { name: "Grace Foster", color: "bg-[#C8A2FF]", initials: "GF" },
    { name: "Samuel Gray", color: "bg-[#A8E6CF]", initials: "SG" },
    { name: "Sophie Lewis", color: "bg-[#FF007F]", initials: "SL" },
    { name: "Edward Coleman", color: "bg-yellow-400", initials: "EC" },
    { name: "Lily Mills", color: "bg-indigo-500", initials: "LM" },
    { name: "Daniel Parker", color: "bg-orange-500", initials: "DP" },
    { name: "Hannah Scott", color: "bg-violet-500", initials: "HS" },
    { name: "Matthew Reed", color: "bg-[#FF5D5D]", initials: "MR" },
    { name: "Emma Turner", color: "bg-[#868EFF]", initials: "ET" },
    { name: "Christopher Ward", color: "bg-[#00FFFF]", initials: "CW" },
    { name: "Abigail Brooks", color: "bg-[#C8A2FF]", initials: "AB" },
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
