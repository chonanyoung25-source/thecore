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

  const pyramidHeight = 270;
  const pyramidApexY = 10;
  const numLevels = 5;

  return (
    <div className="pyramid-container">
      <svg
        viewBox="0 0 400 350"
        className="pyramid-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pyramid-gradient-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Front Face */}
        <polygon
          points="200,10 20,280 380,280"
          fill="url(#pyramid-gradient-front)"
          className="pyramid-front-face"
        />

        {/* Wireframe and Layers */}
        <g stroke="hsl(var(--primary) / 0.9)" strokeWidth="1.5" fill="none" filter="url(#glow)">
          {/* Edges */}
          <line x1="200" y1="10" x2="20" y2="280" />
          <line x1="200" y1="10" x2="380" y2="280" />
          <line x1="20" y1="280" x2="380" y2="280" strokeWidth="2.5" />

          {/* Horizontal lines to create levels */}
          {Array.from({ length: numLevels - 1 }).map((_, i) => {
            const y = pyramidApexY + (pyramidHeight / numLevels) * (i + 1);
            const progress = (y - pyramidApexY) / pyramidHeight;
            const halfWidth = 180 * progress;
            const x1 = 200 - halfWidth;
            const x2 = 200 + halfWidth;
            return <line key={i} x1={x1} y1={y} x2={x2} y2={y} strokeWidth="1" />;
          })}
        </g>
      </svg>
      <div className="pyramid-labels">
        {levels.map((level) => {
           const y = 10 + (270 * level.yPercent) / 100;
           return (
             <div
              key={level.name}
              className="pyramid-label"
              style={{ top: `${y * 100 / 350}%`}}
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
