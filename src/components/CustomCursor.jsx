import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 24, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      if (!target) return;
      
      const card = target.closest('[data-cursor-view="true"]');
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('input') || 
                        target.closest('textarea') || 
                        target.closest('[data-hover="true"]');
      
      if (card) {
        setIsHovering(true);
        setCursorText('VIEW');
      } else if (clickable) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ width: 48, height: 48 }}
        animate={{
          scale: isHovering ? (cursorText ? 1.8 : 1.3) : 0.45, 
        }}
        transition={{ type: "spring", stiffness: 340, damping: 25 }}
      >
        {cursorText && (
          <motion.span 
            className="z-10 text-black font-heading font-black uppercase tracking-widest text-[10px] overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
