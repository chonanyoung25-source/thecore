'use client';

import { useEffect, useState } from 'react';

type Particle = {
  id: number;
  transform: string;
  animationDelay: string;
};

const GeodesicVisualization = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const numParticles = 200;
    const radius = 225; // A bit smaller than the container
    const generatedParticles = Array.from({ length: numParticles }).map(
      (_, i) => {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return {
          id: i,
          transform: `translate3d(${x}px, ${y}px, ${z}px)`,
          animationDelay: `${Math.random() * 5}s`,
        };
      }
    );
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="geodesic-container">
      <div className="geodesic-sphere">
        {/* Rings on 3 axes to create a dense mesh */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`ring-y-${i}`}
            className="geodesic-ring"
            style={{ transform: `rotateY(${i * 15}deg)` }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`ring-x-${i}`}
            className="geodesic-ring"
            style={{ transform: `rotateX(${i * 15}deg)` }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`ring-z-${i}`}
            className="geodesic-ring"
            style={{ transform: `rotateZ(${i * 15}deg)` }}
          />
        ))}

        {/* Particles (nodes) */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="geodesic-particle"
            style={{
              transform: p.transform,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GeodesicVisualization;
