'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Bookmark,
    BookmarkFolder,
    getBookmarks,
    getFolders,
    addBookmark,
    removeBookmark,
    updateBookmark,
    createFolder,
    deleteFolder,
    saveBookmarks,
    saveFolders
} from '@/lib/bookmark-storage';
import { ArrowLeft, BookOpen, Star, FolderPlus, Tag, Search, MoreVertical, Trash2, Plus, Edit2, PlayCircle, Layers, CheckCircle, Volume2 } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
type ViewMode = 'list' | 'flashcard';

export default function BookmarkPage() {
    // --- State ---
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [folders, setFolders] = useState<BookmarkFolder[]>([]);
    const [activeFolderId, setActiveFolderId] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    // UI State
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [editingBookmarkId, setEditingBookmarkId] = useState<string | null>(null);

    // Load Data
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setBookmarks(getBookmarks());
        setFolders(getFolders());
    };

    // --- Computed ---
    const filteredBookmarks = useMemo(() => {
        return bookmarks.filter(b => {
            // Folder Filter
            if (activeFolderId !== 'all' && b.folderId !== activeFolderId) {
                // If special filter 'mastered' or 'unmastered' could be added here
                return false;
            }

            // Search Filter
            if (searchTerm) {
                const query = searchTerm.toLowerCase();
                return (
                    b.term.toLowerCase().includes(query) ||
                    b.meaning.toLowerCase().includes(query) ||
                    (b.userNote && b.userNote.toLowerCase().includes(query)) ||
                    (b.userExample && b.userExample.toLowerCase().includes(query))
                );
            }
            return true;
        });
    }, [bookmarks, activeFolderId, searchTerm]);

    // --- Actions ---

    // Generate Demo Data
    const generateDemoData = () => {
        const demoWords = [
            { id: 'demo1', term: 'Ubiquitous', meaning: '어디에나 있는', example: 'Smartphones are ubiquitous these days.' },
            { id: 'demo2', term: 'Ephemeral', meaning: '단명하는, 덧없는', example: 'Beauty is ephemeral.' },
            { id: 'demo3', term: 'Serendipity', meaning: '뜻밖의 행운', example: 'Finding this job was pure serendipity.' },
        ];

        demoWords.forEach(w => addBookmark(w));
        loadData();
    };

    // Folder Actions
    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        createFolder(newFolderName);
        setNewFolderName('');
        setIsCreatingFolder(false);
        loadData();
    };

    const handleDeleteFolder = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Delete this folder? Bookmarks will move to General.')) {
            deleteFolder(id);
            if (activeFolderId === id) setActiveFolderId('all');
            loadData();
        }
    };

    // Bookmark Actions
    const handleToggleMastered = (id: string, currentStatus: boolean) => {
        updateBookmark(id, { isMastered: !currentStatus });
        loadData();
    };

    const handleDeleteBookmark = (id: string) => {
        if (confirm('Remove bookmark?')) {
            removeBookmark(id);
            loadData();
        }
    };

    const handleUpdateNote = (id: string, note: string) => {
        updateBookmark(id, { userNote: note });
        loadData();
    };

    const handleSpeak = (text: string) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    // --- Quiz Logic ---
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [quizItems, setQuizItems] = useState<Bookmark[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizOptions, setQuizOptions] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const startQuiz = () => {
        const items = filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks;
        if (items.length < 4) {
            alert("Need at least 4 bookmarks to start a quiz!");
            return;
        }

        // Shuffle and pick up to 10 items
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        setQuizItems(selected);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
        setIsQuizMode(true);
        generateOptions(selected[0], items);
    };

    const generateOptions = (current: Bookmark, allItems: Bookmark[]) => {
        const correct = current.meaning;
        const others = allItems.filter(b => b.wordId !== current.wordId);
        const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(b => b.meaning);
        const options = [correct, ...distractors].sort(() => 0.5 - Math.random());
        setQuizOptions(options);
        setSelectedAnswer(null);
    };

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return; // Prevent multiple clicks
        setSelectedAnswer(answer);
        if (answer === quizItems[currentQuestionIndex].meaning) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex + 1 < quizItems.length) {
            const nextIdx = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIdx);
            generateOptions(quizItems[nextIdx], filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks);
        } else {
            setQuizCompleted(true);
        }
    };

    const closeQuiz = () => {
        setIsQuizMode(false);
        setQuizItems([]);
    };

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/vocabulary#personalization">
                        <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                        BOOKMARK MANAGER
                    </h1>
                </div>

                {/* Global Actions */}
                <div className="flex gap-2">
                    {bookmarks.length === 0 && (
                        <Button onClick={generateDemoData} variant="outline" className="border-slate-700 text-slate-400">
                            <Plus className="w-4 h-4 mr-2" /> Demo Data
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
                {/* --- LEFT SIDEBAR (Folders) --- */}
                <aside className="w-full md:w-64 bg-slate-900/30 border-r border-slate-800 p-4 shrink-0 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Folders</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                            className="h-6 w-6 text-blue-400 hover:bg-blue-900/30"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    {isCreatingFolder && (
                        <div className="mb-4 flex gap-2 animate-in slide-in-from-top-2">
                            <Input
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Folder Name"
                                className="h-8 text-xs bg-slate-950 border-slate-700"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                            />
                            <Button size="icon" onClick={handleCreateFolder} className="h-8 w-8 bg-blue-600 hover:bg-blue-500">
                                <CheckCircle className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    <div className="space-y-1">
                        <button
                            onClick={() => setActiveFolderId('all')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group
                                ${activeFolderId === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                            `}
                        >
                            <span className="flex items-center gap-2">
                                <Layers className="w-4 h-4" /> All Bookmarks
                            </span>
                            <span className="text-xs opacity-50">{bookmarks.length}</span>
                        </button>

                        {folders.map(folder => (
                            <button
                                key={folder.id}
                                onClick={() => setActiveFolderId(folder.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group
                                    ${activeFolderId === folder.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                                `}
                            >
                                <span className="flex items-center gap-2 truncate">
                                    <FolderPlus className="w-4 h-4 shrink-0" /> {folder.name}
                                </span>
                                {!folder.isSystem && (
                                    <div className="opacity-0 group-hover:opacity-100" onClick={(e) => handleDeleteFolder(folder.id, e)}>
                                        <Trash2 className="w-3 h-3 hover:text-red-400" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0A0A0F]">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Search bookmarks, notes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Button onClick={startQuiz} variant="outline" size="sm" className="border-slate-700 text-slate-400 hover:text-white">
                                <PlayCircle className="w-4 h-4 mr-2" /> Play Quiz
                            </Button>
                        </div>
                    </div>

                    {/* Bookmark List */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                        {filteredBookmarks.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                <Star className="w-16 h-16 mb-4 opacity-20" />
                                <p>No bookmarks found.</p>
                                <p className="text-sm">Try adding a new bookmark or changing filters.</p>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {(() => {
                                    // Group by Phase
                                    const grouped = filteredBookmarks.reduce((acc, bm) => {
                                        let phase = 'Other';
                                        if (bm.wordId.includes('-')) {
                                            const parts = bm.wordId.split('-');
                                            if (!isNaN(Number(parts[0]))) {
                                                phase = `Phase ${parts[0]}`;
                                            }
                                        }
                                        if (!acc[phase]) acc[phase] = [];
                                        acc[phase].push(bm);
                                        return acc;
                                    }, {} as Record<string, typeof filteredBookmarks>);

                                    // Sort Phases (Phase 1, Phase 2, ..., Other)
                                    const sortedKeys = Object.keys(grouped).sort((a, b) => {
                                        if (a === 'Other') return 1;
                                        if (b === 'Other') return -1;
                                        const numA = parseInt(a.replace('Phase ', ''));
                                        const numB = parseInt(b.replace('Phase ', ''));
                                        return numA - numB;
                                    });

                                    return sortedKeys.map(phaseName => (
                                        <div key={phaseName}>
                                            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                                                <Layers className="w-4 h-4" />
                                                {phaseName}
                                                <span className="text-xs text-slate-500 font-normal ml-2">({grouped[phaseName].length})</span>
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {grouped[phaseName].map(bm => (
                                                    <div key={bm.wordId} className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-xl p-5 transition-all hover:bg-slate-900 hover:shadow-lg relative">

                                                        {/* Header */}
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-mono text-slate-500">{new Date(bm.createdAt).toLocaleDateString()}</span>
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => setEditingBookmarkId(bm.wordId === editingBookmarkId ? null : bm.wordId)}
                                                                    className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-blue-400 transition-colors"
                                                                    title="Edit Note"
                                                                >
                                                                    <Edit2 className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteBookmark(bm.wordId)}
                                                                    className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition-colors"
                                                                    title="Delete Bookmark"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{bm.term}</h3>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleSpeak(bm.term);
                                                                }}
                                                                className="p-1 hover:bg-slate-800 rounded-full text-slate-500 hover:text-blue-400 transition-colors"
                                                                title="Listen"
                                                            >
                                                                <Volume2 className="w-4 h-4" />
                                                            </button>
                                                            {bm.partOfSpeech && (
                                                                <span className="text-xs text-slate-500 font-serif italic">
                                                                    {bm.partOfSpeech}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-300 text-sm mb-3">{bm.meaning}</p>

                                                        <div className="text-sm text-slate-400 italic border-l-2 border-slate-700 pl-3 mb-4 leading-relaxed">
                                                            "{bm.example}"
                                                        </div>

                                                        {/* User Note (Inline Edit) */}
                                                        {editingBookmarkId === bm.wordId ? (
                                                            <div className="animate-in fade-in">
                                                                <textarea
                                                                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-slate-200 mb-2 focus:border-blue-500 outline-none"
                                                                    placeholder="Add personal note..."
                                                                    defaultValue={bm.userNote}
                                                                    onBlur={(e) => {
                                                                        handleUpdateNote(bm.wordId, e.target.value);
                                                                        setEditingBookmarkId(null);
                                                                    }}
                                                                    autoFocus
                                                                />
                                                            </div>
                                                        ) : (
                                                            bm.userNote && (
                                                                <div className="bg-blue-950/20 border border-blue-500/10 rounded-lg p-2 flex gap-2">
                                                                    <Tag className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                                                                    <p className="text-xs text-blue-200/80">{bm.userNote}</p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Quiz Modal Overlay */}
            {isQuizMode && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-[#0A0A0F] border border-slate-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative">
                        <button
                            onClick={closeQuiz}
                            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        {!quizCompleted ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
                                    Question {currentQuestionIndex + 1} / {quizItems.length}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                                    {quizItems[currentQuestionIndex].term}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
                                    {quizOptions.map((option, idx) => {
                                        let btnClass = "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800";
                                        if (selectedAnswer) {
                                            if (option === quizItems[currentQuestionIndex].meaning) {
                                                btnClass = "bg-green-500/20 border-green-500 text-green-400";
                                            } else if (option === selectedAnswer) {
                                                btnClass = "bg-red-500/20 border-red-500 text-red-400";
                                            } else {
                                                btnClass = "opacity-50 border-transparent";
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(option)}
                                                disabled={selectedAnswer !== null}
                                                className={`p-6 rounded-xl border text-lg font-medium transition-all ${btnClass}`}
                                            >
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedAnswer && (
                                    <div className="animate-in slide-in-from-bottom-5">
                                        <Button onClick={nextQuestion} size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-full">
                                            {currentQuestionIndex + 1 < quizItems.length ? "Next Question" : "See Results"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center py-10">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                    <Star className="w-12 h-12 text-white fill-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                                <p className="text-slate-400 mb-8">
                                    You scored <strong className="text-blue-400 text-xl">{score}</strong> out of {quizItems.length}
                                </p>
                                <div className="flex gap-4">
                                    <Button onClick={startQuiz} variant="secondary" size="lg" className="rounded-full">
                                        Try Again
                                    </Button>
                                    <Button onClick={closeQuiz} variant="outline" size="lg" className="rounded-full border-slate-700 text-slate-300 hover:text-white">
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
