"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWaitlist } from "@/lib/hooks/useWaitlist"
import { toast } from "react-hot-toast"

export default function WaitlistPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { joinWaitlist } = useWaitlist()

    const slides = [
        {
            src: "/slide1.webp",
            alt: "RC",
        },
        {
            src: "/slide2.webp",
            alt: "JB",
        },
        {
            src: "/slide4.webp",
            alt: "TD",
        },
        {
            src: "/slide3.webp",
            alt: "EV",
        },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Basic email validation
        if (!email || !email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address")
            return
        }

        try {
            setIsSubmitting(true)

            const response = await joinWaitlist(email)
            setIsSubmitted(true)

            toast.success(response.message || "Your email has been submitted successfully!")

            setEmail("") // Clear the email input
        } catch (error) {
            toast.error("An unknown error occurred. Please try again later.")

        } finally {
            setIsSubmitting(false)
        }


    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white py-20 ">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start justify-center space-y-4">
                                <div className="inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-sm text-pink-500">
                                    <span className="font-medium">Coming Soon</span>
                                    <div className="ml-1 h-2 w-2 rounded-full bg-pink-500"></div>
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                        Join the <span className="text-pink-500">FitsCheck</span> Waitlist
                                    </h1>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Perfect for content creators, influencers, fashion enthusiasts, and anyone who loves fashion. 
                                        Get crowd-sourced style decisions, share your affiliate links, earn style points, and compete on global and friends leaderboards.
                                    </p>
                                </div>

                                {!isSubmitted ? (
                                    <div className="space-y-4">
                                        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-2 sm:flex-row">
                                            <div className="flex-1">
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-12 w-full"
                                                    disabled={isSubmitting}
                                                />
                                                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                                            </div>
                                            <Button type="submit" className="h-12 bg-pink-500 hover:bg-pink-600" disabled={isSubmitting}>
                                                {isSubmitting ? "Joining..." : "Join Waitlist"}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </form>
                                        <p className="text-sm text-gray-500">We'll notify you when we launch. No spam, we promise!</p>
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-green-100 p-1">
                                                <Check className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-green-800">You're on the list!</h3>
                                                <p className="text-sm text-green-700">
                                                    Thanks for joining our waitlist. We'll notify you when FitsCheck launches.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {slides.map((slide, index) => (
                                            <Avatar key={index} className="h-8 w-8 ring ring-white">
                                                <AvatarImage src={slide.src} alt={slide.alt} />
                                                <AvatarFallback>{slide.alt}</AvatarFallback>
                                            </Avatar>
                                        ))}

                                    </div>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">1,240+</span> fashion enthusiasts already joined
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-2xl">
                                    {/* <Image
                    src="/fashion-app-feed.png"
                    alt="FitsCheck App Preview"
                    fill
                    className="object-cover"
                    priority
                  /> */}
                                    <div className="flex items-center justify-center ">
                                        <div className="relative h-[500px] w-full rounded-xl shadow-2xl">
                                            <Image
                                                src={"/slide2.webp"}
                                                alt="hero image"
                                                fill
                                                className="rounded-xl object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="mb-2 flex items-center gap-1">
                                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                            <span className="text-xs font-medium">Coming Soon</span>
                                        </div>
                                        <h3 className="text-lg font-bold">FitsCheck Mobile App</h3>
                                        <p className="text-sm opacity-90">Share your style with the world</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Preview */}
                <section className="bg-white py-20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-500">Coming Soon</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What to Expect</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    The social platform where fashion meets decision-making and monetization.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
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
                                <h3 className="text-xl font-bold">This or That Voting</h3>
                                <p className="text-center text-gray-500">
                                    Post two outfit options and let the community vote. Whether it's a blue skirt or purple skirt, get real-time feedback to help you make the perfect style decision.
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
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                        <path d="M4 22h16" />
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Shop This Look</h3>
                                <p className="text-center text-gray-500">
                                    Post your outfit of the day and attach your affiliate links in the 'Shop This Look' section. Add promo codes and earn commission when followers purchase through your links.
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
                                <h3 className="text-xl font-bold">Fashion Tips & Style</h3>
                                <p className="text-center text-gray-500">
                                    Share your fashion expertise with style tips, outfit inspiration, and fashion advice. Post images with tips to help others elevate their style game.
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
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                        <path d="M4 22h16" />
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Style Points & Leaderboards</h3>
                                <p className="text-center text-gray-500">
                                    Earn style points for your posts and engagement. Compete on the global leaderboard or see how you rank among friends you're following. Climb the ranks and showcase your fashion influence.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-gray-50 py-20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to know about the FitsCheck waitlist and upcoming app.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto mt-12 grid max-w-3xl gap-6">
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="text-lg font-medium">When will FitsCheck launch?</h3>
                                <p className="mt-2 text-gray-500">
                                    We're planning to launch the beta version in December 2025, with a full public release in Autumn 2025.
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="text-lg font-medium">Will the app be free to use?</h3>
                                <p className="mt-2 text-gray-500">
                                    Yes! FitsCheck will have a free tier with core features. Premium features will be available fors
                                    $4.99/month.
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="text-lg font-medium">What platforms will FitsCheck be available on?</h3>
                                <p className="mt-2 text-gray-500">
                                    FitsCheck will launch on iOS and Android simultaneously, with a web version coming shortly after.
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="text-lg font-medium">Will waitlist members get early access?</h3>
                                <p className="mt-2 text-gray-500">
                                    Yes! Waitlist members will be the first to receive invites to our closed beta, and will get special
                                    perks when we launch.
                                </p>
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
                                    Ready to Join the Fashion Revolution?
                                </h2>
                                <p className="max-w-[900px] text-pink-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Sign up for our waitlist and be the first to know when we launch.
                                </p>
                            </div>
                            <div className="w-full max-w-md space-y-2">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 w-full bg-white/10 text-white placeholder:text-white/60 focus:bg-white/20"
                                            disabled={isSubmitting}
                                        />
                                        <Button
                                            type="submit"
                                            className="h-12 bg-white text-pink-500 hover:bg-pink-50"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Joining..." : "Join Waitlist"}
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="rounded-lg border border-white/20 bg-white/10 p-4 text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-white/20 p-1">
                                                <Check className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">You're on the list!</h3>
                                                <p className="text-sm text-pink-100">
                                                    Thanks for joining our waitlist. We'll notify you when FitsCheck launches.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <div className="flex items-center justify-center gap-4 pt-4">
                <Link href="#" className="text-pink-100 hover:text-white">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-pink-100 hover:text-white">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div> */}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
