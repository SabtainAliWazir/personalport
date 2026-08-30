import React from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tight isolate select-none max-w-full overflow-hidden ${className}`}>
      {/* Main Animated Luminous Gradient */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#3BFFB9] via-[#00E5FF] via-[#818CF8] to-white bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for solid white specular text */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 opacity-60"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      {/* Ambient Blur Glow Effect */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#3BFFB9] via-[#00E5FF] to-[#3BFFB9] bg-[length:200%_auto] bg-clip-text text-transparent blur-md sm:blur-xl md:blur-2xl opacity-35"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GlitchText;
