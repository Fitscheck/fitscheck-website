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
    default: "FitsCheck - Fashion Community App & Outfit Voting Platform",
    template: "%s | FitsCheck"
  },
  description:
    "Join FitsCheck - the social fashion platform where the community votes on your outfits. Post fits, compete in challenges, climb leaderboards.",
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
    "fashion community app",
    "outfit voting platform",
    "social fashion challenges",
    "fashion leaderboard app",
    "this or that fashion app",
    "crowd-sourced style decisions",
    "fashion competition app",
    "fit check platform",
    "outfit voting",
    "style challenges",
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
    title: "FitsCheck - Fashion Community App & Outfit Voting Platform",
    description: "Join FitsCheck - the social fashion platform where the community votes on your outfits. Post fits, compete in challenges, climb leaderboards.",
    type: "website",
    locale: "en_US",
    siteName: "FitsCheck",
    images: [
      {
        url: "/branding/og.png",
        width: 1200,
        height: 630,
        alt: "FitsCheck - Fashion Community App & Outfit Voting Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitsCheck - Fashion Community App & Outfit Voting Platform",
    description: "Join FitsCheck - the social fashion platform where the community votes on your outfits. Post fits, compete in challenges, climb leaderboards.",
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
