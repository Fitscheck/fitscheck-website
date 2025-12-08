import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="flex items-center justify-end md:justify-center bg-[#003366] text-gray-300 py-8 md:py-0 md:h-[401px] mt-12 md:mt-20">
      <div className="flex flex-col items-center justify-center container gap-2 px-4 md:px-6 pt-8 md:pt-12">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#F8E71C]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
          FitsCheck
        </h2>
        
        {/* Social Media Links */}
        <div className="flex items-center gap-6 mt-6">
          <Link 
            href="https://www.tiktok.com/@fitscheckofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#F8E71C] transition-colors duration-200"
            aria-label="TikTok"
          >
            <svg 
              className="w-6 h-6 md:w-7 md:h-7" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </Link>
          
          <Link 
            href="https://x.com/fitscheckapp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#F8E71C] transition-colors duration-200"
            aria-label="X (Twitter)"
          >
            <svg 
              className="w-6 h-6 md:w-7 md:h-7" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Link>
          
          <Link 
            href="https://www.instagram.com/fitscheckofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#F8E71C] transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
        </div>
        
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-sm md:text-base" style={{ fontFamily: "var(--font-satoshi)" }}>
          <Link href="/how-it-works" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            How It Works
          </Link>
          <Link href="/for-creators" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            For Fashion Creators
          </Link>
          <Link href="/rate-my-outfit" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Rate My Outfit
          </Link>
          <Link href="/best-fit-check-apps" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Best Fit Check Apps
          </Link>
          <Link href="/how-to-get-better-fitscheck-photos" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Photo Tips
          </Link>
          <Link href="/style-challenges" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Style Challenges
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Fashion Blog
          </Link>
          <Link href="/founding-creator" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Become a Founding Creator
          </Link>
          <Link href="/privacy" className="text-gray-300 hover:text-[#F8E71C] transition-colors">
            Privacy Policy
          </Link>
        </nav>
        
        <p className="text-sm text-gray-300/80 mt-6 text-center max-w-2xl" style={{ fontFamily: "var(--font-satoshi)" }}>
          Tag <Link href="https://www.instagram.com/fitscheckofficial" target="_blank" rel="noopener noreferrer" className="text-[#F8E71C] hover:text-white transition-colors">@fitscheckofficial</Link> with <span className="font-semibold">#fitscheck</span> to be featured when we launch.
        </p>
        
        <div className="text-center text-xl mt-5" style={{ fontFamily: "var(--font-satoshi)" }}>
          <p>© {new Date().getFullYear()} FitsCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
