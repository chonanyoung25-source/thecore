'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8, phase9, phase10, phase11, phase12, phase13, phase14, phase15, phase16, phase17, phase18, phase19, phase20, phase21, phase22, phase23, phase24, phase25, phase26, phase27, phase28, phase29, phase30, Word } from '@/data/vocabulary';

const ALL_PHASES = [
    phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8, phase9, phase10,
    phase11, phase12, phase13, phase14, phase15, phase16, phase17, phase18, phase19, phase20,
    phase21, phase22, phase23, phase24, phase25, phase26, phase27, phase28, phase29, phase30
];
import { addBookmark, getBookmarks, removeBookmark } from '@/lib/bookmark-storage';
import { ArrowLeft, Search, Star, History, X, ExternalLink, Filter, Mic, Camera, Command, BookOpen } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface SearchResult extends Word {
    sourcePhase: number;
    matchType: 'term' | 'meaning' | 'example';
    isBookmarked: boolean;
}

const EXTERNAL_DICTS = [
    { name: 'Naver Dictionary', url: 'https://en.dict.naver.com/#/search?query=' },
    { name: 'Oxford Learner\'s', url: 'https://www.oxfordlearnersdictionaries.com/definition/english/' },
    { name: 'Merriam-Webster', url: 'https://www.merriam-webster.com/dictionary/' },
];

