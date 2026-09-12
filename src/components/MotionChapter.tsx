"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Eye, Wind, Gauge, Layers } from "lucide-react";

export default function MotionChapter() {
  return (
    <section
      id="experience"
      className="relative min-h-[140vh] flex flex-col justify-center px-6 md:px-16 py-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left narrative card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 pointer-events-auto"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>360° KINEMATIC ROTATION</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-outfit text-white">
              FORM IN <span className="text-gradient">MOTION</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Every angle tells a different story. Precision-milled carbon fiber contours catch the ambient light as computational aerodynamics carve through the atmospheric slipstream.
            </p>
          </div>

          {/* Quick telemetry indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-400" /> DRAG
              </span>
              <p className="text-2xl font-bold font-mono text-white">0.29 <span className="text-xs text-slate-400 font-normal">Cd</span></p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> BALANCE
              </span>
              <p className="text-2xl font-bold font-mono text-white">42 : 58 <span className="text-xs text-slate-400 font-normal">%</span></p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> CHASSIS
              </span>
              <p className="text-2xl font-bold font-mono text-white">T1000 <span className="text-xs text-slate-400 font-normal">CFRP</span></p>
            </div>
          </div>
        </motion.div>

        {/* Right side floating annotations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 flex flex-col justify-end items-end space-y-4 pointer-events-auto"
        >
          <div className="glass-panel p-5 rounded-2xl border border-white/10 max-w-sm space-y-2 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> PERSPECTIVE FLOW
              </span>
              <span className="text-[10px] font-mono text-slate-400">SYNCED WITH SCROLL</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Scroll continuous through the 50 high-precision CAD frames to inspect airflow channels, underbody venturis, and sculpted fender flares in continuous slow motion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
