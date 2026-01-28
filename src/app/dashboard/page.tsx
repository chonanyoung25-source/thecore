'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getErrorNoteStats } from '@/lib/error-note-storage';
import { getFlashcardStats } from '@/lib/flashcard-storage';
import { phase1, phase2, phase3 } from '@/data/vocabulary';
import {
    ArrowLeft,
    TrendingUp,
    Activity,
    Target,
    Calendar,
    Award,
    Zap,
    Brain,
    CheckCircle2,
    Clock,
    Flame
} from 'lucide-react';
import Link from 'next/link';

// Recharts for Visualization
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
    LineChart, Line,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// --- Helper Data Generators ---
const generateHeatmapData = () => {
    // Generate 3 months of data
    const data = [];
    const today = new Date();
    for (let i = 90; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        // Random intensity 0-4
        data.push({
            date: date.toISOString().split('T')[0],
            count: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
        });
    }
    return data;
};

const WEEKLY_DATA = [
    { day: 'Mon', hours: 1.5, words: 45 },
    { day: 'Tue', hours: 0.8, words: 20 },
    { day: 'Wed', hours: 2.1, words: 60 },
    { day: 'Thu', hours: 0, words: 0 },
    { day: 'Fri', hours: 1.2, words: 35 },
    { day: 'Sat', hours: 3.5, words: 100 },
    { day: 'Sun', hours: 2.0, words: 50 },
];

const QUIZ_TREND_DATA = [
    { session: '1', score: 60 },
    { session: '2', score: 65 },
    { session: '3', score: 55 },
    { session: '4', score: 70 },
    { session: '5', score: 85 },
    { session: '6', score: 80 },
    { session: '7', score: 95 },
];

const RADAR_DATA = [
    { subject: 'Nouns', A: 85, fullMark: 100 },
    { subject: 'Verbs', A: 65, fullMark: 100 },
    { subject: 'Adjectives', A: 90, fullMark: 100 },
    { subject: 'Adverbs', A: 50, fullMark: 100 },
    { subject: 'Idioms', A: 70, fullMark: 100 },
];

// Colors
const COLORS = ['#10B981', '#6366F1', '#F43F5E']; // Emerald, Indigo, Rose

