export default function WhatToExpectSection() {
  const features = [
    {
      title: "Community Voting",
      description: "Get instant feedback on your outfits with simple voting from the community.",
    },
    {
      title: "Style Challenges",
      description: "Participate in themed challenges to showcase your creativity and win style points.",
    },
    {
      title: "Affiliate Links",
      description: "Premium users can add affiliate links to their outfits and earn commissions on purchases.",
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
          FitsCheck will revolutionize how you share and discover fashion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" style={{ fontFamily: "Satoshi Variable" }}>
          {/* Left Card - Community Voting */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6"></div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[0].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-gray-500 leading-relaxed" >{features[0].description}</p>
          </div>

          {/* Center Card - Style Challenges (Taller) */}
          <div className="flex gap-6 flex-col-reverse md:flex-col">

            <div>
                <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    {features[1].title}
                </h3>
                 <p className="text-lg sm:text-[20px] text-[#A3A3A3] leading-relaxed mb-6">{features[1].description}</p>
            </div>
            <div className="bg-white rounded-2xl h-80 md:h-96 "></div>
          </div>

          {/* Right Card - Affiliate Links */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl h-64 md:h-80 mb-6"></div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              {features[2].title}
            </h3>
            <p className="text-lg sm:text-[20px] text-[#A3A3A3] leading-relaxed">{features[2].description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
