"use client";

import { useState } from "react";
import { Hexagon, X, ImagePlus, Info, Plus, Trash2, ArrowRight, UploadCloud, FileText, Eye, Diamond } from "lucide-react";

const STEPS = [
  { Icon: UploadCloud, label: "01 Upload", filled: true },
  { Icon: FileText, label: "02 Metadata", filled: false },
  { Icon: Eye, label: "03 Review", filled: false },
  { Icon: Diamond, label: "04 Mint", filled: false },
];

export default function MintPage() {
  const [activeStep] = useState(0);
  const [attributes, setAttributes] = useState([
    { type: "Background", value: "" },
    { type: "Rarity", value: "Legendary" },
  ]);

  return (
    <div className="antialiased min-h-screen flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      {/* Minimal Header */}
      <header className="relative z-50 w-full flex justify-between items-center px-4 md:px-16 py-6 max-w-[1440px] mx-auto border-b border-white/5 bg-surface/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Hexagon className="text-primary text-[32px]"  />
          <span className="font-semibold text-2xl tracking-tighter text-on-surface">
            Strata
          </span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors font-mono text-sm tracking-wider">
          <X className="text-lg" />
          Cancel Mint
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start pt-12 pb-24 px-4 md:px-16 max-w-[1200px] mx-auto w-full gap-12">
        <div className="text-center w-full max-w-2xl">
          <h1 className="font-bold text-3xl md:text-5xl text-on-surface mb-4 tracking-tight">
            Create New Asset
          </h1>
          <p className="text-lg text-on-surface-variant">
            Digitize your work on the blockchain. Ensure your assets are high
            resolution and appropriately formatted.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="w-full max-w-4xl flex items-center justify-between relative mb-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-variant -z-10" />
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex flex-col items-center gap-3 bg-background px-4"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                  i === activeStep
                    ? "bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(124,58,237,0.3)] border-primary/30"
                    : "bg-surface-container-high text-on-surface-variant border-outline-variant"
                }`}
              >
                <step.Icon className="w-6 h-6" />
              </div>
              <span
                className={`font-mono text-sm tracking-wider ${
                  i === activeStep ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Glassmorphic Bento Container */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 bg-surface/40 backdrop-blur-2xl rounded-[24px] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          {/* Upload Dropzone */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="relative flex-grow min-h-[400px] lg:min-h-full rounded-xl border-2 border-dashed border-outline-variant hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center p-8 group cursor-pointer bg-surface-container-lowest/50">
              <div className="w-20 h-20 rounded-full bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <ImagePlus className="text-[40px]" />
              </div>
              <h3 className="font-semibold text-2xl text-on-surface mb-2 text-center">
                Drag &amp; Drop Media
              </h3>
              <p className="text-base text-on-surface-variant text-center mb-6">
                Supports JPG, PNG, GIF, SVG, WEBP, MP4, or MP3. Max size: 100MB.
              </p>
              <button className="px-6 py-3 rounded-lg bg-surface-variant text-on-surface font-mono text-sm border border-white/10 group-hover:bg-primary group-hover:text-on-primary transition-colors tracking-wider">
                Browse Files
              </button>
              <input
                accept="image/*,video/*,audio/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
              />
            </div>
          </div>

          {/* Metadata Form */}
          <div className="lg:col-span-7 flex flex-col gap-6 p-2 lg:pl-8">
            <div>
              <h2 className="font-semibold text-2xl text-on-surface flex items-center gap-2">
                <Info className="text-primary text-xl" />
                Asset Details
              </h2>
              <p className="text-xs font-medium text-on-surface-variant mt-1">
                This information will be permanently stored on the blockchain.
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm text-on-surface-variant flex items-center gap-1 tracking-wider">
                Name <span className="text-error">*</span>
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-base text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                placeholder="e.g. Genesis Artifact #01"
                type="text"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-sm text-on-surface-variant tracking-wider">
                Description
              </label>
              <textarea
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-base text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                placeholder="Describe the lore, creation process, or utility of this asset..."
                rows={4}
              />
            </div>

            {/* Attributes */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex justify-between items-end">
                <label className="font-mono text-sm text-on-surface-variant tracking-wider">
                  Properties / Attributes
                </label>
                <button
                  onClick={() =>
                    setAttributes([...attributes, { type: "", value: "" }])
                  }
                  className="text-secondary hover:text-secondary-fixed transition-colors font-mono text-sm flex items-center gap-1 tracking-wider"
                >
                  <Plus className="text-base" />
                  Add Property
                </button>
              </div>
              {attributes.map((attr, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-medium text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                      placeholder="e.g. Background"
                      value={attr.type}
                      onChange={(e) => {
                        const next = [...attributes];
                        next[i].type = e.target.value;
                        setAttributes(next);
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-medium text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                      placeholder="e.g. Obsidian Void"
                      value={attr.value}
                      onChange={(e) => {
                        const next = [...attributes];
                        next[i].value = e.target.value;
                        setAttributes(next);
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() =>
                        setAttributes(attributes.filter((_, j) => j !== i))
                      }
                      className="text-outline-variant hover:text-error transition-colors p-1"
                    >
                      <Trash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-inverse-primary text-on-primary font-mono text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.4)] tracking-wider">
                Continue to Metadata
                <ArrowRight  />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
