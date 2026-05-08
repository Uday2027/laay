"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: "Collections" },
    { href: "/categories", label: "Lookbook" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Care Guide" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-umber">
      <div className="flex items-center justify-between px-6 lg:px-12 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="LAAE"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(0.3) brightness(0.85)" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[10px] font-light tracking-[0.3em] uppercase text-sandstone hover:text-cream transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="hidden md:flex items-center text-sandstone hover:text-cream transition-colors"
              title="Admin"
            >
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="hidden md:flex items-center text-sandstone hover:text-cream transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center text-sandstone hover:text-cream transition-colors"
              title="Account"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          )}

          <Link
            href="/cart"
            className="text-[10px] font-light tracking-[0.2em] uppercase text-sandstone hover:text-cream transition-all duration-300 border border-gold px-4 py-[7px]"
          >
            Bag ({totalItems})
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-sandstone hover:text-cream transition-colors p-2"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-umber border-t border-walnut/30">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm tracking-[0.2em] uppercase text-sandstone hover:text-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-walnut/30 space-y-4">
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block text-sm text-sandstone">
                  Admin Dashboard
                </Link>
              )}
              {session ? (
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="block text-sm text-sandstone">
                  Sign Out
                </button>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-sandstone">
                  Sign In / Join
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
