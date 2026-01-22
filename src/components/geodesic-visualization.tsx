"use client";

import { useEffect, useState } from 'react';

type Particle = {
  id: number;
  transform: string;
  animationDelay: string;
}

const GeodesicVisualization = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // This code runs only on the client, after hydration, to avoid mismatches
    const numParticles = 200;
    const generatedParticles = Array.from({ length: numParticles }).map((_, i) => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 220;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      return {
        id: i,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        animationDelay: `${Math.random() * 5}s`
      }
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="geodesic-container">
      {/* Geodesic Wireframe */}
      <div className="geodesic-sphere-wireframe">
        {/* Vertical Rings */}
        {Array.from({ length: 12 }).map((_, i) => (
           <div key={`v-ring-${i}`} className="geodesic-ring" style={{ transform: `rotateY(${i * 15}deg)` }}></div>
        ))}
        {/* Horizontal Rings */}
        {Array.from({ length: 5 }).map((_, i) => (
           <div key={`h-ring-${i}`} className="geodesic-ring" style={{ transform: `rotateX(90deg) scale(${Math.sin(( (i + 1) / 6) * Math.PI)})` }}></div>
        ))}
      </div>
      
      {/* Particles */}
      <div className="geodesic-sphere-particles">
        {particles.map(p => (
           <div key={p.id} className="geodesic-particle" style={{ transform: p.transform, animationDelay: p.animationDelay }} />
        ))}
      </div>
    </div>
  );
};

export default GeodesicVisualization;
