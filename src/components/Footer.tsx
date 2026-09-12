"use client";

import React from "react";
import { ArrowUp, Shield } from "lucide-react";
import { soundFx } from "@/lib/audio";

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#040507]/90 backdrop-blur-2xl px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-[#040507] rounded-[7px] flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-cyan-400">A</span>
                </div>
              </div>
              <span className="font-extrabold tracking-[0.3em] text-xl text-white font-outfit uppercase">
                AURA
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 tracking-wider">
              AUTOMOTIVE ARTISTRY &amp; AERODYNAMIC EQUILIBRIUM
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-8 text-xs font-mono tracking-widest uppercase text-slate-400">
            <a href="#experience" className="hover:text-cyan-400 transition-colors">
              Experience
            </a>
            <a href="#design" className="hover:text-cyan-400 transition-colors">
              Design
            </a>
            <a href="#engineering" className="hover:text-cyan-400 transition-colors">
              Engineering
            </a>
            <a href="#details" className="hover:text-cyan-400 transition-colors">
              Blueprint
            </a>
            <a href="#configurator" className="hover:text-cyan-400 transition-colors">
              Allocation
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-5 py-2.5 rounded-full glass-panel border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span className="text-xs font-mono tracking-widest uppercase">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-cyan-400" />
          </button>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-500">
          <p>&copy; {new Date().getFullYear()} AURA AUTOMOTIVE GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-slate-400 cursor-pointer">HOMOLOGATION TERMS</span>
            <span className="hover:text-slate-400 cursor-pointer">GLOBAL PRESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
