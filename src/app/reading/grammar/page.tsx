'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookCheck, ClipboardCheck, Layers, Share2, Target, MoveRight, ChevronRight, Menu } from 'lucide-react';

export default function GrammarStrategyPage() {
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<{ gx: number, gy: number, sx: number, sy: number, ex: number, ey: number, delay: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        const count = 200; // Increased count
        setStars(Array.from({ length: count }).map((_, i) => {
            // Circle Shape
            const angle = (i / count) * Math.PI * 2;
            const r = 35; // Radius %
            const x = 50 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle);

            return {
                gx: x, // Graph/Circle X
                gy: y, // Graph/Circle Y
                sx: Math.random() * 100, // Start X
                sy: Math.random() * 100, // Start Y
                ex: 50 + (Math.random() * 100 - 50) * 2, // End X (Explode outward)
                ey: 50 + (Math.random() * 100 - 50) * 2, // End Y
                delay: Math.random() * 2
            };
        }));
    }, []);

    const strategies = [
        {
            id: "01",
            title: "명사",
            subtitle: "NOUNS",
            description: "문장의 핵심인 주어, 목적어, 보어 역할을 담당하며 뼈대를 이룹니다.",
            example: "decision / decider",
            icon: <Layers className="w-5 h-5" />,
            points: ["가산/불가산 구분", "관사(a/the) 활용", "복합명사 암기"],
            keywords: ["Subject", "Object", "Complement"],
            href: "/reading/grammar/nouns",
            color: "blue",
            styles: {
                border: "hover:border-blue-400",
                shadow: "hover:shadow-blue-500/20",
                iconText: "text-blue-600",
                iconBgHover: "group-hover:bg-blue-500",
                iconBorderHover: "group-hover:border-blue-400",
                subtitle: "text-blue-400/80 group-hover:text-blue-500",
                tagHover: "group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200",
                glow: "bg-blue-400/20 group-hover:bg-blue-400/40",
                gradient: "from-blue-50/50"
            }
        },
        {
            id: "02",
            title: "대명사",
            subtitle: "PRONOUNS",
            description: "지칭하는 대상을 정확히 찾고 문맥에 맞는 올바른 격을 선택합니다.",
            example: "their vs theirs",
            icon: <BookCheck className="w-5 h-5" />,
            points: ["인칭대명사 격 변화", "재귀대명사 용법", "지칭 추론"],
            keywords: ["Case", "Reflexive", "Reference"],
            href: "/reading/grammar/pronouns",
            color: "teal",
            styles: {
                border: "hover:border-teal-400",
                shadow: "hover:shadow-teal-500/20",
                iconText: "text-teal-600",
                iconBgHover: "group-hover:bg-teal-500",
                iconBorderHover: "group-hover:border-teal-400",
                subtitle: "text-teal-400/80 group-hover:text-teal-500",
                tagHover: "group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-200",
                glow: "bg-teal-400/20 group-hover:bg-teal-400/40",
                gradient: "from-teal-50/50"
            }
        },
        {
            id: "03",
            title: "동사",
            subtitle: "VERBS",
            description: "수(Number), 태(Voice), 시제(Tense)의 3단계 검증으로 형태를 결정합니다.",
            example: "has sent vs has been sent",
            icon: <RotateCw className="w-5 h-5" />,
            points: ["수 일치", "태(능동/수동)", "시제 일치"],
            keywords: ["Tense", "Aspect", "Voice"],
            href: "/reading/grammar/verbs",
            color: "indigo",
            styles: {
                border: "hover:border-indigo-400",
                shadow: "hover:shadow-indigo-500/20",
                iconText: "text-indigo-600",
                iconBgHover: "group-hover:bg-indigo-500",
                iconBorderHover: "group-hover:border-indigo-400",
                subtitle: "text-indigo-400/80 group-hover:text-indigo-500",
                tagHover: "group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200",
                glow: "bg-indigo-400/20 group-hover:bg-indigo-400/40",
                gradient: "from-indigo-50/50"
            }
        },
        {
            id: "04",
            title: "형용사",
            subtitle: "ADJECTIVES",
            description: "명사를 수식하거나 보어 자리에서 주어/목적어의 상태를 설명합니다.",
            example: "informative vs informed",
            icon: <Target className="w-5 h-5" />,
            points: ["명사 수식", "보어 자리 확인", "분사 형용사 구분"],
            keywords: ["Modifier", "Quality", "Participle"],
            href: "/reading/grammar/adjectives",
            color: "cyan",
            styles: {
                border: "hover:border-cyan-400",
                shadow: "hover:shadow-cyan-500/20",
                iconText: "text-cyan-600",
                iconBgHover: "group-hover:bg-cyan-500",
                iconBorderHover: "group-hover:border-cyan-400",
                subtitle: "text-cyan-400/80 group-hover:text-cyan-500",
                tagHover: "group-hover:bg-cyan-50 group-hover:text-cyan-600 group-hover:border-cyan-200",
                glow: "bg-cyan-400/20 group-hover:bg-cyan-400/40",
                gradient: "from-cyan-50/50"
            }
        },
        {
            id: "05",
            title: "부사",
            subtitle: "ADVERBS",
            description: "동사, 형용사, 또는 문장 전체를 수식하여 의미를 구체화합니다.",
            example: "hard vs hardly",
            icon: <ClipboardCheck className="w-5 h-5" />,
            points: ["동사/형용사 수식", "빈도부사 위치", "접속부사 기능"],
            keywords: ["Frequency", "Degree", "Manner"],
            href: "/reading/grammar/adverbs",
            color: "violet",
            styles: {
                border: "hover:border-violet-400",
                shadow: "hover:shadow-violet-500/20",
                iconText: "text-violet-600",
                iconBgHover: "group-hover:bg-violet-500",
                iconBorderHover: "group-hover:border-violet-400",
                subtitle: "text-violet-400/80 group-hover:text-violet-500",
                tagHover: "group-hover:bg-violet-50 group-hover:text-violet-600 group-hover:border-violet-200",
                glow: "bg-violet-400/20 group-hover:bg-violet-400/40",
                gradient: "from-violet-50/50"
            }
        },
        {
            id: "06",
            title: "전치사",
            subtitle: "PREPOSITIONS",
            description: "명사 앞에 위치하여 시간, 장소, 방향 등의 연결 관계를 정의합니다.",
            example: "despite vs although",
            icon: <Share2 className="w-5 h-5" />,
            points: ["전치사 vs 접속사", "시간/장소 전치사", "관용 표현"],
            keywords: ["Place", "Time", "Direction"],
            href: "/reading/grammar/prepositions",
            color: "sky",
            styles: {
                border: "hover:border-sky-400",
                shadow: "hover:shadow-sky-500/20",
                iconText: "text-sky-600",
                iconBgHover: "group-hover:bg-sky-500",
                iconBorderHover: "group-hover:border-sky-400",
                subtitle: "text-sky-400/80 group-hover:text-sky-500",
                tagHover: "group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200",
                glow: "bg-sky-400/20 group-hover:bg-sky-400/40",
                gradient: "from-sky-50/50"
            }
        }
    ];

    if (!mounted) return <div className="min-h-screen bg-white" />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-200 overflow-x-hidden">
            {/* Morphism Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[70%] bg-indigo-500/10 rounded-full blur-[140px] animate-blob-drift" />
                <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px]" />

                {/* Large Morphic Shape (Bottom Right) */}
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] translate-x-[20%] translate-y-[20%]">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full opacity-[0.85] blur-[80px]" />
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Header Navigation */}
                <nav className="flex justify-between items-center mb-16">
                    <Link href="/reading#part5" className="flex items-center gap-3 px-6 py-3 border border-blue-100 rounded-full bg-white/70 backdrop-blur-md hover:bg-white hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all group shadow-sm">
                        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-600 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-600 transition-colors">Back</span>
                    </Link>

                    <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Refraction</span>
                        <span className="hover:text-slate-600 cursor-pointer transition-colors">Distortion</span>
                        <span className="hover:text-slate-600 cursor-pointer transition-colors">Resonance</span>
                    </div>

                    <button className="p-2.5 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform">
                        <Menu className="w-4 h-4" />
                    </button>
                </nav>

                {/* Main Hero */}
                <header className="mb-20 text-center relative">
                    <div className="inline-block relative mb-8">
                        <div className="relative bg-white/60 backdrop-blur-xl border border-blue-200 px-10 py-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-300 transition-all duration-500 flex items-center gap-3 group">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <h2 className="text-sm font-bold tracking-[0.3em] text-slate-600 uppercase group-hover:text-blue-700 transition-colors">
                                Part 05 <span className="text-blue-500 group-hover:text-blue-400">Strategy</span>
                            </h2>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-text drop-shadow-sm">
                        Grammar Logic
                    </h1>

                    <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                        Master the art of stripping away modifiers to identify the core components of the sentence and reveal the hidden answer.
                    </p>


                </header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {strategies.map((item, idx) => (
                        <Link key={idx} href={item.href || '#'}>
                            <div className={`group relative bg-white/70 backdrop-blur-xl border border-slate-100 p-8 rounded-[32px] 
                                            ${item.styles.border} 
                                            hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] 
                                            ${item.styles.shadow} transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden`}>

                                {/* Dynamic Background Glow (Light On Effect) */}
                                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl 
                                                ${item.styles.glow} group-hover:scale-[2.5] transition-transform duration-700 ease-out`} />
                                <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${item.styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <span className={`text-[10px] font-mono font-bold ${item.styles.iconText} opacity-70 mb-6 tracking-widest uppercase block group-hover:opacity-100 transition-opacity`}>
                                        {item.id} — pattern
                                    </span>

                                    {/* Icon Box with Glow */}
                                    <div className={`mb-6 p-4 rounded-2xl border border-slate-100 shadow-sm w-fit 
                                                    bg-white ${item.styles.iconText}
                                                    ${item.styles.iconBgHover} group-hover:text-white ${item.styles.iconBorderHover}
                                                    group-hover:shadow-lg
                                                    group-hover:scale-110 transition-all duration-300`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors drop-shadow-sm">
                                        {item.title}
                                    </h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${item.styles.subtitle} transition-colors`}>
                                        {item.subtitle}
                                    </p>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-slate-600 transition-colors">
                                        {item.description}
                                    </p>

                                    {/* Keywords Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {item.keywords?.map((k, i) => (
                                            <span key={i} className={`text-[10px] font-bold px-2 py-1 rounded-md 
                                                                    bg-white border border-slate-100 text-slate-400
                                                                    ${item.styles.tagHover}
                                                                    transition-colors duration-300 delay-[${i * 50}ms] uppercase tracking-tight`}>
                                                #{k}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest 
                                                text-slate-400 ${item.styles.subtitle} group-hover:border-slate-200 transition-all`}>
                                    <span>Observation</span>
                                    <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300`} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Detail Analysis Section (Morphic Card) */}
                <div className="bg-gradient-to-br from-white/80 to-slate-50/40 backdrop-blur-2xl border border-white p-12 rounded-[48px] shadow-xl relative overflow-hidden mb-24">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.3em] mb-4 block">Origin Layer</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                                SYSTEMATIC <br />OBSERVATION LOG
                            </h2>
                            <p className="text-slate-500 leading-relaxed mb-10 text-lg">
                                토익 문법은 나오는 유형이 정해져 있습니다. 규칙을 이해하고 패턴을 익히면 해석 없이도 정답을 골라낼 수 있습니다. 핵심 구조를 분석하고 오답을 제거하는 논리적 프로세스를 확립하십시오.
                            </p>
                            <div className="space-y-4">
                                {["Structure Identification", "Pattern Recognition", "Logic Verification"].map((p, i) => (
                                    <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,1)]" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl group">
                            {/* Starfield / Dots Effect */}
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                {stars.map((star, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full animate-graph-scatter"
                                        style={{
                                            top: 0, left: 0,
                                            // @ts-ignore
                                            '--gx': `${star.gx}%`,
                                            '--gy': `${star.gy}%`,
                                            '--sx': `${star.sx}%`,
                                            '--sy': `${star.sy}%`,
                                            '--ex': `${star.ex}%`,
                                            '--ey': `${star.ey}%`,
                                            animationDelay: `${star.delay * 0.1}s`,
                                            opacity: 0
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent z-10" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <span className="text-[10px] font-mono font-bold text-white/60 mb-2 uppercase tracking-widest">Build State: Stable Prototype</span>
                                <h3 className="text-3xl font-bold text-white mb-4 italic tracking-tight">Observation Index</h3>
                                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[73%] group-hover:w-[85%] transition-all duration-1000" />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                    <span>Stable</span>
                                    <span>Overload</span>
                                </div>
                            </div>
                            {/* Animated circle glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="text-center py-12 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mb-4">Artwork & Narrative Direction</p>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-6">John Dean</h4>
                    <div className="inline-flex items-center gap-4 text-[11px] font-bold text-slate-500 border border-slate-200 px-6 py-2 rounded-full bg-white shadow-sm">
                        <span>Current Phase Marker</span>
                        <span className="text-blue-600">12 • 08 • 21</span>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slowPulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.15; transform: scale(1.1); }
                }
                @keyframes drift {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(5%, 5%); }
                    100% { transform: translate(0, 0); }
                }
                .relative {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-pulse-slow {
                    animation: slowPulse 8s ease-in-out infinite;
                }
                .animate-blob-drift {
                    animation: drift 12s ease-in-out infinite;
                }
                .animate-gradient-text {
                    animation: gradient-text 6s ease infinite;
                }
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes graphScatter {
                    0% { opacity: 0; left: var(--sx); top: var(--sy); transform: scale(0); }
                    20% { opacity: 1; left: var(--sx); top: var(--sy); transform: scale(1); }
                    40% { left: var(--gx); top: var(--gy); } /* Form Circle */
                    60% { left: var(--gx); top: var(--gy); } /* Hold */
                    80% { left: var(--ex); top: var(--ey); opacity: 0.8; transform: scale(0.8); } /* Scatter */
                    100% { left: var(--ex); top: var(--ey); opacity: 0; transform: scale(0); }
                }
                .animate-graph-scatter {
                    animation: graphScatter 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

function RotateCw(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
        </svg>
    )
}
