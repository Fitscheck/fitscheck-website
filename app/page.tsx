import Link from "next/link"
import Image from "next/image"
import { Check, Star, Trophy, Users, Vote } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageCarousel from "@/components/imageCarousel"

export default function Home() {

  const slides = [
    { src: '/slide1.webp', alt: 'First Slide' },
    { src: '/slide2.webp', alt: 'Second Slide' },
    { src: '/slide3.webp', alt: 'Third Slide' },
    { src: '/slide4.webp', alt: 'fourth Slide' },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white py-14 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-center md:text-start">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
                  Share Your <span className="text-pink-500">Fits</span>, Get Feedback, Earn Points
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FitsCheck is the social fashion platform where you can showcase your outfits, receive community
                  feedback, and participate in style challenges.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-pink-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  Learn More
                </Link>

              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className="relative h-[500px] w-full rounded-xl shadow-2xl">
                <ImageCarousel
                  images={slides}
                  autoPlayInterval={5000}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 font-sans">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Everything You Need to Showcase Your Style
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg">
              From hot-or-not voting to affiliate links, FitsCheck gives you the full fashion social experience.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Vote className="h-6 w-6" />, title: "Community Voting", desc: "Get instant outfit feedback through hot or not votes." },
              { icon: <Trophy className="h-6 w-6" />, title: "Style Challenges", desc: "Join themed contests to win points and earn prestige." },
              { icon: <Star className="h-6 w-6" />, title: "Style Points", desc: "Engage to earn points and rise on the leaderboard." },
              { icon: <Users className="h-6 w-6" />, title: "Fashion Community", desc: "Follow, connect, and grow your style circle." },
              { icon: <Users className="h-6 w-6" />, title: "Feedback & Comments", desc: "Get helpful tips and detailed feedback from others." },
              { icon: <svg className="h-6 w-6" /* affiliate icon */ />, title: "Affiliate Links", desc: "Add links to earn from your influence (premium)." },
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-6 shadow hover:shadow-md transition">
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="bg-gray-50 py-20 font-sans">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Simple, Fun, and Rewarding
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Sharing your outfits and getting feedback is as easy as 1-2-3.
          </p>
        </div>

        <div className="mt-12 grid gap-8 max-w-5xl mx-auto md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Post Your Fit",
              desc: "Snap your look, add tags and descriptions.",
              img: "/mirrored-style.png",
            },
            {
              step: "2",
              title: "Get Feedback",
              desc: "Receive community votes and comments.",
              img: "/mobile-voting-interface.png",
            },
            {
              step: "3",
              title: "Earn & Grow",
              desc: "Collect style points and build your following.",
              img: "/stylized-leaderboard.png",
            },
          ].map(({ step, title, desc, img }) => (
            <div key={step} className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-500 font-bold text-2xl">
                {step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-500 text-center">{desc}</p>
              <Image src={img} alt={title} width={200} height={200} className="rounded-lg" />
            </div>
          ))}
        </div>
      </section>


      {/* Pricing Section */}

      <section id="pricing" className="bg-white py-20 font-sans">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Choose Your Style Journey
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Start for free or upgrade to Premium for unlimited access and monetization opportunities.
          </p>
        </div>

        <div className="mt-12 grid max-w-5xl mx-auto gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <div className="flex flex-col rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Free</h3>
              <p className="text-gray-500">Perfect for casual style enthusiasts</p>
            </div>
            <div className="mt-4 flex items-baseline text-gray-900 space-x-1">
              <span className="text-2xl font-extrabold text-pink-600">$0</span>
              <span className="font-medium text-pink-400">/month</span>
            </div>
            <ul className="mt-6 space-y-4 text-left">
              {[
                "Post up to 5 fits",
                "Vote, comment, and follow",
                "Join up to 2 challenges",
                "Earn style points",
                "Appear on leaderboards",
              ].map((item, i) => (
                <li key={i} className="flex items-start text-gray-700 font-medium">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/login">
                <button className="w-full h-10 rounded-md bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative flex flex-col rounded-xl border border-pink-200 bg-pink-50 p-6 shadow-md hover:shadow-lg transition">
            <div className="absolute -top-4 right-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white shadow">
              Popular
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Premium</h3>
              <p className="text-gray-500">For serious style influencers</p>
            </div>
            <div className="mt-4 flex items-baseline text-gray-900 space-x-1">
              <span className="text-2xl font-extrabold text-pink-600">$4.99</span>
              <span className="font-medium text-pink-400">/month</span>
            </div>
            <ul className="mt-6 space-y-4 text-left">
              {[
                "Unlimited fit posts",
                "Add affiliate links to earn commission",
                "Unlimited challenge entries",
                "All free features included",
                "Premium badge on profile",
              ].map((item, i) => (
                <li key={i} className="flex items-start text-gray-700 font-medium">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/premium">
                <button className="w-full h-10 rounded-md bg-pink-500 text-white font-medium text-sm hover:bg-pink-600 transition">
                  Upgrade to Premium
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* App Preview */}
      <section className="bg-gradient-to-b from-white to-pink-50 py-20 font-sans">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
              App Preview
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              See FitsCheck in Action
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-500">
              Explore the FitsCheck mobile experience — stylish, seamless, and made for self-expression.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
            {[
              { src: "/fashion-app-feed.png", alt: "FitsCheck Feed" },
              { src: "/fashion-app-feed.png", alt: "FitsCheck Profile" },
              { src: "/fashion-app-feed.png", alt: "FitsCheck Challenges" },
            ].map(({ src, alt }, i) => (
              <div
                key={i}
                className="relative h-[500px] w-[250px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <Image src={src} alt={alt} fill className="object-cover rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-pink-500 py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Ready to Showcase Your Style?
              </h2>
              <p className="max-w-[900px] text-pink-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of fashion enthusiasts on FitsCheck today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-pink-500 shadow transition-colors hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
