"use client";

import Image from "next/image";
import { TransactionInfo } from "@/types";
import { Wallet, X, Clock, ArrowRight, Shield, CheckCircle, ExternalLink, LayoutGrid, Store } from "lucide-react";

interface TransactionModalProps {
  tx: TransactionInfo;
  onClose?: () => void;
}

export default function TransactionModal({ tx, onClose }: TransactionModalProps) {
  if (tx.state === "idle") return null;

  if (tx.state === "awaiting-signature") {
    return (
      <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-16">
        <div className="glass-modal rounded-xl w-full max-w-md p-8 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          {/* Pulsing wallet icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center pulse-wallet border border-primary/20">
              <Wallet className="text-primary"  />
            </div>
          </div>
          <h2 className="font-semibold text-2xl text-on-surface mb-2">
            Awaiting Signature
          </h2>
          <p className="text-base text-on-surface-variant max-w-[280px]">
            Please sign the transaction in your wallet extension
            <span className="loading-dots" />
          </p>
          <div className="mt-8 pt-6 border-t border-white/5 w-full">
            <button
              onClick={onClose}
              className="font-mono text-sm text-secondary hover:text-secondary-fixed transition-colors tracking-wider"
            >
              Cancel Transaction
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tx.state === "pending") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 backdrop-blur-xl px-4">
        <div className="relative w-full max-w-[480px] bg-surface-container/80 backdrop-blur-2xl border-t border-l border-white/10 rounded-2xl p-8 shadow-[0_32px_64px_-16px_rgba(124,58,237,0.15)] flex flex-col items-center">
          <button
            className="absolute top-4 right-4 text-on-surface-variant/50 cursor-not-allowed"
            disabled
          >
            <X  />
          </button>
          {/* Spinner */}
          <div className="relative w-24 h-24 mb-8">
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="absolute inset-0 flex items-center justify-center text-primary">
              <Clock className="text-[32px]" />
            </div>
          </div>
          <h2 className="font-semibold text-2xl text-on-surface text-center mb-2">
            Awaiting Confirmation
          </h2>
          <p className="text-base text-on-surface-variant text-center mb-8 max-w-[80%]">
            Please wait while the blockchain verifies your transaction. This may
            take a few moments.
          </p>
          {/* NFT Mini Card */}
          {tx.nftName && (
            <div className="w-full bg-surface-container-highest/40 border border-white/5 rounded-xl p-4 flex items-center gap-4 mb-8">
              {tx.nftImage && (
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                  <Image
                    src={tx.nftImage}
                    alt={tx.nftName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-lg text-on-surface truncate">
                  {tx.nftName}
                </h3>
                <p className="text-xs font-medium text-on-surface-variant truncate">
                  {tx.nftCollection}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm text-primary tracking-wider">
                  {tx.price} ETH
                </p>
                <p className="text-xs font-medium text-on-surface-variant">
                  {tx.priceUsd}
                </p>
              </div>
            </div>
          )}
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 font-mono text-sm text-secondary hover:text-secondary-fixed transition-colors tracking-wider"
          >
            <span>View on Etherscan</span>
            <ArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="mt-8 flex items-center gap-2 text-on-surface-variant/60">
            <Shield className="text-sm" />
            <span className="text-xs font-medium">
              Secure transaction via Strata Protocol
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (tx.state === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-16 bg-background/90">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(68,226,205,0.08)_0%,rgba(5,20,36,0)_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <main className="w-full max-w-[600px] glass-panel rounded-xl p-8 md:p-12 flex flex-col items-center text-center animate-scale-in relative">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-ping" />
            <CheckCircle className="text-5xl text-secondary"  />
          </div>
          <h1 className="font-bold text-3xl md:text-4xl text-on-surface mb-2 animate-slide-up">
            NFT Successfully Purchased!
          </h1>
          <p className="text-lg text-on-surface-variant mb-10 animate-slide-up">
            Your transaction has been confirmed on the blockchain.
          </p>
          {/* Summary */}
          {tx.nftName && (
            <div className="w-full bg-surface-container-high/50 rounded-lg border border-white/5 p-6 mb-10 text-left animate-slide-up">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                {tx.nftImage && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-lowest relative">
                    <Image
                      src={tx.nftImage}
                      alt={tx.nftName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-2xl text-on-surface mb-1">
                    {tx.nftName}
                  </h3>
                  <p className="text-xs font-medium text-on-surface-variant">
                    by {tx.nftCollection}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs font-medium text-on-surface-variant mb-1">
                    Amount Paid
                  </p>
                  <p className="font-mono text-sm text-on-surface tracking-wider">
                    {tx.price} ETH
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-on-surface-variant mb-1">
                    Network Fee
                  </p>
                  <p className="font-mono text-sm text-on-surface-variant tracking-wider">
                    {tx.networkFee || "0.015"} ETH
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-on-surface-variant mb-1">
                    Status
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-secondary/10 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs font-medium text-secondary">
                      Confirmed
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-on-surface-variant mb-1">
                    Transaction ID
                  </p>
                  <a
                    href="#"
                    className="font-mono text-sm text-primary hover:text-primary-fixed transition-colors flex items-center gap-1 group tracking-wider"
                  >
                    {tx.txHash || "0x7a...4f2b"}
                    <ExternalLink className="text-base group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col md:flex-row gap-4 animate-slide-up">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg brand-gradient text-white font-medium text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <LayoutGrid  />
              View in Collection
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg border border-outline-variant bg-surface-container/50 hover:bg-surface-container-high transition-colors text-base text-on-surface flex items-center justify-center gap-2"
            >
              <Store  />
              Back to Marketplace
            </button>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
