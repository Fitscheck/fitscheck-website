import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: March 2024</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to FitsCheck. These Terms of Service govern your use of
              our mobile application operated by FitsCheck. By accessing or
              using our Service, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              2. User Accounts
            </h2>
            <p>
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for maintaining the
              security of your account and password. We cannot and will not be
              liable for any loss or damage from your failure to comply with
              this security obligation.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Content</h2>
            <p>
              Our Service allows you to post, share, and otherwise make
              available certain information, text, graphics, videos, or other
              material. You retain ownership of any intellectual property rights
              that you hold in that content. When you post content, you grant us
              a license to use, modify, publicly perform, publicly display,
              reproduce, and distribute such content on and through the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              4. Premium Features
            </h2>
            <p>
              Some features of our Service are available only to premium
              subscribers. Premium features are subject to additional terms and
              conditions. Subscription fees are non-refundable except as
              required by law.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              5. Community Guidelines
            </h2>
            <p>
              You agree not to post content that is illegal, harmful,
              threatening, abusive, harassing, defamatory, or otherwise
              objectionable. We reserve the right to remove any content that
              violates these guidelines.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days'
              notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              fitscheck01@gmail.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
