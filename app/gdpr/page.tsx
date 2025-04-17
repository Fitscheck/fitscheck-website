import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function GDPRPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">GDPR Compliance</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: April 17, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Your Rights Under GDPR</h2>
            <p>
              Under the GDPR, you have the right to access, rectify, erase, restrict processing, object to processing,
              and data portability of your personal data.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Data Controller</h2>
            <p>
              FitsCheck is the data controller for personal data collected through our Service. You can contact our Data
              Protection Officer at dpo@fitscheck.com.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Legal Basis for Processing</h2>
            <p>
              We process personal data based on consent, contractual necessity, legitimate interests, and legal
              obligations.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. International Data Transfers</h2>
            <p>
              Your information may be transferred to computers located outside of your jurisdiction. We have implemented
              appropriate safeguards for these transfers.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this GDPR Compliance Statement, please contact us at dpo@fitscheck.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
