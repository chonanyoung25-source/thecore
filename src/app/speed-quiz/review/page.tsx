'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Star, Lock } from 'lucide-react';
import { phase1, phase2, phase3 } from '@/data/vocabulary';

export default function ReviewSpacePage() {
    const spaces = [
        { id: 1, data: phase1, color: 'from-orange-400 to-red-500', icon: Star, unlocked: true },
        { id: 2, data: phase2, color: 'from-cyan-400 to-blue-500', icon: BookOpen, unlocked: true }, // Assuming unlocked for now
        { id: 3, data: phase3, color: 'from-purple-400 to-pink-500', icon: BookOpen, unlocked: false }, // Example lock
    ];

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-white font-sans overflow-hidden select-none p-6 flex flex-col items-center">

            {/* Header */}
            <div className="w-full max-w-5xl flex items-center justify-between mb-12 mt-4">
                <Link href="/speed-quiz">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Menu
                    </Button>
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Mode</span>
                </div>
            </div>

            {/* Title Section */}
            <div className="text-center max-w-2xl mx-auto mb-16 animate-in slide-in-from-bottom-5 duration-500">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Space</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                    Choose a learning space to review. <br />
                    Train your memory with focused repetition.
                </p>
            </div>

            {/* Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 pb-20">
                {spaces.map((space, idx) => (
                    <div
                        key={space.id}
                        className={`group relative p-1 rounded-[30px] bg-gradient-to-b ${space.unlocked ? 'from-slate-800 to-slate-900 hover:from-cyan-500/50 hover:to-blue-600/50' : 'from-slate-900 to-slate-950 opacity-60'} transition-all duration-300`}
                    >
                        {/* Card Content */}
                        <div className="relative h-full bg-[#0F1016] rounded-[28px] p-8 flex flex-col border border-slate-800 group-hover:border-transparent transition-all">

                            {/* Icon & Label */}
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${space.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <space.icon className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                                    Space 0{space.id}
                                </span>
                            </div>

                            {/* Text Info */}
                            <div className="mt-auto">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                                    {space.data.title}
                                </h3>
                                <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                                    {space.data.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" /> {space.data.words.length} Words
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-8">
                                <Link href={space.unlocked ? `/speed-quiz?mode=review&phase=${space.id}` : '#'}>
                                    <Button
                                        className={`w-full h-12 rounded-xl font-bold text-base transition-all ${space.unlocked
                                            ? 'bg-slate-800 hover:bg-white hover:text-black text-white'
                                            : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                                            }`}
                                        disabled={!space.unlocked}
                                    >
                                        {space.unlocked ? 'Review Now' : 'Locked'}
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </main>
    );
}
