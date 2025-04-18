"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AuthButtons } from "@/components/auth-buttons";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const router = useRouter();

  const handleNavClick = (id: string) => {
    if (pathname === "/") {
      // Already on home, just scroll
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home with hash
      router.push(`/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/fitslogo.svg"
            alt="FitsCheck Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-2xl font-extrabold text-pink-500 tracking-tight">
            FitsCheck
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-pink-500 font-semibold"
                : "hover:text-pink-500"
            }
          >
            Home
          </Link>
          <Link
            href="/#features"
            className="hover:text-pink-500"
            onClick={() => handleNavClick("features")}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-pink-500"
            onClick={() => handleNavClick("pricing")}
          >
            Pricing
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center md:hidden h-10 w-10 rounded-md hover:bg-gray-100 transition"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-sm">
          <div className="container flex flex-col gap-4 p-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive("/")
                  ? "text-pink-500"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-600 hover:text-pink-500"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-600 hover:text-pink-500"
            >
              Pricing
            </Link>
            {/* <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-pink-500">
              Admin
            </Link> */}
            <div className="pt-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
