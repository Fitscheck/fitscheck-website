import Image from "next/image"

export default function WhatToExpectSection() {
  const features = [
    {
      title: "Community Voting",
      description: "Get instant feedback on your outfits with simple voting from the community.",
      image: "/features/thisorthat.webp",
      imageFirst: true
    },
    {
      title: "Affiliate Links",
      description: "You can add affiliate links to your outfits and earn commission on purchases.",
      image: "/features/shop.webp",
      imageFirst: false
    },
    {
      title: "Style Challenges",
      description: "Participate in themed challenges to showcase your creativity and win style points.",
      image: "/features/style.webp",
      imageFirst: true
    },
  ]

  return (
    <div className="max-w-7xl mx-auto py-[109px] px-4 md:px-[60px] lg:px-0">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
          What to Expect
        </h2>
        <p className="text-xl text-[#A3A3A3] leading-none">
          FitsCheck will revolutionize how you share and discover fashion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-[20px]">
            <div
              className="w-full aspect-[491/423] rounded-[40px] overflow-hidden relative"
              style={{ boxShadow: '0px 4px 34.9px 0px #F7F7F740' }}
            >
              <Image
                src={feature.image}
                alt={`${feature.title} feature on FitsCheck outfit rating app - ${feature.description}`}
                fill
                className="object-cover object-center"
              />
            </div>
            
            {feature.imageFirst ? (
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  {feature.title}
                </h3>
                <p className="text-lg text-[#A3A3A3] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ) : (
              <div className="flex flex-col md:order-first">
                <h3 className="text-2xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  {feature.title}
                </h3>
                <p className="text-lg text-[#A3A3A3] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
