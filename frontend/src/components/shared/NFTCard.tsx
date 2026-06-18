"use client";

import Image from "next/image";
import Link from "next/link";
import { NFTItem } from "@/types";
import { Heart } from "lucide-react";

interface NFTCardProps {
  nft: NFTItem;
  variant?: "marketplace" | "owned";
}

export default function NFTCard({ nft, variant = "marketplace" }: NFTCardProps) {
  const isAuction = nft.status === "auction";
  const isListed = nft.status === "listed";
  const isOwned = variant === "owned";

  return (
    <Link href={`/marketplace/${nft.id}`}>
      <article className="glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col relative">
        {/* Status Badge */}
        {isOwned && (
          <div
            className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 ${
              isListed
                ? "bg-secondary/10 border border-secondary/20"
                : "bg-surface-container-high/80 border border-white/10"
            }`}
          >
            {isListed && (
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            )}
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                isListed ? "text-secondary" : "text-on-surface-variant"
              }`}
            >
              {isListed ? "Listed" : "Unlisted"}
            </span>
          </div>
        )}

        {/* Auction Badge */}
        {!isOwned && isAuction && (
          <div className="absolute top-4 right-4 z-10 bg-background/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="font-mono text-xs text-secondary">
              Live Auction
            </span>
          </div>
        )}

        {/* Image */}
        <div className="w-full aspect-square overflow-hidden relative bg-surface-container-lowest">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="p-5 lg:p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              {isOwned && (
                <p className="text-xs font-medium text-on-surface-variant mb-1">
                  {nft.collection}
                </p>
              )}
              <h3 className="font-semibold text-lg text-on-surface truncate">
                {nft.name}
              </h3>
              {!isOwned && (
                <p className="text-xs font-medium text-on-surface-variant">
                  by{" "}
                  <span className="text-primary hover:underline">
                    {nft.creator}
                  </span>
                </p>
              )}
            </div>
            {!isOwned && (
              <button
                className="text-on-surface-variant hover:text-primary transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Heart  />
              </button>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-wider mb-1">
                {isOwned
                  ? isListed
                    ? "List Price"
                    : "Last Sold"
                  : isAuction
                  ? "Current Bid"
                  : "Price"}
              </p>
              <p
                className={`font-mono text-base ${
                  isOwned && !isListed
                    ? "text-on-surface-variant"
                    : "text-secondary-fixed"
                }`}
              >
                {nft.price} ETH
              </p>
            </div>
            {!isOwned && (
              <button
                onClick={(e) => e.preventDefault()}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  isAuction
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-primary text-on-primary"
                }`}
              >
                {isAuction ? "Place Bid" : "Buy Now"}
              </button>
            )}
            {isOwned && (
              <button
                onClick={(e) => e.preventDefault()}
                className={`opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 text-sm font-mono rounded-lg ${
                  isListed
                    ? "bg-white/10 hover:bg-white/20 border border-white/10 text-on-surface"
                    : "bg-primary-container/20 hover:bg-primary-container/40 text-primary border border-primary/20"
                }`}
              >
                {isListed ? "Manage" : "List Now"}
              </button>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
