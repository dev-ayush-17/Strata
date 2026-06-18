"use client";

import { useState } from "react";
import Image from "next/image";
import { MOCK_OWNED_NFTS } from "@/constants/mock-data";
import { X, ChevronDown, Info } from "lucide-react";

export default function CreateListingPage() {
  const nft = MOCK_OWNED_NFTS[1]; // Preview an unlisted NFT
  const [price, setPrice] = useState("");
  const usdConversion = 3100;
  const val = parseFloat(price);
  const usdValue =
    !isNaN(val) && val > 0
      ? (val * usdConversion).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$0.00";
  const earnings = !isNaN(val) && val > 0 ? (val * 0.925).toFixed(4) : "--";

  return (
    <div className="min-h-screen flex flex-col antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Header */}
      <header className="w-full z-50 flex justify-between items-center px-4 md:px-16 py-4 max-w-[1440px] mx-auto border-b border-white/5">
        <a
          href="/"
          className="font-bold text-2xl tracking-tighter text-primary"
        >
          Strata
        </a>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          <span className="font-mono text-sm tracking-wider">Cancel</span>
          <X  />
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-6 lg:px-16 max-w-[1440px] mx-auto w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="w-full max-w-5xl">
          <div className="mb-12">
            <h1 className="font-bold text-3xl md:text-5xl text-on-surface mb-2 tracking-tight">
              Create Listing
            </h1>
            <p className="text-lg text-on-surface-variant">
              Set a price to list your asset on the marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
            {/* NFT Preview */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="font-semibold text-2xl text-on-surface">
                Asset Preview
              </h2>
              <div className="glass-panel rounded-xl overflow-hidden p-6 flex flex-col gap-6 shadow-sm">
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-surface-container-high relative">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-surface/80 backdrop-blur-md font-mono text-sm text-primary px-3 py-1 rounded-full border border-white/10 tracking-wider">
                      Owned by You
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">
                      {nft.collection}
                    </p>
                    <h3 className="font-semibold text-2xl text-on-surface mt-1">
                      {nft.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-on-surface-variant">
                      Last Sale
                    </p>
                    <p className="font-mono text-sm text-secondary mt-1 tracking-wider">
                      {nft.lastSale || nft.price} ETH
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Listing Form */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                {/* Pricing Type */}
                <div className="flex p-1 bg-surface-container-low rounded-lg border border-white/5 w-max">
                  <button className="px-6 py-2 rounded-md bg-surface-container-highest text-on-surface font-mono text-sm shadow-sm transition-all tracking-wider">
                    Fixed Price
                  </button>
                  <button className="px-6 py-2 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-mono text-sm transition-all tracking-wider">
                    Timed Auction
                  </button>
                </div>

                {/* Price Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-on-surface-variant">
                    Set Price
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg
                        className="text-on-surface-variant"
                        fill="none"
                        height="24"
                        viewBox="0 0 12 18"
                        width="16"
                      >
                        <path
                          d="M5.99992 0L5.86792 0.449065V12.1837L5.99992 12.3155L11.9998 8.76612L5.99992 0Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.99992 0L0 8.76612L5.99992 12.3155V7.12782V0Z"
                          fill="currentColor"
                          fillOpacity="0.8"
                        />
                        <path
                          d="M5.99992 13.3402L5.92502 13.4316V17.7788L5.99992 17.9999L12.0003 9.7915L5.99992 13.3402Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.99992 17.9999V13.3402L0 9.7915L5.99992 17.9999Z"
                          fill="currentColor"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </div>
                    <input
                      className="w-full bg-[#0F172A] border border-outline-variant rounded-lg py-4 pl-12 pr-16 text-3xl font-bold text-on-surface focus:ring-primary focus:border-primary transition-all"
                      min="0"
                      placeholder="0.00"
                      step="0.01"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <span className="font-mono text-sm text-on-surface-variant tracking-wider">
                        ETH
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant mt-1">
                    ~ {usdValue} USD
                  </p>
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-on-surface-variant">
                    Duration
                  </label>
                  <div className="relative w-full">
                    <select className="appearance-none w-full bg-[#0F172A] border border-outline-variant rounded-lg py-3 px-4 text-base text-on-surface focus:ring-primary focus:border-primary transition-all cursor-pointer">
                      <option value="1">1 Day</option>
                      <option value="3">3 Days</option>
                      <option value="7" defaultChecked>
                        7 Days
                      </option>
                      <option value="30">1 Month</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-on-surface-variant">
                      <ChevronDown  />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-white/5 my-2" />

              {/* Fees Summary */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">
                  Summary
                </h3>
                <div className="glass-panel rounded-lg p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base text-on-surface-variant">
                      Listing Price
                    </span>
                    <span className="font-mono text-sm text-on-surface tracking-wider">
                      {!isNaN(val) && val > 0
                        ? `${val.toFixed(4)} ETH`
                        : "-- ETH"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-on-surface-variant">
                        Service Fee
                      </span>
                      <Info className="text-base text-on-surface-variant cursor-help" />
                    </div>
                    <span className="font-mono text-sm text-on-surface tracking-wider">
                      2.5%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-on-surface-variant">
                        Creator Royalty
                      </span>
                      <Info className="text-base text-on-surface-variant cursor-help" />
                    </div>
                    <span className="font-mono text-sm text-on-surface tracking-wider">
                      5.0%
                    </span>
                  </div>
                  <hr className="border-white/5 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-2xl text-on-surface">
                      Potential Earnings
                    </span>
                    <span className="font-mono text-sm text-primary font-bold tracking-wider">
                      {earnings} ETH
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4">
                <button className="w-full brand-gradient text-white font-semibold text-lg py-4 px-8 rounded-lg hover:opacity-90 transition-opacity active:scale-[0.98] shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  Confirm Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
