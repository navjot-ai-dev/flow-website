"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Check, Volume2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "@/lib/audio";

interface ConfiguratorCtaProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export default function ConfiguratorCta({
  activeColor,
  setActiveColor,
}: ConfiguratorCtaProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    region: "North America",
    concierge: true,
  });

  const finishes = [
    {
      id: "quicksilver",
      name: "Quicksilver Titanium",
      hex: "#cbd5e1",
      badge: "Signature Metallic",
    },
    {
      id: "obsidian",
      name: "Obsidian Stealth",
      hex: "#1e293b",
      badge: "Satin Carbon",
    },
    {
      id: "cyan",
      name: "Cyber Velocity",
      hex: "#06b6d4",
      badge: "Electric Gloss",
    },
    {
      id: "sunset",
      name: "Apex Sunset",
      hex: "#f59e0b",
      badge: "Copper Pearl",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playEngineRev();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#45f3ff", "#ffffff", "#e0a96d", "#3b82f6"],
    });
  };

  return (
    <section
      id="configurator"
      className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-16 py-28 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Configurator */}
        <div className="lg:col-span-6 space-y-6 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE ALLOCATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase font-outfit text-white">
            EXPERIENCE <span className="text-gradient">AURA</span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed">
            Strictly limited to 499 individualized chassis builds worldwide. Choose your exterior bespoke finish to preview on the live vehicle stage behind.
          </p>

          {/* Color Palettes Switcher */}
          <div className="space-y-3 pt-4">
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block">
              SELECT EXTERIOR FINISH
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {finishes.map((f) => {
                const isSelected = activeColor === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveColor(f.id);
                    }}
                    className={`p-3 rounded-2xl glass-panel border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-cyan-400 ring-2 ring-cyan-400/30 bg-cyan-500/10"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 pb-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: f.hex }}
                      />
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-xs font-bold font-mono text-white leading-tight">
                      {f.name}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {f.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                soundFx.playClick();
                setModalOpen(true);
              }}
              className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-cyan-400 text-black font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-2xl shadow-white/10 hover:shadow-cyan-400/40 active:scale-95 cursor-pointer"
            >
              <span>RESERVE BUILD ALLOCATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => soundFx.playEngineRev()}
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-full glass-panel hover:bg-white/10 border border-white/10 text-slate-200 font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>IGNITE SOUNDSCAPE</span>
            </button>
          </div>
        </div>

        {/* Right Column Allocation Status Card */}
        <div className="lg:col-span-6 space-y-6 pointer-events-auto">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                PRODUCTION RUN STATUS
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                SERIES 01 ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-slate-400">Total Allocation</span>
                <span className="text-white font-bold">499 UNITS</span>
              </div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-slate-400">Allocated Deliveries</span>
                <span className="text-cyan-400 font-bold">412 CONFIRMED</span>
              </div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-slate-400">Remaining Build Slots</span>
                <span className="text-amber-400 font-bold">87 AVAILABLE</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-[82%]" />
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-400 font-light border-t border-white/10">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Includes 3-Year Factory Track Support &amp; Concierge White-Glove Handover.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Reservation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel-glow p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                    AURA PRIVATE CLIENT
                  </span>
                  <h3 className="text-2xl font-bold font-outfit uppercase text-white">
                    RESERVE YOUR ALLOCATION
                  </h3>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  aria-label="Close reservation modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-outfit uppercase text-white">
                    ALLOCATION RESERVED
                  </h4>
                  <p className="text-sm text-slate-300 font-light max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name || "Collector"}. Our VIP Automotive Concierge will contact you within 24 hours to finalize chassis specification.
                  </p>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-cyan-400 transition-colors"
                  >
                    RETURN TO SHOWCASE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sterling@client.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                      Delivery Region
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0f19] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="North America">North America (US &amp; Canada)</option>
                      <option value="Europe">Europe &amp; United Kingdom</option>
                      <option value="Asia Pacific">Asia Pacific (Japan / Singapore / Australia)</option>
                      <option value="Middle East">Middle East (UAE / Saudi Arabia)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-cyan-400/30 cursor-pointer"
                    >
                      CONFIRM ALLOCATION REQUEST →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
