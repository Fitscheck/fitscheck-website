import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">FitsCheck</h3>
            <p className="max-w-xs text-sm text-gray-400">
              The social fashion platform where you can showcase your outfits, receive community feedback, and
              participate in style challenges.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                {/* <Link href="/login" className="hover:text-white">
                  Log In
                </Link> */}
              </li>
              {/* <li>
                <Link href="/premium" className="hover:text-white">
                  Premium
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              {/* <li>
                <Link href="/gdpr" className="hover:text-white">
                  GDPR
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:support@fitscheck.com" className="hover:text-white">
                  support@fitscheck.com
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-white">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} FitsCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
