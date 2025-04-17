import Link from "next/link";
import Image from "next/image";
import { Check, Star, Trophy, Users, Vote } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ImageCarousel from "@/components/imageCarousel";

export default function Home() {
  const slides = [
    { src: "/slide1.jpg", alt: "First Slide" },
    { src: "/slide2.jpeg", alt: "Second Slide" },
    { src: "/slide3.jpg", alt: "Third Slide" },
    { src: "/slide4.jpg", alt: "fourth Slide" },
    { src: "/slide5.jpg", alt: "fifth Slide" },
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
                <h1 className="text-black text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Share Your <span className="text-pink-500">Fits</span>, Get
                  Feedback, Earn Points
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FitsCheck is the social fashion platform where you can
                  showcase your outfits, receive community feedback, and
                  participate in style challenges.
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
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 text-black bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className="relative h-[500px] w-full rounded-xl shadow-2xl">
                <ImageCarousel images={slides} autoPlayInterval={5000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500">
                Features
              </div>
              <h2 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Showcase Your Style
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                FitsCheck combines social networking with fashion feedback to
                create a unique platform for style enthusiasts.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <Vote className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-black text-xl font-bold">Community Voting</h3>
              <p className="text-center text-gray-500">
                Get instant feedback on your outfits with simple Hot/Not voting
                from the community.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <Trophy className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-black text-xl font-bold">Style Challenges</h3>
              <p className="text-center text-gray-500">
                Participate in themed challenges to showcase your creativity and
                win style points.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <Star className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-black text-xl font-bold">Style Points</h3>
              <p className="text-center text-gray-500">
                Earn points for engagement and climb the leaderboard to become a
                style influencer.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <Users className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-black text-xl font-bold">
                Fashion Community
              </h3>
              <p className="text-center text-gray-500">
                Connect with other fashion enthusiasts, follow your favorites,
                and build your audience.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-pink-500"
                >
                  <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.2.2 0 0 1-.2.2h-.5a.8.8 0 0 0-.8.8v1.4a.8.8 0 0 0 .8.8h1.5a.8.8 0 0 1 .8.8v2.94" />
                  <path d="M19.8 17.8a7.5 7.5 0 0 0-2.4-3.8" />
                  <path d="M22 17.8a11.5 11.5 0 0 0-5-7.8" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold">Feedback & Comments</h3>
              <p className="text-center text-gray-500">
                Receive detailed comments and suggestions to improve your style
                game.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="rounded-full bg-pink-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-pink-500"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-black text-xl font-bold">Affiliate Links</h3>
              <p className="text-center text-gray-500">
                Premium users can add affiliate links to their outfits and earn
                commission on purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500">
                How It Works
              </div>
              <h2 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Fun, and Rewarding
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                FitsCheck makes sharing your style and getting feedback easier
                than ever.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold text-pink-500">
                1
              </div>
              <h3 className="text-black text-xl font-bold">Post Your Fit</h3>
              <p className="text-center text-gray-500">
                Take a photo of your outfit, add a title, description, and
                relevant tags.
              </p>
              <Image
                src="/mirrored-style.jpg"
                alt="Post Your Fit"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold text-pink-500">
                2
              </div>
              <h3 className="text-black text-xl font-bold">Get Feedback</h3>
              <p className="text-center text-gray-500">
                Receive votes and comments from the community on your outfit.
              </p>
              <Image
                src="/mobile-voting-interface.png"
                alt="Get Feedback"
                width={250}
                height={250}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold text-pink-500">
                3
              </div>
              <h3 className="text-black text-xl font-bold">Earn & Grow</h3>
              <p className="text-center text-gray-500">
                Earn style points, join challenges, and build your fashion
                influence.
              </p>
              <Image
                src="/stylized-leaderboard.jpg"
                alt="Earn & Grow"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500">
                Pricing
              </div>
              <h2 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Choose Your Style Journey
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start for free or upgrade to Premium for unlimited access and
                monetization opportunities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            <div className="flex flex-col rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-black text-2xl font-bold">Free</h3>
                <p className="text-gray-500">
                  Perfect for casual style enthusiasts
                </p>
              </div>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <ul className="text-black mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Post up to 5 fits</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Vote, comment, and follow</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Join up to 2 challenges</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Earn style points</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Appear on leaderboards</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="relative flex flex-col rounded-lg border border-pink-200 bg-pink-50 p-6 shadow-sm">
              <div className="absolute -top-4 right-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-black text-2xl font-bold">Premium</h3>
                <p className="text-gray-500">For serious style influencers</p>
              </div>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold">$4.99</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <ul className="text-black mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span className="font-bold">Unlimited fit posts</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span className="font-bold">
                    Add affiliate links to earn commission
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span className="font-bold">Unlimited challenge entries</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>All free features included</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Premium badge on profile</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/premium"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-pink-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500"
                >
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="bg-gradient-to-b from-white to-pink-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500">
                App Preview
              </div>
              <h2 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See FitsCheck in Action
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take a look at the FitsCheck mobile experience.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-8">
            <div className="relative h-[500px] w-[250px] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/fashion-app-feed.png"
                alt="FitsCheck Feed"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[500px] w-[250px] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="fashion-app-feed.png"
                alt="FitsCheck Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[500px] w-[250px] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="fashion-app-feed.png"
                alt="FitsCheck Challenges"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-500 py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
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
  );
}
