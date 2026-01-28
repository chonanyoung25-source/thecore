'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { phase1, phase2, phase3, Word } from '@/data/vocabulary';
import { ArrowLeft, FileQuestion, Lightbulb, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Question {
    word: Word;
    questionText: string;
    options: Word[]; // 1 correct, 3 wrong
}

type QuizState = 'intro' | 'playing' | 'result';

// --- Helper: Text Masking ---
// Attempt to case-insensitive replace the term in the example
const maskSentence = (sentence: string, term: string) => {
    // Escape regex characters
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedTerm, 'gi');

    // Check if term exists in sentence
    if (!regex.test(sentence)) return null;

    // Replace with underscroes
    return sentence.replace(regex, '________');
};

export default function SentenceCompletionPage() {
    // --- State ---
    const [quizState, setQuizState] = useState<QuizState>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // ID of selected word
    const [isAnswered, setIsAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // --- Logic ---
    const startQuiz = () => {
        // Pool of all words
        const allWords = [...phase1.words, ...phase2.words, ...phase3.words];
        const validQuestions: Question[] = [];

        // 1. Filter words that can be cleanly masked in their examples
        const candidates = allWords.filter(w => maskSentence(w.example, w.term) !== null);

        // 2. Shuffle and pick 10
        const shuffled = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 10);

        // 3. Generate Options
        shuffled.forEach(word => {
            const masked = maskSentence(word.example, word.term);
            if (!masked) return;

            // Generate distractors (same part of speech preferred, but for now random is fine)
            const distractors = allWords
                .filter(w => w.id !== word.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const options = [word, ...distractors].sort(() => 0.5 - Math.random());

            validQuestions.push({
                word,
                questionText: masked,
                options
            });
        });

        setQuestions(validQuestions);
        setCurrentIndex(0);
        setScore(0);
        setQuizState('playing');
        setIsAnswered(false);
        setSelectedAnswer(null);
        setShowHint(false);
    };

    const handleAnswer = (wordId: number) => {
        if (isAnswered) return;

        setSelectedAnswer(wordId);
        setIsAnswered(true);

        if (wordId === questions[currentIndex].word.id) {
            setScore(prev => prev + 1);
        }

        // Auto advance after short delay? Or manual? 
        // Manual "Next" is better for reading understanding.
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowHint(false);
        } else {
            setQuizState('result');
        }
    };

    // --- Render Helpers ---
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans selection:bg-cyan-500/30">
            {/* Header / Nav */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/vocabulary#testing-review">
                    <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                    </Button>
                </Link>
            </div>

            {/* --- 1. INTRO SCREEN --- */}
            {quizState === 'intro' && (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-cyan-950/30 rounded-3xl flex items-center justify-center border border-cyan-500/20 mb-8 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]">
                        <FileQuestion className="w-12 h-12 text-cyan-400" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 mb-6 text-center tracking-tighter">
                        SENTENCE<br />COMPLETION
                    </h1>

                    <p className="text-center text-slate-400 max-w-md text-lg mb-12 leading-relaxed">
                        Master context clues. Fill in the blanks with the precise vocabulary word that fits the sentence structure and meaning.
                    </p>

                    <Button
                        onClick={startQuiz}
                        className="h-16 px-12 text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black rounded-full shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95"
                    >
                        START CHALLENGE
                    </Button>
                </div>
            )}

            {/* --- 2. GAME SCREEN --- */}
            {quizState === 'playing' && currentQuestion && (
                <div className="min-h-screen flex flex-col max-w-4xl mx-auto p-6 md:py-12">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col">
                            <span className="text-xs font-mono text-cyan-500 mb-1">QUESTION</span>
                            <span className="text-2xl font-bold font-mono text-white">
                                {String(currentIndex + 1).padStart(2, '0')}<span className="text-slate-600">/{questions.length}</span>
                            </span>
                        </div>
                        <div className="w-32 md:w-48">
                            <Progress value={progress} className="h-2 bg-slate-800" indicatorClassName="bg-cyan-500 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-mono text-slate-500 mb-1">SCORE</span>
                            <span className="text-2xl font-bold font-mono text-cyan-400">{score}</span>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="flex-1 flex flex-col justify-center mb-8">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 md:p-12 relative overflow-hidden min-h-[300px] flex flex-col justify-center items-center shadow-2xl">
                            {/* Decorative Quote Icons */}
                            <span className="absolute top-8 left-8 text-6xl font-serif text-slate-800 select-none">“</span>

                            <h2 className="text-2xl md:text-4xl font-medium text-center leading-relaxed text-slate-100 max-w-2xl relative z-10">
                                {currentQuestion.questionText.split('________').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className={`inline-block border-b-4 px-4 mx-1 transition-colors duration-300 transform translate-y-2
                                                ${isAnswered
                                                    ? (selectedAnswer === currentQuestion.word.id
                                                        ? 'border-green-500 text-green-400 animate-pulse'
                                                        : 'border-red-500 text-red-400')
                                                    : 'border-cyan-500/50 text-transparent min-w-[100px]'
                                                }
                                            `}>
                                                {isAnswered ? currentQuestion.word.term : '_______'}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </h2>

                            {/* Hint Toggle */}
                            <div className="absolute bottom-6 right-6 z-20">
                                {isAnswered ? (
                                    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-950 px-4 py-2 rounded-full border border-slate-800 animate-in fade-in slide-in-from-bottom-2">
                                        <Lightbulb className="w-4 h-4 text-cyan-500" />
                                        <span>Answer: <span className="text-white font-bold">{currentQuestion.word.term}</span> ({currentQuestion.word.meaning})</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowHint(true)}
                                        disabled={showHint}
                                        className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-colors
                                            ${showHint ? 'bg-slate-800 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:border-cyan-500/30'}
                                        `}
                                    >
                                        <Lightbulb className={`w-3 h-3 ${showHint ? 'fill-cyan-300' : ''}`} />
                                        {showHint ? `Meaning: ${currentQuestion.word.meaning}` : 'Show Hint'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => {
                            let stateClass = "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 text-slate-300";

                            if (isAnswered) {
                                if (option.id === currentQuestion.word.id) {
                                    stateClass = "bg-green-500/20 border-green-500 text-green-400 font-bold";
                                } else if (option.id === selectedAnswer) {
                                    stateClass = "bg-red-500/20 border-red-500 text-red-400";
                                } else {
                                    stateClass = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    disabled={isAnswered}
                                    className={`h-20 rounded-2xl border-2 text-lg md:text-xl transition-all duration-200 px-6 flex items-center justify-between group ${stateClass}`}
                                >
                                    <span>{option.term}</span>
                                    {isAnswered && option.id === currentQuestion.word.id && (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    )}
                                    {isAnswered && option.id === selectedAnswer && option.id !== currentQuestion.word.id && (
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button (Only when answered) */}
                    <div className="h-20 mt-6 flex justify-center items-center">
                        {isAnswered && (
                            <Button
                                onClick={nextQuestion}
                                className="h-14 px-12 rounded-full bg-white text-black hover:bg-cyan-50 text-lg font-bold shadow-lg animate-in slide-in-from-bottom-4"
                            >
                                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* --- 3. RESULT SCREEN --- */}
            {quizState === 'result' && (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
                    <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[40px] p-10 text-center shadow-2xl relative overflow-hidden">
                        {/* Background Effect */}
                        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-cyan-400 to-blue-500" />

                        <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Award className="w-10 h-10 text-cyan-400" />
                        </div>

                        <h2 className="text-3xl font-black text-white mb-2">QUIZ COMPLETE</h2>
                        <p className="text-slate-400 mb-8">Sentence Completion</p>

                        <div className="mb-10">
                            <span className="text-6xl font-black text-cyan-400 tracking-tighter">{score}</span>
                            <span className="text-2xl text-slate-500 font-medium">/{questions.length}</span>
                            <p className="text-sm text-cyan-500/80 font-bold uppercase tracking-widest mt-2 px-4 py-1 bg-cyan-950/30 rounded-full inline-block">
                                {score === 10 ? 'PERFECT SCORE!' : score >= 8 ? 'EXCELLENT!' : score >= 5 ? 'GOOD JOB' : 'KEEP PRACTICING'}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={startQuiz}
                                className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-lg"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" /> Try Again
                            </Button>
                            <Link href="/vocabulary#testing-review" className="block w-full">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                                >
                                    Back to Menu
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
