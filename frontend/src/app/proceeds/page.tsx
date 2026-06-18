import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MOCK_PROCEEDS } from "@/constants/mock-data";
import { Wallet, ArrowDown, History, ArrowRight } from "lucide-react";

export default function ProceedsPage() {
  const data = MOCK_PROCEEDS;

  return (
    <>
      <Navbar />
      <main className="flex-grow z-10 pt-[104px] pb-16 px-4 md:px-16 w-full max-w-[1440px] mx-auto relative">
        {/* Ambient Background */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container opacity-[0.15] blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-secondary opacity-[0.1] blur-[100px] pointer-events-none z-0" />

        <header className="mb-12 relative z-10">
          <h1 className="font-bold text-3xl md:text-5xl text-on-surface mb-2 tracking-tight">
            Proceeds Dashboard
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Manage your earnings, view transaction history, and withdraw
            available funds securely to your connected wallet.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
          {/* Left: Summary Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="text-tertiary" />
                    <h2 className="font-mono text-sm text-tertiary uppercase tracking-wider">
                      Available to Withdraw
                    </h2>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-bold text-6xl text-on-surface tracking-tight">
                      {data.available}
                    </span>
                    <span className="font-semibold text-2xl text-on-surface-variant">
                      ETH
                    </span>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant mt-2">
                    ≈ {data.availableUsd} USD
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-mono text-sm py-4 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] tracking-wider">
                    <ArrowDown  />
                    Withdraw Balance
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm text-on-surface-variant mb-2 tracking-wider">
                  Total Earned
                </h3>
                <div className="font-semibold text-2xl text-on-surface">
                  {data.totalEarned}{" "}
                  <span className="text-sm text-on-surface-variant">ETH</span>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm text-on-surface-variant mb-2 tracking-wider">
                  Pending Escrow
                </h3>
                <div className="font-semibold text-2xl text-on-surface">
                  {data.pendingEscrow}{" "}
                  <span className="text-sm text-on-surface-variant">ETH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: History Table */}
          <div className="lg:col-span-7 glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-semibold text-2xl text-on-surface flex items-center gap-2">
                <History className="text-outline-variant" />
                Withdrawal History
              </h2>
              <button className="text-primary hover:text-primary-fixed transition-colors font-mono text-sm flex items-center gap-1 tracking-wider">
                View All
                <ArrowRight className="text-sm" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-lowest/30">
                    <th className="py-4 px-6 font-mono text-sm text-on-surface-variant font-medium tracking-wider">
                      Date
                    </th>
                    <th className="py-4 px-6 font-mono text-sm text-on-surface-variant font-medium tracking-wider">
                      Amount
                    </th>
                    <th className="py-4 px-6 font-mono text-sm text-on-surface-variant font-medium tracking-wider">
                      Status
                    </th>
                    <th className="py-4 px-6 font-mono text-sm text-on-surface-variant font-medium text-right tracking-wider">
                      Txn ID
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base text-on-surface divide-y divide-white/5">
                  {data.withdrawals.map((w, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-6 text-on-surface-variant group-hover:text-on-surface transition-colors">
                        {w.date}
                      </td>
                      <td className="py-4 px-6 font-mono text-sm tracking-wider">
                        {w.amount} ETH
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          Completed
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="#"
                          className="text-primary hover:underline font-mono text-xs tracking-wider"
                        >
                          {w.txId}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
