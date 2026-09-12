"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BackgroundCarScroller from "@/components/BackgroundCarScroller";
import HeroOverlay from "@/components/HeroOverlay";
import MotionChapter from "@/components/MotionChapter";
import CarInfo from "@/components/CarInfo";
import ExplodedChapter from "@/components/ExplodedChapter";
import PowertrainChapter from "@/components/PowertrainChapter";
import TechDetailsOverlay from "@/components/TechDetailsOverlay";
import SilhouetteRevealOverlay from "@/components/SilhouetteRevealOverlay";
import ConfiguratorCta from "@/components/ConfiguratorCta";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeColor, setActiveColor] = useState<string>("quicksilver");
  const [isSpotlightActive, setIsSpotlightActive] = useState<boolean>(false);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  const handleExploreClick = () => {
    const el = document.getElementById("experience");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Fullscreen Background Dynamic Car Scroller (The Core Cinematic Canvas) */}
      <BackgroundCarScroller
        activeColor={activeColor}
        isSpotlightActive={isSpotlightActive}
        headlightsOn={headlightsOn}
        onFrameChange={setCurrentFrame}
      />

      {/* 2. Glassmorphic Navigation Bar */}
      <Navbar onExploreClick={handleExploreClick} />

      {/* 3. Foreground Narrative Sections Flowing Over Background Car */}
      <div className="relative z-10 space-y-12 sm:space-y-24">
        {/* Hero Section */}
        <HeroOverlay onExploreClick={handleExploreClick} />

        {/* 360 Rotation / Form in Motion */}
        <MotionChapter />

        {/* Performance Specs & Information */}
        <CarInfo />

        {/* Exploded Parts Deconstructed Architecture */}
        <ExplodedChapter />

        {/* Powertrain Dynamics (Synchronized with reciprocating pistons) */}
        <PowertrainChapter />

        {/* Engineering Benchmark / Tech Details Tabbed System */}
        <TechDetailsOverlay />

        {/* Interactive Silhouette Reveal with Spotlight & Headlight Ignition */}
        <SilhouetteRevealOverlay
          isSpotlightActive={isSpotlightActive}
          setIsSpotlightActive={setIsSpotlightActive}
          headlightsOn={headlightsOn}
          setHeadlightsOn={setHeadlightsOn}
        />

        {/* Bespoke Allocation & Color Configurator */}
        <ConfiguratorCta
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />

        {/* Minimal Automotive Footer */}
        <Footer />
      </div>
    </main>
  );
}
