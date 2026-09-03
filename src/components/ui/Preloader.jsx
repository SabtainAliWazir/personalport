import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'Full-Stack Architecture',
  'WHO Data Pipelines',
  'Real-Time WebSockets',
  'Autonomous AI Agents',
  'Core Web Vitals 99+'
];

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Counter progress
  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Word cycle
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 500);

    return () => clearInterval(wordTimer);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#100904] text-[#f8f5ee]"
        >
          {/* 5-column curtain overlay for clean exit */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                exit={{
                  y: '-100%',
                  transition: { duration: 0.6, delay: i * 0.04, ease: [0.76, 0, 0.24, 1] }
                }}
                className="h-full w-full bg-[#100904] border-r border-[#f8f5ee]/5"
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* 3x3 Staggered Pulsing Boxes (Webroco Exact Motif) */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((box) => (
                <span
                  key={box}
                  className="preloader-box block h-2.5 w-2.5 rounded-sm"
                  style={{ animationDelay: `${box * 90}ms` }}
                />
              ))}
            </div>

            {/* Central Typography Logo */}
            <div className="text-center">
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-[#f8f5ee]">
                sabtain<span className="text-[#e85a2d]">.</span>
              </h2>
            </div>

            {/* Rotating Technical Specialties */}
            <div className="relative mt-5 h-6 w-80 text-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute inset-x-0 font-mono text-xs uppercase tracking-[0.14em] text-[#f8f5ee]/45"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Right Percentage Display */}
          <div className="absolute bottom-6 right-6 font-mono text-xs tracking-[0.1em] text-[#f8f5ee]/30 tabular-nums">
            {percent}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
