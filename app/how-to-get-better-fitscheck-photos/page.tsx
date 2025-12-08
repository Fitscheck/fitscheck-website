import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Camera, Lightbulb, Users, TrendingUp, Award, Link as LinkIcon, Hash } from 'lucide-react'

export const metadata: Metadata = {
  title: "How to Get Better #FitsCheck Photos & More Outfit Votes",
  description: "Learn proven strategies to take better outfit photos for FitsCheck and get more votes from the community. Master photography, lighting, angles, and engagement tactics to maximize your outfit ratings.",
  keywords: [
    "how to get more outfit votes",
    "better fit check photos",
    "FitsCheck photography tips",
    "outfit photo guide",
    "get more votes on outfits",
    "fashion photography tips",
    "outfit rating tips",
    "FitsCheck guide"
  ],
}

export default function HowToGetBetterFitsCheckPhotosPage() {
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

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="px-4 py-2 bg-[#F0F7FF] text-[#003366] rounded-full text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)" }}>
                Photography Tips
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              How to Get Better #FitsCheck Photos & More Outfit Votes
            </h1>
            <p className="text-xl text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
              A complete guide to taking stunning outfit photos that get votes, engagement, and recognition on FitsCheck.
            </p>
            <p className="text-lg text-[#A3A3A3] mb-12 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
              Want more votes on your FitsCheck posts? The secret starts with great photos. Here's everything you need to know about capturing outfit photos that make the community stop scrolling and vote.
            </p>

            {/* Introduction */}
            <div className="bg-[#F0F7FF] rounded-2xl p-8 mb-12">
              <p className="text-lg text-[#003366] leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                Getting votes on FitsCheck isn't just about having a great outfit—it's about presenting it in a way that captures attention and showcases your style. This guide covers photography fundamentals, engagement strategies, and insider tips to help you maximize votes and build your presence on FitsCheck.
              </p>
            </div>

            {/* Section 1: Photography Basics */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="h-8 w-8 text-[#003366]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  1. Master the Photography Basics
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Lighting is Everything
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Great lighting can make or break your outfit photos. Here's how to get it right:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Natural light is your best friend:</strong> Take photos near windows or outdoors during golden hour (early morning or late afternoon) for soft, flattering light.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Avoid harsh shadows:</strong> Position yourself so light hits you evenly. Face the light source, not away from it.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Indoor lighting tips:</strong> If shooting indoors, use multiple light sources or a ring light to eliminate harsh shadows. White walls can help bounce light naturally.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Golden hour magic:</strong> The hour after sunrise and before sunset provides the most flattering, warm light for outfit photos.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Find Your Best Angles
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    The right angle can showcase your outfit perfectly:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Full-body shots:</strong> Position the camera at chest level, slightly angled down. This shows your complete outfit while maintaining flattering proportions.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Detail shots:</strong> Take close-ups of accessories, shoes, or interesting details that make your outfit unique. These add depth to your posts.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Multiple angles:</strong> Shoot from front, side, and three-quarter angles to give voters a complete view of your outfit.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Mirror selfies done right:</strong> If using a mirror, ensure good lighting, clean the mirror, and position yourself to show the full outfit clearly.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Background Matters
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Your background should complement, not compete with, your outfit:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Clean and simple:</strong> Plain walls, minimal decor, or neutral backgrounds keep focus on your outfit.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Complementary colors:</strong> Choose backgrounds that enhance your outfit's colors rather than clash with them.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Outdoor locations:</strong> Parks, urban settings, or architectural backgrounds can add interest while keeping your outfit as the star.
                    </li>
                    <li className="list-disc">
                      <strong className="text-[#003366]">Avoid clutter:</strong> Busy backgrounds distract from your outfit. Keep it clean and focused.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Photo Quality */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-8 w-8 text-[#003366]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  2. Ensure High Photo Quality
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Focus and Clarity
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Blurry photos get fewer votes. Ensure your photos are sharp and in focus:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Use your phone's camera app (not social media apps) for better quality</li>
                    <li className="list-disc">Tap to focus on your outfit before taking the photo</li>
                    <li className="list-disc">Hold your phone steady or use a tripod to avoid motion blur</li>
                    <li className="list-disc">Clean your camera lens before shooting</li>
                    <li className="list-disc">Use the highest resolution setting available</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Editing (But Not Over-Editing)
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Light editing can enhance your photos, but keep it natural:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Adjust brightness and contrast slightly to improve visibility</li>
                    <li className="list-disc">Enhance colors subtly to make your outfit pop</li>
                    <li className="list-disc">Crop to improve composition and remove distractions</li>
                    <li className="list-disc">Avoid heavy filters that distort colors or make photos look unrealistic</li>
                    <li className="list-disc">Keep your outfit colors true to life—voters want to see what it really looks like</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Showcase Your Outfit */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-8 w-8 text-[#003366]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  3. Showcase Your Outfit's Best Features
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Highlight What Makes It Special
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Every outfit has standout elements. Make sure voters can see them:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Take close-up shots of unique accessories, patterns, or details</li>
                    <li className="list-disc">Show how different pieces work together (layers, textures, colors)</li>
                    <li className="list-disc">Capture the full silhouette so voters can see the complete look</li>
                    <li className="list-disc">Include shots that show movement or how the outfit looks in action</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Tell a Story with Your Photos
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Photos that tell a story get more engagement:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Show your outfit in context (where you're wearing it, what you're doing)</li>
                    <li className="list-disc">Include multiple photos that show different aspects of the look</li>
                    <li className="list-disc">Capture candid moments that feel authentic and relatable</li>
                    <li className="list-disc">Let your personality shine through in your poses and expressions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Engagement Strategies */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-[#003366]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  4. Maximize Engagement & Votes
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Write Compelling Descriptions
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Great photos need great captions to maximize votes:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Share the occasion or inspiration behind the outfit</li>
                    <li className="list-disc">Mention specific pieces or brands you're wearing</li>
                    <li className="list-disc">Ask questions to encourage engagement ("What do you think?" or "Which do you prefer?")</li>
                    <li className="list-disc">Share styling tips or why you chose this combination</li>
                    <li className="list-disc">Add context that helps voters understand your style choices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Use Hashtags Strategically
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Hashtags help the right people find your content:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Use <strong className="text-[#003366]">#FitsCheck</strong> to connect with the community</li>
                    <li className="list-disc">Include style-specific tags (#streetwear, #minimalist, #vintage, etc.)</li>
                    <li className="list-disc">Tag the occasion (#OOTD, #dateoutfit, #workwear, etc.)</li>
                    <li className="list-disc">Use color tags (#allblack, #pastels, #boldcolors) to reach people interested in those styles</li>
                    <li className="list-disc">Don't overdo it—5-10 relevant hashtags are better than 20 random ones</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Engage with the Community
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Engagement is a two-way street on FitsCheck:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Vote on other people's outfits regularly—they'll notice and return the favor</li>
                    <li className="list-disc">Leave thoughtful comments on posts you like</li>
                    <li className="list-disc">Respond to comments on your own posts</li>
                    <li className="list-disc">Follow other creators whose style you admire</li>
                    <li className="list-disc">Participate in style challenges to increase visibility</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Post at Optimal Times
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Timing can significantly impact your votes:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Post when the community is most active (evenings and weekends typically)</li>
                    <li className="list-disc">Experiment with different times to see when your posts get the most engagement</li>
                    <li className="list-disc">Consider your audience's time zones if you have international followers</li>
                    <li className="list-disc">Post consistently to build a following that expects your content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Advanced Tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-8 w-8 text-[#003366]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  5. Advanced Strategies for More Votes
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Create "This or That" Posts
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    FitsCheck's "This or That" feature is perfect for engagement:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Post two outfit options and let the community vote</li>
                    <li className="list-disc">These posts typically get more engagement than single outfit posts</li>
                    <li className="list-disc">Use it to get feedback before events or when deciding between looks</li>
                    <li className="list-disc">The voting format encourages more interaction</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Participate in Style Challenges
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Challenges increase visibility and votes:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Join weekly and monthly style challenges on FitsCheck</li>
                    <li className="list-disc">Challenge entries appear in dedicated feeds with active voters</li>
                    <li className="list-disc">Winners get featured and earn style points</li>
                    <li className="list-disc">Even participation increases your visibility in the community</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Build a Recognizable Style
                  </h3>
                  <p className="text-lg text-[#A3A3A3] mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                    Consistency helps build a following:
                  </p>
                  <ul className="space-y-3 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                    <li className="list-disc">Develop a consistent aesthetic that voters recognize</li>
                    <li className="list-disc">Post regularly to stay top-of-mind with your followers</li>
                    <li className="list-disc">Maintain quality standards across all your posts</li>
                    <li className="list-disc">Build a reputation for great style and quality content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Mistakes to Avoid */}
            <section className="mb-12">
              <div className="bg-[#F0F7FF] rounded-2xl p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  Common Mistakes to Avoid
                </h2>
                <ul className="space-y-4 text-[#A3A3A3] ml-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">Poor photo quality:</strong> Blurry, dark, or out-of-focus photos get fewer votes. Always ensure your photos are clear and well-lit.
                  </li>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">Over-filtering:</strong> Heavy filters that distort colors or make photos look unrealistic reduce trust and votes.
                  </li>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">No context:</strong> Posts without descriptions or context get less engagement. Always add a caption.
                  </li>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">Inconsistent posting:</strong> Voters forget about creators who post sporadically. Maintain a regular posting schedule.
                  </li>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">Ignoring the community:</strong> Not voting or commenting on others' posts reduces your visibility and engagement.
                  </li>
                  <li className="list-disc text-lg">
                    <strong className="text-[#003366]">Cluttered backgrounds:</strong> Busy backgrounds distract from your outfit. Keep it clean and focused.
                  </li>
                </ul>
              </div>
            </section>

            {/* Internal Links Section */}
            <section className="mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                  Related Guides & Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="/how-it-works" 
                    className="p-4 bg-[#F0F7FF] rounded-lg hover:bg-[#E0EFFF] transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      How FitsCheck Works
                    </h3>
                    <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Learn about the platform's features and how to get started
                    </p>
                  </Link>
                  <Link 
                    href="/rate-my-outfit" 
                    className="p-4 bg-[#F0F7FF] rounded-lg hover:bg-[#E0EFFF] transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Rate My Outfit Online
                    </h3>
                    <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Discover how to get community feedback on your outfits
                    </p>
                  </Link>
                  <Link 
                    href="/best-fit-check-apps" 
                    className="p-4 bg-[#F0F7FF] rounded-lg hover:bg-[#E0EFFF] transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Best Fit Check Apps in 2025
                    </h3>
                    <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Compare FitsCheck with other outfit rating platforms
                    </p>
                  </Link>
                  <Link 
                    href="/for-creators" 
                    className="p-4 bg-[#F0F7FF] rounded-lg hover:bg-[#E0EFFF] transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      For Fashion Creators
                    </h3>
                    <p className="text-[#A3A3A3] text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Learn how creators can grow and monetize on FitsCheck
                    </p>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-[#003366] rounded-2xl p-8 md:p-12 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Ready to Get More Votes on Your Outfits?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join FitsCheck and start applying these tips to get more votes, build your following, and grow your fashion presence. Be among the first to access the platform when we launch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F8E71C] hover:bg-[#E6D500] text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/#waitlist">Join the Waitlist</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                >
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

