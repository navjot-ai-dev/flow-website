"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Disc, Wrench, Shield, ChevronRight, X } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface Hotspot {
  id: string;
  name: string;
  category: string;
  desc: string;
  specs: string[];
  top: string;
  left: string;
}

export default function ExplodedChapter() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: "aero-body",
      name: "Superformed Carbon Aero Shell",
      category: "AERODYNAMICS",
      desc: "Single-piece autoclave carbon upper structure with sculpted air channels directing high-pressure flow into side radiators.",
      specs: ["Pre-preg T1000 Weave", "Dry Weight: 38 kg", "Zero Panel Gaps"],
      top: "22%",
      left: "48%",
    },
    {
      id: "monocoque",
      name: "Carbon Tub Safety Cell",
      category: "CHASSIS",
      desc: "Formula 1 inspired passenger survival cell with integrated roll structure and aluminum crash absorption crush zones.",
      specs: ["Torsional Stiffness: 42,000 Nm/deg", "Impact Rating: FIA Grade 1", "Total Cockpit Mass: 82 kg"],
      top: "48%",
      left: "56%",
    },
    {
      id: "engine",
      name: "Twin-Turbo Hybrid V6",
      category: "POWERTRAIN",
      desc: "Bespoke 3.0L dry-sump combustion engine paired with a 95 kW axial-flux electric motor mounted inside the transmission bellhousing.",
      specs: ["720 Combined Horsepower", "8,500 RPM Max Engine Speed", "Hot-V Configuration"],
      top: "68%",
      left: "38%",
    },
    {
      id: "suspension",
      name: "Adaptive Pushrod Dampers",
      category: "DYNAMICS",
      desc: "Double-wishbone pushrod layout with magnetorheological fluid damping that recalibrates compression 500 times per second.",
      specs: ["Magnetorheological Valving", "Active Ride Height Vectoring", "Forged Billet Aluminum"],
      top: "52%",
      left: "72%",
    },
    {
      id: "brakes",
      name: "Carbon Ceramic Matrix Brakes",
      category: "BRAKING",
      desc: "390mm carbon-ceramic composite rotors with monobloc 6-piston aluminum calipers, providing fade-free stopping from 200 mph.",
      specs: ["390mm Carbon Rotors", "6-Piston Monobloc", "Operating Temp: up to 1,000°C"],
      top: "70%",
      left: "86%",
    },
  ];

  return (
    <section
      id="engineering"
      className="relative min-h-[160vh] flex flex-col justify-between px-6 md:px-16 py-28 pointer-events-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Wrench className="w-3.5 h-3.5" />
            <span>DECONSTRUCTED ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-outfit text-white">
            EXPLODED <span className="text-gradient">MASTERY</span>
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Over 500 bespoke structural components operate in millimeter unison. Click on the interactive beacons hovering over the exploded car to examine each subsystem.
          </p>
        </div>
      </div>

      {/* Floating Interactive Hotspots over the background car canvas */}
      <div className="relative w-full max-w-7xl mx-auto h-[480px] my-12 pointer-events-auto">
        {hotspots.map((h) => (
          <div
            key={h.id}
            style={{ top: h.top, left: h.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
            onClick={() => {
              soundFx.playClick();
              setActiveHotspot(h);
            }}
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 w-8 h-8 -top-1.5 -left-1.5 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />

            {/* Core Pin */}
            <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-[#040507] shadow-lg shadow-cyan-400/50 flex items-center justify-center transition-transform group-hover:scale-125">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Hover Tooltip label */}
            <div className="hidden md:block absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
              <div className="glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xl">
                {h.name}
              </div>
            </div>
          </div>
        ))}

        {/* Modal / Flyout Card for Active Hotspot */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-30 max-w-md w-full glass-panel-glow p-6 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                    {activeHotspot.category}
                  </span>
                  <h3 className="text-lg font-bold font-outfit uppercase text-white">
                    {activeHotspot.name}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveHotspot(null);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  aria-label="Close detail modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed pt-3">
                {activeHotspot.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  KEY SPECIFICATIONS
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeHotspot.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[11px] font-mono tracking-widest text-slate-500 pointer-events-auto">
        <span>02 // STRUCTURAL DECONSTRUCTION</span>
        <span>CONTINUE SCROLLING TO CYCLE INTERNAL COMBUSTION</span>
      </div>
    </section>
  );
}
