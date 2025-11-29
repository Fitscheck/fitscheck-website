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
    setIsMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (pathname === "/") {
      const section = document.getElementById("waitlist");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      handleNavClick("waitlist");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/branding/FitsCheck.svg"
            alt="FitsCheck Logo"
            width={120}
            height={24}
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link
            href="/"
            onClick={handleHomeClick}
            className={
              isActive("/")
                ? "text-[#003366] font-semibold"
                : "hover:text-[#003366] text-gray-700"
            }
          >
            Home
          </Link>
          {pathname === "/" ? (
            <Link
              href="#waitlist"
              className="hover:text-[#003366] text-gray-700"
              onClick={(e) => {
                e.preventDefault();
                handleWaitlistClick(e);
              }}
            >
              Waitlist
            </Link>
          ) : (
            <Link
              href="#waitlist"
              className="text-[#003366] font-semibold"
              onClick={(e) => {
                e.preventDefault();
                handleWaitlistClick(e);
              }}
            >
              Waitlist
            </Link>
          )}
          <Link
            href="#features"
            className="hover:text-[#003366] text-gray-700"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("features");
            }}
          >
            Features
          </Link>
          <Link
            href="#faq"
            className="hover:text-[#003366] text-gray-700"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("faq");
            }}
          >
            FAQ
          </Link>
        </nav>

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
              onClick={handleHomeClick}
              className={`text-sm font-medium ${isActive("/")
                  ? "text-[#003366] font-semibold"
                  : "text-gray-600 hover:text-[#003366]"
                }`}
            >
              Home
            </Link>
            <Link
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault();
                handleWaitlistClick(e);
              }}
              className={`text-sm font-medium ${pathname !== "/"
                  ? "text-[#003366] font-semibold"
                  : "text-gray-600 hover:text-[#003366]"
                }`}
            >
              Waitlist
            </Link>
            <Link
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("features");
              }}
              className="text-sm font-medium text-gray-600 hover:text-[#003366]"
            >
              Features
            </Link>
            <Link
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("faq");
              }}
              className="text-sm font-medium text-gray-600 hover:text-[#003366]"
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
