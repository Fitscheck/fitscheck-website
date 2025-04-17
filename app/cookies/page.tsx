import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: April 17, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored
              in your web browser and allows the Service or a third-party to recognize you and make your next visit
              easier.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How FitsCheck Uses Cookies</h2>
            <p>
              We use cookies to enable certain functions of the Service, provide analytics, store your preferences, and
              enable advertisements delivery.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of
              the Service and deliver advertisements.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. What Are Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the
              help pages of your web browser.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us at privacy@fitscheck.com.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
