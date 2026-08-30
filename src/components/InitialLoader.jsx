import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_LOGS = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'CONNECTING GLOBAL HEALTH MODULES (WHO / WOAH)...',
  'CONFIGURING REAL-TIME WEBSOCKET PIPELINE...',
  'OPTIMIZING CLIENT SYSTEMS...',
  'READY // WELCOME TO SABTAIN.ALI'
];

const InitialLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
          return 100;
        }
        // Organic pacing
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + increment, 100);
        
        // Advance status log based on progress thresholds
        if (next > 80) setLogIndex(4);
        else if (next > 60) setLogIndex(3);
        else if (next > 40) setLogIndex(2);
        else if (next > 20) setLogIndex(1);
        
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#06070a] flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#00F5A0]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-400 tracking-widest uppercase z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3BFFB9] animate-ping" />
          <span className="text-white font-bold">SYSTEM BOOT</span>
        </div>
        <span className="text-[#3BFFB9] font-bold">SABTAIN.ALI // 2026</span>
      </div>

      {/* Centerpiece: Brand Monogram & Huge Progress Counter */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-10">
        {/* Monogram */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md"
        >
          <span className="font-heading text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#3BFFB9] to-[#00E5FF]">
            SA
          </span>
        </motion.div>

        {/* Massive Tabular Progress Number */}
        <div className="font-heading text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white flex items-baseline justify-center">
          <span>{String(progress).padStart(2, '0')}</span>
          <span className="text-xl sm:text-3xl md:text-4xl text-[#3BFFB9] ml-1 font-mono">%</span>
        </div>

        {/* Dynamic Status Log */}
        <p className="font-mono text-xs sm:text-sm text-slate-400 mt-4 sm:mt-6 uppercase tracking-wider h-6 flex items-center justify-center">
          <span className="text-[#3BFFB9] mr-2">▶</span> {SYSTEM_LOGS[logIndex]}
        </p>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xl mx-auto z-10">
        <div className="w-full h-1 sm:h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.08] p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3BFFB9] via-[#00E5FF] to-white rounded-full shadow-[0_0_15px_rgba(59,255,185,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-3">
          <span>LATENCY: 12ms</span>
          <span>ENTERPRISE ARCHITECTURE</span>
          <span>STABLE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
