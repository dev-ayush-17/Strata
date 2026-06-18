"use client";

import { use } from "react";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MOCK_NFTS } from "@/constants/mock-data";
import { Heart, Share2, AlignLeft, BadgeCheck, Eye, Wallet, Tag, History, Sparkles } from "lucide-react";

export default function NFTDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const nft = MOCK_NFTS.find((n) => n.id === id) || MOCK_NFTS[0];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-4 md:px-16 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Media */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* NFT Image */}
            <div className="glass-panel rounded-xl overflow-hidden relative group aspect-square flex items-center justify-center p-6">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-contain rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                priority
                unoptimized
              />
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button className="bg-surface-container/80 backdrop-blur-md p-2 rounded-full hover:bg-surface-bright transition-colors text-on-surface">
                  <Heart className="text-lg" />
                </button>
                <button className="bg-surface-container/80 backdrop-blur-md p-2 rounded-full hover:bg-surface-bright transition-colors text-on-surface">
                  <Share2 className="text-lg" />
                </button>
              </div>
            </div>

            {/* Description Card */}
            <div className="glass-panel rounded-xl p-8">
              <h3 className="font-semibold text-2xl mb-4 text-on-surface flex items-center gap-2">
                <AlignLeft className="text-primary" />
                Description
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {nft.description}
              </p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Info */}
            <div className="glass-panel rounded-xl p-8 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary font-mono text-sm uppercase tracking-wider">
                  {nft.collection}
                  <BadgeCheck className="text-base text-secondary"  />
                </div>
                <h1 className="font-bold text-3xl md:text-5xl text-on-surface mb-2">
                  {nft.name}
                </h1>
                <div className="flex items-center gap-4 text-on-surface-variant text-base flex-wrap">
                  <span>
                    Owned by{" "}
                    <a href="#" className="text-primary hover:text-primary-fixed transition-colors">
                      {nft.owner}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="text-base" />
                    {nft.views.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="text-base" />
                    {nft.favorites} favorites
                  </span>
                </div>
              </div>

              {/* Price Box */}
              <div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/30 flex flex-col gap-4">
                <div className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">
                  Current Price
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-mono text-3xl font-bold text-on-surface leading-none tracking-wider">
                    {nft.price} ETH
                  </span>
                  <span className="text-base text-on-surface-variant mb-1">
                    ({nft.priceUsd})
                  </span>
                </div>
                <div className="flex gap-4 mt-2">
                  <button className="flex-1 bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary hover:to-secondary text-on-primary-container font-semibold text-2xl py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-lg flex items-center justify-center gap-2">
                    <Wallet  />
                    Buy Now
                  </button>
                  <button className="flex-1 bg-transparent border-2 border-outline-variant hover:border-primary text-on-surface font-semibold text-2xl py-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                    <Tag  />
                    Make Offer
                  </button>
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="glass-panel rounded-xl p-8">
              <h3 className="font-semibold text-2xl mb-6 text-on-surface flex items-center gap-2">
                <Tag className="text-secondary" />
                Properties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {nft.attributes.map((attr) => (
                  <div
                    key={attr.trait_type}
                    className="bg-surface-container rounded-lg p-4 border border-outline-variant/30 hover:border-secondary/50 transition-colors text-center"
                  >
                    <div className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                      {attr.trait_type}
                    </div>
                    <div className="font-semibold text-lg text-on-surface">
                      {attr.value}
                    </div>
                    <div className="text-xs font-medium text-on-surface-variant mt-1">
                      {attr.rarity} have this trait
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="glass-panel rounded-xl p-8 flex flex-col gap-4">
              <h3 className="font-semibold text-2xl text-on-surface flex items-center gap-2">
                <History className="text-tertiary" />
                Activity
              </h3>
              <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">
                {[
                  {
                    action: "Listed",
                    by: "Creator",
                    price: `${nft.price} ETH`,
                    time: "2 hours ago",
                    Icon: Tag,
                    iconColor: "text-primary",
                    iconBg: "bg-primary-container/20",
                  },
                  {
                    action: "Minted",
                    by: "Creator",
                    price: "",
                    time: "1 day ago",
                    Icon: Sparkles,
                    iconColor: "text-secondary",
                    iconBg: "bg-secondary-container/20",
                  },
                ].map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center ${event.iconColor} ${event.iconBg} p-2 rounded-full`}
                      >
                        <event.Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base text-on-surface">
                          {event.action}
                        </div>
                        <div className="text-xs font-medium text-on-surface-variant">
                          by{" "}
                          <a href="#" className="text-primary hover:underline">
                            {event.by}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {event.price && (
                        <div className="font-mono text-sm text-on-surface tracking-wider">
                          {event.price}
                        </div>
                      )}
                      <div className="text-xs font-medium text-on-surface-variant">
                        {event.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
