import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white will-change-[opacity,transform]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{
            opacity: [star.opacity, 0.8, star.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden w-full h-full max-w-[100vw] bg-[#06070a] pointer-events-none"
      style={{ contain: 'strict' }}
    >
      {/* Background Subtle Gradient Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      <StarField />

      {/* Blob 1: Luminous Bioluminescent Mint - Contained on mobile */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[60vw] md:w-[75vw] h-[60vw] md:h-[75vw] bg-[#00F5A0] rounded-full mix-blend-screen filter blur-[80px] md:blur-[140px] opacity-[0.14] will-change-transform"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: High-Voltage Cyber Cyan */}
      <motion.div
        className="absolute top-[30%] right-[-5%] w-[65vw] md:w-[80vw] h-[65vw] md:h-[75vw] bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[80px] md:blur-[150px] opacity-[0.11] will-change-transform"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Deep Royal Sapphire Aura */}
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[60vw] md:w-[70vw] h-[60vw] md:h-[70vw] bg-[#4F46E5] rounded-full mix-blend-screen filter blur-[80px] md:blur-[160px] opacity-[0.12] will-change-transform"
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Tactile Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#06070a]/40 to-[#06070a]/90 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
