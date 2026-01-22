'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function VocabularyPage() {
  const vocabImage = PlaceHolderImages.find(img => img.id === 'vocab-promo');

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-8">
          <div>
            <Button
              asChild
              variant="ghost"
              className="pl-0 text-slate-600 hover:text-slate-900"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Main
              </Link>
            </Button>
          </div>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                  Core Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                  Testing & Review
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                  Personalization
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                  Motivation
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="py-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <p className="font-semibold text-primary">VOCABULARY ENGINE</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                문맥으로 학습하는
                <br />
                지능형 어휘 시스템
              </h1>
              <p className="text-lg text-slate-600">
                단순 암기는 이제 그만. The Core Balance의 Vocabulary Engine은
                단어가 실제 문장에서 어떻게 사용되는지에 집중합니다. AI가
                생성하는 다양한 문맥 속에서 단어의 뉘앙스를 파악하고, 자연스럽게
                머릿속에 각인시키세요.
              </p>
              <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">맞춤형 학습</h3>
                    <p className="text-slate-600">
                      AI가 사용자의 오답 패턴을 분석하여 개인에게 가장 필요한
                      단어를 우선적으로 추천합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      실전 감각 퀴즈
                    </h3>
                    <p className="text-slate-600">
                      매번 새로운 랜덤 퀴즈를 통해 실제 시험과 같은 긴장감
                      속에서 어휘 실력을 테스트할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800"
                asChild
              >
                <Link href="/vocabulary-quiz">지금 퀴즈 시작하기</Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              {vocabImage && (
                <Image
                  src={vocabImage.imageUrl}
                  alt={vocabImage.description}
                  width={600}
                  height={750}
                  className="h-full w-full object-cover"
                  data-ai-hint={vocabImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
