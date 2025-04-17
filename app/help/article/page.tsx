"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Sample help article content
const helpArticles = {
  "create-account": {
    title: "How to Create an Account",
    content: `
      <h2>Creating Your FitsCheck Account</h2>
      <p>Getting started with FitsCheck is easy! Follow these simple steps to create your account:</p>
      <ol>
        <li>Visit the FitsCheck website or download the mobile app from the App Store or Google Play.</li>
        <li>Click on the "Get Started" or "Sign Up" button.</li>
        <li>Enter your email address and click "Continue with Email".</li>
        <li>Check your email for a verification code and enter it on the verification screen.</li>
        <li>Complete your profile by adding a username, profile picture, and bio.</li>
        <li>Start exploring the app and sharing your outfits!</li>
      </ol>
      <p>Once your account is created, you can immediately start posting outfits, voting on other users' styles, and participating in challenges.</p>
    `,
  },
  "first-outfit": {
    title: "Posting Your First Outfit",
    content: `
      <h2>How to Post Your First Outfit on FitsCheck</h2>
      <p>Ready to share your style with the world? Here's how to post your first outfit:</p>
      <ol>
        <li>From the home screen, tap the "+" button at the bottom of the screen.</li>
        <li>Select "New Outfit" from the menu options.</li>
        <li>Take a photo using your camera or select an existing photo from your gallery.</li>
        <li>Add a title and description for your outfit.</li>
        <li>Add relevant tags to help others discover your style (e.g., #casual, #summer, #streetwear).</li>
        <li>Optionally, tag the brands you're wearing.</li>
        <li>Tap "Post" to share your outfit with the community.</li>
      </ol>
      <p>Tips for great outfit posts:</p>
      <ul>
        <li>Use good lighting to showcase your outfit clearly.</li>
        <li>Take full-length photos when possible to show the complete look.</li>
        <li>Include details about where you wore the outfit or what inspired it.</li>
      </ul>
    `,
  },
  "style-points": {
    title: "Understanding Style Points",
    content: `
      <h2>Style Points: How They Work</h2>
      <p>Style Points are the currency of recognition on FitsCheck. Here's everything you need to know:</p>
      <h3>How to Earn Style Points</h3>
      <ul>
        <li><strong>Receiving votes:</strong> When other users vote "Hot" on your outfits, you earn points.</li>
        <li><strong>Challenge participation:</strong> Entering style challenges earns you points, with bonus points for placing in the top rankings.</li>
        <li><strong>Daily activity:</strong> Regular engagement with the app earns you daily bonus points.</li>
        <li><strong>Community engagement:</strong> Commenting on and voting on other users' outfits earns small amounts of points.</li>
      </ul>
      <h3>What Style Points Do</h3>
      <ul>
        <li>Determine your ranking on the leaderboard</li>
        <li>Unlock special badges and profile features</li>
        <li>Qualify you for exclusive challenges and events</li>
        <li>Boost your visibility in the community</li>
      </ul>
      <p>The more active and engaged you are, the more Style Points you'll earn. Keep posting quality outfits and participating in the community to climb the ranks!</p>
    `,
  },
  "update-profile": {
    title: "Updating Your Profile",
    content: `
      <h2>How to Update Your FitsCheck Profile</h2>
      <p>Your profile is your fashion identity on FitsCheck. Here's how to keep it updated:</p>
      <h3>Accessing Your Profile Settings</h3>
      <ol>
        <li>Tap on your profile icon in the bottom navigation bar.</li>
        <li>Tap the "Edit Profile" button near your profile information.</li>
      </ol>
      <h3>What You Can Update</h3>
      <ul>
        <li><strong>Profile Picture:</strong> Tap on your current photo to upload a new one.</li>
        <li><strong>Username:</strong> You can change your username once every 30 days.</li>
        <li><strong>Bio:</strong> Share a brief description about your style and fashion interests.</li>
        <li><strong>Social Links:</strong> Connect your other social media accounts.</li>
        <li><strong>Style Tags:</strong> Add tags that represent your fashion style (e.g., minimalist, vintage, streetwear).</li>
      </ul>
      <p>Remember to tap "Save" after making your changes to update your profile.</p>
    `,
  },
  "notification-settings": {
    title: "Changing Notification Settings",
    content: `
      <h2>Managing Your Notification Preferences</h2>
      <p>Stay in control of how FitsCheck communicates with you by customizing your notification settings:</p>
      <h3>How to Access Notification Settings</h3>
      <ol>
        <li>Go to your profile by tapping your profile icon.</li>
        <li>Tap the settings gear icon in the top right.</li>
        <li>Select "Notifications" from the menu.</li>
      </ol>
      <h3>Types of Notifications You Can Customize</h3>
      <ul>
        <li><strong>Likes and Votes:</strong> When someone votes on your outfits.</li>
        <li><strong>Comments:</strong> When someone comments on your posts.</li>
        <li><strong>Follows:</strong> When someone follows your profile.</li>
        <li><strong>Challenges:</strong> Updates about challenges you've entered.</li>
        <li><strong>Style Points:</strong> Notifications about earning style points.</li>
        <li><strong>App Updates:</strong> Information about new features and updates.</li>
        <li><strong>Marketing:</strong> Promotional content and special offers.</li>
      </ul>
      <p>You can choose to receive notifications via push notifications, email, or both. Toggle each option according to your preferences.</p>
    `,
  },
  "premium-benefits": {
    title: "Premium Subscription Benefits",
    content: `
      <h2>FitsCheck Premium: Exclusive Benefits</h2>
      <p>Upgrade your FitsCheck experience with a Premium subscription and enjoy these benefits:</p>
      <h3>Key Premium Features</h3>
      <ul>
        <li><strong>Unlimited Outfit Posts:</strong> No more 5-post limit - share as many outfits as you want.</li>
        <li><strong>Affiliate Links:</strong> Add affiliate links to your outfits and earn commission when followers purchase items.</li>
        <li><strong>Unlimited Challenge Entries:</strong> Enter as many style challenges as you want, with no restrictions.</li>
        <li><strong>Premium Badge:</strong> Stand out with an exclusive badge on your profile that shows your premium status.</li>
        <li><strong>Advanced Analytics:</strong> Get detailed insights about your posts' performance and audience engagement.</li>
        <li><strong>Ad-Free Experience:</strong> Enjoy FitsCheck without any advertisements.</li>
        <li><strong>Priority Support:</strong> Get faster responses from our support team.</li>
      </ul>
      <h3>Subscription Options</h3>
      <p>Choose between monthly ($4.99/month) or annual ($49.99/year) billing to save 16% with the annual plan.</p>
      <p>You can upgrade to Premium at any time from your Account page.</p>
    `,
  },
  "affiliate-links": {
    title: "Setting Up Affiliate Links",
    content: `
      <h2>How to Set Up and Use Affiliate Links</h2>
      <p>As a Premium member, you can monetize your style by adding affiliate links to your outfit posts. Here's how:</p>
      <h3>Getting Started with Affiliate Links</h3>
      <ol>
        <li>First, make sure you have an active Premium subscription.</li>
        <li>Sign up for affiliate programs with fashion retailers (like Amazon Associates, RewardStyle, or individual brand programs).</li>
        <li>Generate your affiliate links through these programs for the items you want to promote.</li>
      </ol>
      <h3>Adding Affiliate Links to Your Posts</h3>
      <ol>
        <li>When creating a new outfit post, scroll down to the "Shop My Look" section.</li>
        <li>Tap "Add Item" for each piece of your outfit you want to link.</li>
        <li>Enter the item name, select the brand, and paste your affiliate link.</li>
        <li>Optionally, add the price and a brief description.</li>
        <li>You can add up to 10 affiliate links per outfit post.</li>
      </ol>
      <h3>Tracking Your Earnings</h3>
      <p>Track your affiliate earnings through your chosen affiliate programs' dashboards. FitsCheck does not directly track your commission - this is managed by each affiliate program you join.</p>
      <p>Remember to disclose your use of affiliate links in your posts to comply with regulations.</p>
    `,
  },
}

export default function HelpArticlePage() {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("id") || "create-account"
  const article = helpArticles[articleId as keyof typeof helpArticles] || helpArticles["create-account"]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/help" className="inline-flex items-center text-pink-500 hover:text-pink-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Help Center
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

          <div className="prose prose-pink max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-12 border-t pt-6">
            <h3 className="font-medium mb-4">Was this article helpful?</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Yes</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">No</button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Still need help?{" "}
              <Link href="/report" className="text-pink-500 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
