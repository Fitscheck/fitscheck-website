import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { HelpCircle, Mail, MessageCircle, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support - Get Help with FitsCheck',
  description: 'Get support for FitsCheck. Contact our support team, browse help articles, and find answers to common questions.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function SupportPage() {
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
            Support Center
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            We're here to help! Get in touch with our support team or browse our help resources.
          </p>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Contact Our Support Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Have a question or need assistance? Our support team is ready to help you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#003366] to-[#002244] rounded-lg p-8 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8E71C]/20 mb-6">
                <Mail className="w-8 h-8 text-[#F8E71C]" />
              </div>
              <h3 
                className="text-2xl sm:text-3xl font-extrabold mb-4"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Email Support
              </h3>
              <p className="text-white/90 mb-6 text-lg" style={{ fontFamily: "var(--font-satoshi)" }}>
                Send us an email and we'll get back to you as soon as possible.
              </p>
              <a
                href="mailto:support@fitscheck.com"
                className="inline-block"
              >
                <Button
                  className="bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] font-semibold py-3 px-8 rounded-full text-base"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  support@fitscheck.com
                </Button>
              </a>
              <p className="text-white/70 text-sm mt-4" style={{ fontFamily: "var(--font-satoshi)" }}>
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources Section */}
      <section className="py-16 bg-[#F0F7FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Help Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Browse our help center for answers to common questions and guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/help"
              className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#003366]/10 text-[#003366] flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-xl font-bold text-[#003366] mb-2 group-hover:text-[#F8E71C] transition-colors"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Help Center
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Browse our comprehensive help articles and find answers to frequently asked questions.
                  </p>
                  <div className="flex items-center text-[#003366] text-sm font-semibold group-hover:text-[#F8E71C] transition-colors" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Visit Help Center <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="/help/article?id=create-account"
              className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#003366]/10 text-[#003366] flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-xl font-bold text-[#003366] mb-2 group-hover:text-[#F8E71C] transition-colors"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    Getting Started Guide
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Learn how to create an account, join the waitlist, or become a founding creator.
                  </p>
                  <div className="flex items-center text-[#003366] text-sm font-semibold group-hover:text-[#F8E71C] transition-colors" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Read Guide <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#003366] mb-4"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Common Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
              Quick access to frequently requested information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/founding-creator"
              className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Founding Creator Program
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Learn about exclusive benefits for founding creators
              </p>
            </Link>

            <Link
              href="/privacy"
              className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Learn how we protect your data and privacy
              </p>
            </Link>

            <Link
              href="/#waitlist"
              className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-[#003366] hover:shadow-lg transition-all text-center"
            >
              <h3 
                className="text-lg font-bold text-[#003366] mb-2"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Join Waitlist
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-satoshi)" }}>
                Get early access when we launch
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 bg-[#F0F7FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-[#003366] mb-4"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Need More Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
            If you can't find what you're looking for, don't hesitate to reach out. We're committed to providing excellent support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@fitscheck.com">
              <Button
                className="bg-[#003366] hover:bg-[#002244] text-white font-semibold py-3 px-8 rounded-full"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Contact Support
              </Button>
            </a>
            <Link href="/help">
              <Button
                variant="outline"
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-semibold py-3 px-8 rounded-full"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Browse Help Center
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

