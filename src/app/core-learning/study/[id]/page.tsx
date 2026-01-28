'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { phase1 } from '@/data/vocabulary';

export default function StudyPage() {
    const params = useParams();
    const id = Number(params.id);

    // Currently only Phase 1 has real data
    const data = id === 1 ? phase1 : null;

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white text-slate-900">
                <h1 className="text-2xl font-bold mb-4">Phase {id} is coming soon!</h1>
                <Link href="/core-learning">
                    <Button variant="outline">Go Back</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-100">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/core-learning">
                            <Button variant="ghost" size="icon" className="hover:bg-cyan-50">
                                <ArrowLeft className="w-5 h-5 text-slate-500" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-cyan-950 flex items-center gap-2">
                                <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider">
                                    Phase {data.id}
                                </span>
                                {data.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Intro Section */}
                <section className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{data.subtitle}</h2>
                    <p className="text-slate-500 leading-relaxed">{data.description}</p>
                </section>

                {/* Learning Points */}
                <section className="mb-12">
                    <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-cyan-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-cyan-500" />
                            Learning Points
                        </h3>
                        <ul className="space-y-3">
                            {data.learningPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-cyan-100/50">
                                    <span className="bg-cyan-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="text-slate-700 text-sm md:text-base">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Word List Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-cyan-500" />
                            Vocabulary List
                            <span className="text-sm font-normal text-slate-400 ml-2">({data.words.length} words)</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.words.map((word) => (
                            <div key={word.id} className="group bg-white rounded-xl border border-slate-100 p-5 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/50 transition-all duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-mono text-cyan-300 text-sm">#{String(word.id).padStart(2, '0')}</span>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                                            {word.term}
                                        </h4>
                                    </div>
                                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                        {word.partOfSpeech}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <p className="text-slate-700 font-medium">{word.meaning}</p>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border-l-2 border-cyan-200 group-hover:bg-cyan-50/30 transition-colors">
                                    "{word.example}"
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
