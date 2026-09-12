"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wind, Shield, Compass, CheckCircle2 } from "lucide-react";
import { soundFx } from "@/lib/audio";

export default function TechDetailsOverlay() {
  const [activeTab, setActiveTab] = useState<"powertrain" | "aero" | "chassis" | "cockpit">("powertrain");

  const tabs = [
    { id: "powertrain", label: "Powertrain", icon: Cpu },
    { id: "aero", label: "Aerodynamics", icon: Wind },
    { id: "chassis", label: "Chassis & Safety", icon: Shield },
    { id: "cockpit", label: "Cockpit & OS", icon: Compass },
  ];

  const content = {
    powertrain: {
      title: "Hybrid Twin-Turbocharged V6",
      subtitle: "3.0-Litre 90-Degree V6 + Axial Flux Electric Traction Motor",
      specs: [
        { label: "Combustion Engine", value: "3.0L Twin-Turbo Dry Sump 24V" },
        { label: "Electric Motor", value: "Axial Flux Permanent Magnet (95 kW)" },
        { label: "Battery Energy", value: "7.4 kWh Lithium-Ion High-Rate Pack" },
        { label: "Transmission", value: "8-Speed Seamless Dual Clutch with E-Reverse" },
        { label: "Specific Output", value: "200 HP per Litre" },
        { label: "Electric Driving Range", value: "30 km Pure Zero-Emission Silent Mode" },
      ],
      description:
        "The powertrain layout optimizes center of mass by positioning the V6 engine low within the wheelbase. The axial-flux electric motor produces instant off-the-line surge while the hot-V turbos provide blistering high-RPM acceleration.",
    },
    aero: {
      title: "Computational Aerodynamic Matrix",
      subtitle: "Active Rear Airbrake Wing & Negative-Pressure Venturi Tunnels",
      specs: [
        { label: "High-Speed Downforce", value: "380 kgf @ 155 MPH in Track Mode" },
        { label: "Airbrake Deployment", value: "0.45 sec Full Angle Incline" },
        { label: "Front Diffusers", value: "Carbon Fiber Underfloor Strakes" },
        { label: "Drag Reduction Mode", value: "Lowers drag by 34% at high speed" },
        { label: "Brake Cooling Ducts", value: "Integrated front bumper vortex air guides" },
        { label: "Thermal Extraction", value: "Rear mesh chimney vents for hot-V turbo heat" },
      ],
      description:
        "Every surface guides airflow with mathematical precision. The active rear wing automatically shifts between downforce generating curve, high-speed low-drag sliver, and full vertical airbrake under heavy deceleration.",
    },
    chassis: {
      title: "Monocoque Carbon Cell Structure",
      subtitle: "Formula 1 Level Structural Integrity & Pushrod Geometry",
      specs: [
        { label: "Tub Material", value: "Ultra-High Modulus Carbon Fiber (CFRP)" },
        { label: "Torsional Stiffness", value: "42,000 Nm per degree deflection" },
        { label: "Suspension Layout", value: "Double Wishbone Pushrod Front & Rear" },
        { label: "Braking System", value: "Carbon Ceramic Discs (390mm / 380mm)" },
        { label: "Curb Weight", value: "1,430 kg (Class-Leading Power-to-Weight)" },
        { label: "Crash Protection", value: "Integrated front & rear aluminum deformation boxes" },
      ],
      description:
        "The monocoque core guarantees extreme rigidity and passenger safety while keeping the total mass minimal. Proactive damper valving reacts within 2 milliseconds to eliminate body roll without compromising high-speed stability.",
    },
    cockpit: {
      title: "Driver-Centric Digital Telemetry",
      subtitle: "Telemetry HUD, Track Overlay, and Ergonomic Command System",
      specs: [
        { label: "Instrument Cluster", value: "12.3-inch High-Definition Floating OLED Display" },
        { label: "Steering Wheel", value: "Integrated Rotary Mode Dials (Comfort/Sport/Apex)" },
        { label: "Seating Position", value: "Fixed Carbon Shell Seats with Adjustable Pedals" },
        { label: "Connectivity", value: "High-Bandwidth 5G Telemetry Cloud Sync" },
        { label: "Track Analysis", value: "Integrated GPS Lap Timer & Video Sector Logging" },
        { label: "Audio Environment", value: "Bespoke 12-Speaker Lightweight Carbon Sound" },
      ],
      description:
        "The cockpit removes all distractions. All primary dynamic controls remain at fingertip reach on the sculpted carbon steering wheel, keeping the driver entirely locked in the flow of motion.",
    },
  };

  const current = content[activeTab];

  return (
    <section
      id="details"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-28 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10 pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>TECHNICAL BENCHMARK</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-outfit text-white">
            ENGINEERING <span className="text-gradient">BLUEPRINT</span>
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Detailed engineering specifications of the AURA architecture. Explore every facet of the vehicle&apos;s mechanical and digital innovation.
          </p>
        </div>

        {/* Interactive Tab Selectors */}
        <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl border border-white/10 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-bold shadow-lg shadow-white/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                SYSTEM DEEP-DIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-outfit text-white">
                {current.title}
              </h3>
              <p className="text-sm font-mono text-slate-400">
                {current.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-2">
                {current.description}
              </p>
            </div>

            {/* Right Specs Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.specs.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-cyan-500/20 transition-colors"
                >
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
                    {item.label}
                  </span>
                  <p className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
