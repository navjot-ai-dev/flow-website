"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, Flame, Zap, Activity, Volume2 } from "lucide-react";
import { soundFx } from "@/lib/audio";

export default function PowertrainChapter() {
  return (
    <section className="relative min-h-[140vh] flex flex-col justify-center px-6 md:px-16 py-28 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 pointer-events-auto"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>PISTON KINEMATICS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-outfit text-white">
            HEART OF <span className="text-gradient">THE MACHINE</span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed">
            As seen in the high-speed deconstruction above, forged aluminum-alloy pistons cycle with micron tolerances inside plasma-coated bores. The twin-turbo hybrid system pairs instant low-end electric torque with explosive top-end combustion power.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => soundFx.playEngineRev()}
              className="inline-flex items-center space-x-2.5 px-5 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>TEST ENGINE IGNITION</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column Telemetry Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 space-y-4 pointer-events-auto"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4 animate-pulse" /> LIVE TELEMETRY MATRIX
              </span>
              <span className="text-[11px] font-mono text-slate-400">BENCHMARK MODE</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  REDLINE LIMIT
                </span>
                <p className="text-3xl font-extrabold font-mono text-white">8,500 <span className="text-xs text-cyan-400 font-normal">RPM</span></p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  BOOST PRESSURE
                </span>
                <p className="text-3xl font-extrabold font-mono text-white">2.2 <span className="text-xs text-cyan-400 font-normal">BAR</span></p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  COMBINED TORQUE
                </span>
                <p className="text-3xl font-extrabold font-mono text-white">800 <span className="text-xs text-cyan-400 font-normal">NM</span></p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  E-MOTOR LATENCY
                </span>
                <p className="text-3xl font-extrabold font-mono text-white">&lt; 15 <span className="text-xs text-cyan-400 font-normal">MS</span></p>
              </div>
            </div>

            {/* Dyno Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400 uppercase">Power Curve Delivery</span>
                <span className="text-cyan-400 font-bold">100% AVAILABLE</span>
              </div>
              <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 rounded-full w-[94%]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
