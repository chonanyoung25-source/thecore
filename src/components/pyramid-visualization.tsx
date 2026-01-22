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
  
  const pyramidApexY = 10;
  const pyramidBaseY = 280;
  const pyramidHeight = pyramidBaseY - pyramidApexY;

  const renderLevels = () => {
    const depthFactor = 0.8;
    const yOffset = 8;

    // We render slabs for the top 4 levels. The 5th level is the base.
    return levels.slice(0, 4).map((level, i) => {
      const yFront = pyramidApexY + pyramidHeight * (level.yPercent / 100);
      const yBack = yFront - yOffset;
      
      const tFront = (yFront - pyramidApexY) / pyramidHeight;
      const xFrontL = 200 * (1 - tFront) + 20 * tFront;
      const xFrontR = 200 * (1 - tFront) + 380 * tFront;
      
      const frontWidth = xFrontR - xFrontL;
      const backWidth = frontWidth * depthFactor;
      
      const xBackL = 200 - (backWidth / 2);
      const xBackR = 200 + (backWidth / 2);

      return (
        <g key={`level-${i}`}>
          {/* Top surface of the slab */}
          <line x1={xFrontL} y1={yFront} x2={xFrontR} y2={yFront} /> {/* Front edge */}
          <line x1={xBackL} y1={yBack} x2={xBackR} y2={yBack} /> {/* Back edge */}
          <line x1={xFrontL} y1={yFront} x2={xBackL} y2={yBack} /> {/* Left side edge */}
          <line x1={xFrontR} y1={yFront} x2={xBackR} y2={yBack} /> {/* Right side edge */}
        </g>
      );
    });
  }

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
          points={`200,${pyramidApexY} 20,${pyramidBaseY} 200,${pyramidBaseY}`}
          fill="url(#pyramid-gradient-left)"
        />
        {/* Right Face (lighter) */}
        <polygon
          points={`200,${pyramidApexY} 380,${pyramidBaseY} 200,${pyramidBaseY}`}
          fill="url(#pyramid-gradient-right)"
          className="pyramid-front-face"
        />

        {/* Wireframe and Layers */}
        <g stroke="hsl(var(--primary) / 0.9)" strokeWidth="1.5" fill="none" filter="url(#glow)">
          {/* Edges */}
          <line x1="200" y1={pyramidApexY} x2="20" y2={pyramidBaseY} />
          <line x1="200" y1={pyramidApexY} x2="380" y2={pyramidBaseY} />
          <line x1="20" y1={pyramidBaseY} x2="380" y2={pyramidBaseY} />
          <line x1="200" y1={pyramidApexY} x2="200" y2={pyramidBaseY} />

          {/* Render the 3D levels */}
          {renderLevels()}
        </g>
      </svg>
      <div className="pyramid-labels">
        {levels.map((level) => {
           const visualY = pyramidApexY + (pyramidHeight * level.yPercent) / 100;
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
