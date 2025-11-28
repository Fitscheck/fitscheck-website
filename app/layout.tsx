import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

export const whyteInktrap = localFont({
  src: [

    {
      path: '../public/fonts/WhyteInktrap-Super.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-whyte-inktrap'
})

export const metadata: Metadata = {
  title: {
    default: "FitsCheck - Make Fashion Decisions with Community Voting",
    template: "%s | FitsCheck"
  },
  description:
    "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, earn style points, and compete on global leaderboards.",
  icons: {
    icon: [
      {
        url: "/FitsIcon.png",
        type: "image/png",
      },
    ],
    shortcut: "/FitsIcon.png",
    apple: "/FitsIcon.png",
  },
  keywords: [
    "fashion app",
    "style decisions",
    "outfit voting",
    "fashion community",
    "affiliate links",
    "fashion influencer",
    "style tips",
    "fashion leaderboard",
    "this or that fashion",
    "shop this look",
  ],
  authors: [{ name: "FitsCheck Team" }],
  creator: "FitsCheck",
  publisher: "FitsCheck",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Perfect for content creators, influencers, and fashion enthusiasts. Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content.",
    type: "website",
    locale: "en_US",
    siteName: "FitsCheck",
    images: [
      {
        url: "/hero1.webp",
        width: 1200,
        height: 630,
        alt: "FitsCheck - Fashion Decision Making App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitsCheck - Make Fashion Decisions with Community Voting",
    description: "Get crowd-sourced style decisions, share affiliate links, and monetize your fashion content.",
    images: ["/hero1.webp"],
  },
  metadataBase: new URL("https://fitscheck.com"),
  alternates: {
    canonical: "/",
  },
};

const satoshi = localFont({
  src: [ 
    {
      path: '../public/fonts/Satoshi-Light.woff',
      weight: '100',
      style: 'normal',
    }
   ],
  variable: '--font-satoshi', 
})

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
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