export default function SmartSearchPage() {
    // --- State ---
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Debounced
    const [history, setHistory] = useState<string[]>([]);
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

    // Filters
    const [activeFilter, setActiveFilter] = useState<'all' | 'noun' | 'verb' | 'adj'>('all');
    const [phaseFilter, setPhaseFilter] = useState<string>('all');

    // UI state
    const inputRef = useRef<HTMLInputElement>(null);
    const [showHistory, setShowHistory] = useState(false);

    // Initial Load
    useEffect(() => {
        // Load history from local storage
        const savedHistory = localStorage.getItem('vocab_search_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));

        // Load bookmark state for quick toggle
        const bmList = getBookmarks();
        setBookmarks(new Set(bmList.map(b => b.wordId)));

        // Auto focus
        inputRef.current?.focus();
    }, []);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(query);
            if (query.trim()) {
                setShowHistory(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // --- Search Logic ---
    const allWords = useMemo(() => {
        return ALL_PHASES.flatMap(phase =>
            phase.words.map(w => ({ ...w, sourcePhase: phase.id }))
        );
    }, []);

    const results = useMemo(() => {
        if (!searchTerm) return [];

        const lowerQuery = searchTerm.toLowerCase();

        let filtered = allWords.filter(word => {
            // Text Match
            const matchTerm = word.term.toLowerCase().includes(lowerQuery);
            const matchMeaning = word.meaning.includes(lowerQuery); // Korean usually no case
            const matchExample = word.example.toLowerCase().includes(lowerQuery);

            if (!matchTerm && !matchMeaning && !matchExample) return false;

            // Apply Filters
            if (activeFilter !== 'all') {
                if (!word.partOfSpeech.toLowerCase().includes(activeFilter)) return false;
            }
            if (phaseFilter !== 'all') {
                if (word.sourcePhase !== parseInt(phaseFilter)) return false;
            }

            return true;
        })
            // Sort by relevance (Term match > Meaning match > Example match)
            .map(word => ({
                ...word,
                matchType: word.term.toLowerCase().startsWith(lowerQuery) ? 'term' :
                    word.meaning.includes(lowerQuery) ? 'meaning' : 'example'
            }))
            .sort((a, b) => {
                const typeScore = { term: 3, meaning: 2, example: 1 };
                // @ts-ignore
                return typeScore[b.matchType] - typeScore[a.matchType];
            });

        // Limit results
        return filtered.slice(0, 50);

    }, [searchTerm, allWords, activeFilter, phaseFilter]);

    // --- Actions ---
    const handleBookmark = (word: any) => {
        const id = `${word.sourcePhase}-${word.id}`;
        if (bookmarks.has(id)) {
            removeBookmark(id);
            const newSet = new Set(bookmarks);
            newSet.delete(id);
            setBookmarks(newSet);
        } else {
            addBookmark({ ...word, id }, 'default');
            const newSet = new Set(bookmarks);
            newSet.add(id);
            setBookmarks(newSet);
        }
    };

    const addToHistory = (term: string) => {
        if (!term.trim()) return;
        const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('vocab_search_history', JSON.stringify(newHistory));
    };

    const handleSearchSubmit = () => {
        addToHistory(searchTerm);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('vocab_search_history');
    };

    const deleteHistoryItem = (term: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newHistory = history.filter(h => h !== term);
        setHistory(newHistory);
        localStorage.setItem('vocab_search_history', JSON.stringify(newHistory));
    };

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-slate-800 px-4 py-4 md:px-6">
                <div className="flex items-center gap-4 max-w-5xl mx-auto mb-4">
                    <Link href="/vocabulary#personalization">
                        <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full shrink-0">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>

                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                        <Input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setShowHistory(true)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                            placeholder="Search words, meanings, or examples..."
                            className="h-14 pl-12 pr-12 text-lg bg-slate-900 border-slate-700 rounded-2xl focus:border-violet-500 focus:ring-violet-500/20 transition-all placeholder:text-slate-600"
                        />
                        {query && (
                            <button
                                onClick={() => { setQuery(''); setSearchTerm(''); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    <Button
                        variant={activeFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setActiveFilter('all')}
                        className={`rounded-full h-8 text-xs ${activeFilter === 'all' ? 'bg-violet-600 hover:bg-violet-500' : 'border-slate-700 text-slate-400'}`}
                    >
                        All Types
                    </Button>
                    <Button
                        variant={activeFilter === 'noun' ? 'default' : 'outline'}
                        onClick={() => setActiveFilter('noun')}
                        className={`rounded-full h-8 text-xs ${activeFilter === 'noun' ? 'bg-violet-600 hover:bg-violet-500' : 'border-slate-700 text-slate-400'}`}
                    >
                        Nouns
                    </Button>
                    <Button
                        variant={activeFilter === 'verb' ? 'default' : 'outline'}
                        onClick={() => setActiveFilter('verb')}
                        className={`rounded-full h-8 text-xs ${activeFilter === 'verb' ? 'bg-violet-600 hover:bg-violet-500' : 'border-slate-700 text-slate-400'}`}
                    >
                        Verbs
                    </Button>
                    {/* Separator */}
                    <div className="w-px h-8 bg-slate-800 mx-2 shrink-0" />
                    <Button
                        variant={phaseFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setPhaseFilter('all')}
                        className={`rounded-full h-8 text-xs shrink-0 ${phaseFilter === 'all' ? 'bg-violet-600 hover:bg-violet-500' : 'border-slate-800 text-slate-500'}`}
                    >
                        All Phases
                    </Button>
                    {ALL_PHASES.map(phase => (
                        <Button
                            key={phase.id}
                            variant={phaseFilter === String(phase.id) ? 'default' : 'outline'}
                            onClick={() => setPhaseFilter(String(phase.id))}
                            className={`rounded-full h-8 text-xs shrink-0 ${phaseFilter === String(phase.id) ? 'bg-violet-600 hover:bg-violet-500' : 'border-slate-800 text-slate-500'}`}
                        >
                            Phase {phase.id}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6">

                {/* 1. History View (When no query) */}
                {!searchTerm && history.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                <History className="w-4 h-4" /> Recent Searches
                            </h2>
                            <button onClick={clearHistory} className="text-xs text-slate-600 hover:text-red-400">Clear All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {history.map((term, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setQuery(term)}
                                    className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 hover:border-violet-500/50 hover:bg-slate-800 cursor-pointer group transition-all"
                                >
                                    <span className="text-slate-300 group-hover:text-white">{term}</span>
                                    <X
                                        className="w-3 h-3 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => deleteHistoryItem(term, e)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. Empty State / Fallback */}
                {!searchTerm && history.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center mt-20 opacity-50">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-400 mb-2">Smart Vocabulary Search</h3>
                        <p className="text-slate-500 max-w-sm">Type any word, meaning, or sentence fragment.</p>

                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-xs">
                            <div className="flex flex-col items-center gap-2 p-4 border border-slate-800 rounded-2xl">
                                <Mic className="w-6 h-6 text-slate-600" />
                                <span className="text-xs text-slate-500">Voice Search</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 border border-slate-800 rounded-2xl">
                                <Camera className="w-6 h-6 text-slate-600" />
                                <span className="text-xs text-slate-500">Photo OCR</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-widest">Coming Soon</p>
                    </div>
                )}

                {/* 3. Search Results */}
                {searchTerm && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Found {results.length} matches</span>
                            {results.length > 0 && <span className="text-violet-400 font-bold">Best match: {results[0].term}</span>}
                        </div>

                        {results.map((word) => (
                            <div key={`${word.sourcePhase}-${word.id}`} className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/30 hover:bg-slate-900/60 transition-all flex flex-col md:flex-row md:items-start gap-4">
                                {/* Left: Action */}
                                <div className="shrink-0 flex md:flex-col gap-2">
                                    <button
                                        onClick={() => handleBookmark(word)}
                                        className={`p-2 rounded-lg border transition-all 
                                            ${bookmarks.has(`${word.sourcePhase}-${word.id}`)
                                                ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
                                                : 'border-slate-800 text-slate-600 hover:bg-slate-800 hover:text-yellow-400'}
                                        `}
                                    >
                                        <Star className={`w-5 h-5 ${bookmarks.has(`${word.sourcePhase}-${word.id}`) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                {/* Center: Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <h3 className="text-2xl font-bold text-white highlight-text">
                                            {word.term.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
                                                part.toLowerCase() === searchTerm.toLowerCase() ? <span key={i} className="text-violet-400 bg-violet-500/10 px-1 rounded">{part}</span> : part
                                            )}
                                        </h3>
                                        <span className="text-sm italic text-slate-500">{word.partOfSpeech}</span>
                                        <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-500">
                                            Phase {word.sourcePhase}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-300 text-lg mb-3 font-medium">
                                        {word.meaning.split(searchTerm).map((part, i) =>
                                            part === searchTerm ? <span key={i} className="text-violet-400">{part}</span> : part
                                        )}
                                    </p>

                                    <div className="bg-black/30 rounded-lg p-4 border-l-2 border-slate-700 group-hover:border-violet-500 transition-colors">
                                        <p className="text-slate-300 text-base italic leading-relaxed">
                                            "{word.example.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
                                                part.toLowerCase() === searchTerm.toLowerCase() ? <span key={i} className="text-white font-bold decoration-violet-500 underline decoration-2">{part}</span> : part
                                            )}"
                                        </p>
                                    </div>
                                </div>

                                {/* Right: External Links (Hover only on desktop) */}
                                <div className="md:opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap md:flex-col gap-2 mt-4 md:mt-0 shrink-0">
                                    <span className="text-[10px] text-slate-600 uppercase tracking-widest w-full md:w-auto text-center md:text-right mb-1">External Dict</span>
                                    {EXTERNAL_DICTS.map(dict => (
                                        <a
                                            key={dict.name}
                                            href={`${dict.url}${word.term}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs text-slate-400 hover:text-violet-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 hover:border-violet-500/30 transition-colors"
                                        >
                                            <ExternalLink className="w-3 h-3" /> {dict.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {results.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg">No matches found for "{searchTerm}"</p>
                                <p className="text-slate-600 text-sm mt-2">Try checking typos or fuzzy search filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
