import React from 'react';

export default function GlareCard({
  src,
  alt,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  children
}) {
  return (
    <div className={`glare-hover group relative overflow-hidden rounded-sm sm:rounded-md border border-[#f8f5ee]/12 bg-[#1a120b] shadow-xl ${className}`}>
      {/* Glare Sheen Overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(-30deg, transparent 55%, rgba(248, 245, 238, 0.22) 70%, transparent 85%)',
          backgroundSize: '260% 260%'
        }}
      />

      {/* Project Image */}
      {src && (
        <img
          src={src}
          alt={alt || 'Project preview'}
          loading="lazy"
          className={`w-full ${aspectRatio} object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      {/* Subtle depth gradient */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#100904]/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
