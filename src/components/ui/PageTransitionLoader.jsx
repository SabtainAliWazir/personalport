import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '../../router/RouterContext';

const PAGE_NAMES = {
  home: 'System Architecture & Solutions',
  portfolio: 'Selected Works & Case Studies',
  'case-study': 'Engineering Deep Dive',
  services: 'Capabilities & Deliverables',
  about: 'Engineering Biography & Discipline',
  contact: 'Start Your Engagement'
};

export default function PageTransitionLoader() {
  const { currentPath, page } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('System Architecture');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Trigger smooth upward transition on page path change
  useEffect(() => {
    // Determine title for the destination page
    const title = PAGE_NAMES[page] || 'System Architecture';
    setDisplayTitle(title);

    // Trigger transition
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      if (isFirstLoad) setIsFirstLoad(false);
    }, isFirstLoad ? 1200 : 650);

    return () => clearTimeout(timer);
  }, [currentPath, page]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex flex-col justify-end">
          
          {/* 3-Layer Staggered Upward Architectural Slats */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {/* Slat 1: Accent Ember Glow Line */}
            <motion.div
              initial={{ y: '0%' }}
              exit={{ 
                y: '-100%', 
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
              }}
              className="absolute inset-0 bg-[#e85a2d]/10 z-10"
            />

            {/* Slat 2: Main Obsidian Stage Panel */}
            <motion.div
              initial={{ y: '0%' }}
              exit={{ 
                y: '-100%', 
                transition: { duration: 0.65, delay: 0.05, ease: [0.76, 0, 0.24, 1] } 
              }}
              className="absolute inset-0 bg-[#0d0804] border-b border-[#e85a2d]/40 shadow-[0_2rem_6rem_rgba(0,0,0,0.9)] z-20 flex flex-col items-center justify-center text-[#f8f5ee]"
            >
              {/* Subtle Atmospheric Radial Glow */}
              <div 
                className="pointer-events-none absolute size-96 rounded-full bg-[#e85a2d]/10 blur-[120px]" 
                aria-hidden="true" 
              />

              {/* Minimal Brand Mark & Destination Indicator */}
              <div className="relative z-30 flex flex-col items-center text-center px-4 space-y-4">
                
                {/* 3 Kinetic Pulsing Dot Bars */}
                <div className="flex items-center gap-1.5 mb-2">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{
                        scaleY: [1, 2.2, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: 'easeInOut'
                      }}
                      className="w-1 h-3 rounded-full bg-[#e85a2d]"
                    />
                  ))}
                </div>

                {/* Signature Brand Logo */}
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-[#f8f5ee]">
                  sabtain<span className="text-[#e85a2d]">.</span>
                </h2>

                {/* Animated Destination Page Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#f8f5ee]/50"
                >
                  <span className="size-1.5 rounded-full bg-[#e85a2d] animate-pulse" />
                  <span>{displayTitle}</span>
                </motion.div>

                {/* Micro Progress Track */}
                <div className="w-36 h-[2px] rounded-full bg-white/10 overflow-hidden mt-3">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.75,
                      ease: 'easeInOut'
                    }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-[#e85a2d] to-transparent"
                  />
                </div>
              </div>

              {/* Bottom Right HUD Status */}
              <div className="absolute bottom-6 right-6 font-mono text-[0.65rem] text-[#f8f5ee]/30 tracking-widest uppercase hidden sm:block">
                <span>[ 60 FPS Architectural Wipe ]</span>
              </div>
            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
