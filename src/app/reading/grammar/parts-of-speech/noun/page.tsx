'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, Info, User, Package, PlusCircle, ChevronRight, Menu } from 'lucide-react';

export default function NounConceptPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sections = [
        {
            id: "positions",
            title: "명사의 역할과 위치",
            subtitle: "NOUN FUNCTIONS & POSITIONS",
            icon: <Layers className="w-5 h-5 text-blue-600" />,
            content: "명사는 문장에서 주어(S), 목적어(O), 보어(C) 역할을 하며, 주로 다음과 같은 자리에 위치합니다.",
            details: [
                {
                    label: "문장 성분 역할",
                    items: [
                        "주어 자리: 동사 앞에 위치합니다. (예: Success requires hard work.)",
                        "타동사의 목적어 자리: 타동사 뒤에 위치합니다. (예: We received the confirmation yesterday.)",
                        "전치사의 목적어 자리: 전치사 바로 뒤에 위치합니다. (예: Thank you for your contribution.)"
                    ]
                },
                {
                    label: "수식 어구와 함께",
                    items: [
                        "관사/소유격 뒤: 관사(a/an/the) 또는 소유격(my/your) 뒤에 옵니다. (예: The performance was outstanding.)",
                        "형용사의 수식을 받는 자리: 형용사 뒤에 위치합니다. (예: We need a detailed explanation.)"
                    ]
                }
            ],
            example: "We need a [detailed explanation] for the [confirmation].",
            tip: "타동사와 전치사 뒤에는 반드시 목적어(명사)가 필요하다는 점을 기억하세요!"
        },
        {
            id: "countability",
            title: "가산/불가산 명사",
            subtitle: "COUNTABILITY LOG",
            icon: <Info className="w-5 h-5 text-blue-600" />,
            content: "가산 명사는 '단수/복수' 구분이 필수적이며, 불가산 명사는 '관사/복수형'이 불가합니다. 데이터 성격을 분류하십시오.",
            details: [
                { label: "가산 명사", items: ["단수일 때 a/an 필수", "복수형(s/es) 가능", "many, few, several"] },
                { label: "불가산 명사", items: ["a/an 사용 불가", "복수형 불가", "information, advice, equipment"] }
            ],
            example: "We need more [information] (O) / We need an information (X)",
            tip: "토익에서는 불가산 명사 리스트를 암기하는 것이 가장 빠른 길입니다."
        },
        {
            id: "person-vs-object",
            title: "사람/사물 명사",
            subtitle: "ENTITY CATEGORY",
            icon: <User className="w-5 h-5 text-blue-600" />,
            content: "비슷한 어근을 가졌으나 의미가 다른 '사람'과 '사물/행위' 명사를 구분해야 합니다. 속성을 대조하십시오.",
            details: [
                { label: "사람 명사", items: ["Applicant (지원자)", "Attendant (안내원)", "Specialist (전문가)"] },
                { label: "사물/행위 명사", items: ["Application (지원서)", "Attendance (출석)", "Specialty (전공)"] }
            ],
            example: "The [applicant] submitted her [application].",
            tip: "사람 명사는 가산 명사이므로 단수일 때 반드시 관사가 필요합니다."
        }
    ];

    if (!mounted) return <div className="min-h-screen bg-white" />;

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-200 overflow-x-hidden">
            {/* Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-blue-100 opacity-20 rounded-full blur-[150px]" />
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 opacity-20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Nav */}
                <nav className="flex justify-between items-center mb-16">
                    <Link href="/reading/grammar/parts-of-speech" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full bg-white/80 backdrop-blur-sm hover:border-blue-400 transition-all group">
                        <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-800">Back</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="text-blue-600">Positions</span>
                            <span>Countability</span>
                            <span>Entity</span>
                        </div>
                        <button className="p-2.5 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/10">
                            <Menu className="w-4 h-4" />
                        </button>
                    </div>
                </nav>

                {/* Hero */}
                <header className="mb-24 text-center">
                    <div className="inline-block relative mb-8">
                        <div className="absolute -inset-1 border border-blue-100/50 scale-[1.08]" />
                        <div className="border border-blue-600 px-12 py-4 bg-white/60 backdrop-blur-md relative">
                            <h2 className="text-xl md:text-3xl font-light tracking-tight text-slate-900 leading-none">
                                NOUN <span className="font-bold uppercase">Mastery</span>
                            </h2>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
                        명사 완전 정복
                    </h1>

                    <p className="max-w-3xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                        명사는 문장의 주인공입니다. 어디에 위치하는지, 어떤 성격을 가지고 있는지 파악하는 것이 구조적 관찰의 시작입니다.
                    </p>
                </header>

                {/* Sticky Nav */}
                <div className="sticky top-6 z-50 mb-24 flex justify-center">
                    <div className="bg-white/60 backdrop-blur-2xl border border-white p-1 rounded-full shadow-xl flex items-center gap-1">
                        {sections.map(s => (
                            <a key={s.id} href={`#${s.id}`} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-blue-600 transition-all">
                                {s.title}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Vertical Sections */}
                <div className="space-y-40 pb-40">
                    {sections.map((section, idx) => (
                        <section key={idx} id={section.id} className="scroll-mt-32">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                                {/* Left: Analysis Info */}
                                <div className="lg:col-span-12 xl:col-span-4 lg:sticky lg:top-40">
                                    <div className="mb-8 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                                            {section.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest leading-none mb-1">Observation {idx + 1}</p>
                                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{section.title}</h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                                        {section.content}
                                    </p>

                                    {/* Sub-label inspired by screenshot */}
                                    <div className="border-l-2 border-slate-200 pl-6 space-y-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Sub State Index</span>
                                        <span className="text-sm font-medium text-slate-800 italic">"Fractured geometries of grammar"</span>
                                    </div>
                                </div>

                                {/* Right: Detailed Cards */}
                                <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {section.details.map((detail, dIdx) => (
                                            <div key={dIdx} className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                                                <h3 className="text-xs font-bold text-blue-600 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,1)]" />
                                                    {detail.label}
                                                </h3>
                                                <ul className="space-y-4">
                                                    {detail.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-center justify-between text-base font-medium text-slate-700">
                                                            <span>{item}</span>
                                                            <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-blue-500 transition-colors" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Example Box - Morphic Style */}
                                    <div className="bg-slate-900 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Practical Scan</p>
                                                <p className="text-2xl font-bold text-white tracking-tight italic group-hover:scale-[1.02] transition-transform origin-left">
                                                    "{section.example}"
                                                </p>
                                            </div>
                                            <div className="w-full md:w-1/3 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <PlusCircle className="w-3 h-3" />
                                                    Optimization Tip
                                                </p>
                                                <p className="text-white/60 text-xs leading-relaxed leading-tight italic font-medium">
                                                    {section.tip}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer Section - Obsidian Style */}
                <footer className="mt-40 pt-24 border-t border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 block">Artwork & Narrative System</span>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-12">JOHN DEAN</h2>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/reading/grammar/parts-of-speech">
                            <button className="min-w-[240px] px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest text-xs">
                                Return to Origin
                            </button>
                        </Link>
                        <Link href="/vocabulary">
                            <button className="min-w-[240px] px-10 py-4 border border-slate-200 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">
                                Data Verification
                            </button>
                        </Link>
                    </div>

                    <div className="mt-20 inline-flex items-center gap-4 text-[11px] font-bold text-slate-400 px-8 py-3 bg-white border border-slate-100 rounded-full shadow-sm">
                        <span>Current Marker</span>
                        <span className="text-blue-600">Phase 12 • 01 • 2026</span>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .relative {
                    animation: slideIn 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
            `}</style>
        </div>
    );
}
