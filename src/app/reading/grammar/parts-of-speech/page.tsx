'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, ChevronRight, Menu } from 'lucide-react';

export default function PartsOfSpeechPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const concepts = [
        {
            id: "01",
            title: "명사 (Noun)",
            subtitle: "ENTITY LAYER",
            description: "사람, 사물, 장소, 추상적 개념의 이름을 나타냅니다. 문장에서 주어, 목적어, 보어 역할을 담당하는 핵심 객체입니다.",
            suffixes: ["-tion", "-sion", "-ment", "-ness", "-ance", "-ence", "-ty", "-ity"],
            examples: ["information", "agreement", "happiness", "performance"],
            href: "/reading/grammar/parts-of-speech/noun"
        },
        {
            id: "02",
            title: "동사 (Verb)",
            subtitle: "ACTION ENGINE",
            description: "동작이나 상태를 나타냅니다. 문장의 동학을 결정하며 주어의 인칭, 수, 시제에 따라 역동적으로 변화합니다.",
            suffixes: ["-ize", "-fy", "-ate", "-en"],
            examples: ["organize", "justify", "activate", "strengthen"]
        },
        {
            id: "03",
            title: "형용사 (Adjective)",
            subtitle: "MODIFIER INDEX",
            description: "명사를 수식하거나 보어로 쓰여 상태나 성질을 설명합니다. 명사의 해상도를 높여주는 성분입니다.",
            suffixes: ["-ive", "-al", "-ous", "-ful", "-less", "-able", "-ible"],
            examples: ["decisive", "annual", "famous", "careful", "available"]
        },
        {
            id: "04",
            title: "부사 (Adverb)",
            subtitle: "RESOLUTION LOG",
            description: "동사, 형용사, 다른 부사 또는 문장 전체를 수식합니다. 주로 맥락의 깊이와 정밀도를 조절합니다.",
            suffixes: ["-ly"],
            examples: ["decisively", "extremely", "recently", "carefully"]
        }
    ];

    if (!mounted) return <div className="min-h-screen bg-white" />;

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
            {/* Morphism Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-slate-50 opacity-40 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Header Nav */}
                <nav className="flex justify-between items-center mb-16">
                    <Link href="/reading/grammar" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white hover:border-blue-400 transition-all group shadow-sm">
                        <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-800">Back</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-[1px] bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Build State: Stable</span>
                    </div>

                    <button className="p-2.5 bg-slate-900 rounded-full text-white hover:scale-110 transition-transform">
                        <Menu className="w-4 h-4" />
                    </button>
                </nav>

                {/* Hero section */}
                <header className="mb-24 text-center">
                    <div className="inline-block relative mb-8">
                        <div className="absolute -inset-1 border border-blue-100 scale-[1.05]" />
                        <div className="border border-blue-600 px-10 py-4 bg-white/80 backdrop-blur-md relative">
                            <h2 className="text-xl md:text-3xl font-light tracking-tight text-slate-900 leading-none">
                                CONCEPT <span className="font-bold uppercase">Analysis</span>
                            </h2>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
                        품사 구분 학습
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed px-4">
                        각 품사의 역할과 특징을 이해하는 것은 토익 파트 5 정복의 기초입니다. 접미사를 통해 품사를 추측하는 패턴 인식 훈련을 정밀하게 수행하십시오.
                    </p>
                </header>

                {/* Concept Cards Stack */}
                <div className="space-y-12 mb-24">
                    {concepts.map((concept: any, idx) => {
                        const CardContent = (
                            <div className="group relative bg-white border border-slate-100 p-12 rounded-[48px] shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all overflow-hidden">
                                {/* Geometric Decoration */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 opacity-60 group-hover:scale-110 transition-transform" />

                                <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">
                                    <div className="lg:w-2/5">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-4xl font-black text-blue-100 group-hover:text-blue-500 transition-colors duration-500 leading-none">{concept.id}</span>
                                            <div className="h-[2px] w-8 bg-blue-100 group-hover:bg-blue-500 transition-colors duration-500" />
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{concept.title}</h2>
                                        <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] mb-6 uppercase">{concept.subtitle}</p>
                                        <p className="text-slate-500 leading-relaxed text-lg font-light">
                                            {concept.description}
                                        </p>
                                    </div>

                                    <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 group-hover:bg-white transition-colors duration-500">
                                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                                Representative Suffixes
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {concept.suffixes.map((s: string) => (
                                                    <span key={s} className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-sm font-medium text-slate-700 shadow-sm group-hover:border-blue-200 transition-colors">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 group-hover:bg-white transition-colors duration-500">
                                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                                Linguistic Examples
                                            </h3>
                                            <ul className="space-y-3">
                                                {concept.examples.map((ex: string) => (
                                                    <li key={ex} className="flex items-center justify-between text-base font-medium text-slate-700">
                                                        <span className="italic">{ex}</span>
                                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );

                        return concept.href ? (
                            <Link key={idx} href={concept.href} className="block cursor-pointer">
                                {CardContent}
                            </Link>
                        ) : (
                            <div key={idx}>{CardContent}</div>
                        );
                    })}
                </div>

                {/* Bottom CTA Layer */}
                <footer className="mt-24 p-16 rounded-[64px] bg-slate-900 shadow-2xl relative overflow-hidden text-center text-white">
                    {/* Background Light Blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em] mb-6 block">Ready to Execute?</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tighter">이제 실전 문제에서 품사를 <br className="hidden md:block" />구분해 볼까요?</h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/reading/grammar">
                                <button className="min-w-[220px] px-10 py-4 rounded-full bg-white text-slate-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
                                    BACK TO STRATEGY
                                </button>
                            </Link>
                            <Link href="/vocabulary">
                                <button className="min-w-[220px] px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                                    Study Vocabulary
                                </button>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .relative {
                    animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
            `}</style>
        </div>
    );
}
