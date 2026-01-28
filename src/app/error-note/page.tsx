'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    getErrorNotes,
    addErrorWord,
    markWordCorrect,
    markWordIncorrect,
    deleteErrorWord,
    getErrorNoteStats,
    ErrorWord,
    ErrorNoteStats
} from '@/lib/error-note-storage';
import { phase1, phase2, phase3 } from '@/data/vocabulary';
import { ArrowLeft, Brain, Trash2, RotateCcw, CheckCircle2, XCircle, AlertCircle, BookOpen, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
type ViewMode = 'list' | 'review_quiz';

export default function ErrorNotePage() {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [errorNotes, setErrorNotes] = useState<ErrorWord[]>([]);
    const [stats, setStats] = useState<ErrorNoteStats>({
        total: 0,
        unlearned: 0,
        learning: 0,
        mastered: 0,
        needReviewToday: 0
    });
    const [activeTab, setActiveTab] = useState<'all' | 'today' | 'mastered'>('all');

    // Quiz State
    const [quizQueue, setQuizQueue] = useState<ErrorWord[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [quizOptions, setQuizOptions] = useState<string[]>([]); // 4 meanings

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setErrorNotes(getErrorNotes());
        setStats(getErrorNoteStats());
    };

    // Helper to generate fake data for demo
    const generateDemoData = () => {
        const pool = [...phase1.words, ...phase2.words, ...phase3.words];
        // Pick 5 random words to fail
        for (let i = 0; i < 5; i++) {
            const randomWord = pool[Math.floor(Math.random() * pool.length)];
            addErrorWord(
                `${i + 1}-${randomWord.id}`, // Dummy ID format? Actually storage uses phaseId-wordId usually, but let's stick to what we have or just use term if unique.
                // Wait, addErrorWord expects specific format. Let's just use a fake phase ID.
                randomWord.term,
                randomWord.meaning,
                randomWord.partOfSpeech,
                randomWord.example,
                1 // Dummy Phase
            );
        }
        loadData();
    };

    // Filter logic
    const filteredNotes = errorNotes.filter(note => {
        if (activeTab === 'mastered') return note.status === 'mastered';
        if (activeTab === 'today') {
            // Need review or unlearned? Originally 'needReviewToday'
            return note.status !== 'mastered';
        }
        return true; // All
    });

    // --- Quiz Logic ---
    const startReview = () => {
        // Prioritize: Today's Review -> Unlearned -> Learning
        // For simplicity, just take all non-mastered from the list
        const toReview = errorNotes.filter(n => n.status !== 'mastered').sort((a, b) => {
            // Sort by nextReviewDate ascending (earliest first)
            const dateA = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
            const dateB = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
            return dateA - dateB;
        });

        if (toReview.length === 0) {
            alert("No words to review currently!");
            return;
        }

        setQuizQueue(toReview);
        setCurrentQuizIndex(0);
        prepareQuestion(toReview[0]);
        setViewMode('review_quiz');
    };

    const prepareQuestion = (word: ErrorWord) => {
        setQuizAnswered(false);
        setSelectedOption(null);
        setIsCorrect(false);

        // Generate distractors
        const pool = [...phase1.words, ...phase2.words, ...phase3.words];
        const distractors = pool
            .filter(w => w.meaning !== word.meaning)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(w => w.meaning);

        const options = [word.meaning, ...distractors].sort(() => 0.5 - Math.random());
        setQuizOptions(options);
    };

    const handleAnswer = (answer: string) => {
        if (quizAnswered) return;

        setSelectedOption(answer);
        setQuizAnswered(true);
        const currentWord = quizQueue[currentQuizIndex];
        const correct = answer === currentWord.meaning;
        setIsCorrect(correct);

        if (correct) {
            markWordCorrect(currentWord.wordId);
        } else {
            markWordIncorrect(currentWord.wordId);
        }

        // Refresh local filtered list in background? Better to reload after quiz.
    };

    const nextQuestion = () => {
        if (currentQuizIndex < quizQueue.length - 1) {
            const nextIdx = currentQuizIndex + 1;
            setCurrentQuizIndex(nextIdx);
            prepareQuestion(quizQueue[nextIdx]);
        } else {
            // End of Session
            loadData(); // Refresh stats
            setViewMode('list');
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Delete this word from error note?")) {
            deleteErrorWord(id);
            loadData();
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/vocabulary#testing-review">
                        <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-purple-400" />
                        MY ERROR NOTE
                    </h1>
                </div>
                {viewMode === 'list' && (
                    <Button
                        onClick={stats.unlearned + stats.learning > 0 ? startReview : generateDemoData}
                        className="bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105"
                    >
                        {stats.unlearned + stats.learning > 0 ? (
                            <>
                                <Play className="w-4 h-4 mr-2fill-current" /> REVIEW ({stats.unlearned + stats.learning})
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-4 h-4 mr-2" /> CREATE DEMO DATA
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* --- LIST VIEW --- */}
            {viewMode === 'list' && (
                <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8 animate-in fade-in duration-500">

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Errors</span>
                            <span className="text-3xl font-black text-white">{stats.total}</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            </div>
                            <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Unlearned</span>
                            <span className="text-3xl font-black text-red-400">{stats.unlearned}</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
                            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Learning</span>
                            <span className="text-3xl font-black text-purple-400">{stats.learning}</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
                            <span className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Mastered</span>
                            <span className="text-3xl font-black text-green-400">{stats.mastered}</span>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 border-b border-slate-800 pb-1 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'all' ? 'text-white border-b-2 border-purple-500 bg-purple-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            ALL WORDS
                        </button>
                        <button
                            onClick={() => setActiveTab('today')}
                            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'today' ? 'text-white border-b-2 border-purple-500 bg-purple-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            REVIEW NEEDED
                        </button>
                        <button
                            onClick={() => setActiveTab('mastered')}
                            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'mastered' ? 'text-white border-b-2 border-purple-500 bg-purple-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            MASTERED
                        </button>
                    </div>

                    {/* Word List */}
                    <div className="grid grid-cols-1 gap-4">
                        {filteredNotes.length === 0 ? (
                            <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No words found in this category.</p>
                                {activeTab === 'all' && (
                                    <p className="text-xs mt-2">Words you miss in quizzes will appear here automatically.</p>
                                )}
                            </div>
                        ) : (
                            filteredNotes.map((note) => (
                                <div key={note.wordId} className="group bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 flex items-center justify-between transition-all hover:bg-slate-900">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider
                                                ${note.status === 'mastered' ? 'bg-green-500/20 text-green-400' :
                                                    note.status === 'learning' ? 'bg-purple-500/20 text-purple-400' : 'bg-red-500/20 text-red-400'}
                                            `}>
                                                {note.status}
                                            </span>
                                            <span className="text-xs text-slate-500 font-mono">
                                                Streak: {note.correctStreak}
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-3">
                                            <h3 className="text-xl font-bold text-white">{note.term}</h3>
                                            <span className="text-sm text-slate-400 italic font-serif">{note.partOfSpeech}</span>
                                        </div>
                                        <p className="text-slate-300 mt-1 text-sm">{note.meaning}</p>
                                        <p className="text-slate-500 text-xs mt-2 italic border-l-2 border-slate-700 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            "{note.example}"
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 pl-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => handleDelete(note.wordId, e)}
                                            className="text-slate-600 hover:text-red-400 hover:bg-red-950/30 rounded-full h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        {note.nextReviewDate && note.status !== 'mastered' && (
                                            <span className="text-[10px] text-slate-600 bg-slate-950 px-2 py-1 rounded">
                                                Next: {new Date(note.nextReviewDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- QUIZ VIEW --- */}
            {viewMode === 'review_quiz' && (
                <div className="max-w-2xl mx-auto min-h-screen flex flex-col justify-center p-6 animate-in slide-in-from-right-10 duration-300">
                    <div className="text-center mb-8">
                        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2 block">
                            Review Session
                        </span>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-purple-500 transition-all duration-300"
                                style={{ width: `${((currentQuizIndex) / quizQueue.length) * 100}%` }}
                            />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6">
                            {quizQueue[currentQuizIndex].term}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {quizOptions.map((option, idx) => {
                            let btnStyle = "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200";

                            if (quizAnswered) {
                                if (option === quizQueue[currentQuizIndex].meaning) {
                                    btnStyle = "bg-green-600 border-green-500 text-white font-bold ring-2 ring-green-500/50";
                                } else if (option === selectedOption) {
                                    btnStyle = "bg-red-600 border-red-500 text-white";
                                } else {
                                    btnStyle = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    disabled={quizAnswered}
                                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                                >
                                    <span>{option}</span>
                                    {quizAnswered && option === quizQueue[currentQuizIndex].meaning && (
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    )}
                                    {quizAnswered && option === selectedOption && option !== quizQueue[currentQuizIndex].meaning && (
                                        <XCircle className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {quizAnswered && (
                        <div className="mt-8 flex flex-col items-center animate-in slide-in-from-bottom-2">
                            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 text-center w-full">
                                <p className="text-sm text-slate-400 mb-1">Example</p>
                                <p className="text-slate-200 italic">"{quizQueue[currentQuizIndex].example}"</p>
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="h-14 px-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-lg"
                            >
                                {currentQuizIndex < quizQueue.length - 1 ? 'Next Word' : 'Finish Review'} <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
