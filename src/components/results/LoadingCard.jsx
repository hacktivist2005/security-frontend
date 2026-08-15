import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCAN_STEPS = [
  "Resolving DNS & Routing...",
  "Querying WHOIS Registers...",
  "Analyzing SSL/TLS Certificates...",
  "Checking IP Threat Blacklists...",
  "Scanning Port Vulnerabilities...",
];

export default function LoadingCard() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : 0));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md mx-auto my-6 p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/20 shadow-[0_0_50px_-15px_rgba(16,185,129,0.2)] backdrop-blur-xl text-emerald-400 font-sans overflow-hidden"
    >
      {/* Background Subtle Cyber Mesh */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
          backgroundSize: `16px 16px`,
        }}
      />

      <div className="relative z-10 flex items-center gap-5">
        
        {/* --- COMPACT HUD RADAR SPINNER --- */}
        <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

          {/* Outer Dashed Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-emerald-500/40"
          />

          {/* Inner Reverse Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-1.5 rounded-full border border-transparent border-t-emerald-400 border-b-teal-500/40"
          />

          {/* Radar Sweeping Core */}
          <div className="relative w-11 h-11 rounded-full border border-emerald-500/30 bg-emerald-950/40 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.5)_360deg)] origin-center"
            />
            {/* Pulsing Core Dot */}
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping z-10 shadow-[0_0_8px_#34d399]" />
          </div>
        </div>

        {/* --- CONTENT & STATUS --- */}
        <div className="flex-1 min-w-0 text-left">
          {/* Active Tag */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider text-emerald-300 uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Analyzing Target
          </div>

          {/* Dynamic Changing Status */}
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-semibold text-slate-200 truncate font-mono"
              >
                {SCAN_STEPS[currentStep]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Compact Mini Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_#10b981]"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep + 1) / SCAN_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}