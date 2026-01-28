'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb, Lock, PlayCircle, RotateCw, X, Eye, Star, Bookmark, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8, phase9, phase10, phase11, phase12, phase13, phase14, phase15, phase16, phase17, phase18, phase19, phase20, phase21, phase22, phase23, phase24, phase25, phase26, phase27, phase28, phase29, phase30 } from '@/data/vocabulary';
import { addBookmark, removeBookmark, getBookmarks, ensureFolder } from '@/lib/bookmark-storage';

// --- Types ---
type PhaseStatus = 'locked' | 'current' | 'completed';

interface Phase {
    id: number;
    title: string;
    wordCount: number;
    status: PhaseStatus;
}

// --- Physics Simulation Logic (Custom Mini Engine) ---
class Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    label: string;

    constructor(x: number, y: number, radius: number, label: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.radius = radius;
        this.label = label;
    }

    update(bounds: { width: number; height: number; cx: number; cy: number; radius: number }, gravity: number, friction: number, elasticity: number) {
        // Apply gravity
        this.vy += gravity;
        this.vx *= friction;
        this.vy *= friction;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Container Collision (Circle Barrier)
        const dx = this.x - bounds.cx;
        const dy = this.y - bounds.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Boundary constraint (Keep inside the big circle)
        if (dist + this.radius > bounds.radius) {
            // Move ball back inside
            const overlap = (dist + this.radius) - bounds.radius;
            if (overlap > 0) {
                const angle = Math.atan2(dy, dx);
                const nx = Math.cos(angle);
                const ny = Math.sin(angle);

                this.x -= nx * overlap;
                this.y -= ny * overlap;

                // Reflect velocity
                const vDotN = this.vx * nx + this.vy * ny;
                this.vx = (this.vx - 2 * vDotN * nx) * elasticity;
                this.vy = (this.vy - 2 * vDotN * ny) * elasticity;

                // Add tangential friction (spin effect approximation)
                const tx = -ny;
                const ty = nx;
                const vDotT = this.vx * tx + this.vy * ty;
                this.vx -= vDotT * tx * 0.05; // Friction
                this.vy -= vDotT * ty * 0.05;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#1E293B'; // Slate-800
        ctx.fill();
        ctx.strokeStyle = '#22D3EE'; // Cyan-400
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text inside ball
        ctx.fillStyle = '#22D3EE'; // Cyan-400 Text
        ctx.font = `bold ${Math.floor(this.radius * 0.5)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x, this.y);
        ctx.closePath();
    }
}

export default function CoreLearningPage() {
    // --- State ---
    const [phases, setPhases] = useState<Phase[]>(() =>
        Array.from({ length: 30 }, (_, i) => {
            const id = i + 1;
            // Phase 1 Data
            if (id === 1) {
                return {
                    id: 1,
                    title: `Phase 1: ${phase1.title}`,
                    wordCount: phase1.words.length,
                    status: 'current',
                };
            }
            // Phase 2 Data
            if (id === 2) {
                return {
                    id: 2,
                    title: `Phase 2: ${phase2.title}`,
                    wordCount: phase2.words.length,
                    status: 'locked',
                };
            }
            // Phase 3 Data
            if (id === 3) {
                return {
                    id: 3,
                    title: `Phase 3: ${phase3.title}`,
                    wordCount: phase3.words.length,
                    status: 'locked',
                };
            }
            // Phase 4 Data
            if (id === 4) {
                return {
                    id: 4,
                    title: `Phase 4: ${phase4.title}`,
                    wordCount: phase4.words.length,
                    status: 'locked',
                };
            }
            // Phase 5 Data
            if (id === 5) {
                return {
                    id: 5,
                    title: `Phase 5: ${phase5.title}`,
                    wordCount: phase5.words.length,
                    status: 'locked',
                };
            }
            // Phase 6 Data
            if (id === 6) {
                return {
                    id: 6,
                    title: `Phase 6: ${phase6.title}`,
                    wordCount: phase6.words.length,
                    status: 'locked',
                };
            }
            // Phase 7 Data
            if (id === 7) {
                return {
                    id: 7,
                    title: `Phase 7: ${phase7.title}`,
                    wordCount: phase7.words.length,
                    status: 'locked',
                };
            }
            // Phase 8 Data
            if (id === 8) {
                return {
                    id: 8,
                    title: `Phase 8: ${phase8.title}`,
                    wordCount: phase8.words.length,
                    status: 'locked',
                };
            }
            // Phase 9 Data
            if (id === 9) {
                return {
                    id: 9,
                    title: `Phase 9: ${phase9.title}`,
                    wordCount: phase9.words.length,
                    status: 'locked',
                };
            }
            // Phase 10 Data
            if (id === 10) {
                return {
                    id: 10,
                    title: `Phase 10: ${phase10.title}`,
                    wordCount: phase10.words.length,
                    status: 'locked',
                };
            }
            // Phase 11 Data
            if (id === 11) {
                return {
                    id: 11,
                    title: `Phase 11: ${phase11.title}`,
                    wordCount: phase11.words.length,
                    status: 'locked',
                };
            }
            // Phase 12 Data
            if (id === 12) {
                return {
                    id: 12,
                    title: `Phase 12: ${phase12.title}`,
                    wordCount: phase12.words.length,
                    status: 'locked',
                };
            }
            if (id === 12) {
                return {
                    id: 12,
                    title: `Phase 12: ${phase12.title}`,
                    wordCount: phase12.words.length,
                    status: 'locked',
                };
            }
            // Phase 13 Data
            if (id === 13) {
                return {
                    id: 13,
                    title: `Phase 13: ${phase13.title}`,
                    wordCount: phase13.words.length,
                    status: 'locked',
                };
            }
            // Phase 14 Data
            if (id === 14) {
                return {
                    id: 14,
                    title: `Phase 14: ${phase14.title}`,
                    wordCount: phase14.words.length,
                    status: 'locked',
                };
            }
            // Phase 15 Data
            if (id === 15) {
                return {
                    id: 15,
                    title: `Phase 15: ${phase15.title}`,
                    wordCount: phase15.words.length,
                    status: 'locked',
                };
            }
            // Phase 16 Data
            if (id === 16) {
                return {
                    id: 16,
                    title: `Phase 16: ${phase16.title}`,
                    wordCount: phase16.words.length,
                    status: 'locked',
                };
            }
            // Phase 17 Data
            if (id === 17) {
                return {
                    id: 17,
                    title: `Phase 17: ${phase17.title}`,
                    wordCount: phase17.words.length,
                    status: 'locked',
                };
            }
            // Phase 18 Data
            if (id === 18) {
                return {
                    id: 18,
                    title: `Phase 18: ${phase18.title}`,
                    wordCount: phase18.words.length,
                    status: 'locked',
                };
            }
            // Phase 19 Data
            if (id === 19) {
                return {
                    id: 19,
                    title: `Phase 19: ${phase19.title}`,
                    wordCount: phase19.words.length,
                    status: 'locked',
                };
            }
            // Phase 20 Data
            if (id === 20) {
                return {
                    id: 20,
                    title: `Phase 20: ${phase20.title}`,
                    wordCount: phase20.words.length,
                    status: 'locked',
                };
            }
            // Phase 21 Data
            if (id === 21) {
                return {
                    id: 21,
                    title: `Phase 21: ${phase21.title}`,
                    wordCount: phase21.words.length,
                    status: 'locked',
                };
            }
            // Phase 22 Data
            if (id === 22) {
                return {
                    id: 22,
                    title: `Phase 22: ${phase22.title}`,
                    wordCount: phase22.words.length,
                    status: 'locked',
                };
            }
            // Phase 23 Data
            if (id === 23) {
                return {
                    id: 23,
                    title: `Phase 23: ${phase23.title}`,
                    wordCount: phase23.words.length,
                    status: 'locked',
                };
            }
            // Phase 24 Data
            if (id === 24) {
                return {
                    id: 24,
                    title: `Phase 24: ${phase24.title}`,
                    wordCount: phase24.words.length,
                    status: 'locked',
                };
            }
            // Phase 25 Data
            if (id === 25) {
                return {
                    id: 25,
                    title: `Phase 25: ${phase25.title}`,
                    wordCount: phase25.words.length,
                    status: 'locked',
                };
            }
            // Phase 26 Data
            if (id === 26) {
                return {
                    id: 26,
                    title: `Phase 26: ${phase26.title}`,
                    wordCount: phase26.words.length,
                    status: 'locked',
                };
            }
            // Phase 27 Data
            if (id === 27) {
                return {
                    id: 27,
                    title: `Phase 27: ${phase27.title}`,
                    wordCount: phase27.words.length,
                    status: 'locked',
                };
            }
            // Phase 28 Data
            if (id === 28) {
                return {
                    id: 28,
                    title: `Phase 28: ${phase28.title}`,
                    wordCount: phase28.words.length,
                    status: 'locked',
                };
            }
            // Phase 29 Data
            if (id === 29) {
                return {
                    id: 29,
                    title: `Phase 29: ${phase29.title}`,
                    wordCount: phase29.words.length,
                    status: 'locked',
                };
            }
            // Phase 30 Data
            if (id === 30) {
                return {
                    id: 30,
                    title: `Phase 30: ${phase30.title}`,
                    wordCount: phase30.words.length,
                    status: 'locked',
                };
            }
            // Procedural data for others
            return {
                id: id,
                title: `Phase ${id}`,
                wordCount: 40 + (i * 7 % 6),
                status: 'locked',
            };
        }) as Phase[]
    );

    const [activeStudyId, setActiveStudyId] = useState<number | null>(null);
    const [starredWords, setStarredWords] = useState<Record<string, boolean>>({});
    const [bookmarkedWords, setBookmarkedWords] = useState<Record<string, boolean>>({});

    // Load starred and bookmarked words from localStorage
    useEffect(() => {
        const savedStars = localStorage.getItem('starred_vocab');
        if (savedStars) {
            try {
                setStarredWords(JSON.parse(savedStars));
            } catch (e) {
                console.error(e);
            }
        }

        // Load from shared bookmark storage
        const sharedBookmarks = getBookmarks();
        const bookmarkMap: Record<string, boolean> = {};
        sharedBookmarks.forEach(bm => {
            bookmarkMap[bm.wordId] = true;
        });
        setBookmarkedWords(bookmarkMap);
    }, []);

    const toggleStar = (phaseId: number, wordId: number) => {
        const key = `${phaseId}-${wordId}`;
        const newStarred = { ...starredWords, [key]: !starredWords[key] };
        setStarredWords(newStarred);
        localStorage.setItem('starred_vocab', JSON.stringify(newStarred));
    };

    const toggleBookmark = (phaseId: number, word: any) => {
        const key = `${phaseId}-${word.id}`;
        const isCurrentlyBookmarked = bookmarkedWords[key];

        if (isCurrentlyBookmarked) {
            removeBookmark(key);
        } else {
            // Ensure Phase folder exists
            const folderId = `phase-${phaseId}`;
            ensureFolder(folderId, `Phase ${String(phaseId).padStart(2, '0')}`);

            addBookmark({
                id: key,
                term: word.term,
                meaning: word.meaning,
                example: word.example,
                partOfSpeech: word.partOfSpeech
            }, folderId);
        }

        const newBookmarked = { ...bookmarkedWords, [key]: !isCurrentlyBookmarked };
        setBookmarkedWords(newBookmarked);
    };

    const handleSpeak = (text: string) => {
        if (!window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const ballsRef = useRef<Ball[]>([]);

    const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        const savedPhases = localStorage.getItem('curriculum_progress');
        if (savedPhases) {
            try {
                const parsed = JSON.parse(savedPhases);
                setPhases(parsed);

                // Also update balls if physics is already running
                const completedCount = parsed.filter((p: any) => p.status === 'completed').length;
                ballsRef.current = Array.from({ length: completedCount }, (_, i) => {
                    return new Ball(
                        (canvasRef.current?.clientWidth || 0) / 2 + (Math.random() - 0.5) * 50,
                        (canvasRef.current?.clientHeight || 0) / 2 + (Math.random() - 0.5) * 50,
                        24,
                        String(i + 1)
                    );
                });
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
        }
        setHasLoadedFromStorage(true);
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (hasLoadedFromStorage && phases.length > 0) {
            localStorage.setItem('curriculum_progress', JSON.stringify(phases));
        }
    }, [phases, hasLoadedFromStorage]);

    // Initialize balls only once
    const initializedRef = useRef(false);

    // --- Physics Loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Setup dimensions
        const updateDimensions = () => {
            const parent = canvas.parentElement;
            if (parent) {
                // Set actual pixel size
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;

                // Handle HiDPI displays
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                ctx.scale(dpr, dpr);
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Initial Balls based on completed phases
        if (!initializedRef.current) {
            const clientWidth = canvas.clientWidth;
            const clientHeight = canvas.clientHeight;

            // Only run on client to avoid hydration mismatch
            const completedCount = phases.filter(p => p.status === 'completed').length;
            ballsRef.current = Array.from({ length: completedCount }, (_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 50;
                return new Ball(
                    clientWidth / 2 + Math.cos(angle) * dist,
                    clientHeight / 2 + Math.sin(angle) * dist,
                    24,
                    String(i + 1) // Phase numbers as labels
                );
            });
            initializedRef.current = true;
        }

        // Animation Loop
        const animate = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            if (width <= 0 || height <= 0) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width * dpr, height * dpr);

            // Draw Big Container Circle (Mint Color)
            const cx = width / 2;
            const cy = height / 2;
            const minDimension = Math.min(width, height);
            // Ensure radius is positive
            const containerRadius = Math.max(0, minDimension / 2 - 10);

            if (containerRadius > 0) {
                ctx.beginPath();
                ctx.arc(cx, cy, containerRadius, 0, Math.PI * 2);
                // Removed fill as requested - just outline
                ctx.strokeStyle = '#22D3EE'; // Cyan-400
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }

            // Update and Draw Balls
            const balls = ballsRef.current;
            const gravity = 0.4;
            const friction = 0.98;
            const elasticity = 0.6;

            for (let i = 0; i < balls.length; i++) {
                const ball = balls[i];

                for (let j = i + 1; j < balls.length; j++) {
                    const other = balls[j];
                    const dx = other.x - ball.x;
                    const dy = other.y - ball.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = ball.radius + other.radius;

                    if (distance < minDist && distance > 0) {
                        const angle = Math.atan2(dy, dx);
                        const tx = ball.x + Math.cos(angle) * minDist;
                        const ty = ball.y + Math.sin(angle) * minDist;

                        const ax = (tx - other.x) * 0.5;
                        const ay = (ty - other.y) * 0.5;

                        ball.x -= ax;
                        ball.y -= ay;
                        other.x += ax;
                        other.y += ay;

                        const vbx = ball.vx;
                        const vby = ball.vy;
                        ball.vx = other.vx * elasticity;
                        ball.vy = other.vy * elasticity;
                        other.vx = vbx * elasticity;
                        other.vy = vby * elasticity;

                        ball.vx += (Math.random() - 0.5) * 0.5;
                        other.vx += (Math.random() - 0.5) * 0.5;
                    }
                }

                ball.update({ width: width, height: height, cx, cy, radius: containerRadius }, gravity, friction, elasticity);
                ball.draw(ctx);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Function to add a ball with a specific number label
    const addBall = (numberLabel: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        ballsRef.current.push(new Ball(
            width / 2 + (Math.random() - 0.5) * 20,
            height / 2 - 150,
            24,
            String(numberLabel)
        ));
    };

    // Helper to render Study Content
    const renderStudyContent = (id: number) => {
        // Select data based on ID
        let data = null;
        if (id === 1) data = phase1;
        else if (id === 2) data = phase2;
        else if (id === 3) data = phase3;
        else if (id === 4) data = phase4;
        else if (id === 5) data = phase5;
        else if (id === 6) data = phase6;
        else if (id === 7) data = phase7;
        else if (id === 8) data = phase8;
        else if (id === 9) data = phase9;
        else if (id === 10) data = phase10;
        else if (id === 11) data = phase11;
        else if (id === 12) data = phase12;
        else if (id === 13) data = phase13;
        else if (id === 14) data = phase14;
        else if (id === 15) data = phase15;
        else if (id === 16) data = phase16;
        else if (id === 17) data = phase17;
        else if (id === 18) data = phase18;
        else if (id === 19) data = phase19;
        else if (id === 20) data = phase20;
        else if (id === 21) data = phase21;
        else if (id === 22) data = phase22;
        else if (id === 23) data = phase23;
        else if (id === 24) data = phase24;
        else if (id === 25) data = phase25;
        else if (id === 26) data = phase26;
        else if (id === 27) data = phase27;
        else if (id === 28) data = phase28;
        else if (id === 29) data = phase29;
        else if (id === 30) data = phase30;

        if (!data) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                    <h3 className="text-xl font-bold mb-2">Phase {id} Content Not Ready</h3>
                    <p className="text-gray-500 mb-6">This content is coming soon.</p>
                    <Button onClick={() => setActiveStudyId(null)} variant="outline">
                        Back to List
                    </Button>
                </div >
            );
        }

        return (

            <div className="h-full flex flex-col bg-[#0A0A0F]">
                {/* Study View Header */}
                <div className="sticky top-0 bg-[#0A0A0F] z-10 p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <div>
                        <button
                            onClick={() => setActiveStudyId(null)}
                            className="text-xs font-mono text-cyan-500 hover:text-cyan-400 flex items-center mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3 mr-1" />
                            BACK TO CURRICULUM
                        </button>
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                            {data.title}
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-slate-800 rounded-full"
                        onClick={() => setActiveStudyId(null)}
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    {/* Intro Section */}
                    <section className="mb-10">
                        <h3 className="text-lg font-bold text-cyan-400 mb-2">{data.subtitle}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">{data.description}</p>
                    </section>

                    {/* Learning Points */}
                    <section className="mb-10">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                            <h4 className="text-sm font-bold text-cyan-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                <Lightbulb className="w-4 h-4 text-cyan-400" />
                                Learning Points
                            </h4>
                            <ul className="space-y-2">
                                {data.learningPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                                        <span className="bg-cyan-900 text-cyan-200 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Word List */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 mb-4">
                            <BookOpen className="w-4 h-4 text-cyan-500" />
                            Vocabulary List
                        </h3>
                        <div className="space-y-3">
                            {data.words.map((word) => (
                                <div key={word.id} className="group bg-slate-900/30 rounded-lg border border-slate-800 p-4 hover:border-cyan-500/50 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-cyan-500 text-xs">#{String(word.id).padStart(2, '0')}</span>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-base font-bold text-slate-200 group-hover:text-cyan-300">{word.term}</h4>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSpeak(word.term);
                                                    }}
                                                    className="p-1 hover:bg-slate-800 rounded-md transition-all text-slate-500 hover:text-cyan-400 group/speaker"
                                                    title="발음 듣기"
                                                >
                                                    <Volume2 className="w-3.5 h-3.5 group-hover/speaker:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                            {word.pronunciation && (
                                                <span className="text-xs text-slate-500 font-mono opacity-70">{word.pronunciation}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {/* Star Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStar(id, word.id);
                                                }}
                                                className="p-1 hover:bg-slate-800 rounded transition-colors group/star"
                                            >
                                                <Star
                                                    className={`w-4 h-4 transition-all ${starredWords[`${id}-${word.id}`]
                                                        ? 'fill-yellow-400 text-yellow-400 scale-110'
                                                        : 'text-slate-600 group-hover/star:text-slate-400'
                                                        }`}
                                                />
                                            </button>

                                            {/* Bookmark Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBookmark(id, word);
                                                }}
                                                className="p-1 hover:bg-slate-800 rounded transition-colors group/bookmark"
                                            >
                                                <Bookmark
                                                    className={`w-4 h-4 transition-all ${bookmarkedWords[`${id}-${word.id}`]
                                                        ? 'fill-cyan-400 text-cyan-400 scale-110'
                                                        : 'text-slate-600 group-hover/bookmark:text-slate-400'
                                                        }`}
                                                />
                                            </button>

                                            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded ml-1">
                                                {word.partOfSpeech}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-2 font-medium">{word.meaning}</p>
                                    <p className="text-sm text-slate-400 italic border-l-2 border-slate-700 pl-3 py-0.5 mt-1 group-hover:border-cyan-900 leading-relaxed transition-colors">
                                        "{word.example}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Complete / Close Button Footer */}
                    <div className="mt-10 pt-6 border-t border-slate-800 flex justify-center pb-10">
                        <Button
                            size="lg"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 shadow-lg shadow-cyan-900/20"
                            onClick={() => setActiveStudyId(null)}
                        >
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            CLOSE VIEW
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="h-screen overflow-hidden bg-[#0A0A0F] flex flex-col font-sans text-slate-200">
            {/* Header */}
            <header className="px-6 py-4 md:px-12 flex justify-between items-start z-10 bg-[#0A0A0F] shrink-0 h-[100px]">
                <div className="flex flex-col justify-center h-full">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-cyan-500 whitespace-nowrap">
                        CORE VOCABULARY
                    </h1>
                    <div className="h-[1px] w-full bg-slate-800 my-1"></div>
                    <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase flex justify-between w-full text-slate-500">
                        <span>Core Learning</span>
                        <span>30 Phases / 1350 Words</span>
                    </p>
                </div>
                <div className="flex gap-2 items-center mt-2">
                    <Button
                        variant="ghost"
                        className="rounded-full hover:bg-red-950/30 hover:text-red-400 transition-colors border border-red-900 text-red-500 px-4 h-10 text-xs"
                        onClick={() => {
                            if (window.confirm('정말 모든 진행 상황을 초기화하시겠습니까?')) {
                                const resetPhases = phases.map((p, i) => ({
                                    ...p,
                                    status: i === 0 ? 'current' : 'locked' // Reset to Phase 1 current
                                })) as Phase[];
                                setPhases(resetPhases);
                                localStorage.setItem('curriculum_progress', JSON.stringify(resetPhases));
                                ballsRef.current = [];
                                setActiveStudyId(null);
                            }
                        }}
                    >
                        RESET
                    </Button>
                    <Link href="/vocabulary#core-learning">
                        <Button variant="ghost" className="rounded-full hover:bg-slate-800 hover:text-white transition-colors border border-slate-700 text-slate-400 px-6 h-10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            BACK
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Navigation Bar (Visible only when not studying) */}
            {!activeStudyId && (
                <div className="w-full bg-[#0A0A0F] border-y border-slate-800 overflow-x-auto no-scrollbar flex items-center px-6 h-14 shrink-0 z-20">
                    <div className="flex gap-2 mx-auto md:mx-0">
                        {phases.map((phase) => (
                            <button
                                key={phase.id}
                                onClick={() => {
                                    const element = document.getElementById(`phase-${phase.id}`);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all shrink-0
                            ${phase.status === 'completed'
                                        ? 'bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50'
                                        : phase.status === 'current'
                                            ? 'bg-cyan-600 text-white scale-110 font-bold shadow-md shadow-cyan-500/20'
                                            : 'text-slate-700 hover:text-slate-400'
                                    }
                        `}
                            >
                                {phase.id}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Canvas */}
                <div className="lg:w-[400px] shrink-0 relative flex items-center justify-center p-4 bg-[#0A0A0F] border-r border-slate-800">
                    <div className="w-full h-full relative flex items-center justify-center">
                        <canvas ref={canvasRef} className="block w-full h-full object-contain" />
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center hidden lg:block text-xs font-mono text-slate-600 pointer-events-none">
                        각 Phase를 완료하고 완벽한 Core로 등극해보세요.
                    </div>
                </div>

                {/* Right: List or Study View */}
                <div className="flex-1 bg-[#0A0A0F] overflow-hidden flex flex-col relative">
                    {activeStudyId ? (
                        // --- STUDY VIEW ---
                        <div className="absolute inset-0 z-20 bg-[#0A0A0F] animate-in slide-in-from-right-4 duration-300">
                            {renderStudyContent(activeStudyId)}
                        </div>
                    ) : (
                        // --- LIST VIEW ---
                        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar relative">
                            <div className="flex items-end justify-between mb-6 border-b border-slate-800 pb-4 sticky top-0 bg-[#0A0A0F] z-10 pt-2">
                                <h2 className="font-bold text-3xl text-cyan-500">Curriculum</h2>
                                <span className="font-mono text-sm bg-cyan-600 text-white px-2 py-1 rounded">
                                    {Math.floor(phases.filter(p => p.status === 'completed').length / phases.length * 100)}% DONE
                                </span>
                            </div>

                            <div className="space-y-4 pb-20">
                                {phases.map((phase) => (
                                    <div
                                        id={`phase-${phase.id}`}
                                        key={phase.id}
                                        className={`group border-b border-slate-800 pb-4 last:border-0 transition-all duration-300 scroll-mt-32 ${phase.status === 'current' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`font-mono text-xs uppercase tracking-wider ${phase.status === 'current' ? 'text-cyan-400 font-bold' : 'text-slate-600'}`}>
                                                Phase {String(phase.id).padStart(2, '0')}
                                            </span>
                                            {phase.status === 'completed' ? (
                                                <div className="flex items-center gap-1 text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded-full text-xs font-medium">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span>Completed</span>
                                                </div>
                                            ) : phase.status === 'locked' && (
                                                <Lock className="w-3 h-3 text-slate-700" />
                                            )}
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className={`text-xl font-bold leading-tight mb-1 ${phase.status === 'current' ? 'text-slate-200' : 'text-slate-500'}`}>
                                                    {phase.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 font-mono">{phase.wordCount} words</p>
                                            </div>

                                            <div className="flex gap-2">
                                                {(phase.status === 'locked' || phase.status === 'current') && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="bg-transparent border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-800"
                                                        onClick={() => setActiveStudyId(phase.id)}
                                                    >
                                                        <Eye className="w-3 h-3 mr-1" />
                                                        Preview
                                                    </Button>
                                                )}

                                                {phase.status === 'completed' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-none shadow-sm"
                                                        onClick={() => setActiveStudyId(phase.id)}
                                                    >
                                                        <RotateCw className="w-3 h-3 mr-1" />
                                                        Retry
                                                    </Button>
                                                )}

                                                {phase.status === 'current' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-cyan-600 text-white hover:bg-cyan-500 rounded-full px-6 shadow-lg shadow-cyan-900/50 transition-all hover:scale-105"
                                                        onClick={() => {
                                                            // 1. Complete Phase & Drop Ball immediately
                                                            const newPhases = [...phases];
                                                            const idx = newPhases.findIndex(p => p.id === phase.id);
                                                            newPhases[idx].status = 'completed';
                                                            if (idx + 1 < newPhases.length) {
                                                                newPhases[idx + 1].status = 'current';
                                                            }
                                                            setPhases(newPhases);
                                                            addBall(phase.id);

                                                            // 2. Open Study View
                                                            setActiveStudyId(phase.id);
                                                        }}
                                                    >
                                                        START
                                                        <PlayCircle className="ml-2 w-3 h-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
