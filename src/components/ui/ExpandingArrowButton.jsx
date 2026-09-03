import React from 'react';
import { useRouter } from '../../router/RouterContext';

export default function ExpandingArrowButton({
  href,
  onClick,
  children = 'Start a project',
  className = '',
  accentColor = '#e85a2d'
}) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`ea-btn select-none group ${className}`}
      style={{
        '--c-ember': accentColor,
      }}
    >
      {/* Sliding Expanding Icon Box */}
      <span aria-hidden="true" className="ea-tile">
        {/* Resting Single Icon */}
        <span className="ea-rest">
          <svg viewBox="0 0 20 28" fill="none" aria-hidden="true" className="h-6 w-4">
            <circle cx="4" cy="4" r="2" fill="currentColor" />
            <circle cx="10" cy="9" r="2" fill="currentColor" />
            <circle cx="16" cy="14" r="2" fill="currentColor" />
            <circle cx="10" cy="19" r="2" fill="currentColor" />
            <circle cx="4" cy="24" r="2" fill="currentColor" />
          </svg>
        </span>

        {/* Hover Chevron Trail Animation */}
        <span className="ea-trail">
          {[0, 1, 2, 3, 4].map((idx) => (
            <span
              key={idx}
              className="ea-chevron"
              style={{
                color: idx === 0 ? 'rgb(255 237 215 / 1)' : `rgb(255 237 215 / ${0.8 - idx * 0.16})`
              }}
            >
              <svg viewBox="0 0 20 28" fill="none" aria-hidden="true" className="h-6 w-4">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <circle cx="10" cy="9" r="2" fill="currentColor" />
                <circle cx="16" cy="14" r="2" fill="currentColor" />
                <circle cx="10" cy="19" r="2" fill="currentColor" />
                <circle cx="4" cy="24" r="2" fill="currentColor" />
              </svg>
            </span>
          ))}
        </span>
      </span>

      {/* Label Text */}
      <span className="ea-label">
        {children}
      </span>
    </button>
  );
}
