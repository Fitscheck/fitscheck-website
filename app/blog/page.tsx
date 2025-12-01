import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "Fashion Blog - Style Tips & Trends | FitsCheck",
  description: "Discover the latest fashion trends, style tips, and outfit ideas on FitsCheck's fashion blog. Learn how to improve your outfit photos and win style challenges.",
  keywords: [
    "2025 fashion trends",
    "outfit ideas",
    "style tips",
    "fashion blog",
    "how to style",
    "outfit inspiration",
    "fashion challenges on social media"
  ],
}

// Blog post data structure
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

const blogPosts: BlogPost[] = [
  {
    slug: "10-tips-for-better-outfit-photos",
    title: "10 Tips for Better Outfit Photos That Get More Ratings",
    excerpt: "Learn how to take stunning outfit photos that stand out on FitsCheck. From lighting to angles, discover professional tips for capturing your best looks.",
    date: "2025-11-30",
    readTime: "5 min read",
    category: "Photography Tips"
  },
  {
    slug: "how-to-win-style-challenges",
    title: "How to Win Style Challenges: A Complete Guide",
    excerpt: "Master the art of style challenges on FitsCheck. Learn strategies for creating winning entries, engaging the community, and climbing the leaderboards.",
    date: "2025-11-30",
    readTime: "7 min read",
    category: "Style Challenges"
  },
  {
    slug: "2025-fashion-trends",
    title: "2025 Fashion Trends: What's Hot This Year",
    excerpt: "Stay ahead of the curve with our comprehensive guide to 2025 fashion trends. Discover the styles that are dominating runways and social media.",
    date: "2025-11-25",
    readTime: "8 min read",
    category: "Trends"
  },
  {
    slug: "outfit-ideas-for-every-occasion",
    title: "Outfit Ideas for Every Occasion: Your Style Guide",
    excerpt: "Never wonder what to wear again. Get inspired with outfit ideas for work, dates, parties, and casual outings. Perfect for building your FitsCheck wardrobe.",
    date: "2024-11-25",
    readTime: "6 min read",
    category: "Style Guide"
  },
  {
    slug: "how-to-style-denim",
    title: "How to Style Denim: 15 Outfit Combinations",
    excerpt: "Denim is a wardrobe staple. Learn creative ways to style jeans, jackets, and denim pieces for different occasions and seasons.",
    date: "2024-11-20",
    readTime: "5 min read",
    category: "Styling Tips"
  },
  {
    slug: "fashion-challenges-on-social-media",
    title: "Fashion Challenges on Social Media: The Ultimate Guide",
    excerpt: "Explore the world of fashion challenges on social media platforms. Learn how FitsCheck is revolutionizing style competitions and community engagement.",
    date: "2024-11-20",
    readTime: "6 min read",
    category: "Community"
  },
]

export default function BlogPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#FEFBD7] to-white">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#003366] hover:text-[#F8E71C] mb-8 transition-colors"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                FitsCheck Fashion Blog
              </h1>
              <p className="text-xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Discover the latest fashion trends, style tips, outfit ideas, and insights from the fashion community. Everything you need to elevate your style game.
              </p>
            </div>

            <div className="space-y-8 mb-12">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-[#F0F7FF] text-[#003366] rounded-full text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-3" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                        {post.title}
                      </h2>
                      <p className="text-lg text-[#A3A3A3] leading-relaxed mb-4" style={{ fontFamily: "var(--font-satoshi)" }}>
                        {post.excerpt}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                      >
                        <Link href={`/blog/${post.slug}`}>Read More →</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-[#F0F7FF] rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Want More Fashion Content?
              </h2>
              <p className="text-lg text-[#A3A3A3] mb-6 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join FitsCheck to get access to exclusive style tips, participate in fashion challenges, and connect with the fashion community.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-6 rounded-full text-lg font-bold"
              >
                <Link href="/#waitlist">Join the Waitlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

