'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, AlertTriangle, Eye, BookOpen, Scale, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { confusableWordsData, ConfusableCategory, ConfusablePair } from '@/data/confusable-words';

// Type definitions
type TabType = 'all' | ConfusableCategory;

interface TrackerStats {
    totalAttempts: number;
    correctCount: number;
    incorrectPairs: string[]; // IDs of pairs that were answered incorrectly
}

export default function ConfusableWordsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [trackerStats, setTrackerStats] = useState<TrackerStats>({
        totalAttempts: 0,
        correctCount: 0,
        incorrectPairs: []
    });

    // Filter pairs based on active tab
    const filteredPairs = activeTab === 'all'
        ? confusableWordsData
        : confusableWordsData.filter(item => item.category === activeTab);

    // Quiz state
    const [quizState, setQuizState] = useState<{ [key: string]: 'unanswered' | 'correct' | 'incorrect' }>({});

    const handleQuizAnswer = (pairId: string, selectedIndex: number, correctIndex: number) => {
        if (quizState[pairId]) return; // Preventive measure: prevent answering again

        const isCorrect = selectedIndex === correctIndex;

        setQuizState(prev => ({
            ...prev,
            [pairId]: isCorrect ? 'correct' : 'incorrect'
        }));

        setTrackerStats(prev => ({
            totalAttempts: prev.totalAttempts + 1,
            correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
            incorrectPairs: isCorrect
                ? prev.incorrectPairs.filter(id => id !== pairId)
                : [...new Set([...prev.incorrectPairs, pairId])]
        }));
    };

    const confusionRate = trackerStats.totalAttempts === 0
        ? 0
        : Math.round(((trackerStats.totalAttempts - trackerStats.correctCount) / trackerStats.totalAttempts) * 100);

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-white p-8 pb-32">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="mb-12">
                    <Link href="/vocabulary#core-learning" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Vocabulary
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500 mb-4">
                                Confusable Words
                            </h1>
                            <p className="text-slate-400 max-w-xl text-lg">
                                Clarify similar words with side-by-side comparisons and context-based quizzes.
                            </p>
                        </div>

                        {/* Tracker Widget */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 min-w-[280px]">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${confusionRate > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {confusionRate > 50 ? <AlertTriangle className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Confusion Rate</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-2xl font-bold ${confusionRate > 50 ? 'text-red-400' : 'text-green-400'}`}>
                                        {confusionRate}%
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        ({trackerStats.totalAttempts - trackerStats.correctCount} errors / {trackerStats.totalAttempts} attempts)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Categories Navigation */}
                <nav className="flex flex-wrap gap-2 mb-12">
                    {[
                        { id: 'all', label: 'All Words', icon: Scale },
                        { id: 'visual', label: 'Visual Similarity', icon: Eye },
                        { id: 'semantic', label: 'Semantic Nuance', icon: BookOpen },
                        { id: 'grammatical', label: 'Grammatical Logic', icon: Scale }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                  ${activeTab === tab.id
                                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'}`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        )
                    })}
                </nav>

                {/* Content Grid */}
                <div className="grid gap-16">
                    {filteredPairs.map((item) => (
                        <div key={item.id} className="scroll-mt-24">

                            {/* Category Badge */}
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 uppercase tracking-wider">
                                {item.category === 'visual' && <Eye className="w-3 h-3" />}
                                {item.category === 'semantic' && <BookOpen className="w-3 h-3" />}
                                {item.category === 'grammatical' && <Scale className="w-3 h-3" />}
                                {item.category} Type
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6 items-start">

                                {/* 1. Comparison Card */}
                                <div className="bg-slate-900/30 rounded-3xl border border-slate-800 overflow-hidden hover:border-teal-500/30 transition-colors duration-500">
                                    <div className="grid grid-cols-2 divide-x divide-slate-800 text-center h-full">
                                        {/* Word A */}
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold text-teal-300 mb-2">{item.pair[0].word}</h3>
                                            <p className="text-slate-400 text-sm mb-4 min-h-[40px]">{item.pair[0].meaning}</p>
                                            <p className="text-slate-500 text-xs italic bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                                                "{item.pair[0].example}"
                                            </p>
                                        </div>

                                        {/* Word B */}
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold text-blue-300 mb-2">{item.pair[1].word}</h3>
                                            <p className="text-slate-400 text-sm mb-4 min-h-[40px]">{item.pair[1].meaning}</p>
                                            <p className="text-slate-500 text-xs italic bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                                                "{item.pair[1].example}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mnemonic Footer */}
                                    <div className="bg-slate-950/80 p-4 border-t border-slate-800 text-center">
                                        <p className="text-sm text-teal-100/80">
                                            <span className="text-teal-500 font-bold mr-2">TIP:</span>
                                            {item.mnemonic}
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Quiz Section */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center h-full relative overflow-hidden">
                                    {/* Tracker Status Overlay */}
                                    {trackerStats.incorrectPairs.includes(item.id) && (
                                        <div className="absolute top-0 right-0 px-4 py-2 bg-red-500/10 text-red-500 text-xs font-bold rounded-bl-2xl border-b border-l border-red-500/20 flex items-center gap-2">
                                            <AlertTriangle className="w-3 h-3" /> Focus Required
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Pop Quiz</h4>
                                        <p className="text-lg text-white font-medium leading-relaxed">
                                            {item.quiz.question.split('______').map((part, i, arr) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (
                                                        <span className="inline-block px-4 py-1 mx-1 rounded bg-slate-800 border-b-2 border-slate-600 text-transparent select-none min-w-[60px]">
                                                            ?
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {item.pair.map((wordObj, idx) => {
                                            const status = quizState[item.id];
                                            const isCorrect = idx === item.quiz.answerIndex;

                                            let btnStyle = "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300";

                                            if (status === 'correct' && isCorrect) {
                                                btnStyle = "bg-green-500/20 border-green-500/50 text-green-400";
                                            } else if (status === 'incorrect' && !isCorrect) {
                                                // User cliked this (implied logic for simiplicity, strictly we don't know which button clicked in this simplified view, but usually highlight incorrect red)
                                                // For better UX, we just show the correct one green, but let's assume we want to show feedback.
                                                // Simplification: If answered, show correct green, others dimmed.
                                                btnStyle = "bg-slate-800/50 text-slate-600 border-slate-800";
                                            } else if (status === 'incorrect' && isCorrect) {
                                                btnStyle = "bg-green-500/20 border-green-500/50 text-green-400 animate-pulse";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={!!status}
                                                    onClick={() => handleQuizAnswer(item.id, idx, item.quiz.answerIndex)}
                                                    className={`py-4 rounded-xl border font-bold transition-all duration-300 text-center relative overflow-hidden ${btnStyle}`}
                                                >
                                                    {wordObj.word}
                                                    {status === 'correct' && isCorrect && <Check className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {quizState[item.id] && (
                                        <div className={`mt-6 p-4 rounded-xl border text-sm ${quizState[item.id] === 'correct' ? 'bg-green-950/30 border-green-900/50 text-green-200' : 'bg-red-950/30 border-red-900/50 text-red-200'}`}>
                                            <p className="font-bold mb-1">
                                                {quizState[item.id] === 'correct' ? 'Correct!' : 'Review Needed'}
                                            </p>
                                            <p className="opacity-90">{item.quiz.explanation}</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}

                    {filteredPairs.length === 0 && (
                        <div className="text-center py-20 text-slate-500">
                            No words found in this category.
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
