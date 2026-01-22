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
          <linearGradient id="pyramid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.4 }} />
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

        {/* Base reflection */}
        <polygon
          points="20,282 380,282 300,312 100,312"
          fill="hsl(var(--primary) / 0.05)"
        />

        {/* Main Pyramid Structure */}
        <polygon
          points="200,10 20,280 380,280"
          fill="url(#pyramid-gradient)"
          className="pyramid-front-face"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
        />

        {/* Wireframe and Layers */}
        <g stroke="hsl(var(--primary) / 0.9)" strokeWidth="1.5" fill="none" filter="url(#glow)">
          {/* Edges */}
          <line x1="200" y1="10" x2="20" y2="280" />
          <line x1="200" y1="10" x2="380" y2="280" />
          <line x1="20" y1="280" x2="380" y2="280" strokeWidth="2.5" />
          
          {/* Base perspective lines */}
          <line x1="20" y1="280" x2="100" y2="310" strokeOpacity="0.5"/>
          <line x1="380" y1="280" x2="300" y2="310" strokeOpacity="0.5"/>
          <line x1="100" y1="310" x2="300" y2="310" strokeOpacity="0.5"/>

          {/* Horizontal Layers */}
          {levels.map((level) => {
            const y = 10 + (270 * level.yPercent) / 100;
            const width = 360 * (1 - (level.yPercent / 100));
            const x1 = 200 - width / 2;
            const x2 = 200 + width / 2;
            
            return (
                <g key={level.name}>
                    <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth="2" />
                </g>
             )
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
