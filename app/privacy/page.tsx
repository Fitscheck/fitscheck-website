import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: April 17, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service, including personal
              information, usage data, and device information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect about you to provide, maintain, and improve our Service, process
              transactions, and personalize your experience.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
            <p>
              We may share information about you with other users as part of the normal operation of the Service and
              with vendors who need access to carry out work on our behalf.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Your Choices</h2>
            <p>
              You have several choices regarding the information we collect and how it's used, including updating your
              account information and opting out of promotional communications.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@fitscheck.com.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
