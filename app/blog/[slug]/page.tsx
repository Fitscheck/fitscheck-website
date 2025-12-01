import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'

// Blog post data - should match the blog listing page
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

const blogPosts: Record<string, BlogPost> = {
  "10-tips-for-better-outfit-photos": {
    slug: "10-tips-for-better-outfit-photos",
    title: "10 Tips for Better Outfit Photos That Get More Ratings",
    excerpt: "Learn how to take stunning outfit photos that stand out on FitsCheck. From lighting to angles, discover professional tips for capturing your best looks.",
    date: "2025-11-30",
    readTime: "5 min read",
    category: "Photography Tips",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. Taking great outfit photos is essential for getting more votes and engagement on FitsCheck. Here are 10 professional tips to help you capture stunning outfit photos that stand out in the fashion community.</p>
      
      <h2>1. Find the Right Lighting</h2>
      <p>Natural light is your best friend when photographing outfits. Shoot near a window or outdoors during golden hour (early morning or late afternoon) for the most flattering light. Avoid harsh midday sun that creates unflattering shadows.</p>
      
      <h2>2. Choose the Right Background</h2>
      <p>A clean, uncluttered background helps your outfit stand out. Look for neutral walls, interesting textures, or outdoor settings that complement your style without competing for attention.</p>
      
      <h2>3. Use the Right Angles</h2>
      <p>Experiment with different angles to find what works best for your body type. A slight downward angle can be flattering, while straight-on shots work well for showcasing full outfits. Don't be afraid to try multiple angles.</p>
      
      <h2>4. Pay Attention to Composition</h2>
      <p>Use the rule of thirds to create visually appealing photos. Place yourself slightly off-center, and ensure your outfit is the main focus of the frame. Leave some negative space to avoid a cluttered look.</p>
      
      <h2>5. Showcase Details</h2>
      <p>Take close-up shots of accessories, shoes, and interesting details of your outfit. These detail shots help viewers appreciate the full look and can increase engagement on your posts.</p>
      
      <h2>6. Use a Tripod or Stable Surface</h2>
      <p>Blurry photos reduce the quality of your content. Use a tripod, prop your phone against a stable surface, or use a timer to ensure sharp, clear images.</p>
      
      <h2>7. Edit Thoughtfully</h2>
      <p>Light editing can enhance your photos, but avoid over-filtering. Adjust brightness, contrast, and saturation subtly to make your outfit look its best while maintaining a natural appearance.</p>
      
      <h2>8. Show Full Outfit Context</h2>
      <p>Include full-body shots so viewers can see how all pieces work together. This helps the FitsCheck community provide better feedback and ratings on your complete look.</p>
      
      <h2>9. Consider Multiple Shots</h2>
      <p>Take several photos from different angles and distances. This gives you options to choose the best shots and allows you to create a carousel post showing your outfit from multiple perspectives.</p>
      
      <h2>10. Be Consistent</h2>
      <p>Develop a consistent style for your outfit photos. This helps build your personal brand on FitsCheck and makes your content instantly recognizable to your followers.</p>
      
      <p>By following these tips, you'll create outfit photos that get more ratings, engagement, and positive feedback from the FitsCheck fashion community. Remember, practice makes perfect, so keep experimenting and refining your photography skills!</p>
    `
  },
  "how-to-win-style-challenges": {
    slug: "how-to-win-style-challenges",
    title: "How to Win Style Challenges: A Complete Guide",
    excerpt: "Master the art of style challenges on FitsCheck. Learn strategies for creating winning entries, engaging the community, and climbing the leaderboards.",
    date: "2025-11-30",
    readTime: "7 min read",
    category: "Style Challenges",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. Style challenges on FitsCheck are a fantastic way to showcase your creativity, connect with the fashion community, and climb the leaderboards. Here's your complete guide to creating winning challenge entries.</p>
      
      <h2>Understanding Style Challenges</h2>
      <p>Style challenges on FitsCheck are themed competitions where you interpret a specific theme through your outfit choices. The community votes on entries, and winners earn style points and recognition.</p>
      
      <h2>1. Read the Challenge Theme Carefully</h2>
      <p>Before creating your entry, thoroughly read the challenge description, rules, and any specific requirements. Understanding the theme completely helps you create an entry that truly fits the challenge.</p>
      
      <h2>2. Be Creative with Your Interpretation</h2>
      <p>While staying true to the theme, find unique ways to interpret it. Think outside the box and showcase your personal style while meeting the challenge requirements. Originality often wins votes.</p>
      
      <h2>3. Plan Your Outfit in Advance</h2>
      <p>Don't wait until the last minute. Plan your outfit, take test photos, and refine your look before submitting. This gives you time to perfect your entry and stand out from rushed submissions.</p>
      
      <h2>4. Take High-Quality Photos</h2>
      <p>Your photos are the first thing voters see. Use good lighting, clear backgrounds, and multiple angles to showcase your outfit effectively. Quality photography significantly impacts your chances of winning.</p>
      
      <h2>5. Write a Compelling Description</h2>
      <p>Your description should explain how your outfit relates to the challenge theme. Share your inspiration, styling choices, and why your look fits the challenge. This helps voters understand and appreciate your entry.</p>
      
      <h2>6. Engage with the Community</h2>
      <p>Vote on other entries, leave thoughtful comments, and engage with fellow participants. Building relationships in the FitsCheck community can lead to more votes and support for your own entries.</p>
      
      <h2>7. Share Your Entry</h2>
      <p>Don't just post and forget. Share your challenge entry on your profile, engage with comments, and encourage your followers to vote. Active promotion can significantly boost your ranking.</p>
      
      <h2>8. Learn from Winners</h2>
      <p>Study previous challenge winners to understand what resonates with the community. Note their styling choices, photo quality, and how they interpreted themes. Use these insights to improve your own entries.</p>
      
      <h2>9. Be Consistent</h2>
      <p>Participate regularly in challenges to build your presence and improve your skills. Consistent participation shows dedication and helps you develop a reputation as a serious style creator.</p>
      
      <h2>10. Have Fun!</h2>
      <p>While winning is great, remember that style challenges are about creativity, community, and self-expression. Enjoy the process, experiment with your style, and connect with other fashion enthusiasts on FitsCheck.</p>
      
      <p>By following these strategies, you'll increase your chances of winning style challenges and climbing the FitsCheck leaderboards. Remember, every challenge is an opportunity to grow as a style creator and connect with the fashion community!</p>
    `
  },
  "2025-fashion-trends": {
    slug: "2025-fashion-trends",
    title: "2025 Fashion Trends: What's Hot This Year",
    excerpt: "Stay ahead of the curve with our comprehensive guide to 2025 fashion trends. Discover the styles that are dominating runways and social media.",
    date: "2025-11-25",
    readTime: "8 min read",
    category: "Trends",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. 2025 is bringing exciting new fashion trends that are already making waves on runways and social media. Here's your guide to the hottest styles you'll see everywhere this year.</p>
      
      <h2>1. Sustainable Fashion Takes Center Stage</h2>
      <p>Eco-conscious fashion is no longer a niche trend. In 2025, sustainable materials, upcycled pieces, and ethical brands are dominating the fashion scene. Look for organic fabrics, recycled materials, and brands committed to sustainability.</p>
      
      <h2>2. Bold Color Blocking</h2>
      <p>Vibrant color combinations are making a major comeback. Think bright oranges paired with electric blues, or bold pinks with vibrant greens. This trend is perfect for standing out on FitsCheck and getting more outfit ratings.</p>
      
      <h2>3. Oversized Silhouettes</h2>
      <p>Comfort meets style with oversized blazers, wide-leg trousers, and roomy tops. This trend emphasizes comfort while maintaining a chic, modern aesthetic.</p>
      
      <h2>4. Vintage Revival</h2>
      <p>Nostalgic styles from the 90s and early 2000s are back in a big way. Think low-rise jeans, platform shoes, and Y2K-inspired accessories. This trend is perfect for style challenges on FitsCheck.</p>
      
      <h2>5. Minimalist Luxury</h2>
      <p>On the opposite end, clean lines, neutral palettes, and high-quality basics are trending. This "quiet luxury" aesthetic focuses on quality over quantity and timeless pieces.</p>
      
      <h2>6. Tech-Integrated Fashion</h2>
      <p>Fashion meets technology with smart accessories, LED elements, and innovative materials. This futuristic trend is perfect for creators looking to stand out.</p>
      
      <h2>7. Statement Accessories</h2>
      <p>Bold jewelry, oversized bags, and eye-catching shoes are taking center stage. Accessories are no longer afterthoughts but key elements of the overall look.</p>
      
      <h2>8. Gender-Fluid Fashion</h2>
      <p>Boundary-breaking styles that transcend traditional gender norms continue to gain momentum. This inclusive trend celebrates personal expression and individuality.</p>
      
      <h2>9. Athleisure Evolution</h2>
      <p>Activewear continues to evolve beyond the gym. High-fashion athletic pieces that seamlessly transition from workout to street style are everywhere.</p>
      
      <h2>10. Artisanal Details</h2>
      <p>Handcrafted elements, unique textures, and artisanal techniques add character to fashion pieces. This trend celebrates craftsmanship and individuality.</p>
      
      <p>These 2025 trends offer plenty of inspiration for your FitsCheck posts. Whether you're participating in style challenges or just sharing your daily outfits, incorporating these trends can help you stay current and get more engagement from the fashion community.</p>
    `
  },
  "outfit-ideas-for-every-occasion": {
    slug: "outfit-ideas-for-every-occasion",
    title: "Outfit Ideas for Every Occasion: Your Style Guide",
    excerpt: "Never wonder what to wear again. Get inspired with outfit ideas for work, dates, parties, and casual outings. Perfect for building your FitsCheck wardrobe.",
    date: "2024-11-25",
    readTime: "6 min read",
    category: "Style Guide",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. Having the right outfit for every occasion is essential for looking and feeling your best. Here's your comprehensive style guide for dressing appropriately and stylishly for any event.</p>
      
      <h2>Work & Professional Settings</h2>
      <p>For professional environments, opt for tailored pieces that express your personal style while maintaining professionalism. A well-fitted blazer, quality trousers, and polished shoes create a strong foundation. Add personality with accessories and color choices that reflect your brand.</p>
      
      <h2>Date Night Outfits</h2>
      <p>Date night calls for outfits that make you feel confident and attractive. Choose pieces that highlight your best features while staying true to your style. Whether it's a romantic dinner or casual coffee date, balance comfort with a touch of special occasion flair.</p>
      
      <h2>Party & Event Attire</h2>
      <p>Party outfits should reflect the event's vibe while allowing you to stand out. Consider the venue, time of day, and dress code. Statement pieces, bold accessories, and attention-grabbing details work well for social events where you want to make an impression.</p>
      
      <h2>Casual Day Out</h2>
      <p>Casual outfits should prioritize comfort without sacrificing style. Quality basics, well-fitted jeans, comfortable shoes, and layers that can adapt to changing weather create versatile casual looks perfect for everyday activities.</p>
      
      <h2>Weekend Brunch</h2>
      <p>Brunch outfits strike a balance between relaxed and put-together. Think elevated casual pieces, comfortable yet stylish shoes, and accessories that add polish without being too formal.</p>
      
      <h2>Travel Outfits</h2>
      <p>Travel style should be comfortable for long journeys while still looking presentable. Opt for wrinkle-resistant fabrics, layers for temperature changes, and versatile pieces that can work for multiple occasions during your trip.</p>
      
      <h2>Building Your Versatile Wardrobe</h2>
      <p>Invest in quality basics that can be mixed and matched for different occasions. A capsule wardrobe with versatile pieces saves time and ensures you always have appropriate options. Share your versatile looks on FitsCheck to get feedback from the community.</p>
      
      <p>Remember, the best outfit for any occasion is one that makes you feel confident and authentic. Use FitsCheck to get community feedback on your outfit choices and discover new styling ideas from other fashion enthusiasts!</p>
    `
  },
  "how-to-style-denim": {
    slug: "how-to-style-denim",
    title: "How to Style Denim: 15 Outfit Combinations",
    excerpt: "Denim is a wardrobe staple. Learn creative ways to style jeans, jackets, and denim pieces for different occasions and seasons.",
    date: "2025-11-20",
    readTime: "5 min read",
    category: "Styling Tips",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. Denim is one of the most versatile fabrics in fashion. From classic jeans to statement jackets, here are 15 creative ways to style denim for any occasion.</p>
      
      <h2>1. Classic Blue Jeans + White Tee + Blazer</h2>
      <p>The timeless combination that never fails. Pair your favorite jeans with a crisp white tee and a tailored blazer for a polished casual look.</p>
      
      <h2>2. Denim on Denim (Canadian Tuxedo)</h2>
      <p>Master the art of double denim by pairing different washes together. A light wash jacket with dark wash jeans creates visual interest while maintaining cohesion.</p>
      
      <h2>3. Wide-Leg Denim + Fitted Top</h2>
      <p>Balance voluminous wide-leg jeans with a fitted, tucked-in top. This creates a flattering silhouette that's both comfortable and stylish.</p>
      
      <h2>4. Denim Jacket + Flowy Dress</h2>
      <p>Add edge to a feminine dress by layering a denim jacket. This combination works for both casual and semi-formal occasions.</p>
      
      <h2>5. Black Denim + Bold Colors</h2>
      <p>Black denim serves as a neutral base for vibrant tops and accessories. This allows you to experiment with bold colors while keeping the look grounded.</p>
      
      <h2>6. Distressed Denim + Elevated Pieces</h2>
      <p>Balance casual distressed jeans with more polished pieces like a silk blouse or structured blazer for a high-low aesthetic.</p>
      
      <h2>7. Denim Skirt + Sweater</h2>
      <p>A denim skirt paired with a cozy sweater creates a perfect transitional season outfit that's both comfortable and stylish.</p>
      
      <h2>8. Colored Denim + Neutrals</h2>
      <p>Make colored denim the statement piece by pairing it with neutral tops and accessories. This keeps the focus on your unique denim choice.</p>
      
      <h2>9. Denim Shorts + Blazer</h2>
      <p>Elevate denim shorts for warmer weather by adding a structured blazer. This creates a sophisticated summer look perfect for casual work environments.</p>
      
      <h2>10. High-Waisted Denim + Crop Top</h2>
      <p>Show off your waist with high-waisted jeans and a crop top. This combination is perfect for casual outings and creates a flattering silhouette.</p>
      
      <h2>11. Denim + Leather</h2>
      <p>Combine denim with leather pieces for an edgy, rock-and-roll inspired look. A leather jacket over denim creates texture and visual interest.</p>
      
      <h2>12. Oversized Denim Jacket + Leggings</h2>
      <p>For ultimate comfort, pair an oversized denim jacket with leggings and sneakers. This athleisure-inspired look is perfect for running errands or casual days.</p>
      
      <h2>13. Denim + Prints</h2>
      <p>Denim serves as a neutral base for bold prints. Pair printed tops with classic blue jeans to let the pattern shine while keeping the look balanced.</p>
      
      <h2>14. Vintage Denim + Modern Accessories</h2>
      <p>Mix vintage denim pieces with contemporary accessories to create a unique, time-blended aesthetic that stands out.</p>
      
      <h2>15. Denim + Statement Shoes</h2>
      <p>Let your footwear be the star by pairing simple denim with statement shoes. Whether it's bold sneakers, heeled boots, or unique flats, let your shoes add personality.</p>
      
      <p>These denim styling combinations offer endless possibilities for creating unique looks. Share your denim outfits on FitsCheck to get feedback from the fashion community and discover new styling inspiration!</p>
    `
  },
  "fashion-challenges-on-social-media": {
    slug: "fashion-challenges-on-social-media",
    title: "Fashion Challenges on Social Media: The Ultimate Guide",
    excerpt: "Explore the world of fashion challenges on social media platforms. Learn how FitsCheck is revolutionizing style competitions and community engagement.",
    date: "2025-11-20",
    readTime: "6 min read",
    category: "Community",
    content: `
      <p>Unlike AI styling apps, FitsCheck is a community-powered platform where real people vote on your outfits, making fashion decisions social, fun, and authentic. Fashion challenges have become a major trend on social media, bringing communities together through style and creativity. FitsCheck is at the forefront of this movement, creating a dedicated platform for fashion challenges and community engagement.</p>
      
      <h2>The Rise of Fashion Challenges</h2>
      <p>Fashion challenges on social media have evolved from simple hashtag trends to sophisticated competitions that engage millions of users. These challenges allow fashion enthusiasts to showcase their creativity, connect with like-minded individuals, and gain recognition for their style.</p>
      
      <h2>Why Fashion Challenges Are Popular</h2>
      <p>Fashion challenges provide structure for creativity, create community connections, and offer opportunities for recognition. They help users discover new styling techniques, connect with trends, and build their personal brand in the fashion space.</p>
      
      <h2>Types of Fashion Challenges</h2>
      <p>From daily outfit challenges to themed competitions, fashion challenges come in many forms. Weekly themes, seasonal challenges, and user-created competitions keep the community engaged and provide fresh content regularly.</p>
      
      <h2>How FitsCheck Revolutionizes Fashion Challenges</h2>
      <p>FitsCheck takes fashion challenges to the next level with dedicated voting systems, leaderboards, style points, and community features designed specifically for fashion enthusiasts. Unlike generic social media platforms, FitsCheck is built for fashion community engagement.</p>
      
      <h2>Benefits of Participating</h2>
      <p>Participating in fashion challenges on FitsCheck helps you improve your styling skills, connect with the fashion community, gain visibility, and potentially win recognition and rewards. It's a fun way to express your creativity while building your fashion presence.</p>
      
      <h2>Tips for Challenge Success</h2>
      <p>To succeed in fashion challenges, understand the theme thoroughly, be creative with your interpretation, take high-quality photos, engage with the community, and stay consistent with your participation. These strategies help you stand out and climb the leaderboards.</p>
      
      <h2>The Future of Fashion Challenges</h2>
      <p>As fashion challenges continue to evolve, platforms like FitsCheck are creating more sophisticated systems for voting, recognition, and community building. The future of fashion challenges is about deeper engagement and meaningful connections within the fashion community.</p>
      
      <p>Fashion challenges on FitsCheck offer a unique opportunity to engage with a dedicated fashion community, showcase your style, and grow as a fashion creator. Join the community today and start participating in exciting style challenges!</p>
    `
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | FitsCheck Blog`,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), "fashion blog", "style tips", "outfit ideas"],
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "author": {
      "@type": "Organization",
      "name": "FitsCheck"
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.excerpt,
    "publisher": {
      "@type": "Organization",
      "name": "FitsCheck",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fitscheck.com/branding/FitsCheck.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fitscheck.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#FEFBD7] to-white">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#003366] hover:text-[#F8E71C] mb-8 transition-colors"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
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
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                {post.title}
              </h1>
              
              <p className="text-xl text-[#A3A3A3] leading-relaxed mb-8" style={{ fontFamily: "var(--font-satoshi)" }}>
                {post.excerpt}
              </p>
            </div>

            <div 
              className="blog-content mb-12"
              style={{ fontFamily: "var(--font-satoshi)" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="bg-[#F0F7FF] rounded-2xl p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-4" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                Ready to Share Your Style?
              </h2>
              <p className="text-lg text-[#A3A3A3] mb-6" style={{ fontFamily: "var(--font-satoshi)" }}>
                Join FitsCheck to share your outfits, get ratings, and participate in style challenges.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-6 rounded-full text-lg font-bold"
              >
                <Link href="/#waitlist">Join the Waitlist</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  )
}

