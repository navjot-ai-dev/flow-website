"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, RotateCcw, Volume2, Sparkles, Sliders } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface BackgroundCarScrollerProps {
  activeColor?: string;
  isSpotlightActive?: boolean;
  headlightsOn?: boolean;
  onFrameChange?: (frameIndex: number) => void;
}

const TOTAL_FRAMES = 50;

export default function BackgroundCarScroller({
  activeColor = "quicksilver",
  isSpotlightActive = false,
  headlightsOn = false,
  onFrameChange,
}: BackgroundCarScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(44);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualScrub, setIsManualScrub] = useState(false);

  // Initialize at frame 44 (fully assembled car hero)
  const currentFrameRef = useRef(44);
  const targetFrameRef = useRef(44);
  const animationFrameId = useRef<number | null>(null);

  // Mouse position for silhouette spotlight (0..1)
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  // Phase name getter
  const getPhaseName = (frame: number) => {
    if (frame <= 14) return "01 // EXPLODED MONOCOQUE & CHASSIS";
    if (frame <= 19) return "02 // HIGH-VOLTAGE ARCHITECTURE";
    if (frame <= 24) return "03 // ROLLING SUSPENSION PLATFORM";
    if (frame <= 32) return "04 // V6 COMBUSTION & PISTONS";
    if (frame <= 38) return "05 // AERODYNAMIC INTEGRATION";
    if (frame <= 46) return "06 // ASSEMBLED SUPERCAR EQUILIBRIUM";
    return "07 // ACTIVE AERO APEX STANCE";
  };

  // Preload all 50 frames
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/car/frames/frame-${numStr}.jpg`;
      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count >= 10 && !isLoaded) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, [isLoaded]);

  // Intelligent Section Scroll to Frame Mapping:
  // 0% -> Frame 44 (Hero Assembled)
  // 15% -> Frame 48 (Dynamic Angle)
  // 35% -> Frame 00 (Exploded Architecture)
  // 55% -> Frame 28 (Engine Zoom & Pistons)
  // 75% -> Frame 36 (Assembly Integration)
  // 90%-100% -> Frame 44 (Assembled Silhouette & Configurator)
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrub || isPlaying) return;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      let target = 44;
      if (progress < 0.12) {
        // Hero: Frame 44
        target = 44;
      } else if (progress < 0.28) {
        // Form in Motion: Frame 44 -> 49
        const p = (progress - 0.12) / 0.16;
        target = Math.round(44 + p * 5);
      } else if (progress < 0.50) {
        // Exploded Parts: Frame 0 -> 14
        const p = (progress - 0.28) / 0.22;
        target = Math.round(p * 14);
      } else if (progress < 0.70) {
        // Engine & Piston Dynamics: Frame 24 -> 32
        const p = (progress - 0.50) / 0.20;
        target = Math.round(24 + p * 8);
      } else if (progress < 0.85) {
        // Tech Blueprint / Reassembly: Frame 33 -> 43
        const p = (progress - 0.70) / 0.15;
        target = Math.round(33 + p * 10);
      } else {
        // Silhouette Reveal & Configurator: Frame 44
        target = 44;
      }

      targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, Math.max(0, target));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScrub, isPlaying]);

  // Track mouse position for spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      targetFrameRef.current = (targetFrameRef.current + 1) % TOTAL_FRAMES;
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Main Canvas Rendering Loop
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Linear interpolation
    const delta = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(delta) > 0.01) {
      currentFrameRef.current += delta * 0.16;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentFrameRef.current))
    );

    setCurrentFrameDisplay(frameIndex);
    if (onFrameChange) {
      onFrameChange(frameIndex);
    }

    const img = imagesRef.current[frameIndex];
    const width = canvas.width;
    const height = canvas.height;

    // 1. Clear background
    ctx.fillStyle = "#040507";
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      // 2. Aspect ratio containment
      const imgAspect = img.naturalWidth / img.naturalHeight; // 1280 / 720 = 1.7778
      const canvasAspect = width / height;

      let drawW: number;
      let drawH: number;

      if (canvasAspect > imgAspect) {
        drawH = height * 0.88;
        drawW = drawH * imgAspect;
      } else {
        drawW = width * 0.96;
        drawH = drawW / imgAspect;
      }

      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      ctx.save();

      // Color Tint grading
      if (activeColor === "cyan") {
        ctx.filter = "hue-rotate(180deg) saturate(1.4) brightness(1.05)";
      } else if (activeColor === "sunset") {
        ctx.filter = "hue-rotate(320deg) saturate(1.5) brightness(1.1)";
      } else if (activeColor === "obsidian") {
        ctx.filter = "contrast(1.35) brightness(0.72) saturate(0.55)";
      } else {
        ctx.filter = "contrast(1.08) brightness(1.02)";
      }

      // Draw the car image
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Headlight Beam Simulation
      if (headlightsOn) {
        ctx.save();
        const beamX = drawX + drawW * 0.22;
        const beamY = drawY + drawH * 0.62;

        const headlightGlow = ctx.createRadialGradient(
          beamX,
          beamY,
          10,
          beamX - drawW * 0.4,
          beamY + drawH * 0.2,
          drawW * 0.6
        );
        headlightGlow.addColorStop(0, "rgba(230, 250, 255, 0.9)");
        headlightGlow.addColorStop(0.25, "rgba(69, 243, 255, 0.5)");
        headlightGlow.addColorStop(0.7, "rgba(69, 243, 255, 0.12)");
        headlightGlow.addColorStop(1, "rgba(69, 243, 255, 0)");

        ctx.fillStyle = headlightGlow;
        ctx.beginPath();
        ctx.moveTo(beamX, beamY);
        ctx.lineTo(beamX - drawW * 0.55, beamY - drawH * 0.35);
        ctx.lineTo(beamX - drawW * 0.6, beamY + drawH * 0.45);
        ctx.closePath();
        ctx.fill();

        // Lens flare star
        const flare = ctx.createRadialGradient(beamX, beamY, 2, beamX, beamY, 60);
        flare.addColorStop(0, "#ffffff");
        flare.addColorStop(0.3, "rgba(69, 243, 255, 0.85)");
        flare.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(beamX, beamY, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Silhouette flashlight spotlight mode
      if (isSpotlightActive) {
        ctx.save();
        const spotX = mousePosRef.current.x * width;
        const spotY = mousePosRef.current.y * height;
        const spotRadius = Math.max(200, Math.min(width, height) * 0.32);

        const spotGrad = ctx.createRadialGradient(
          spotX,
          spotY,
          30,
          spotX,
          spotY,
          spotRadius
        );
        spotGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        spotGrad.addColorStop(0.4, "rgba(4, 5, 7, 0.35)");
        spotGrad.addColorStop(0.85, "rgba(4, 5, 7, 0.88)");
        spotGrad.addColorStop(1, "rgba(4, 5, 7, 0.98)");

        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(69, 243, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(spotX, spotY, spotRadius * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // Subtle studio vignette to maintain perfect contrast with text
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, "rgba(4, 5, 7, 0)");
      vignette.addColorStop(0.7, "rgba(4, 5, 7, 0.45)");
      vignette.addColorStop(1, "rgba(4, 5, 7, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    animationFrameId.current = requestAnimationFrame(renderCanvas);
  }, [activeColor, isSpotlightActive, headlightsOn, onFrameChange]);

  // Handle high-DPI canvas resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation frame lifecycle
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(renderCanvas);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderCanvas]);

  return (
    <>
      {/* Fallback Static Image (Guarantees car image is visible 100% of the time, zero blank flash!) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/car/frames/frame-${String(currentFrameDisplay + 1).padStart(3, "0")}.jpg`}
          alt="AURA Supercar Background"
          className="w-full h-full object-contain max-h-[88vh] select-none pointer-events-none transition-opacity duration-200"
          style={{
            filter:
              activeColor === "cyan"
                ? "hue-rotate(180deg) saturate(1.4)"
                : activeColor === "sunset"
                ? "hue-rotate(320deg) saturate(1.5)"
                : activeColor === "obsidian"
                ? "contrast(1.35) brightness(0.72) saturate(0.55)"
                : "none",
          }}
        />
      </div>

      {/* Dynamic Hardware-Accelerated Canvas (Overlays smoothly for 60fps frame interpolation) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Floating HUD Widget (Interactive Scrubber & Autoplay Controls) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 select-none pointer-events-auto">
        {/* Current phase tag */}
        <div className="glass-panel px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-cyan-300 flex items-center space-x-2 border border-cyan-500/30 shadow-xl shadow-black/80 backdrop-blur-2xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{getPhaseName(currentFrameDisplay)}</span>
        </div>

        {/* Minimal Control Pill */}
        <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center space-x-4 border border-white/15 shadow-2xl shadow-black/90 backdrop-blur-2xl">
          {/* Play/Pause Autoplay */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
            title={isPlaying ? "Pause cinematic rotation" : "Autoplay cinematic rotation"}
            aria-label="Toggle autoplay"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Reset to Assembled Hero Frame */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(false);
              targetFrameRef.current = 44;
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Reset to assembled car"
            aria-label="Reset to assembled car"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Engine Rev Sound Button */}
          <button
            onClick={() => {
              soundFx.playEngineRev();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Ignite V6 Hybrid Engine Rev"
            aria-label="Ignite engine rev sound"
          >
            <Volume2 className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Interactive Scrub slider */}
          <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
            <span className="text-[10px] font-mono text-slate-300 w-12 text-right">
              {String(currentFrameDisplay + 1).padStart(2, "0")} / 50
            </span>
            <input
              type="range"
              min="0"
              max={TOTAL_FRAMES - 1}
              value={currentFrameDisplay}
              onChange={(e) => {
                setIsManualScrub(true);
                setIsPlaying(false);
                targetFrameRef.current = parseInt(e.target.value, 10);
              }}
              onMouseUp={() => setIsManualScrub(false)}
              onTouchEnd={() => setIsManualScrub(false)}
              className="w-24 md:w-36 h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
              aria-label="Scrub car animation frames"
            />
          </div>
        </div>
      </div>
    </>
  );
}
