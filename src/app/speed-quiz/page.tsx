'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { phase1, phase2, phase3, Word } from '@/data/vocabulary';
import { ArrowLeft, Timer, Trophy, Flame, RotateCcw, Zap, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
type GameMode = 'time-attack' | 'survival' | 'review';
type GameState = 'menu' | 'playing' | 'gameover';

// --- Asset Helper ---
// Combine all words for the quiz pool
const ALL_WORDS = [...phase1.words, ...phase2.words, ...phase3.words];

// --- Animation Styles ---
const SHAKE_ANIMATION = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
.animate-pop {
  animation: pop 0.3s ease-out;
}
@keyframes pop {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
`;

import { Suspense } from 'react';

// --- Components ---
function SpeedQuizContent() {
    const searchParams = useSearchParams(); // Read URL params
    const initialAutoStartDone = useRef(false);

    // --- State ---
    const [gameState, setGameState] = useState<GameState>('menu');
    const [gameMode, setGameMode] = useState<GameMode>('time-attack');

    // Active Word Pool (Global or Phase-specific)
    const [activeWords, setActiveWords] = useState<Word[]>(ALL_WORDS);

    // Game Session State
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    // Question State
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [correctIndex, setCorrectIndex] = useState(0);

    // Feedback State
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

    // Refs
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastTimeRef = useRef<number>(0);

    // --- Auto Start Logic ---
    useEffect(() => {
        if (initialAutoStartDone.current) return;

        const modeParam = searchParams.get('mode');
        const phaseParam = searchParams.get('phase');

        if (modeParam === 'review' && phaseParam) {
            initialAutoStartDone.current = true;
            startGame('review', parseInt(phaseParam));
        }
    }, [searchParams]);

    // --- Game Logic ---

    const startGame = (mode: GameMode, phaseId?: number) => {
        setGameMode(mode);
        setGameState('playing');
        setScore(0);
        setCombo(0);
        setMaxCombo(0);
        setFeedback('none');

        // Determine Pool
        let pool = ALL_WORDS;
        if (phaseId === 1) pool = phase1.words;
        else if (phaseId === 2) pool = phase2.words;
        else if (phaseId === 3) pool = phase3.words;

        setActiveWords(pool);

        // Initial Timer Setup
        if (mode === 'time-attack') {
            setTimeLeft(60);
            setTotalTime(60);
        } else if (mode === 'survival') {
            setTimeLeft(5);
            setTotalTime(5);
        } else {
            // Review mode
            setTimeLeft(60);
            setTotalTime(60);
        }

        // Pass pool explicitly to avoid closure stale state issue
        nextQuestion(mode, pool);

        // Start Timer Loop
        lastTimeRef.current = Date.now();
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(tick, 100);
    };

    const stopGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameState('gameover');
    };

    const tick = () => {
        const now = Date.now();
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setTimeLeft(prev => {
            const next = prev - delta;
            if (next <= 0) {
                stopGame();
                return 0;
            }
            return next;
        });
    };

    const nextQuestion = (mode: GameMode, poolOverride?: Word[]) => {
        // Use override if provided (for first turn), otherwise use state
        const wordsPool = poolOverride || activeWords;

        // Safety check
        if (!wordsPool || wordsPool.length === 0) return;

        // 1. Pick a random word
        const word = wordsPool[Math.floor(Math.random() * wordsPool.length)];
        setCurrentWord(word);

        // 2. Generate Options (1 Correct, 3 Wrong)
        // Wrong options can come from the SAME pool to ensure difficulty consistency
        const wrongOptions = wordsPool
            .filter(w => w.id !== word.id) // Exclude current
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, 3)
            .map(w => w.meaning);

        // Handle edge case if pool is small (fill with others if needed, but for now assuming pool > 4)

        const allOptions = [word.meaning, ...wrongOptions];
        // Shuffle options
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
        }

        setOptions(allOptions);
        setCorrectIndex(allOptions.indexOf(word.meaning));

        // 3. Survival Mode Timer Reset
        if (mode === 'survival') {
            const newTime = Math.max(1.5, 5 - (score * 0.05)); // using score ref would be better but state ok for next q
            setTimeLeft(newTime);
            setTotalTime(newTime);
        }
    };

    const handleAnswer = (selectedIndex: number) => {
        if (feedback !== 'none') return; // Prevent double clicks during animation

        const isCorrect = selectedIndex === correctIndex;

        if (isCorrect) {
            // Correct Logic
            setFeedback('correct');
            const comboBonus = Math.floor(combo / 10);
            setScore(prev => prev + 10 + comboBonus); // Base 10 + Combo
            setCombo(prev => {
                const newCombo = prev + 1;
                if (newCombo > maxCombo) setMaxCombo(newCombo);
                return newCombo;
            });

            // Delay for animation then next question
            setTimeout(() => {
                setFeedback('none');
                nextQuestion(gameMode);
            }, 300); // Fast transition
        } else {
            // Wrong Logic
            setFeedback('wrong');
            setCombo(0);

            // In survival mode, game over immediately logic is usually 'stopGame'
            // but let's give a shake effect first
            setTimeout(() => {
                if (gameMode === 'survival') {
                    stopGame();
                } else {
                    setFeedback('none');
                    nextQuestion(gameMode);
                }
            }, 500);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);


    // --- Render Helpers ---

    // Progress Bar Value (0-100)
    const progressValue = (timeLeft / totalTime) * 100;

    // Progress Color
    const getProgressColor = () => {
        if (progressValue > 60) return 'bg-green-500';
        if (progressValue > 30) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-white font-sans overflow-hidden select-none">
            <style>{SHAKE_ANIMATION}</style>

            {/* --- 1. MENU SCREEN --- */}
            {gameState === 'menu' && (
                <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in duration-500">
                    <div className="absolute top-10 left-6">
                        <Link href="/vocabulary#testing-review">
                            <Button variant="ghost" className="text-slate-400 hover:text-white">
                                <ArrowLeft className="mr-2 w-5 h-5" /> Back
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-500/10 mb-6 border border-orange-500/20">
                            <Timer className="w-10 h-10 text-orange-400" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4 tracking-tighter">
                            SPEED QUIZ
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Test your reflexes and vocabulary retention.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {/* Mode 1: Time Attack */}
                        <button
                            onClick={() => startGame('time-attack')}
                            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-900/80 transition-all text-left"
                        >
                            <div className="mb-4 p-3 bg-orange-950/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-orange-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300">Time Attack</h3>
                            <p className="text-slate-400 text-sm">Solved as many words as possible in 60 seconds.</p>
                        </button>

                        {/* Mode 2: Survival */}
                        <button
                            onClick={() => startGame('survival')}
                            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/80 transition-all text-left"
                        >
                            <div className="mb-4 p-3 bg-red-950/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                                <Flame className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-300">Survival</h3>
                            <p className="text-slate-400 text-sm">Sudden death. One mistake and it's over.</p>
                        </button>

                        {/* Mode 3: Review */}
                        <Link
                            href="/speed-quiz/review"
                            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all text-left block"
                        >
                            <div className="mb-4 p-3 bg-cyan-950/30 rounded-xl w-fit group-hover:scale-110 transition-transform">
                                <BookOpen className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300">Review</h3>
                            <p className="text-slate-400 text-sm">Practice with standard time limits.</p>
                        </Link>
                    </div>
                </div>
            )}

            {/* --- 2. GAME SCREEN --- */}
            {gameState === 'playing' && currentWord && (
                <div className={`flex flex-col min-h-screen max-w-3xl mx-auto p-6 ${feedback === 'wrong' ? 'animate-shake' : ''}`}>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-8">
                        {/* Score */}
                        <div className="flex flex-col">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Score</span>
                            <span className="text-3xl font-black text-white tabular-nums">{score.toLocaleString()}</span>
                        </div>

                        {/* Timer */}
                        <div className="flex-1 mx-8 flex flex-col justify-center">
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                <span>{gameMode === 'survival' ? 'QUESTION TIMER' : 'TIME LEFT'}</span>
                                <span className={timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}>{timeLeft.toFixed(1)}s</span>
                            </div>
                            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-100 ease-linear ${getProgressColor()}`}
                                    style={{ width: `${progressValue}%` }}
                                />
                            </div>
                        </div>

                        {/* Combo */}
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Combo</span>
                            <div className={`flex items-center gap-1 text-3xl font-black tabular-nums ${combo > 5 ? 'text-orange-400' : 'text-white'}`}>
                                {combo > 0 && <Flame className="w-5 h-5 fill-current" />}
                                {combo}
                            </div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="flex-1 flex flex-col justify-center items-center py-10 relative">
                        {/* Feedback Overlay */}
                        {feedback === 'correct' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <div className="text-green-500 animate-pop opacity-0 scale-50">
                                    <Target className="w-40 h-40 opacity-20" />
                                </div>
                            </div>
                        )}

                        <div className="text-center w-full relative z-10 animate-in slide-in-from-bottom-5 duration-300" key={currentWord.id}>
                            <span className="text-sm font-mono text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 mb-6 inline-block">
                                {currentWord.partOfSpeech}
                            </span>
                            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-2">
                                {currentWord.term}
                            </h2>
                        </div>
                    </div>

                    {/* Answers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64 md:h-48 mt-auto">
                        {options.map((option, idx) => {
                            // Determine button style based on feedback state
                            let btnClass = "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700";

                            if (feedback !== 'none') {
                                if (idx === correctIndex) {
                                    btnClass = "bg-green-600 text-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-[1.02]";
                                } else if (feedback === 'wrong' && options.indexOf(option) === options.indexOf(options[correctIndex])) {
                                    // Should highlight correct one if user picked wrong? Optional.
                                } else if (feedback === 'wrong' /* User picked this wrong one... how to track selected? */) {
                                    // Complex to track exact clicked button without state, sticking to shaking screen and highlighting correct
                                }
                            }

                            return (
                                <Button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    // If feedback is active, disable interaction
                                    disabled={feedback !== 'none'}
                                    className={`h-full text-xl md:text-2xl font-bold rounded-2xl border-2 transition-all duration-200 active:scale-95 ${btnClass}`}
                                >
                                    {option}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* --- 3. GAME OVER SCREEN --- */}
            {gameState === 'gameover' && (
                <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in zoom-in-95 duration-500">
                    <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none" />

                        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />

                        <h2 className="text-4xl font-black text-white mb-2">GAME OVER</h2>
                        <p className="text-slate-400 mb-8">{gameMode.toUpperCase()} MODE COMPLETE</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Final Score</div>
                                <div className="text-3xl font-black text-white">{score.toLocaleString()}</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Max Combo</div>
                                <div className="text-3xl font-black text-orange-400">{maxCombo}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => startGame(gameMode)}
                                className="w-full text-lg h-14 bg-white text-black hover:bg-slate-200 rounded-xl font-bold"
                            >
                                <RotateCcw className="mr-2 w-5 h-5" /> Play Again
                            </Button>
                            <Button
                                onClick={() => setGameState('menu')}
                                variant="outline"
                                className="w-full text-lg h-14 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl"
                            >
                                Main Menu
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function SpeedQuizPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        }>
            <SpeedQuizContent />
        </Suspense>
    );
}
