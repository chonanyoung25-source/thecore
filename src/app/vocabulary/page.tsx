'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Menu,
  PlayCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import DynamicBackground from '@/components/dynamic-background';
import CoreVisualization from '@/components/core-visualization';

export default function VocabularyPage() {
  const vocabImage = PlaceHolderImages.find(img => img.id === 'vocab-promo');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DynamicBackground />
      <div className="relative z-10 mx-auto min-h-screen flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-8">
          <div>
            <p className="font-headline text-lg font-bold text-foreground">
              CHO NANYOUNG
            </p>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-8">
               <li>
                <Link href="#" className="font-headline text-sm text-foreground/80 transition-colors hover:text-foreground">
                  WORD LIST
                </Link>
              </li>
              <li>
                <Link href="#" className="font-headline text-sm text-foreground/80 transition-colors hover:text-foreground">
                  DAILY QUIZ
                </Link>
              </li>
              <li>
                <Link href="#" className="font-headline text-sm text-foreground/80 transition-colors hover:text-foreground">
                  MY PROGRESS
                </Link>
              </li>
              <li>
                <Link href="#" className="font-headline text-sm text-foreground/80 transition-colors hover:text-foreground">
                  RESOURCES
                </Link>
              </li>
            </ul>
             <Button variant="outline" size="sm" className="rounded-full border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">PREMIUM</Button>
            <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
            </Button>
          </nav>
           <div className="md:hidden">
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
           <div className="space-y-8">
              <p className="font-semibold text-primary tracking-widest">THE CORE BALANCE-TOEIC</p>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
                Vocabulary
              </h1>
              <p className="text-lg text-foreground/80 max-w-md">
                목표 점수 달성을 위한 핵심 토익 단어 마스터
                <br />
                AI 기반 데이터 분석으로 가장 효율적인 학습을 제안합니다
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-black rounded-full h-12 px-8 text-base font-semibold hover:bg-gray-200"
                  asChild
                >
                  <Link href="/vocabulary-quiz">START LEARNING</Link>
                </Button>
                 <Button variant="link" className="text-white" asChild>
                    <Link href="#" className="flex items-center gap-2">
                        <PlayCircle className="h-6 w-6" />
                        HOW IT WORKS
                    </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center -mr-24">
              <CoreVisualization />
            </div>
        </section>
      </div>
    </main>
  );
}
