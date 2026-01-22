'use client';

import { useEffect, useRef } from 'react';

const SwirlVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    let rotation = Math.PI / 2;

    const render = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const lineCount = 60;
      const radius = Math.min(width, height) * 0.35;
      const spacing = 1.2;
      const tilt = -0.5;

      ctx.shadowColor = 'hsl(160, 100%, 45%)';
      ctx.shadowBlur = 20;
      
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const currentRadius = radius + i * spacing;
        
        for (let angle = 0; angle <= Math.PI * 2.01; angle += 0.05) {
          const wave = Math.sin(angle * 4 + rotation) * 25;

          // 3D point on a flat, wavy circle
          let x = currentRadius * Math.cos(angle);
          let y = wave;
          let z = currentRadius * Math.sin(angle);

          // Tilt it on its side
          let tiltedY = y * cosTilt - z * sinTilt;
          let tiltedZ = y * sinTilt + z * cosTilt;
          
          // Project to 2D
          const perspective = 400;
          const scale = perspective / (perspective + tiltedZ);
          const projX = x * scale;
          const projY = tiltedY * scale;

          if (angle === 0) {
            ctx.moveTo(projX, projY);
          } else {
            ctx.lineTo(projX, projY);
          }
        }
        ctx.strokeStyle = `hsla(175, 100%, 70%, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
      rotation += 0.008;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-[500px] h-[500px] opacity-70">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SwirlVisualization;
