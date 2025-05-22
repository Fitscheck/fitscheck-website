import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">Last updated: March 2024</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (name, email, profile picture)</li>
              <li>User content (posts, comments, photos)</li>
              <li>Device information (device type, operating system)</li>
              <li>Usage data (app interactions, features used)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              3. Information Sharing
            </h2>
            <p>
              We do not share your personal information with third parties
              except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              6. Children's Privacy
            </h2>
            <p>
              Our Service is not intended for children under 13. We do not
              knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at fitscheck01@gmail.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
