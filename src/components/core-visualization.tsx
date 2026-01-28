"use client";

import { useEffect, useState } from 'react';

type Particle = {
  id: number;
  transform: string;
  animationDelay: string;
}

const CoreVisualization = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // This code runs only on the client, after hydration, to avoid mismatches
    const numParticles = 30; // Reduced from 50 for better performance
    const generatedParticles = Array.from({ length: numParticles }).map((_, i) => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 220; // slightly less than geo-sphere radius
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        id: i,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        animationDelay: `${Math.random() * 4}s`
      }
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="visualization-container">
      <div className="core-sphere"></div>

      {/* Geodesic Wireframe */}
      <div className="geo-sphere">
        {/* Vertical Rings */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v-ring-${i}`} className="geo-ring" style={{ transform: `rotateY(${i * 15}deg)` }}></div>
        ))}
        {/* Horizontal Rings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`h-ring-${i}`} className="geo-ring" style={{ transform: `rotateX(90deg) rotateY(${i * 36}deg) scale(${Math.sin(((i + 1) / 6) * Math.PI)})` }}></div>
        ))}

        {/* Particles */}
        {particles.map(p => (
          <div key={p.id} className="particle" style={{ transform: p.transform, animationDelay: p.animationDelay }} />
        ))}
      </div>

      {/* Orbits and Satellites */}
      <div className="orbit-path orbit-1">
        <div className="satellite satellite-1" />
      </div>
      <div className="orbit-path orbit-2">
        <div className="satellite satellite-2" />
      </div>
      <div className="orbit-path orbit-3">
        <div className="satellite satellite-3" />
      </div>
    </div>
  );
};

export default CoreVisualization;
