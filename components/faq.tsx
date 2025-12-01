"use client"

import { useState, useEffect } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When will Fitscheck launch?",
    answer: "We'll be launching the beta version for founding creators and early access in December 2025, with a full public release in January 2026.",
  },
  {
    question: "Will the app be free to use?",
    answer:
      "Yes, FitsCheck will be completely free to use for all members.",
  },
  {
    question: "What platforms will FitsCheck be available on?",
    answer: "FitsCheck will be available on both iOS and Android. Web browser access for desktop is coming soon.",
  },
  {
    question: "Will waitlist members get early access?",
    answer: "Waitlist members will get an early creators badge and access to the beta version.",
  },
  {
    question: "How does the outfit rating feature work?",
    answer: "Users can post their OOTD (Outfit of the Day) and receive instant ratings and feedback from the fashion community through our voting system.",
  },
  {
    question: "Can I monetize my fashion content on FitsCheck?",
    answer: "Yes! Premium users can add affiliate links to their outfits and earn commissions on purchases made through their content.",
  },
  {
    question: "What are style challenges?",
    answer: "Style challenges are themed competitions where users showcase their creativity and compete for style points. Winners are featured on leaderboards.",
  },
]

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  useEffect(() => {
    // Add FAQ schema markup
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(faqStructuredData)
    script.id = 'faq-schema'
    
    // Remove existing FAQ schema if present
    const existingScript = document.getElementById('faq-schema')
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('faq-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return (
    <section className="w-full py-10 md:py-[118px] px-6 bg-[#F0F7FF]" style={{ fontFamily: "var(--font-satoshi)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-start">
          <h2 className="md:max-w-2xl text-3xl md:text-4xl lg:text-7xl font-bold mb-2 text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
            Frequently Asked Questions
          </h2>
          <p className="md:max-w-xl text-xl text-[#A3A3A3]">
            Everything you need to know about the Fitscheck waitlist and upcoming outfit rating app.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleExpanded(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center text-lg text-[#003366] font-extrabold flex-shrink-0 border-2 border-[#003366] rounded-full h-6 w-6">
                  {expandedIndex === index ? "−" : "+"}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">{item.question}</h3>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
