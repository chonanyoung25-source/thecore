'use client';

import { useRef, useEffect } from 'react';

const WavyLinesVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const opts = {
      lineCount: 80,
      waveAmplitude: 150,
      waveLength: 0.3,
      waveSpeed: 0.02,
      xSpacing: 1,
      ySpacing: 12,
      baseHue: 180,
      hueVariation: 40,
      glow: 10,
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

    const drawStars = () => {
        ctx.save();
        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            const radius = Math.random() * 1.2;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
            ctx.fill();
        }
        ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      frame += opts.waveSpeed;

      drawGrid();
      
      ctx.save();
      ctx.shadowBlur = opts.glow;

      for (let i = 0; i < opts.lineCount; i++) {
        ctx.beginPath();
        const hue = opts.baseHue + (i / opts.lineCount) * opts.hueVariation;
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${0.3 + (i / opts.lineCount) * 0.7})`;
        ctx.shadowColor = `hsla(${hue}, 70%, 60%, 1)`;

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
      requestAnimationFrame(loop);
    }
    
    drawStars();
    loop();

    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 -z-0" />;
};

export default WavyLinesVisualization;
