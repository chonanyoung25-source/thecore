"use client";

import { useEffect, useState } from 'react';

type Star = {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
};

const DynamicBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const numStars = 60; // Reduced from 100 for better performance
    const generatedStars = Array.from({ length: numStars }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1, // 1px to 3px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 1}s`, // 1s to 3s
      animationDelay: `${Math.random() * 3}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-bg absolute rounded-full bg-foreground"
          style={
            {
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default DynamicBackground;
