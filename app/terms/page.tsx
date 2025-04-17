import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: April 17, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to FitsCheck. These Terms of Service govern your use of our website and mobile application
              operated by FitsCheck.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Communications</h2>
            <p>
              By creating an Account on our Service, you agree to subscribe to newsletters, marketing or promotional
              materials and other information we may send.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service, you may be asked to
              supply certain information relevant to your Purchase.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material. You are responsible for the Content that you post.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@fitscheck.com.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
