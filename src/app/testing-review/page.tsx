'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, FileQuestion, GraduationCap, Layers, Timer } from 'lucide-react';
import Link from 'next/link';

export default function TestingReviewPage() {
    const cards = [
        {
            title: 'Speed Quiz',
            icon: Timer,
            description: '제한 시간 내에 빠르게 단어 뜻을 맞춰보세요. 순발력과 암기력을 동시에 테스트합니다.',
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            hoverBorder: 'hover:border-purple-400',
            buttonColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        },
        {
            title: '예문 빈칸 채우기',
            icon: FileQuestion,
            description: '문맥에 맞는 적절한 단어를 선택하여 문장을 완성하세요. 실전 감각을 키워줍니다.',
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            hoverBorder: 'hover:border-blue-400',
            buttonColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        },
        {
            title: 'My Error Note',
            icon: GraduationCap,
            description: '틀린 문제만 모아서 집중적으로 복습하세요. 약점을 보완하여 완벽하게 마스터합니다.',
            color: 'text-red-500',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            hoverBorder: 'hover:border-red-400',
            buttonColor: 'bg-red-100 text-red-700 hover:bg-red-200'
        },
        {
            title: 'Flashcards',
            icon: Layers,
            description: '앞면은 단어, 뒷면은 뜻과 예문. 카드를 넘기며 효율적으로 암기 상태를 확인하세요.',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            hoverBorder: 'hover:border-emerald-400',
            buttonColor: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
        }
    ];

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header */}
            <header className="px-6 py-8 md:px-12 flex justify-between items-start border-b border-gray-100 bg-white sticky top-0 z-10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none mb-2 text-purple-950">
                        TESTING & REVIEW
                    </h1>
                    <div className="h-1 w-20 bg-purple-400 rounded-full mb-2"></div>
                    <p className="text-sm md:text-base text-gray-500 font-medium">
                        실전 감각을 키우고 약점을 보완하는 4단계 트레이닝
                    </p>
                </div>
                <Link href="/vocabulary#testing-review">
                    <Button variant="ghost" className="rounded-full hover:bg-purple-50 hover:text-purple-700 transition-colors border border-purple-200 text-purple-700 px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        BACK
                    </Button>
                </Link>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-3xl border-2 ${card.borderColor} ${card.bgColor} ${card.hoverBorder} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                        >
                            <div className="absolute top-8 right-8 p-3 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                                <card.icon className={`w-8 h-8 ${card.color}`} />
                            </div>

                            <div className="mt-4">
                                <h3 className={`text-2xl font-bold mb-3 ${card.color}`}>
                                    {card.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-8 pr-16 min-h-[3rem]">
                                    {card.description}
                                </p>

                                <Button
                                    className={`w-full rounded-xl py-6 text-base font-bold shadow-none ${card.buttonColor}`}
                                >
                                    START EXERCISE
                                    <Brain className="w-4 h-4 ml-2 opacity-60" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