export default function LearningDashboardPage() {
    // --- State ---
    const [stats, setStats] = useState({
        totalCompletion: 0,
        mastered: 0,
        learning: 0,
        unlearned: 0,
        streak: 5,
        totalWords: 0
    });

    const [heatmapData, setHeatmapData] = useState<any[]>([]);

    useEffect(() => {
        // Load Real Stats logic mixed with demo
        const errorStats = getErrorNoteStats();
        const flashStats = getFlashcardStats();

        // Approx total words (phases)
        const totalWords = phase1.words.length + phase2.words.length + phase3.words.length;

        setStats({
            totalCompletion: Math.round(((flashStats.known + errorStats.mastered) / totalWords) * 100),
            mastered: flashStats.known, // Simplification
            learning: flashStats.unknown + errorStats.learning,
            unlearned: totalWords - (flashStats.known + flashStats.unknown),
            streak: 7, // Demo
            totalWords
        });

        setHeatmapData(generateHeatmapData());
    }, []);

    // Pie Chart Data
    const pieData = [
        { name: 'Mastered', value: stats.mastered },
        { name: 'Learning', value: stats.learning },
        { name: 'Unlearned', value: stats.unlearned },
    ];

    return (
        <main className="min-h-screen bg-[#0A0A0F] text-slate-200 font-sans pb-20">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/vocabulary#personalization">
                        <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Exit
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-indigo-400" />
                        LEARNING DASHBOARD
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm font-bold text-white">{stats.streak} Day Streak</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8 animate-in fade-in duration-500">

                {/* 1. Daily Goals & Alerts (Top Row) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Goal Card */}
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-950/30 to-slate-900 border border-indigo-500/20 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="z-10 w-full md:w-1/2 mb-6 md:mb-0">
                            <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2 text-sm uppercase tracking-wider">
                                <Target className="w-4 h-4" /> Daily Goal
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4">You're 80% there!</h2>
                            <div className="mb-2 flex justify-between text-xs text-slate-400">
                                <span>Learn 20 Words</span>
                                <span>16 / 20</span>
                            </div>
                            <Progress value={80} className="h-3 bg-slate-800" indicatorClassName="bg-indigo-500" />
                            <p className="mt-4 text-slate-400 text-sm">
                                Just 4 more words to reach your daily target. Keep going!
                            </p>
                        </div>

                        <div className="z-10 bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center w-full md:w-auto min-w-[180px]">
                            <span className="text-slate-500 text-xs font-bold uppercase mb-2">Next Milestone</span>
                            <Award className="w-12 h-12 text-yellow-500 mb-2 drop-shadow-lg" />
                            <span className="text-white font-bold">Word Master</span>
                            <span className="text-xs text-slate-500">Reach 500 Words</span>
                        </div>
                    </div>

                    {/* Retention Alert */}
                    <div className="bg-gradient-to-br from-rose-950/30 to-slate-900 border border-rose-500/20 rounded-[32px] p-8 flex flex-col justify-center relative overflow-hidden">
                        <div className="items-center flex gap-2 mb-4">
                            <Clock className="w-5 h-5 text-rose-400" />
                            <span className="text-rose-400 font-bold uppercase text-sm">Review Needed</span>
                        </div>
                        <h3 className="text-4xl font-black text-white mb-2">12 Words</h3>
                        <p className="text-slate-400 text-sm mb-6">Based on your forgetting curve, you need to review these today.</p>
                        <Link href="/error-note">
                            <Button className="w-full bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-900/20">
                                Start Review
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* 2. Progress Overview (Middle Row) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Overall Progress (Donut/Gauge) */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Mastery Distribution
                        </h3>
                        <div className="h-[300px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-black text-white">{stats.totalCompletion}%</span>
                                <span className="text-xs text-slate-500 uppercase tracking-widest">Total Done</span>
                            </div>
                        </div>
                    </div>

                    {/* Quiz Performance (Line Chart) */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8">
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-cyan-400" /> Recent Quiz Scores
                        </h3>
                        <p className="text-slate-500 text-sm mb-6">Last 7 sessions trend</p>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={QUIZ_TREND_DATA}>
                                    <XAxis dataKey="session" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#22D3EE"
                                        strokeWidth={4}
                                        dot={{ r: 4, fill: '#0891B2' }}
                                        activeDot={{ r: 8, fill: '#fff' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* 3. Detailed Analytics (Bottom Row) */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity Heatmap */}
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[32px] p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-400" /> Learning Consistency
                        </h3>
                        {/* Custom Heatmap Grid Representation */}
                        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                            <div className="flex gap-1 min-w-max">
                                {heatmapData.map((d, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-all hover:scale-125
                                            ${d.count === 0 ? 'bg-slate-800' :
                                                d.count < 2 ? 'bg-emerald-900' :
                                                    d.count < 4 ? 'bg-emerald-600' : 'bg-emerald-400'}
                                        `}
                                        title={`${d.date}: ${d.count} activities`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <div className="text-xs text-slate-500">Last 90 Days</div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
                                    <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
                                    <div className="w-3 h-3 rounded-sm bg-emerald-600"></div>
                                    <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>

                    {/* Weakness Analysis (Radar) */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 relative">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-rose-400" /> Weak Points
                        </h3>
                        <p className="text-slate-500 text-sm mb-4">Accuracy by part of speech</p>

                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Accuracy"
                                        dataKey="A"
                                        stroke="#F43F5E"
                                        fill="#F43F5E"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mt-2">
                            <p className="text-xs text-slate-400">
                                <span className="text-rose-400 font-bold">Insight:</span> You struggle most with <strong>Adverbs</strong> (50%). Try review lists.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
