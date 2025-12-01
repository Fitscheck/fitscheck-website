"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const joiners = [
    { name: "Alena Carder", color: "bg-[#FF5D5D]", avatar: "/avatar/avatar1.svg" },
    { name: "Zain Siphron", color: "bg-[#868EFF]", avatar: "/avatar/avatar3.svg" },
    { name: "Corey Levin", color: "bg-[#00FFFF]", avatar: "/avatar/avatar9.svg" },
    { name: "Tatiana Baptista", color: "bg-[#C8A2FF]", avatar: "/avatar/avatar4.svg" },
    { name: "Kianna Schleifer", color: "bg-[#A8E6CF]", avatar: "/avatar/avatar5.svg" },
    { name: "Jaylon Vaccaro", color: "bg-[#FF007F]", avatar: "/avatar/avatar6.svg" },
    { name: "Marcus Ekstrom", color: "bg-yellow-400", avatar: "/avatar/avatar7.svg" },
    { name: "Chance Dorwart", color: "bg-indigo-500", avatar: "/avatar/avatar3.svg" },
    { name: "Thomas Morris", color: "bg-orange-500", avatar: "/avatar/avatar9.svg" },
    { name: "Amelia Walker", color: "bg-violet-500", avatar: "/avatar/avatar2.svg" },
    { name: "Oliver Clarke", color: "bg-[#FF5D5D]", avatar: "/avatar/avatar7.svg" },
    { name: "Victoria Hughes", color: "bg-[#868EFF]", avatar: "/avatar/avatar8.svg" },
    { name: "Henry Baker", color: "bg-[#00FFFF]", avatar: "/avatar/avatar9.svg" },
    { name: "Grace Foster", color: "bg-[#C8A2FF]", avatar: "/avatar/avatar1.svg" },
    { name: "Samuel Gray", color: "bg-[#A8E6CF]", avatar: "/avatar/avatar3.svg" },
    { name: "Sophie Lewis", color: "bg-[#FF007F]", avatar: "/avatar/avatar2.svg" },
    { name: "Edward Coleman", color: "bg-yellow-400", avatar: "/avatar/avatar7.svg" },
    { name: "Lily Mills", color: "bg-indigo-500", avatar: "/avatar/avatar5.svg" },
    { name: "Daniel Parker", color: "bg-orange-500", avatar: "/avatar/avatar9.svg" },
    { name: "Hannah Scott", color: "bg-violet-500", avatar: "/avatar/avatar6.svg" },
    { name: "Matthew Reed", color: "bg-[#FF5D5D]", avatar: "/avatar/avatar3.svg" },
    { name: "Emma Turner", color: "bg-[#868EFF]", avatar: "/avatar/avatar4.svg" },
    { name: "Christopher Ward", color: "bg-[#00FFFF]", avatar: "/avatar/avatar7.svg" },
    { name: "Abigail Brooks", color: "bg-[#C8A2FF]", avatar: "/avatar/avatar8.svg" },
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
        <div className="space-y-4" style={{ fontFamily: "var(--font-satoshi)" }}>
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
                            className={`${joiner.color} rounded-full px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-white font-bold text-sm sm:text-base flex items-center gap-2 sm:gap-3 flex-shrink-0`}
                        >
                            <Image
                                src={joiner.avatar}
                                alt={`${joiner.name} - FitsCheck fashion community member`}
                                width={32}
                                height={32}
                                className="rounded-full flex-shrink-0"
                            />
                            {joiner.name}
                        </div>
                    ))}
                </div>
            </div>

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
                            className={`${joiner.color} rounded-full px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-white font-bold text-sm sm:text-base flex items-center gap-2 sm:gap-3 flex-shrink-0`}
                        >
                            <Image
                                src={joiner.avatar}
                                alt={`${joiner.name} - FitsCheck fashion community member`}
                                width={32}
                                height={32}
                                className="rounded-full flex-shrink-0"
                            />
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
