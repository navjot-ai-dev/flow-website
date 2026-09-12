"use client";

import React from "react";
import { Eye, Lightbulb, Sparkles } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface SilhouetteRevealOverlayProps {
  isSpotlightActive: boolean;
  setIsSpotlightActive: (active: boolean) => void;
  headlightsOn: boolean;
  setHeadlightsOn: (on: boolean) => void;
}

export default function SilhouetteRevealOverlay({
  isSpotlightActive,
  setIsSpotlightActive,
  headlightsOn,
  setHeadlightsOn,
}: SilhouetteRevealOverlayProps) {
  return (
    <section className="relative min-h-[120vh] flex flex-col justify-center px-6 md:px-16 py-28 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8 pointer-events-auto">
        {/* Section Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
          <Eye className="w-3.5 h-3.5" />
          <span>INTERACTIVE SILHOUETTE REVEAL</span>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl sm:text-7xl font-extrabold tracking-tight uppercase font-outfit text-white">
            BORN IN THE <span className="text-gradient">SHADOWS</span>
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Move your cursor across the stage to sweep the studio spotlight over the carbon fiber silhouette. Toggle the LED matrix headlamps to pierce the dark.
          </p>
        </div>

        {/* Interactive Controls Pill */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Spotlight Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsSpotlightActive(!isSpotlightActive);
            }}
            className={`inline-flex items-center space-x-2.5 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              isSpotlightActive
                ? "bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-400/30"
                : "glass-panel text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/30"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSpotlightActive ? "SPOTLIGHT ACTIVE" : "ENABLE SPOTLIGHT CONE"}</span>
          </button>

          {/* Headlights Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setHeadlightsOn(!headlightsOn);
            }}
            className={`inline-flex items-center space-x-2.5 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              headlightsOn
                ? "bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/40"
                : "glass-panel text-slate-300 hover:text-white border border-white/10 hover:border-amber-500/30"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>{headlightsOn ? "LED MATRIX: IGNITED" : "IGNITE HEADLAMPS"}</span>
          </button>
        </div>

        <span className="text-[11px] font-mono tracking-widest text-slate-500 pt-6">
          MOVE CURSOR ACROSS SCREEN TO SWEEP THE LIGHT BEAM
        </span>
      </div>
    </section>
  );
}
