"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NFTCard from "@/components/shared/NFTCard";
import { MOCK_OWNED_NFTS } from "@/constants/mock-data";
import { BadgeCheck, ArrowUpDown, Share2, Settings } from "lucide-react";

export default function MyNFTsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNfts =
    activeTab === "All"
      ? MOCK_OWNED_NFTS
      : activeTab === "Listed"
      ? MOCK_OWNED_NFTS.filter((n) => n.status === "listed")
      : MOCK_OWNED_NFTS.filter((n) => n.status === "unlisted");

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-16 pt-[120px] pb-16 flex flex-col lg:flex-row gap-16">
        {/* Sidebar: Profile */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-surface-container-low/50 backdrop-blur-lg rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 p-1 relative mb-4 z-10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1RCCl2-hkjYYACASaCnhec2ZKHqPI3vu67cDMuXOWFOKLOWf_VU1DP2rT4W68FRTZ2UA-RG01wNZrNpVM5-qZBhxerYZZyB-MxMlJTEx3yc-ggH4nTN5vTodAj9wmTHcdcHJYJkOWkaGgc9rcgXFTae8ogZq-wQ5iM841FBgvYsN92J0pNO2OUdcfYM89UBEw29sGHtSUCn51mhNdNAKr9ODb2BKkKvTuJyXImb_axVISc4LG2QSPzHWwVJh49hpwvt3xDb6v_A"
                alt="Profile Avatar"
                fill
                className="rounded-full object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 right-0 bg-secondary rounded-full p-1 border-2 border-surface">
                <BadgeCheck className="text-xs text-on-secondary"  />
              </div>
            </div>
            <h1 className="font-semibold text-2xl text-on-surface mb-1 z-10">
              Vault Master
            </h1>
            <p className="font-mono text-sm text-primary z-10 tracking-wider">
              @vault_master.eth
            </p>
            <div className="flex gap-4 mt-6 z-10">
              {[
                { Icon: Share2, id: "share" },
                { Icon: Settings, id: "settings" },
              ].map(({ Icon, id }) => (
                <button
                  key={id}
                  className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5 text-on-surface-variant hover:text-primary"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-surface-container-low/50 backdrop-blur-lg rounded-2xl border border-white/5 p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                Total Est. Value
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl text-on-surface">
                  142.50
                </span>
                <span className="font-mono text-sm text-primary tracking-wider">
                  ETH
                </span>
              </div>
            </div>
            <div className="h-px w-full bg-white/5" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Items Owned", value: "34", color: "text-on-surface" },
                { label: "Collections", value: "12", color: "text-on-surface" },
                { label: "Total Listed", value: "8", color: "text-secondary" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-on-surface-variant">
                    {stat.label}
                  </span>
                  <span className={`text-lg ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main: NFT Grid */}
        <section className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-semibold text-2xl text-on-surface hidden sm:block">
              My Collection
            </h2>
            <div className="flex bg-surface-container-low p-1 rounded-lg border border-white/5 w-full sm:w-auto">
              {["All", "Listed", "Unlisted"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-6 py-2 rounded-md font-mono text-sm transition-all tracking-wider ${
                    activeTab === tab
                      ? "bg-surface-container-highest text-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-surface-container-low border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-on-surface text-base">
              <ArrowUpDown className="text-sm" />
              Recently Added
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredNfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} variant="owned" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
