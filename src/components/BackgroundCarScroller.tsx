"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles } from "lucide-react";
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
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualScrub, setIsManualScrub] = useState(false);

  // Smooth lerp frame tracking
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Mouse position for silhouette spotlight
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  // Phase name getter
  const getPhaseName = (frame: number) => {
    if (frame <= 14) return "01 // DECONSTRUCTED MONOCOQUE";
    if (frame <= 19) return "02 // HIGH-VOLTAGE ARCHITECTURE";
    if (frame <= 24) return "03 // ROLLING CHASSIS & PLATFORM";
    if (frame <= 32) return "04 // TWIN-TURBO V6 REPRO RECIPROCATING";
    if (frame <= 38) return "05 // ACTIVE AERODYNAMIC INTEGRATION";
    if (frame <= 46) return "06 // ASSEMBLED SUPERCAR EQUILIBRIUM";
    return "07 // EXPANDED STANCE";
  };

  // Preload all 50 frames
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/car/frames/frame-${numStr}.jpg`;
      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Track global scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrub || isPlaying) return;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const target = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      targetFrameRef.current = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScrub, isPlaying]);

  // Track mouse coordinates for spotlight
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
    }, 90);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Main Canvas Rendering Loop with Lerp
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Linear interpolation towards target frame
    const delta = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(delta) > 0.01) {
      currentFrameRef.current += delta * 0.18;
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

    // Clear background with deep dark slate
    ctx.fillStyle = "#040507";
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      // Calculate aspect ratio containment (16:9 standard for frames)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      // Fill screen nicely with slight margin on desktop
      if (canvasAspect > imgAspect) {
        drawH = height * 0.92;
        drawW = drawH * imgAspect;
      } else {
        drawW = width * 0.96;
        drawH = drawW / imgAspect;
      }

      drawX = (width - drawW) / 2;
      drawY = (height - drawH) / 2 + (height * 0.02);

      // Save canvas state
      ctx.save();

      // Apply Color Tint grading if configured
      if (activeColor === "cyan") {
        ctx.filter = "hue-rotate(180deg) saturate(1.4) brightness(1.05)";
      } else if (activeColor === "sunset") {
        ctx.filter = "hue-rotate(320deg) saturate(1.5) brightness(1.1)";
      } else if (activeColor === "obsidian") {
        ctx.filter = "contrast(1.3) brightness(0.75) saturate(0.6)";
      } else {
        ctx.filter = "contrast(1.1) brightness(1.02)";
      }

      // Draw the car image
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Headlight Beam illumination simulation
      if (headlightsOn) {
        ctx.save();
        const beamX = drawX + drawW * 0.22;
        const beamY = drawY + drawH * 0.62;

        const headlightGlow = ctx.createRadialGradient(
          beamX,
          beamY,
          10,
          beamX - drawW * 0.35,
          beamY + drawH * 0.2,
          drawW * 0.5
        );
        headlightGlow.addColorStop(0, "rgba(220, 245, 255, 0.85)");
        headlightGlow.addColorStop(0.2, "rgba(69, 243, 255, 0.45)");
        headlightGlow.addColorStop(0.7, "rgba(69, 243, 255, 0.12)");
        headlightGlow.addColorStop(1, "rgba(69, 243, 255, 0)");

        ctx.fillStyle = headlightGlow;
        ctx.beginPath();
        ctx.moveTo(beamX, beamY);
        ctx.lineTo(beamX - drawW * 0.5, beamY - drawH * 0.3);
        ctx.lineTo(beamX - drawW * 0.55, beamY + drawH * 0.4);
        ctx.closePath();
        ctx.fill();

        // Lens flare star
        const flare = ctx.createRadialGradient(beamX, beamY, 2, beamX, beamY, 50);
        flare.addColorStop(0, "#ffffff");
        flare.addColorStop(0.3, "rgba(69, 243, 255, 0.8)");
        flare.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(beamX, beamY, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Silhouette flashlight spotlight mode
      if (isSpotlightActive) {
        ctx.save();
        const spotX = mousePosRef.current.x * width;
        const spotY = mousePosRef.current.y * height;
        const spotRadius = Math.max(160, Math.min(width, height) * 0.28);

        // Create dark shroud everywhere except where the cursor is
        const spotGrad = ctx.createRadialGradient(
          spotX,
          spotY,
          20,
          spotX,
          spotY,
          spotRadius
        );
        spotGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        spotGrad.addColorStop(0.5, "rgba(4, 5, 7, 0.4)");
        spotGrad.addColorStop(0.9, "rgba(4, 5, 7, 0.88)");
        spotGrad.addColorStop(1, "rgba(4, 5, 7, 0.97)");

        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);

        // Highlight ring on spotlight edge
        ctx.strokeStyle = "rgba(69, 243, 255, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(spotX, spotY, spotRadius * 0.6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // Atmospheric Vignette & Soft Gradient Floor Horizon
      const floorGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      floorGrad.addColorStop(0, "rgba(4, 5, 7, 0)");
      floorGrad.addColorStop(0.5, "rgba(4, 5, 7, 0.4)");
      floorGrad.addColorStop(1, "rgba(4, 5, 7, 0.95)");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Subtle top vignette to ensure navbar readability
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.22);
      topGrad.addColorStop(0, "rgba(4, 5, 7, 0.9)");
      topGrad.addColorStop(0.6, "rgba(4, 5, 7, 0.4)");
      topGrad.addColorStop(1, "rgba(4, 5, 7, 0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height * 0.22);
    }

    animationFrameId.current = requestAnimationFrame(renderCanvas);
  }, [activeColor, isSpotlightActive, headlightsOn, onFrameChange]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Start render loop when loaded
  useEffect(() => {
    if (isLoaded) {
      animationFrameId.current = requestAnimationFrame(renderCanvas);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isLoaded, renderCanvas]);

  // Manual scrub slider change
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualScrub(true);
    setIsPlaying(false);
    const val = parseInt(e.target.value, 10);
    targetFrameRef.current = val;
  };

  const handleScrubEnd = () => {
    setIsManualScrub(false);
  };

  return (
    <>
      {/* Preloader progress bar at very top */}
      {!isLoaded && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#040507]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">
              SYNCHRONIZING CINEMATIC FRAMES ({loadedCount}/{TOTAL_FRAMES})
            </span>
          </div>
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-150"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Fixed Fullscreen Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none -z-10"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Floating HUD Widget (Interactive Scrubber & Playback Controls) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 select-none">
        {/* Current phase tag */}
        <div className="glass-panel px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-cyan-300/90 flex items-center space-x-2 border border-cyan-500/20 shadow-lg shadow-black/60 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{getPhaseName(currentFrameDisplay)}</span>
        </div>

        {/* Minimal Control Pill */}
        <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center space-x-4 border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-2xl">
          {/* Play/Pause Autoplay */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title={isPlaying ? "Pause cinematic flow" : "Autoplay cinematic flow"}
            aria-label="Toggle autoplay"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Quick Reset to Hero frame */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(false);
              targetFrameRef.current = 44;
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Reset to assembled vehicle view"
            aria-label="Reset to assembled car"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Engine Rev Sound Button */}
          <button
            onClick={() => {
              soundFx.playEngineRev();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Ignite V6 Hybrid Engine Rev"
            aria-label="Ignite engine rev sound"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Scrubber slider */}
          <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
            <span className="text-[10px] font-mono text-slate-400 w-12 text-right">
              {String(currentFrameDisplay + 1).padStart(2, "0")} / 50
            </span>
            <input
              type="range"
              min="0"
              max={TOTAL_FRAMES - 1}
              value={currentFrameDisplay}
              onChange={handleScrubChange}
              onMouseUp={handleScrubEnd}
              onTouchEnd={handleScrubEnd}
              className="w-24 md:w-36 h-1 bg-slate-700/60 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
              aria-label="Scrub car animation frames"
            />
          </div>
        </div>
      </div>
    </>
  );
}
