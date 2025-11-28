import Image from "next/image"

export default function WhatToExpectSection() {
  const features = [
    {
      title: "This or That Voting",
      description: "Post two outfit options and let the community vote. Whether it's a blue skirt or purple skirt, get real-time feedback to help you make the perfect style decision.",
    },
    {
      title: "Shop This Look",
      description: "Post your outfit of the day and attach your affiliate links in the 'Shop This Look' section. Add promo codes and earn commission when followers purchase through your links.",
    },
    {
      title: "Fashion Tips & Style",
      description: "Share your fashion expertise with style tips, outfit inspiration, and fashion advice. Post images with tips to help others elevate their style game.",
    },
    {
      title: "Style Points & Leaderboards",
      description: "Earn style points for your posts and engagement. Compete on the global leaderboard or see how you rank among friends you're following. Climb the ranks and showcase your fashion influence.",
    },
  ]

  return (
    <section className="w-full bg-[#FEFBD7] py-10  md:py-[118pX] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
            What to Expect
          </h2>
          <p className="text-xl text-[#A3A3A3] font-body" style={{ fontFamily: "Satoshi Variable" }}>
          The social platform where fashion meets decision-making and monetization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" style={{ fontFamily: "Satoshi Variable" }}>
          {/* Card 1 - This or That Voting */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6 overflow-hidden relative">
              <Image 
                src="/thisorthat.png" 
                alt="This or That Voting" 
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[0].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-gray-500 leading-relaxed" >{features[0].description}</p>
          </div>

          {/* Card 2 - Shop This Look */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6"></div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[1].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-[#A3A3A3] leading-relaxed">{features[1].description}</p>
          </div>

          {/* Card 3 - Fashion Tips & Style */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6"></div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[2].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-[#A3A3A3] leading-relaxed">{features[2].description}</p>
          </div>

          {/* Card 4 - Style Points & Leaderboards */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6"></div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[3].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-[#A3A3A3] leading-relaxed">{features[3].description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
