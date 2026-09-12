"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Flame, Cpu, ArrowUpRight } from "lucide-react";

export default function CarInfo() {
  const stats = [
    {
      value: "2.8",
      unit: "SEC",
      label: "0–60 MPH ACCELERATION",
      desc: "Instant electric torque vectoring off the launch line.",
    },
    {
      value: "720",
      unit: "HP",
      label: "COMBINED PEAK OUTPUT",
      desc: "Twin-Turbo 3.0L V6 paired with axial-flux e-motor.",
    },
    {
      value: "205",
      unit: "MPH",
      label: "MAXIMUM TRACK VELOCITY",
      desc: "Electronically governed with active drag reduction.",
    },
    {
      value: "1,430",
      unit: "KG",
      label: "DRY CURB WEIGHT",
      desc: "Ultra-rigid single-piece carbon fiber monocoque tub.",
    },
  ];

  return (
    <section
      id="design"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-28 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>PERFORMANCE SPECIFICATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-outfit text-white">
            SCULPTED BY <span className="text-gradient">PHYSICS</span>
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Every curve of AURA serves an aerodynamic purpose. Air is funneled through negative spaces in the bodywork, reducing boundary layer turbulence and maximizing cornering traction.
          </p>
        </div>

        {/* 4 Large Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(69, 243, 255, 0.4)" }}
              className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl transition-all"
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl lg:text-6xl font-extrabold font-outfit text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-sm font-mono text-cyan-400 font-bold tracking-widest uppercase">
                    {stat.unit}
                  </span>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-slate-200 uppercase">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design Philosophy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-mono font-bold tracking-wider text-white uppercase">
              Carbon Tub Monocoque
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Constructed from aerospace-grade autoclave pre-preg carbon weave, delivering unmatched torsional rigidity of 42,000 Nm/degree.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-mono font-bold tracking-wider text-white uppercase">
              Hot-V Turbo Architecture
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Twin symmetric turbochargers sit inside the 90° cylinder bank for ultra-short exhaust plumbing and virtually zero throttle lag.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-mono font-bold tracking-wider text-white uppercase">
              Predictive Slip Control
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Real-time yaw sensors calculate grip conditions 1,000 times per second to distribute torque individually to each drive wheel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
