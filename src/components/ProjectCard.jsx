import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const domainName = project.link ? project.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'app.io';

  return (
    <motion.div
      onClick={onClick}
      className="group relative min-h-[440px] sm:min-h-[480px] md:h-[540px] w-full max-w-full overflow-hidden bg-[#0c0e17] border border-white/[0.08] hover:border-[#3BFFB9]/50 rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-[0_0_35px_rgba(59,255,185,0.14)] flex flex-col justify-between p-4 sm:p-6 md:p-7 will-change-transform"
      data-cursor-view="true"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Subtle Specular Top Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />

      {/* Header Info */}
      <div className="flex justify-between items-center z-10 gap-2">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#3BFFB9] bg-[#3BFFB9]/10 border border-[#3BFFB9]/30 px-3 py-1 rounded-full backdrop-blur-md truncate max-w-[200px] sm:max-w-none">
          {project.category}
        </span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#3BFFB9] group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-lg shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Centerpiece: Minimalist Browser Frame Mockup */}
      <div className="relative my-3 sm:my-4 flex-1 w-full rounded-xl overflow-hidden bg-[#040508] border border-white/10 shadow-2xl flex flex-col group-hover:border-white/20 transition-colors duration-500 min-h-[190px]">
        {/* Browser Topbar */}
        <div className="h-6 sm:h-7 bg-white/[0.03] border-b border-white/[0.06] px-3 sm:px-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/60" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.05] px-2 sm:px-3 py-0.5 rounded-md truncate max-w-[130px] sm:max-w-[170px]">
            {domainName}
          </div>
          <div className="w-6 sm:w-8 shrink-0" />
        </div>

        {/* Screenshot Container with Silky 1.04x Scale & Ambient Scrim */}
        <div className="relative flex-1 overflow-hidden bg-[#07090e] flex items-center justify-center">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 will-change-transform"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.04 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-transparent to-transparent opacity-85 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="z-10 pt-1">
        <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase text-white tracking-tight group-hover:text-[#3BFFB9] transition-colors duration-300 leading-tight">
          {project.title}
        </h3>
        <p className="font-mono text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider truncate">
          {project.subtitle || 'Production Architecture →'}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
