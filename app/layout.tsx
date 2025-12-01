import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const whyteInktrap = localFont({
  src: [
    {
      path: '../public/fonts/WhyteInktrap-Black.ttf',
      weight: '950',
      style: 'normal',
    },
  ],
  variable: '--font-whyte-inktrap'
})

export const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: {
    default: "FitsCheck - Make Fashion Decisions with Community Voting",
    template: "%s | FitsCheck"
  },
  description:
    "Join FitsCheck - the fashion community where you post outfits, get instant ratings, and win style challenges. Share your fits with fashion lovers worldwide.",
  icons: {
    icon: [
      {
        url: "/branding/FitsIcon.png",
        type: "image/png",
      },
    ],
    shortcut: "/branding/FitsIcon.png",
    apple: "/branding/FitsIcon.png",
  },
  keywords: [
    "outfit rating app",
    "fit check platform",
    "fashion community app",
    "outfit voting",
    "style challenges",
    "fashion feedback app",
    "OOTD community",
    "fashion app",
    "style decisions",
    "fashion influencer",
    "style tips",
    "fashion leaderboard",
    "this or that fashion",
    "shop this look",
    "fashion monetization",
    "style points",
    "outfit rating app UK",
    "outfit rating app US",
    "best fashion community 2025",
    "TikTok style alternatives",
    "Instagram fashion community"
  ],
  authors: [{ name: "FitsCheck Team" }],
  creator: "FitsCheck",
  publisher: "FitsCheck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content.",
    type: "website",
    locale: "en_US",
    siteName: "FitsCheck",
    images: [
      {
        url: "/branding/og.png",
        width: 1200,
        height: 630,
        alt: "FitsCheck - Fashion Decision Making App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content. Download now!",
    images: ["/branding/twitter-og.png"],
    creator: "@fitscheck",
  },
  metadataBase: new URL("https://fitscheck.com"),
  alternates: {
    canonical: "/",
  },
  applicationName: "FitsCheck",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitsCheck",
  },
  formatDetection: {
    telephone: false,
  },
  category: "Fashion",
  classification: "Social Media App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${whyteInktrap.variable} ${satoshi.variable}`} suppressHydrationWarning>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
