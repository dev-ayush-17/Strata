"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NFTCard from "@/components/shared/NFTCard";
import { MOCK_NFTS } from "@/constants/mock-data";
import { Palette, Gamepad2, Camera, Music, ChevronDown } from "lucide-react";

const CATEGORIES = [
  { Icon: Palette, label: "Art" },
  { Icon: Gamepad2, label: "Gaming" },
  { Icon: Camera, label: "Photography" },
  { Icon: Music, label: "Music" },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("Art");

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex max-w-[1440px] mx-auto">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex flex-col gap-6 p-6 h-[calc(100vh-80px)] w-64 sticky top-20 bg-surface-container-low/50 backdrop-blur-lg border-r border-white/5 overflow-y-auto shrink-0">
          <div className="mb-2">
            <h2 className="font-bold text-2xl text-primary mb-1">Filters</h2>
            <p className="font-mono text-xs text-on-surface-variant tracking-wider">
              Refine your search
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-outline uppercase tracking-widest px-2">
              Category
            </span>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors font-mono text-sm tracking-wider ${
                    activeCategory === cat.label
                      ? "text-secondary font-bold bg-secondary/10"
                      : "text-on-surface-variant hover:bg-surface-container-highest"
                  }`}
                >
                  <cat.Icon className="w-5 h-5" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <span className="font-mono text-xs text-outline uppercase tracking-widest px-2">
              Status
            </span>
            <div className="space-y-3 px-2">
              {["Buy Now", "On Auction"].map((status, i) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    defaultChecked={i === 1}
                    className="rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20"
                  />
                  <span className="text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <span className="font-mono text-xs text-outline uppercase tracking-widest px-2">
              Price (ETH)
            </span>
            <div className="grid grid-cols-2 gap-2 px-2">
              <input
                className="bg-surface-container-highest border-none rounded-lg text-xs p-2 focus:ring-1 focus:ring-primary/50 text-on-surface"
                placeholder="Min"
                type="number"
              />
              <input
                className="bg-surface-container-highest border-none rounded-lg text-xs p-2 focus:ring-1 focus:ring-primary/50 text-on-surface"
                placeholder="Max"
                type="number"
              />
            </div>
          </div>

          <button className="mt-auto bg-secondary text-on-secondary py-3 rounded-xl font-mono text-sm tracking-wider hover:opacity-90 transition-opacity active:scale-95">
            Apply Filters
          </button>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 md:p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="font-bold text-5xl text-on-surface mb-2 tracking-tight">
                Explore Collections
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl">
                Discover and collect unique digital assets from the most talented
                creators in the Web3 ecosystem.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <select className="appearance-none bg-surface-container-low border border-white/10 text-on-surface-variant font-mono text-sm py-2 pl-4 pr-10 rounded-lg focus:ring-1 focus:ring-primary/50 cursor-pointer outline-none hover:border-white/20 transition-all tracking-wider">
                  <option>Recently Listed</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {MOCK_NFTS.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <button className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-base hover:bg-white/10 hover:border-primary/50 transition-all group">
              Load More{" "}
              <span className="inline-block group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
            <p className="text-xs font-medium text-on-surface-variant">
              Showing 6 of 3,456 assets
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
