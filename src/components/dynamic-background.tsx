"use client";

import { useEffect, useState } from 'react';

type Atom = {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  tx: number;
  ty: number;
};

const DynamicBackground = () => {
  const [atoms, setAtoms] = useState<Atom[]>([]);

  useEffect(() => {
    const numAtoms = 25;
    const generatedAtoms = Array.from({ length: numAtoms }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 20, // 20px to 100px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 20}s`, // 20s to 40s
      animationDelay: `-${Math.random() * 20}s`,
      tx: (Math.random() - 0.5) * 150,
      ty: (Math.random() - 0.5) * 150,
    }));
    setAtoms(generatedAtoms);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {atoms.map((atom) => (
        <div
          key={atom.id}
          className="atom absolute rounded-full bg-primary/10"
          style={
            {
              width: atom.size,
              height: atom.size,
              left: atom.left,
              top: atom.top,
              animationDuration: atom.animationDuration,
              animationDelay: atom.animationDelay,
              '--tx': atom.tx,
              '--ty': atom.ty,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default DynamicBackground;
