import Link from "next/link";
import { Send, Globe, MessageSquare, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-16 border-t border-white/10">
      <div className="w-full px-4 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
        {/* Brand Column */}
        <div className="space-y-4">
          <span className="font-bold text-5xl text-on-surface tracking-tighter block">
            Strata
          </span>
          <p className="text-sm text-on-surface-variant">
            The world&apos;s first high-fidelity NFT marketplace designed for
            professional collectors and institutional grade digital assets.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Globe, id: "public" },
              { Icon: MessageSquare, id: "chat" },
              { Icon: Camera, id: "camera" },
            ].map(({ Icon, id }) => (
              <a
                key={id}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-on-surface-variant hover:text-primary"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Marketplace */}
        <div className="space-y-4">
          <h4 className="font-semibold text-on-surface text-base uppercase tracking-widest">
            Marketplace
          </h4>
          <div className="flex flex-col gap-2">
            {["All NFTs", "Art", "Gaming", "Collections"].map((item) => (
              <Link
                key={item}
                href="/marketplace"
                className="text-xs font-medium text-on-surface-variant hover:text-secondary-fixed transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="font-semibold text-on-surface text-base uppercase tracking-widest">
            Resources
          </h4>
          <div className="flex flex-col gap-2">
            {["Help Center", "API Docs", "Terms of Service", "Privacy Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs font-medium text-on-surface-variant hover:text-secondary-fixed transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="font-semibold text-on-surface text-base uppercase tracking-widest">
            Stay Updated
          </h4>
          <p className="text-xs font-medium text-on-surface-variant">
            Join our newsletter to get the latest NFT drops and industry news.
          </p>
          <div className="flex gap-2">
            <input
              className="bg-surface-container-high border border-white/10 rounded-xl text-xs px-4 py-3 w-full focus:ring-1 focus:ring-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-primary text-on-primary p-3 rounded-xl hover:opacity-80 transition-opacity">
              <Send  />
            </button>
          </div>
          <p className="text-xs text-on-surface-variant/60 mt-4">
            © 2024 Strata NFT Marketplace. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 md:px-16 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1440px] mx-auto">
        <p className="text-xs font-medium text-on-surface-variant">
          © 2024 Strata NFT Marketplace. All rights reserved.
        </p>
        <div className="flex gap-8">
          {["Terms", "Privacy", "Security"].map((item) => (
            <span
              key={item}
              className="text-xs font-medium text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
