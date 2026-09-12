"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Shield, Sparkles } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface NavbarProps {
  onExploreClick?: () => void;
}

export default function Navbar({ onExploreClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Experience", href: "#experience" },
    { label: "Design", href: "#design" },
    { label: "Engineering", href: "#engineering" },
    { label: "Details", href: "#details" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#040507]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-4"
          : "bg-gradient-to-b from-[#040507]/90 via-[#040507]/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Emblem */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center space-x-3 text-white cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-[#040507] rounded-[7px] flex items-center justify-center">
              <span className="font-mono text-xs font-bold tracking-widest text-cyan-400">A</span>
            </div>
          </div>
          <span className="font-extrabold tracking-[0.3em] text-lg md:text-xl text-white font-outfit uppercase">
            AURA
          </span>
        </a>

        {/* Center / Right Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="group relative text-sm tracking-[0.18em] uppercase text-slate-300 hover:text-white transition-colors py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#configurator"
            onClick={(e) => {
              if (onExploreClick) {
                e.preventDefault();
                onExploreClick();
              } else {
                scrollToSection(e, "#configurator");
              }
            }}
            className="group relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase text-black font-semibold bg-white hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-cyan-400/30 active:scale-95 cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#040507]/95 backdrop-blur-2xl border-b border-white/10 px-8 py-6 shadow-2xl flex flex-col space-y-5 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-base uppercase tracking-widest text-slate-200 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#configurator"
            onClick={(e) => scrollToSection(e, "#configurator")}
            className="inline-flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-widest"
          >
            <span>Explore The Machine →</span>
          </a>
        </div>
      )}
    </header>
  );
}
