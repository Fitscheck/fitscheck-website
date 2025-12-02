import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { HelpCircle, UserPlus, Users, Shield, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Get help with FitsCheck - Find answers to common questions about creating an account, joining the waitlist, and becoming a founding creator.',
  robots: {
    index: true,
    follow: true,
  },
}

interface HelpArticle {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: string
}

const helpArticles: HelpArticle[] = [
  {
    id: 'create-account',
    title: 'How to Create an Account',
    description: 'Learn how to get early access to FitsCheck by joining the waitlist or applying as a founding creator.',
    icon: <UserPlus className="w-6 h-6" />,
    category: 'Getting Started',
  },
  // Add more articles here as needed
]

const categories = [
  {
    name: 'Getting Started',
    description: 'New to FitsCheck? Start here.',
    articles: helpArticles.filter(article => article.category === 'Getting Started'),
  },
]

export default function HelpCenterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#003366] to-[#002244]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8E71C]/20 mb-6">
            <HelpCircle className="w-8 h-8 text-[#F8E71C]" />
          </div>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Help Center
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Find answers to common questions and learn how to get the most out of FitsCheck
          </p>
        </div>
      </section>

      {/* Help Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="mb-8">
                <h2 
                  className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-2"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  {category.name}
                </h2>
                <p className="text-lg text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/help/article?id=${article.id}`}
                    className="group block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-[#003366] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#003366]/10 text-[#003366] flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-colors">
                        {article.icon}
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-xl font-bold text-[#003366] mb-2 group-hover:text-[#F8E71C] transition-colors"
                          style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                          {article.description}
                        </p>
                        <div className="mt-4 text-[#003366] text-sm font-semibold group-hover:text-[#F8E71C] transition-colors" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                          Read more →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State Message */}
          {helpArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg" style={{ fontFamily: "var(--font-satoshi)" }}>
                More help articles coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-[#F0F7FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Quick Links
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Common actions and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/founding-creator"
              className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#003366]/10 text-[#003366] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Become a Founding Creator
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Apply to be one of the first 100 creators
              </p>
            </Link>

            <Link
              href="/#waitlist"
              className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#003366]/10 text-[#003366] mb-4">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Join the Waitlist
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Get early access when we launch
              </p>
            </Link>

            <Link
              href="/privacy"
              className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#003366]/10 text-[#003366] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Learn how we protect your data
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8E71C]/20 mb-6">
            <Mail className="w-8 h-8 text-[#003366]" />
          </div>
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
            Can't find what you're looking for? Reach out to our support team and we'll be happy to help.
          </p>
          <a
            href="mailto:support@fitscheck.com"
            className="inline-block"
          >
            <Button
              className="bg-[#003366] hover:bg-[#002244] text-white font-semibold py-3 px-8 rounded-full"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Contact Support
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

