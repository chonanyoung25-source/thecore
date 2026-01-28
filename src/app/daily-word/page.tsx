'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { phase1, phase2, phase3, Word } from '@/data/vocabulary';
import { addBookmark, getBookmarks, removeBookmark } from '@/lib/bookmark-storage';
import {
    ArrowLeft,
    BookOpen,
    Star,
    Volume2,
    Share2,
    Calendar,
    Flame,
    CheckCircle2,
    RefreshCw,
    Quote
} from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface DailyWord extends Word {
    date: string; // YYYY-MM-DD
    isCompleted: boolean;
}

export default function DailyWordPage() {
    // --- State ---
    const [dailyWords, setDailyWords] = useState<DailyWord[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [streak, setStreak] = useState(5); // Demo streak
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
    const [completedToday, setCompletedToday] = useState(false);

    // Initial Load
    useEffect(() => {
        // Load bookmarks state
        const bmList = getBookmarks();
        setBookmarks(new Set(bmList.map(b => b.wordId)));

        // Generate/Load Daily Words (Simulated)
        const generateDailyWords = () => {
            // In a real app, this would be seeded by date to be consistent for the day
            // Here we pick 3 random words
            const allWords = [...phase1.words, ...phase2.words, ...phase3.words];
            const today = new Date().toISOString().split('T')[0];

            // Simple hash function to pick words based on date string (so it stays same for the day)
            let seed = 0;
            for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);

            const words = [];
            for (let i = 0; i < 3; i++) {
                const idx = (seed + i * 137) % allWords.length;
                words.push({ ...allWords[idx], date: today, isCompleted: false });
            }
            return words;
        };

        setDailyWords(generateDailyWords());

        // Check local storage for today's completion status
        const completed = localStorage.getItem('daily_word_completed_' + new Date().toISOString().split('T')[0]);
        if (completed) setCompletedToday(true);

    }, []);

    // --- Actions ---
    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        const word = dailyWords[currentIndex];
        const id = String(word.id);

        if (bookmarks.has(id)) {
            removeBookmark(id);
            const newSet = new Set(bookmarks);
            newSet.delete(id);
            setBookmarks(newSet);
        } else {
            addBookmark({ ...word, id: String(word.id) }, 'daily-word');
            const newSet = new Set(bookmarks);
            newSet.add(id);
            setBookmarks(newSet);
        }
    };

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(dailyWords[currentIndex].term);
        window.speechSynthesis.speak(utterance);
    };

    const handleNext = () => {
        setIsFlipped(false);
        if (currentIndex < dailyWords.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Finish
            setCompletedToday(true);
            localStorage.setItem('daily_word_completed_' + new Date().toISOString().split('T')[0], 'true');
            // Confetti or celebration here?
        }
    };

    const handleShare = async () => {
        const text = `Today's Word: ${dailyWords[currentIndex].term} - ${dailyWords[currentIndex].meaning}\nLearn more at Nanyoung English!`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Daily Word',
                    text: text,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
        }
    };

    const currentWord = dailyWords[currentIndex];

    if (!currentWord) return <div>Loading...</div>;

    const isLast = currentIndex === dailyWords.length - 1;

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between z-20 sticky top-0 bg-[#0A0A0F]/90 backdrop-blur-md">
                <Link href="/vocabulary#motivation">
                    <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-amber-500 text-xs font-bold">{streak} Day Streak</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto">

                {/* Completion Celebration */}
                {completedToday && isLast && isFlipped ? (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-amber-500" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2">ALL DONE!</h2>
                        <p className="text-slate-400 mb-8">You've learned today's words.</p>
                        <div className="space-y-3">
                            <Button onClick={() => { setCompletedToday(false); setCurrentIndex(0); setIsFlipped(false); }} variant="outline" className="w-full border-slate-700">
                                Review Again
                            </Button>
                            <Link href="/dashboard">
                                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold">
                                    Check My Progress
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Progress */}
                        <div className="w-full mb-8">
                            <div className="flex justify-between text-xs font-mono text-amber-500/80 mb-2 uppercase tracking-widest">
                                <span>Today's Set</span>
                                <span>{currentIndex + 1} / {dailyWords.length}</span>
                            </div>
                            <Progress value={((currentIndex) / dailyWords.length) * 100} className="h-1 bg-slate-800" indicatorClassName="bg-amber-500" />
                        </div>

                        {/* Card */}
                        <div
                            className="w-full aspect-[3/4] relative perspective-1000 cursor-pointer group"
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            <div className={`w-full h-full relative transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl p-8 flex flex-col items-center justify-between text-center overflow-hidden">
                                    {/* Decorations */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                                    <div className="w-full flex justify-between items-start z-10">
                                        <span className="text-[10px] font-bold bg-amber-950/30 text-amber-500 px-3 py-1 rounded-full border border-amber-500/10">
                                            DAILY WORD
                                        </span>
                                        <button onClick={handleBookmark} className="text-slate-600 hover:text-amber-400 p-2">
                                            <Star className={`w-6 h-6 ${bookmarks.has(String(currentWord.id)) ? 'fill-amber-400 text-amber-400' : ''}`} />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center items-center z-10">
                                        <span className="text-slate-500 text-lg font-serif italic mb-4">{currentWord.partOfSpeech}</span>
                                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                            {currentWord.term}
                                        </h1>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="rounded-full hover:bg-amber-500/10 hover:text-amber-400 text-slate-500"
                                            onClick={handleSpeak}
                                        >
                                            <Volume2 className="w-6 h-6" />
                                        </Button>
                                    </div>

                                    <div className="z-10 text-slate-500 text-sm animate-pulse">
                                        Tap to see meaning
                                    </div>
                                </div>

                                {/* Back */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[40px] shadow-2xl p-8 flex flex-col text-center text-black overflow-hidden relative">
                                    <div className="w-full flex justify-between items-start z-10 mb-8">
                                        <span className="text-[10px] font-bold bg-black/10 px-3 py-1 rounded-full border border-black/5">
                                            MEANING
                                        </span>
                                        <button onClick={handleShare} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                                            <Share2 className="w-5 h-5 opacity-60 hover:opacity-100" />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center z-10">
                                        <h2 className="text-3xl font-black mb-6 leading-tight">
                                            {currentWord.meaning}
                                        </h2>

                                        <div className="bg-white/20 p-6 rounded-2xl w-full backdrop-blur-sm border border-white/10 relative">
                                            <Quote className="w-6 h-6 absolute -top-3 -left-2 text-black/20 fill-current" />
                                            <p className="text-lg font-medium leading-relaxed">
                                                "{currentWord.example}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="z-10 mt-8">
                                        <Button
                                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                            className="w-full h-14 bg-black text-white hover:bg-slate-900 rounded-2xl font-bold text-lg shadow-lg border-2 border-transparent hover:border-amber-300/50"
                                        >
                                            {isLast ? 'Complete' : 'Next Word'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx global>{`
                .preserve-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </main>
    );
}
