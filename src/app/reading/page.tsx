'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MoveRight, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export default function ReadingPage() {
    return (
        <div className="bg-[#050a15] text-white">
            {/* 1. Cover Section */}
            {/* 1. Cover Section */}
            <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800 via-blue-950 to-[#050a15] flex items-center justify-center">
                {/* Background Light Sources */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none" />

                {/* Ambient Particles/Glow - ENHANCED SPHERES */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    {/* --- Center Glow --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen" />

                    {/* --- Ambient Background Glows --- */}
                    <div className="absolute -top-[30%] -left-[10%] w-[100vw] h-[100vw] rounded-full bg-blue-800/20 blur-[150px] opacity-50 mix-blend-screen" />
                    <div className="absolute top-[20%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-indigo-800/20 blur-[120px] opacity-50 mix-blend-screen" />
                    <div className="absolute -bottom-[40%] left-[20%] w-[90vw] h-[90vw] rounded-full bg-cyan-800/15 blur-[130px] opacity-40 mix-blend-screen" />

                    {/* --- Massive Clipped Spheres --- */}
                    <div className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(100,200,255,0.4),rgba(30,60,200,0.1),transparent)] blur-[60px] opacity-40 animate-float-slow" />
                    <div className="absolute -bottom-[20%] -left-[15%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(50,150,255,0.3),rgba(10,30,100,0.1),transparent)] blur-[80px] opacity-30 animate-float" />

                    {/* --- Mid-Ground 3D Spheres --- */}
                    <div className="absolute top-[15%] left-[22%] w-32 h-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(180,240,255,0.8),rgba(6,182,212,0.8),rgba(0,20,40,0.8))] shadow-[0_0_40px_rgba(6,182,212,0.3)] animate-float opacity-80" />
                    <div className="absolute bottom-[25%] left-[25%] w-48 h-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(200,250,255,0.7),rgba(6,182,212,0.6),rgba(0,10,30,0.9))] blur-[2px] animate-float-delayed opacity-60" />
                    <div className="absolute top-[10%] right-[15%] w-24 h-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(200,230,255,0.9),rgba(37,99,235,0.9),rgba(10,20,50,0.9))] shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-float-slow" />
                    <div className="absolute top-[45%] right-[5%] w-40 h-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(180,220,255,0.8),rgba(29,78,216,0.8),rgba(10,20,50,0.9))] shadow-[0_0_35px_rgba(29,78,216,0.3)] animate-float-delayed opacity-90" />
                    <div className="absolute bottom-[15%] right-[25%] w-36 h-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(220,220,255,0.8),rgba(79,70,229,0.8),rgba(20,10,40,0.9))] shadow-[0_0_35px_rgba(79,70,229,0.3)] animate-float opacity-80" />

                    {/* --- Foreground / Extreme Edges --- */}
                    <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#3b82f6,#1e40af,#000)] shadow-2xl blur-[1px] animate-float z-20 opacity-90" />
                    <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#a5f3fc,#06b6d4,#164e63)] shadow-2xl blur-[0px] animate-float-delayed z-20 opacity-95" />
                    <div className="absolute top-[50%] -left-[15%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_40%_40%,#c7d2fe,#6366f1,#312e81)] shadow-2xl blur-[2px] animate-float-slow z-20 opacity-80" />

                    {/* Tiny Particles */}
                    <div className="absolute top-[15%] left-[50%] w-2 h-2 rounded-full bg-white blur-[1px] animate-pulse opacity-60" />
                    <div className="absolute top-[30%] left-[40%] w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] animate-float opacity-70" />
                    <div className="absolute bottom-[20%] left-[30%] w-3 h-3 rounded-full bg-indigo-300 blur-[1px] animate-pulse-slow opacity-60" />
                </div>

                <div className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden mix-blend-overlay">
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[repeating-conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_30deg,rgba(100,200,255,0.3)_30.2deg,transparent_32deg)] opacity-50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                </div>

                <main className="relative z-10 text-center flex flex-col items-center max-w-6xl px-6">
                    <div className="relative mb-8">
                        <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-16 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" viewBox="0 0 120 40" fill="none">
                            <path d="M10 38 C 40 2, 80 2, 110 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                        </svg>
                        <h1 className="text-6xl md:text-8xl font-sans font-medium tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                            Reading
                        </h1>
                    </div>
                    <p className="text-lg md:text-2xl text-blue-100/90 leading-relaxed font-light drop-shadow-md max-w-2xl mx-auto mb-16">
                        토익 고득점의 핵심, 정확한 분석과 시간 단축.<br />
                        Part 5부터 7까지, 한계를 넘어서는 독해 전략을 만나보세요.
                    </p>

                    {/* Part Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        <Link href="#part5" className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Part 5</h3>
                            <p className="text-sm text-blue-200/60 leading-relaxed">
                                문법과 어휘력을 바탕으로 단문 공란을 채우는 기초 파트입니다.
                            </p>
                        </Link>
                        <Link href="#part6" className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">Part 6</h3>
                            <p className="text-sm text-blue-200/60 leading-relaxed">
                                글의 흐름에 따라 적절한 표현과 문장을 선택하는 장문 빈칸 파트입니다.
                            </p>
                        </Link>
                        <Link href="#part7" className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Part 7</h3>
                            <p className="text-sm text-blue-200/60 leading-relaxed">
                                다양한 지문 속에서 정보를 정확하게 찾아내는 종합 독해 파트입니다.
                            </p>
                        </Link>
                    </div>

                    <div className="mt-16 animate-bounce">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/70 font-bold">Scroll Down to Explore</p>
                    </div>
                </main>
            </section>

            {/* 2. Part 5 Section (Social Card Redesign) */}
            <section id="part5" className="min-h-screen w-full relative overflow-hidden bg-[#F3F4F6] flex items-center justify-center py-24 text-slate-900 border-t border-slate-200">
                <div className="max-w-7xl w-full px-6 relative z-10 flex flex-col items-center">
                    {/* Section Header */}
                    <div className="text-center mb-16 max-w-3xl">
                        <span className="text-[#1e3a8a] font-bold tracking-widest uppercase text-xs mb-3 block">Part 05 Strategy</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-6 text-[#1e3a8a] tracking-tighter">
                            GRAMMAR <span className="text-slate-300">&</span> VOCABULARY
                        </h2>
                        <p className="text-[#1e3a8a] text-lg leading-relaxed font-medium">
                            소셜 피드처럼 가볍게, 그러나 깊이 있게.<br />
                            매일 업데이트되는 당신만의 토익 피드를 확인하세요.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">

                        {/* 1. Grammar Card (Domino Effect) */}
                        <div className="bg-white rounded-[32px] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            {/* Card Visual (CSS Dominos) */}
                            <Link href="/reading/grammar" className="block group relative aspect-square bg-[#F8FAFC] rounded-[24px] overflow-hidden">
                                {/* Title Top-Left */}
                                {/* Title Top-Left */}
                                <div className="absolute top-8 left-8 z-20">
                                    <h3 className="text-5xl font-black text-[#1e3a8a] leading-[0.9] tracking-tighter">
                                        Grammar<br />Logic
                                    </h3>
                                </div>

                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Abstract Dominos - Arc Layout like Reference */}
                                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-80 h-80 perspective-600 group-hover:scale-105 transition-transform duration-500">
                                        {/* Container rotated to show arc from bottom-left to top-right */}
                                        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                                            {Array.from({ length: 18 }).map((_, i) => {
                                                // Arc from 0 to 200 degrees
                                                const angle = -100 + (i * (200 / 17));
                                                return (
                                                    <div key={i} className="absolute w-12 h-12 bg-white origin-bottom"
                                                        style={{
                                                            transformStyle: 'preserve-3d',
                                                            transform: `rotateZ(${angle}deg) translateY(-140px) rotateX(-90deg)`,
                                                        }}
                                                    >
                                                        {/* Front Face (Square, Rounded) */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-white rounded-[10px] border border-slate-300/60 shadow-lg" />
                                                        {/* Thickness (Right) - Thicker */}
                                                        <div className="absolute top-0 right-0 w-4 h-full bg-slate-300 origin-right transform rotateY(90deg) rounded-r-[4px]" />
                                                        {/* Thickness (Top) */}
                                                        <div className="absolute top-0 left-0 w-full h-4 bg-slate-200 origin-top transform rotateX(90deg) rounded-t-[4px]" />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Blue Sphere - At the END of the chain (Top-Right relative to arc) */}
                                        <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-[#1e3a8a] rounded-full shadow-[inset_-5px_-5px_20px_rgba(0,0,0,0.5),0_20px_40px_rgba(30,58,138,0.4)] animate-float-slow z-30"
                                            style={{ transform: 'translateZ(40px)' }} />
                                    </div>
                                </div>

                                {/* Description Bottom-Left */}
                                <div className="absolute bottom-8 left-8 max-w-[60%] z-20">
                                    <p className="text-sm font-bold text-[#1e3a8a] leading-tight mb-2">
                                        Structural Analysis
                                    </p>
                                    <p className="text-xs font-semibold text-[#1e3a8a]/70 leading-tight">
                                        문법의 구조적 원리를<br />
                                        도미노처럼 연결하여<br />
                                        오답을 해결합니다.
                                    </p>
                                </div>

                            </Link>
                        </div>

                        {/* 2. Vocabulary Card (Glass Spheres) */}
                        <div className="bg-white rounded-[32px] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            {/* Card Visual */}
                            <Link href="/vocabulary" className="block group relative aspect-square bg-[#F8FAFC] rounded-[24px] overflow-hidden">
                                {/* Title Top-Left */}
                                {/* Title Top-Left */}
                                <div className="absolute top-8 left-8 z-20">
                                    <h3 className="text-5xl font-black text-[#1e3a8a] leading-[0.9] tracking-tighter">
                                        Vocab<br />Mastery
                                    </h3>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {/* Glass Spheres */}
                                    <div className="relative w-64 h-64 group-hover:scale-105 transition-transform duration-500">
                                        {/* Main Sphere */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-[0_20px_50px_rgba(79,70,229,0.4)] animate-float-slow">
                                            <div className="absolute top-4 left-6 w-12 h-6 bg-white/40 rounded-full blur-md" />
                                        </div>
                                        {/* Secondary Ring/Glass - White/Clear */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-[20px] border-indigo-100/50 rounded-full rotate-45 transform rotateX(60deg) backdrop-blur-sm shadow-xl" />
                                    </div>
                                </div>

                                {/* Description Bottom-Left */}
                                <div className="absolute bottom-8 left-8 max-w-[60%] z-20">
                                    <p className="text-sm font-bold text-[#1e3a8a] leading-tight mb-2">
                                        Contextual Memory
                                    </p>
                                    <p className="text-xs font-semibold text-[#1e3a8a]/70 leading-tight">
                                        단어의 맥락을<br />
                                        이미지처럼 기억하여<br />
                                        오래 유지합니다.
                                    </p>
                                </div>

                            </Link>
                        </div>

                    </div>

                </div>
            </section>

            {/* 3. Part 6 Section */}
            <section id="part6" className="min-h-screen w-full relative overflow-hidden bg-[#0A0A0F] flex items-center justify-center py-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="max-w-6xl w-full px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4 block">Part 06</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white text-glow">Text Completion</h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            장문 공란 채우기. 16문항.<br />
                            문맥의 흐름을 파악하여 적절한 어휘와 문장을 선택하는 능력이 요구됩니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Context Flow", desc: "앞뒤 문장의 연결 고리를 찾아 적절한 접속사나 연결어를 선택하세요." },
                            { title: "Sentence Fit", desc: "전체 흐름에 가장 어울리는 문장을 고르는 신토익 유형의 핵심입니다." },
                            { title: "Tense Check", desc: "편지나 이메일의 작성 시점과 언급되는 시점을 정확히 매칭하세요." }
                        ].map((item, i) => (
                            <div key={i} className="bg-indigo-950/20 border border-indigo-500/10 p-10 rounded-[40px] hover:bg-indigo-900/10 transition-colors">
                                <h3 className="text-2xl font-bold text-white mb-4 text-indigo-300">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Part 7 Section */}
            <section id="part7" className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#0A0A0F] to-indigo-950 flex items-center justify-center py-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]" />

                <div className="max-w-7xl w-full px-6 relative z-10 flex flex-col items-center">
                    <div className="mb-12 text-center">
                        <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4 block">Part 07</span>
                        <h2 className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter">Reading Comprehension</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                        {/* 1. 단일지문 */}
                        <Link href="/reading/single-passage" className="group relative bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer block hover:bg-white/[0.08]">
                            <div className="absolute top-6 right-8">
                                <span className="text-xs font-bold text-emerald-500/40 tracking-widest uppercase">Single</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">단일지문</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                한 개의 지문에 2~5문항이 출제됩니다. 지문의 종류(이메일, 기사, 광고 등)를 먼저 파악하고 정보의 위치를 빠르게 스캐닝하는 것이 중요합니다.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>문제 키워드 먼저 파악 후 지문 읽기</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>육하원칙(Who, When, Where 등) 중심 스캐닝</span>
                                </li>
                            </ul>
                        </Link>

                        {/* 2. 이중지문 */}
                        <div className="group relative bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-all bg-emerald-500/5">
                            <div className="absolute top-6 right-8">
                                <span className="text-xs font-bold text-emerald-500/40 tracking-widest uppercase">Double</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">이중지문</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                두 개의 지문이 연계되어 5문항이 출제됩니다. 두 지문 사이의 '연결 고리(Link-point)'를 찾는 것이 고득점의 핵심입니다.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>지문 1의 정보를 기반으로 지문 2에서 정답 도출</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>발신자/수신자 관계 및 날짜 확인 필수</span>
                                </li>
                            </ul>
                        </div>

                        {/* 3. 삼중지문 */}
                        <div className="group relative bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-all">
                            <div className="absolute top-6 right-8">
                                <span className="text-xs font-bold text-emerald-500/40 tracking-widest uppercase">Triple</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">삼중지문</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                세 개의 지문이 연계되어 5문항이 출제됩니다. 정보량이 방대하므로 필요한 정보만 골라내는 '선택과 집중'이 필요합니다.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>3개 지문을 통합해야 풀 수 있는 고난도 연계형 대비</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>세부 사항 대조 및 추론 문제 비중 높음</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 text-center bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl max-w-2xl">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            <span className="text-emerald-400 font-bold mr-2">VERDICT:</span>
                            토익 독해는 단순히 해석하는 시험이 아니라 정보를 효율적으로 처리하는 시험입니다. 자신만의 오답 소거 루틴을 만드십시오.
                        </p>
                    </div>

                    <div className="mt-20">
                        <Link href="/vocabulary">
                            <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                Start Vocabulary Training
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Back to Main Card - Fixed Position */}
            <div className="fixed left-8 bottom-8 z-50">
                <Link href="/">
                    <div className="group cursor-pointer">
                        <div className="min-w-[240px] px-5 py-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 group-hover:scale-105 transition-all duration-300 group-hover:border-blue-500/50 group-hover:bg-slate-900 shadow-2xl">
                            <div className="flex items-center gap-3 mb-1">
                                <ArrowLeft className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-semibold text-white whitespace-nowrap">Main Menu</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed whitespace-nowrap ml-8">
                                Return to Homepage
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Shared Styles */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 7s ease-in-out infinite 2s;
                }
                .animate-pulse-slow {
                    animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: .8; transform: scale(0.95); }
                }
                .text-glow {
                    text-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
                }
            `}</style>
        </div>
    );
}
