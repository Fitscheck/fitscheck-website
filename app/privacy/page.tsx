import { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FitsCheck Privacy Policy - Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="min-h-screen bg-white py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-4"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Privacy Policy
              </h1>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none space-y-8" style={{ fontFamily: "var(--font-satoshi)" }}>
              <div className="space-y-6 text-[#003366]">
                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    1. Introduction
                  </h2>
                  <p className="text-base md:text-lg text-[#003366]/80 leading-relaxed">
                    Welcome to FitsCheck ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    2. Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">2.1 Information You Provide</h3>
                      <ul className="list-disc list-inside space-y-2 text-[#003366]/80 ml-4">
                        <li>Account information (username, email address, password)</li>
                        <li>Profile information (profile picture, bio, fashion preferences)</li>
                        <li>Content you post (photos, videos, style tips, affiliate links)</li>
                        <li>Communications with us and other users</li>
                        <li>Payment information (processed through secure third-party providers)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">2.2 Automatically Collected Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-[#003366]/80 ml-4">
                        <li>Device information (device type, operating system, unique device identifiers)</li>
                        <li>Usage data (features used, time spent, interactions)</li>
                        <li>Location data (if you enable location services)</li>
                        <li>Log data (IP address, browser type, access times)</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    3. How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-[#003366]/80 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and manage affiliate link commissions</li>
                    <li>Personalize your experience and show relevant content</li>
                    <li>Enable community features (voting, comments, leaderboards)</li>
                    <li>Send you notifications, updates, and marketing communications (with your consent)</li>
                    <li>Detect, prevent, and address technical issues and security threats</li>
                    <li>Comply with legal obligations and enforce our terms of service</li>
                    <li>Analyze usage patterns to improve our platform</li>
                  </ul>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    4. Information Sharing and Disclosure
                  </h2>
                  <div className="space-y-4">
                    <p className="text-[#003366]/80">
                      We do not sell your personal information. We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[#003366]/80 ml-4">
                      <li><strong>Public Content:</strong> Posts, comments, and profile information you choose to make public are visible to other users</li>
                      <li><strong>Service Providers:</strong> We may share data with third-party service providers who perform services on our behalf (hosting, analytics, payment processing)</li>
                      <li><strong>Affiliate Partners:</strong> When you use affiliate links, we may share necessary information with affiliate networks to process commissions</li>
                      <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                      <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information may be transferred as part of the transaction</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    5. Data Security
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    6. Your Rights and Choices
                  </h2>
                  <div className="space-y-4">
                    <p className="text-[#003366]/80">You have the following rights regarding your personal information:</p>
                    <ul className="list-disc list-inside space-y-2 text-[#003366]/80 ml-4">
                      <li><strong>Access:</strong> Request access to your personal data</li>
                      <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                      <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                      <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                      <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      <li><strong>Privacy Settings:</strong> Control visibility of your profile and content through app settings</li>
                    </ul>
                    <p className="text-[#003366]/80">
                      To exercise these rights, please contact us at{' '}
                      <a href="mailto:privacy@fitscheck.com" className="text-[#003366] underline hover:text-[#F8E71C]">
                        privacy@fitscheck.com
                      </a>
                    </p>
                  </div>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    7. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    We use cookies and similar tracking technologies to collect and store information about your preferences and activity. You can control cookies through your browser settings, though this may affect some functionality of our services.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    8. Children's Privacy
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    Our services are not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    9. International Data Transfers
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our services, you consent to the transfer of your information to these countries.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    10. Changes to This Privacy Policy
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 mt-8"
                    style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                  >
                    11. Contact Us
                  </h2>
                  <p className="text-[#003366]/80 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-[#FEFBD7] rounded-lg p-6 mt-4">
                    <p className="text-[#003366] font-semibold mb-2">FitsCheck</p>
                    <p className="text-[#003366]/80">
                      Email:{' '}
                      <a href="mailto:privacy@fitscheck.com" className="text-[#003366] underline hover:text-[#F8E71C]">
                        privacy@fitscheck.com
                      </a>
                    </p>
                    <p className="text-[#003366]/80 mt-2">
                      Website:{' '}
                      <a href="https://fitscheck.com" className="text-[#003366] underline hover:text-[#F8E71C]">
                        fitscheck.com
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

