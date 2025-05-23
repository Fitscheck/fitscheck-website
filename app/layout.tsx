import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "FitsCheck - Share Your Outfit Fits",
  description:
    "Post your outfit fits, engage in challenges, and interact with other fashion enthusiasts through likes, shares, comments, and voting.",
  icons: {
    icon: [
      {
        url: "/fitslogo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/fitslogo.svg",
    apple: "/fitslogo.svg",
  },
  keywords: [
    "fashion",
    "outfit",
    "social media",
    "style",
    "clothing",
    "fashion community",
  ],
  authors: [{ name: "FitsCheck Team" }],
  openGraph: {
    title: "FitsCheck - Share Your Outfit Fits",
    description: "Share your style with the world through FitsCheck",
    type: "website",
    locale: "en_US",
    siteName: "FitsCheck",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
