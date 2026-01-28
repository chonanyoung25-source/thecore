'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Target, CheckCircle2 } from 'lucide-react';

export default function SinglePassagePage() {
    return (
        <div className="min-h-screen bg-[#050a15] text-white font-sans selection:bg-emerald-500/30">
            {/* background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
                {/* Back Button */}
                <Link href="/reading" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-12 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium uppercase tracking-widest">Back to Reading</span>
                </Link>

                {/* Hero section */}
                <header className="mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
                        Part 7: Reading Comprehension
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">단일지문<br /><span className="text-slate-500">Single Passage</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        토익 독해의 시작이자 기본입니다. 147번부터 175번까지 총 10개의 지문과 29론항이 출제되며, 지문의 핵심 정보를 정확하고 빠르게 찾아내는 능력이 필수적입니다.
                    </p>
                </header>

                {/* Key Facts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">지문 구성</h3>
                        <p className="text-slate-400 text-sm">총 10개 지문, 지문당 2~4문항 출제 (총 29문항)</p>
                    </div>
                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">권장 시간</h3>
                        <p className="text-slate-400 text-sm">지문당 평균 2~3분 내외 소요 (총 약 25~30분)</p>
                    </div>
                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">주요 유형</h3>
                        <p className="text-slate-400 text-sm">이메일, 편지, 기사, 공고, 양식, 메신저 대화 등</p>
                    </div>
                </div>

                {/* Detailed Strategy */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-bold flex items-center gap-4">
                        <span className="w-8 h-px bg-emerald-500" />
                        핵심 공략 포인트
                    </h2>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Point 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-900/20 p-10 rounded-[40px] border border-white/5">
                            <div className="w-16 h-16 rounded-full bg-emerald-500 font-black text-2xl flex items-center justify-center shrink-0">1</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">지문 종류와 목적을 1초 만에 파악하라</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    지문 좌측 상단의 'Questions 147-148 refer to the following ...' 부분을 통해 지문이 이메일인지, 광고인지, 혹은 온라인 채팅인지를 즉시 확인하세요. 지문의 형식을 알면 정보가 어디에 위치할지 예측할 수 있습니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Email', 'Letter', 'Article', 'Advertisement', 'Notice'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold tracking-widest uppercase text-slate-500">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Point 2 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-900/20 p-10 rounded-[40px] border border-white/5">
                            <div className="w-16 h-16 rounded-full bg-blue-500 font-black text-2xl flex items-center justify-center shrink-0">2</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">문제의 질문(Question)을 먼저 읽어라</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    지문을 통째로 읽기 전, 문제에서 요구하는 '키워드'를 먼저 찾아야 합니다. 예를 들어 특정 인물 이름, 날짜, 금액 등이 있다면 지문에서 해당 단어를 '스캐닝'하여 그 주변 문장을 집중적으로 읽는 전략이 필요합니다.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span className="text-sm text-slate-300">팩트 체크용(Specific) 질문인가?</span>
                                    </div>
                                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span className="text-sm text-slate-300">주제/목적 물어보는(Main idea) 질문인가?</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Point 3 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-900/20 p-10 rounded-[40px] border border-white/5">
                            <div className="w-16 h-16 rounded-full bg-purple-500 font-black text-2xl flex items-center justify-center shrink-0">3</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">패러프레이징(Paraphrasing)에 익숙해져라</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    지문에 나온 단어가 보기(Option)에 그대로 나오는 경우는 드뭅니다. 예를 들어 지문에 'reduce the cost'라고 나왔다면 보기는 'lower the price'로 바뀌어 나옵니다. 동의어와 유의어 학습이 Part 7 고득점의 진정한 마스터키입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Action */}
                <footer className="mt-32 pt-16 border-t border-white/5 text-center">
                    <h2 className="text-2xl font-bold mb-8 text-slate-300">준비되셨나요? 실전 어휘를 익히러 가봅시다.</h2>
                    <Link href="/core-learning">
                        <button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                            Vocabulary 실전 훈련 시작
                        </button>
                    </Link>
                </footer>
            </div>
        </div>
    );
}
