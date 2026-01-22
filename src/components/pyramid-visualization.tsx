'use client';

import React from 'react';

const PyramidVisualization = () => {
  const levels = [
    { name: 'Purpose', yPercent: 12 },
    { name: 'Market', yPercent: 30 },
    { name: 'Brand', yPercent: 48 },
    { name: 'Service', yPercent: 66 },
    { name: 'Ecosystem', yPercent: 84 },
  ];

  return (
    <div className="pyramid-container">
      <svg
        viewBox="0 0 400 350"
        className="pyramid-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pyramid-gradient-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="pyramid-gradient-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Face (darker) */}
        <polygon
          points="200,10 20,200 200,280"
          fill="url(#pyramid-gradient-left)"
        />
        {/* Right Face (lighter) */}
        <polygon
          points="200,10 380,200 200,280"
          fill="url(#pyramid-gradient-right)"
          className="pyramid-front-face"
        />

        {/* Wireframe and Layers */}
        <g stroke="hsl(var(--primary) / 0.9)" strokeWidth="1.5" fill="none" filter="url(#glow)">
          {/* Edges */}
          <line x1="200" y1="10" x2="20" y2="200" />
          <line x1="200" y1="10" x2="380" y2="200" />
          <line x1="20" y1="200" x2="200" y2="280" />
          <line x1="380" y1="200" x2="200" y2="280" />
          <line x1="200" y1="10" x2="200" y2="280" />
        </g>
      </svg>
      <div className="pyramid-labels">
        {levels.map((level) => {
           // Adjust y-positioning to be relative to the new 3D perspective height
           const visualY = 10 + (270 * level.yPercent) / 100;
           return (
             <div
              key={level.name}
              className="pyramid-label"
              style={{ top: `${visualY * 100 / 350}%`}}
            >
              <span>{level.name}</span>
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default PyramidVisualization;
