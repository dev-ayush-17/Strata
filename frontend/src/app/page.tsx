import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FEATURED_NFT, STATS } from "@/constants/mock-data";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* ── Hero Section ── */}
        <section className="hero-gradient px-4 md:px-16 min-h-[819px] flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              LIVE AUCTION
            </div>
            <h1 className="font-bold text-6xl lg:text-8xl text-on-surface leading-tight tracking-tight">
              Collect the <br />
              <span className="text-gradient">Future of Art</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Experience the next generation of digital asset trading on Strata.
              Curated high-fidelity NFTs with institutional-grade security and
              seamless liquidity.
            </p>
            <div className="flex gap-4">
              <Link
                href="/marketplace"
                className="bg-primary text-on-primary font-semibold text-2xl px-10 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(210,187,255,0.3)] transition-all"
              >
                Explore Now
              </Link>
              <Link
                href="/mint"
                className="glass-card text-on-surface font-semibold text-2xl px-10 py-4 rounded-xl hover:bg-white/10 transition-all"
              >
                Create
              </Link>
            </div>
          </div>

          {/* Featured NFT Card */}
          <div className="flex-1 w-full max-w-lg">
            <div className="glass-card rounded-3xl overflow-hidden p-4 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                <Image
                  src={FEATURED_NFT.image}
                  alt={FEATURED_NFT.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  priority
                  unoptimized
                />
                <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full font-mono text-sm tracking-wider">
                  {FEATURED_NFT.countdown}
                </div>
              </div>
              <div className="flex justify-between items-end px-2">
                <div>
                  <p className="font-mono text-sm text-secondary-fixed mb-1 uppercase tracking-widest">
                    Featured Drop
                  </p>
                  <h3 className="font-semibold text-2xl text-on-surface">
                    {FEATURED_NFT.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden relative">
                      <Image
                        src={FEATURED_NFT.creatorAvatar}
                        alt={FEATURED_NFT.creator}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-base text-on-surface-variant">
                      {FEATURED_NFT.creator}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-on-surface-variant uppercase">
                    Current Bid
                  </p>
                  <p className="font-mono text-2xl text-primary">
                    {FEATURED_NFT.bid} ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Section ── */}
        <section className="px-4 md:px-16 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card p-8 rounded-2xl text-center">
                <p className="font-bold text-4xl text-on-surface mb-2">
                  {stat.value}
                </p>
                <p className="text-base text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits Grid ── */}
        <section className="px-4 md:px-16 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="font-bold text-5xl text-on-surface mb-4 tracking-tight">
                The Strata Advantage
              </h2>
              <p className="text-lg text-on-surface-variant max-w-xl">
                Building the foundations for the next era of digital ownership
                with institutional-grade tech.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: ShieldCheck,
                title: "Immutable Security",
                desc: "Every transaction is verified through our proprietary multi-layered security protocol, ensuring your assets are always safe.",
                hoverColor: "hover:border-primary/50",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
              },
              {
                Icon: Sparkles,
                title: "High-Fidelity Assets",
                desc: "Support for uncompressed 8K textures and lossless audio files. Present your work exactly as it was intended to be seen.",
                hoverColor: "hover:border-secondary/50",
                iconBg: "bg-secondary/10",
                iconColor: "text-secondary",
              },
              {
                Icon: Zap,
                title: "Instant Liquidity",
                desc: "Advanced order matching and cross-chain bridging allow for near-instant swaps and exit liquidity on all listed collections.",
                hoverColor: "hover:border-tertiary/50",
                iconBg: "bg-tertiary/10",
                iconColor: "text-tertiary",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`glass-card p-10 rounded-3xl group ${card.hoverColor} transition-all`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-8 ${card.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <card.Icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-2xl mb-4">{card.title}</h4>
                <p className="text-base text-on-surface-variant">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works (Bento) ── */}
        <section className="px-4 md:px-16 mb-32">
          <h2 className="font-bold text-5xl text-on-surface mb-12 text-center tracking-tight">
            Seamless Participation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* For Collectors */}
            <div className="md:col-span-7 glass-card rounded-3xl p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="font-mono text-sm text-primary mb-4 block uppercase tracking-tighter">
                  Phase 01 — Collectors
                </span>
                <h3 className="font-bold text-4xl mb-6">
                  Discovery &amp; Acquisition
                </h3>
                <ul className="space-y-4 max-w-sm">
                  {[
                    "Connect your preferred wallet via our secure gateway.",
                    "Explore curated collections from verified global artists.",
                    "Place bids or 'Buy Now' to instantly secure your asset.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs shrink-0 mt-1">
                        {i + 1}
                      </span>
                      <p className="text-base text-on-surface-variant">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full" />
            </div>

            {/* For Creators */}
            <div className="md:col-span-5 bg-primary-container rounded-3xl p-12 flex flex-col justify-between text-on-primary-container group cursor-pointer overflow-hidden">
              <div>
                <span className="font-mono text-sm mb-4 block uppercase tracking-tighter opacity-80">
                  Phase 02 — Creators
                </span>
                <h3 className="font-bold text-4xl mb-6">
                  Minting &amp; Distribution
                </h3>
                <p className="text-base opacity-90">
                  Upload your work, set your royalties, and reach a global
                  audience of high-net-worth collectors in minutes.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/mint"
                  className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                >
                  <span className="font-semibold text-2xl">Start Minting</span>
                  <ArrowRight  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="px-4 md:px-16 mb-32">
          <div className="glass-card rounded-[48px] p-16 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-bold text-5xl mb-6 tracking-tight">
                Ready to Step into the Stratosphere?
              </h2>
              <p className="text-lg text-on-surface-variant mb-10">
                Join thousands of collectors and artists shaping the future of
                digital ownership. No hidden fees, just pure creation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-secondary text-on-secondary font-semibold text-2xl px-12 py-5 rounded-2xl hover:shadow-[0_0_40px_rgba(68,226,205,0.4)] transition-all">
                  Connect Wallet
                </button>
                <button className="glass-card text-on-surface font-semibold text-2xl px-12 py-5 rounded-2xl hover:bg-white/10 transition-all">
                  View Roadmap
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
