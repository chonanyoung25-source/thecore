'use client';

import { useEffect, useRef } from 'react';

interface AnimatedConnectionProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

const AnimatedConnection = ({ startX, startY, endX, endY }: AnimatedConnectionProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: Array<{
            x: number;
            y: number;
            progress: number;
            speed: number;
            opacity: number;
        }> = [];

        // Create particles
        const numParticles = 15;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: startX,
                y: startY,
                progress: Math.random(),
                speed: 0.002 + Math.random() * 0.003,
                opacity: 0.3 + Math.random() * 0.7,
            });
        }

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw main dotted line
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw and update particles
            particles.forEach((particle) => {
                particle.progress += particle.speed;
                if (particle.progress > 1) {
                    particle.progress = 0;
                }

                particle.x = startX + (endX - startX) * particle.progress;
                particle.y = startY + (endY - startY) * particle.progress;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
                ctx.fill();

                // Draw trail
                const trailLength = 20;
                for (let i = 1; i < trailLength; i++) {
                    const trailProgress = particle.progress - (i * 0.01);
                    if (trailProgress < 0) continue;

                    const trailX = startX + (endX - startX) * trailProgress;
                    const trailY = startY + (endY - startY) * trailProgress;
                    const trailOpacity = particle.opacity * (1 - i / trailLength);

                    ctx.beginPath();
                    ctx.arc(trailX, trailY, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(168, 85, 247, ${trailOpacity})`;
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [startX, startY, endX, endY]);

    return (
        <canvas
            ref={canvasRef}
            width={Math.abs(endX - startX) + 50}
            height={Math.abs(endY - startY) + 50}
            className="absolute pointer-events-none"
            style={{
                left: Math.min(startX, endX) - 25,
                top: Math.min(startY, endY) - 25,
            }}
        />
    );
};

export default AnimatedConnection;
