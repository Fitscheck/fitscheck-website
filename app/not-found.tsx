import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Text */}
        <div className="space-y-4">
          <h1
            className="text-8xl md:text-9xl font-black text-[#003366]"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            404
          </h1>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-whyte-inktrap)" }}
          >
            Page Not Found
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Oops! The page you're looking for seems to have wandered off.
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            asChild
            size="lg"
            className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-6 text-lg"
          >
            <Link href="/">
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-6 text-lg"
          >
            <Link href="/#waitlist">
              Join Waitlist
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

