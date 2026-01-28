'use client';

import { useEffect, useRef } from 'react';

interface ConnectionLinesProps {
    centerX: number;
    centerY: number;
    cards: Array<{ x: number; y: number }>;
}

const ConnectionLines = ({ centerX, centerY, cards }: ConnectionLinesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const lines: Array<{
            startX: number;
            startY: number;
            endX: number;
            endY: number;
            progress: number;
            speed: number;
            color: string;
            opacity: number;
            offset: number;
        }> = [];

        // Create multiple curved lines for each card
        cards.forEach((card) => {
            const numLines = 30; // Number of lines per card

            // Calculate direction from card to center
            const dx = centerX - card.x;
            const dy = centerY - card.y;
            const angle = Math.atan2(dy, dx);

            // Card size is 64px, so radius is 32px
            const cardRadius = 32;

            // Start point at edge of card (facing center)
            const startX = card.x + Math.cos(angle) * cardRadius;
            const startY = card.y + Math.sin(angle) * cardRadius;

            for (let i = 0; i < numLines; i++) {
                const hue = 180 + Math.random() * 100; // Cyan to purple range
                // Increase offset range for more dramatic curves
                const offsetMultiplier = 1 + Math.random() * 2; // 1x to 3x multiplier
                lines.push({
                    startX: startX,
                    startY: startY,
                    endX: centerX,
                    endY: centerY,
                    progress: Math.random(),
                    speed: 0.001 + Math.random() * 0.002,
                    color: `hsl(${hue}, 85%, 70%)`, // Increased saturation to 85% and lightness to 70%
                    opacity: 0.4 + Math.random() * 0.6, // Increased minimum opacity from 0.2 to 0.4
                    offset: (Math.random() - 0.5) * 300 * offsetMultiplier,
                });
            }
        });

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lines.forEach((line) => {
                line.progress += line.speed;
                if (line.progress > 1) {
                    line.progress = 0;
                }

                // Draw curved line with bezier curve
                ctx.beginPath();
                ctx.strokeStyle = line.color.replace(')', `, ${line.opacity * 0.5})`).replace('hsl', 'hsla'); // Increased from 0.3 to 0.5
                ctx.lineWidth = 1.5; // Increased from 1 for thicker, more visible lines

                const controlX = (line.startX + line.endX) / 2 + line.offset;
                const controlY = (line.startY + line.endY) / 2 + line.offset;

                ctx.moveTo(line.startX, line.startY);
                ctx.quadraticCurveTo(controlX, controlY, line.endX, line.endY);
                ctx.stroke();

                // Draw animated particles along the curve
                const t = line.progress;
                const x = Math.pow(1 - t, 2) * line.startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * line.endX;
                const y = Math.pow(1 - t, 2) * line.startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * line.endY;

                // Draw particle
                ctx.beginPath();
                ctx.arc(x, y, 2.5, 0, Math.PI * 2); // Increased size from 2 to 2.5
                ctx.fillStyle = line.color.replace(')', `, ${line.opacity})`).replace('hsl', 'hsla');
                ctx.fill();

                // Draw glow
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2); // Increased glow radius from 4 to 5
                ctx.fillStyle = line.color.replace(')', `, ${line.opacity * 0.4})`).replace('hsl', 'hsla'); // Increased from 0.3 to 0.4
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [centerX, centerY, cards]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 5 }}
        />
    );
};

export default ConnectionLines;
