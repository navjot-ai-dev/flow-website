"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface HeroOverlayProps {
  onExploreClick: () => void;
}

export default function HeroOverlay({ onExploreClick }: HeroOverlayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-16 pointer-events-none">
      {/* Top spacing */}
      <div className="w-full" />

      {/* Main Hero Typography Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl space-y-6"
      >
        {/* Subtle Pill Tag */}
        <motion.div variants={itemVariants} className="inline-block pointer-events-auto">
          <div className="glass-panel px-4 py-1.5 rounded-full inline-flex items-center space-x-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-slate-300 uppercase">
              PURE HIGH-PERFORMANCE PROTOTYPE
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-[0.92] uppercase font-outfit text-white"
        >
          <span className="block text-gradient">A NEW</span>
          <span className="block text-white">PERSPECTIVE</span>
          <span className="block text-slate-400">ON MOTION.</span>
        </motion.h1>

        {/* Small Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-400 uppercase font-medium pt-2"
        >
          DESIGNED FOR THE NEXT GENERATION
        </motion.p>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="pt-4 pointer-events-auto">
          <button
            onClick={() => {
              soundFx.playEngineRev();
              onExploreClick();
            }}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-cyan-400 text-black font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-2xl shadow-white/10 hover:shadow-cyan-400/40 active:scale-95 cursor-pointer"
          >
            <span>EXPLORE THE MACHINE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full flex justify-between items-end pt-12"
      >
        <div className="hidden md:flex items-center space-x-6 text-[11px] font-mono tracking-widest text-slate-500">
          <span>01 // ORIGIN</span>
          <span>LATERAL FORCE: 1.45G</span>
          <span>AERODYNAMIC COEFFICIENT: 0.29 CD</span>
        </div>

        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playClick();
            const el = document.getElementById("experience");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="pointer-events-auto group flex flex-col items-center space-y-2 text-slate-400 hover:text-cyan-400 transition-colors mx-auto md:mx-0 cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
            SCROLL TO EXPERIENCE
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
