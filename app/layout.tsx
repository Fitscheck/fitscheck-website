import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "FitsCheck - Share Your Outfit Fits",
  description:
    "Post your outfit fits, engage in challenges, and interact with other fashion enthusiasts through likes, shares, comments, and voting.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
