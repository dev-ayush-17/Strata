"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Explore", href: "/marketplace" },
  { label: "Create", href: "/mint" },
  { label: "Collections", href: "/my-nfts" },
  { label: "Community", href: "#" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-16 max-w-[1440px] mx-auto left-0 right-0 bg-[#051424]/80 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Left: Brand + Links */}
      <div className="flex items-center gap-8 lg:gap-12">
        <Link
          href="/"
          className="font-bold text-4xl md:text-5xl tracking-tighter text-primary"
          style={{ fontFamily: "Inter" }}
        >
          Strata
        </Link>
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "#" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-base transition-colors hover:bg-white/5 px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: Search + Wallet */}
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-primary/50 transition-all">
          <Search className="text-on-surface-variant mr-2" />
          <input
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-base w-full placeholder:text-on-surface-variant/50 text-on-surface"
            placeholder="Search assets..."
            type="text"
          />
        </div>
        <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-medium text-base hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
          Connect Wallet
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface-container/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col p-4 gap-2 animate-slide-up">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-on-surface-variant hover:text-on-surface px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
