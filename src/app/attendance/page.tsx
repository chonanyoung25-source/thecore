'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    getAttendanceStats,
    getActivityLogs,
    logActivity,
    buyFreeze,
    AttendanceStats,
    ActivityLog
} from '@/lib/streak-storage';
import {
    ArrowLeft, Flame, Calendar, Shield, Share2,
    Trophy, Users, Zap, Snowflake, Crown, Info
} from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

// --- Assets & Data ---
const MILESTONES = [
    { days: 7, label: 'Week Warrior', icon: Zap },
    { days: 30, label: 'Monthly Master', icon: Flame },
    { days: 100, label: 'Century Club', icon: Crown },
    { days: 365, label: 'Legend', icon: Trophy },
];

export default function AttendancePage() {
    // --- State ---
    const [stats, setStats] = useState<AttendanceStats>({
        currentStreak: 0,
        bestStreak: 0,
        lastActivityDate: null,
        streakFreezes: 0,
        totalDaysActive: 0
    });
    const [logs, setLogs] = useState<ActivityLog[]>([]);

    // UI State
    const [showShareModal, setShowShareModal] = useState(false);

    // Initial Load
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setStats(getAttendanceStats());
        setLogs(getActivityLogs());
    };

    // --- Actions ---
    const handleCheckIn = () => {
        // Force check-in for demo purposes
        logActivity();
        loadData();
        // Trigger confetti? (simulated via alert for now or just UI update)
    };

    const handleBuyFreeze = () => {
        if (confirm("Buy a Streak Freeze for 500 points?")) {
            buyFreeze(500);
            loadData();
        }
    };

    const generateHeatmapGrid = () => {
        // create a grid of last 4 months (approx 16 weeks)
        // Simple visualization: Flex grid of boxes
        const days = [];
        const today = new Date();
        for (let i = 120; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];

            const log = logs.find(l => l.date === dateStr);
            const intensity = log ? log.count : 0;

            days.push({ date: dateStr, intensity });
        }
        return days;
    };

    const heatmapDays = generateHeatmapGrid();

    // Fire Style based on streak
    const getFlameColor = (streak: number) => {
        if (streak >= 100) return 'text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]';
        if (streak >= 30) return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]';
        return 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]';
    };

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans pb-20">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0A0A0F]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/vocabulary#motivation">
                        <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-500 flex items-center gap-2">
                        <Flame className="w-6 h-6 text-lime-400" />
                        ATTENDANCE & STREAK
                    </h1>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCheckIn}
                    className="border-lime-500/30 text-lime-400 hover:bg-lime-500/10"
                >
                    Test Check-in
                </Button>
            </div>

            <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 animate-in fade-in duration-500">

                {/* 1. Hero: Current Streak */}
                <section className="text-center py-10 relative">
                    {/* Background Glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none 
                        ${stats.currentStreak >= 30 ? 'bg-red-500' : 'bg-orange-500'}
                    `} />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-6 relative">
                            <Flame className={`w-32 h-32 ${getFlameColor(stats.currentStreak)} animate-pulse`} />
                            {stats.streakFreezes > 0 && (
                                <div className="absolute -top-2 -right-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <Snowflake className="w-3 h-3" /> Protected
                                </div>
                            )}
                        </div>

                        <h2 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter mb-4">
                            {stats.currentStreak}
                        </h2>
                        <p className="text-xl text-slate-400 font-medium uppercase tracking-widest mb-8">
                            Day Streak
                        </p>

                        <div className="flex gap-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 flex flex-col items-center min-w-[120px]">
                                <span className="text-xs text-slate-500 uppercase font-bold mb-1">Best Streak</span>
                                <span className="text-2xl font-black text-white">{stats.bestStreak}</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 flex flex-col items-center min-w-[120px]">
                                <span className="text-xs text-slate-500 uppercase font-bold mb-1">Total Active</span>
                                <span className="text-2xl font-black text-white">{stats.totalDaysActive}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Heatmap & Calendar */}
                <section className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-lime-400" /> Activity Log
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
                                <div className="w-3 h-3 rounded-sm bg-lime-900"></div>
                                <div className="w-3 h-3 rounded-sm bg-lime-700"></div>
                                <div className="w-3 h-3 rounded-sm bg-lime-500"></div>
                                <div className="w-3 h-3 rounded-sm bg-lime-300"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                        {heatmapDays.map((day, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-all hover:scale-125 hover:ring-1 ring-white/50 cursor-default
                                    ${day.intensity === 0 ? 'bg-slate-800' :
                                        day.intensity === 1 ? 'bg-lime-900' :
                                            day.intensity === 2 ? 'bg-lime-700' :
                                                day.intensity === 3 ? 'bg-lime-500' : 'bg-lime-300'}
                                `}
                                title={`${day.date}: Level ${day.intensity}`}
                            />
                        ))}
                    </div>
                </section>

                {/* 3. Milestones & Shop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Milestones */}
                    <section className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" /> Next Milestones
                        </h3>
                        <div className="space-y-6">
                            {MILESTONES.map((milestone) => {
                                const progress = Math.min((stats.currentStreak / milestone.days) * 100, 100);
                                const isUnlocked = stats.currentStreak >= milestone.days;
                                const Icon = milestone.icon;

                                return (
                                    <div key={milestone.days}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-800 text-slate-500'}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                                                        {milestone.label}
                                                    </div>
                                                    <div className="text-xs text-slate-600">{milestone.days} Days Streak</div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">{Math.floor(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className="h-1.5 bg-slate-800" indicatorClassName={isUnlocked ? 'bg-yellow-500' : 'bg-slate-600'} />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Shop / Freeze */}
                    <section className="bg-gradient-to-br from-cyan-950/30 to-slate-900 border border-cyan-500/20 rounded-[32px] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-cyan-400" /> Streak Protection
                        </h3>

                        <div className="text-center py-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-4 border border-cyan-500/30 relative">
                                <Snowflake className="w-10 h-10 text-cyan-400" />
                                <div className="absolute -bottom-2 bg-slate-900 border border-slate-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    x{stats.streakFreezes}
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Streak Freeze</h4>
                            <p className="text-sm text-slate-400 mb-6 px-4">
                                Missed a day? A streak freeze automatically protects your hard-earned streak.
                            </p>
                            <Button
                                onClick={handleBuyFreeze}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-none shadow-lg shadow-cyan-900/20 rounded-xl"
                            >
                                Get Freeze (500 pts)
                            </Button>
                        </div>
                    </section>
                </div>

                {/* 4. Social Sharing */}
                <section className="text-center">
                    <Button
                        onClick={() => setShowShareModal(true)}
                        size="lg"
                        className="rounded-full bg-slate-100 hover:bg-white text-black font-bold h-14 px-8 text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        <Share2 className="w-5 h-5 mr-2" /> Share My Streak
                    </Button>
                </section>

                {/* Share Modal Overlay (Mockup) */}
                {showShareModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowShareModal(false)}>
                        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
                            <h3 className="text-xl font-bold text-white mb-6">Share Achievement</h3>

                            {/* Card Preview */}
                            <div className="bg-gradient-to-br from-lime-500 to-green-600 p-8 rounded-2xl mb-6 text-black shadow-2xl relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <div className="flex justify-center mb-4"><Flame className="w-16 h-16 fill-black" /></div>
                                    <div className="text-6xl font-black mb-2">{stats.currentStreak}</div>
                                    <div className="text-sm font-bold tracking-[0.2em] uppercase">Day Streak</div>
                                    <div className="mt-4 text-xs font-medium opacity-80">Nanyoung Vocabulary</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button onClick={() => alert("Shared to Instagram Stories!")} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none">
                                    Instagram
                                </Button>
                                <Button onClick={() => alert("Image Copied!")} variant="outline" className="border-slate-600 text-slate-300">
                                    Copy Image
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
