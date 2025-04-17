import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-pink-50 py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How can we help you?</h1>
              <p className="mt-4 text-lg text-gray-500">Find answers to your questions and get the help you need</p>
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for help articles..."
                    className="w-full rounded-full border-gray-300 pl-10 pr-4 py-3 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold">Popular Topics</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium">Getting Started</h3>
                <p className="mb-4 text-gray-500">Learn the basics of using FitsCheck</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/help/article?id=create-account"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>How to create an account</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help/article?id=first-outfit"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Posting your first outfit</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help/article?id=style-points"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Understanding style points</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium">Account & Settings</h3>
                <p className="mb-4 text-gray-500">Manage your account preferences</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/help/article?id=update-profile"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Updating your profile</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help/article?id=notification-settings"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Changing notification settings</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium">Premium Features</h3>
                <p className="mb-4 text-gray-500">Learn about premium benefits</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/help/article?id=premium-benefits"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Premium subscription benefits</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help/article?id=affiliate-links"
                      className="flex items-center text-pink-500 hover:underline"
                    >
                      <span>Setting up affiliate links</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="bg-gray-50 py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold">Still Need Help?</h2>
            <div className="flex justify-center">
              <Link href="/report">
                <Button className="bg-pink-500 hover:bg-pink-600">Contact Support</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
