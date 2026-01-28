'use client';

import { useRef, useEffect } from 'react';

const WavyLinesVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;
    let animationId: number;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const opts = {
      lineCount: 50, // Reduced from 80
      waveAmplitude: 150,
      waveLength: 0.3,
      waveSpeed: 0.02,
      xSpacing: 2, // Increased from 1 for better performance
      ySpacing: 12,
      baseHue: 180, // Original cyan/turquoise color
      hueVariation: 40,
      glow: 15, // Increased for more visibility
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    // Pre-generate stars once instead of every frame
    const stars: Array<{ x: number, y: number, radius: number, opacity: number }> = [];
    const numStars = 100; // Reduced from 200
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const drawStars = () => {
      ctx.save();
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      ctx.restore();
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      frame += opts.waveSpeed;

      drawGrid();
      drawStars();

      ctx.save();
      ctx.shadowBlur = opts.glow;

      for (let i = 0; i < opts.lineCount; i++) {
        ctx.beginPath();
        const hue = opts.baseHue + (i / opts.lineCount) * opts.hueVariation;
        ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${0.4 + (i / opts.lineCount) * 0.6})`; // Increased saturation and lightness for visibility
        ctx.shadowColor = `hsla(${hue}, 80%, 65%, 1)`;

        let yOffset = h * 0.45 + i * opts.ySpacing;

        for (let x = -10; x < w + 10; x += opts.xSpacing) {
          const progress = x / w;
          const amplitudeFactor = Math.sin(progress * Math.PI); // Fades out at the edges
          const y =
            yOffset +
            Math.sin(x * (opts.waveLength / 1000) + frame + i * 0.05) * opts.waveAmplitude * amplitudeFactor +
            Math.cos(x * 0.0005 + frame * 0.5) * (opts.waveAmplitude * 0.3) * amplitudeFactor;

          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.restore();
      animationId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 -z-0" style={{ willChange: 'transform' }} />;
};

export default WavyLinesVisualization;
