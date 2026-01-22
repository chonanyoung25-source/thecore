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

    let rotation = 0;

    const render = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const lineCount = 60;
      const baseRadius = Math.min(width, height) * 0.1;
      const spacing = 2.5;

      ctx.shadowColor = 'hsl(175, 100%, 70%)';
      ctx.shadowBlur = 15;
      
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const currentRadius = baseRadius + i * spacing;
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        
        // Create a pulsing ripple effect
        const opacity = (Math.sin(i * 0.2 - rotation) + 1) / 2 * 0.5 + 0.1;
        ctx.strokeStyle = `hsla(175, 100%, 70%, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
      rotation += 0.03;
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
