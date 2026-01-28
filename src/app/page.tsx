import DynamicBackground from '@/components/dynamic-background';
import CoreVisualization from '@/components/core-visualization';
import Link from 'next/link';
import {
  BookOpenText,
  Headphones,
  FileText,
  Zap,
  Target,
  BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <section
        id="main"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden scroll-mt-20 min-h-screen py-20"
      >
        <DynamicBackground />

        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-8">
          <div>
            <p className="font-headline text-lg font-bold text-foreground">
              Cho Nanyoung
            </p>
          </div>
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  href="#main"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Main
                </Link>
              </li>
              <li>
                <Link
                  href="#structure"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Structure
                </Link>
              </li>
              <li>
                <Link
                  href="/vocabulary"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link
                  href="#philosophy"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Listening
                </Link>
              </li>
              <li>
                <Link
                  href="#philosophy"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Reading
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/80 to-background" />

        <div className="z-10 w-full max-w-7xl px-4 mt-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-8 text-center md:items-start md:text-left">
              <div className="flex items-center space-x-4">
                <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl animated-gradient-text mt-8">
                  The Core Balance-TOEIC
                </h1>
              </div>

              <p className="max-w-2xl text-lg text-foreground/80 md:text-xl">
                토익의 본질은{' '}
                <span className="font-bold text-foreground">
                  Vocabulary, Listening, and Reading
                </span>{' '}
                세 가지{' '}
                <span className="font-bold text-foreground">Balance</span>
                에 있습니다. 흔들리지 않는 실력의 시작,{' '}
                <span className="font-bold text-foreground underline decoration-accent underline-offset-4">
                  지금 바로 실천해보세요.
                </span>
              </p>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <CoreVisualization />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Link href="/vocabulary" className="block h-full">
              <div className="h-full rounded-2xl border border-primary/20 bg-primary/10 p-10 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/20">
                <div className="flex items-center gap-4">
                  <BookOpenText className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Vocabulary</h3>
                </div>
                <p className="mt-4 text-foreground/80">문맥으로 이해하는 지능형 어휘 학습</p>
              </div>
            </Link>
            <Link href="#" className="block h-full">
              <div className="h-full rounded-2xl border border-primary/20 bg-primary/10 p-10 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/20">
                <div className="flex items-center gap-4">
                  <Headphones className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Listening</h3>
                </div>
                <p className="mt-4 text-foreground/80">실전 감각을 키우는 정밀 청취 훈련</p>
              </div>
            </Link>
            <Link href="/reading" className="block h-full">
              <div className="h-full rounded-2xl border border-primary/20 bg-primary/10 p-10 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/20">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Reading</h3>
                </div>
                <p className="mt-4 text-foreground/80">속도와 정확도를 높이는 독해 분석</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full bg-white text-slate-800">
        <div className="mx-auto max-w-6xl space-y-32 px-4 py-24 sm:px-6 lg:px-8">
          <section
            id="structure"
            className="flex flex-col items-center scroll-mt-20"
          >
            <div className="flex flex-col items-center text-center mb-12">
              <p className="font-semibold text-primary uppercase tracking-widest text-sm">Test Overview</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                토익 시험 구성 및 배점
              </h2>
            </div>

            <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">영역</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">파트</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">문항 번호</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">문항 수</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">주요 내용</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">소요 시간</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-[11px]">배점</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-6 font-black text-slate-900 bg-slate-50/50 text-center" rowSpan={4}>LC<br /><span className="text-[10px] font-normal text-slate-500">(듣기)</span></td>
                      <td className="px-6 py-5 font-semibold text-slate-700">Part 1</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">1 ~ 6</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">6문항</td>
                      <td className="px-6 py-5 text-slate-600">사진 묘사</td>
                      <td className="px-6 py-5 text-slate-900 font-bold text-center" rowSpan={4}>약 45분</td>
                      <td className="px-6 py-5 text-primary font-black text-center" rowSpan={4}>5<br />~<br />495점</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-700 border-l border-slate-100">Part 2</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">7 ~ 31</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">25문항</td>
                      <td className="px-6 py-5 text-slate-600">질의 응답</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-700 border-l border-slate-100">Part 3</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">32 ~ 70</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">39문항</td>
                      <td className="px-6 py-5 text-slate-600">짧은 대화 (2~3인)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-700 border-l border-slate-100">Part 4</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">71 ~ 100</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">30문항</td>
                      <td className="px-6 py-5 text-slate-600">짧은 담화 (1인)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors border-t-2 border-slate-200">
                      <td className="px-6 py-6 font-black text-slate-900 bg-slate-50/50 text-center" rowSpan={3}>RC<br /><span className="text-[10px] font-normal text-slate-500">(읽기)</span></td>
                      <td className="px-6 py-5 font-semibold text-slate-700">Part 5</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">101 ~ 130</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">30문항</td>
                      <td className="px-6 py-5 text-slate-600">단문 공란 채우기 (문법/어휘)</td>
                      <td className="px-6 py-5 text-slate-900 font-bold text-center" rowSpan={3}>75분</td>
                      <td className="px-6 py-5 text-primary font-black text-center" rowSpan={3}>5<br />~<br />495점</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-700 border-l border-slate-100">Part 6</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">131 ~ 146</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">16문항</td>
                      <td className="px-6 py-5 text-slate-600">장문 공란 채우기</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-700 border-l border-slate-100">Part 7</td>
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">147 ~ 200</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">54문항</td>
                      <td className="px-6 py-5 text-slate-600">독해 (단일/이중/삼중 지문)</td>
                    </tr>
                    <tr className="bg-slate-900 text-white border-t-2 border-slate-900">
                      <td className="px-6 py-6 font-black text-white text-center">총계</td>
                      <td className="px-6 py-6 font-bold border-l border-slate-800">7개 파트</td>
                      <td className="px-6 py-6 font-mono text-sm">1 ~ 200</td>
                      <td className="px-6 py-6 font-black uppercase tracking-tight">총 200문항</td>
                      <td className="px-6 py-6 font-medium text-slate-300">비즈니스 및 일상 영어</td>
                      <td className="px-6 py-6 font-black text-yellow-400 text-center">약 120분</td>
                      <td className="px-6 py-6 font-black text-emerald-400 text-lg text-center whitespace-nowrap">10 ~ 990점</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section
            id="philosophy"
            className="flex flex-col items-center text-center scroll-mt-20"
          >
            <p className="font-semibold text-primary">THE PHILOSOPHY</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              균형 잡힌 데이터가
              <br />
              당신의 점수를 결정합니다.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              단순한 문제 풀이를 넘어, 토익의 3가지 핵심 축인 어휘력, 청취력,
              독해력의 완벽한 밸런스를 측정합니다. The Core Balance-Toeic은
              당신의 취약점을 정밀 분석하여 가장 빠른 목표 달성 경로를
              제시합니다.
            </p>

            <div className="mt-20 grid w-full max-w-none grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-100/80 p-8 text-left">
                <BookOpenText className="h-8 w-8 text-primary" />
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Vocabulary Engine
                </h3>
                <p className="mt-2 text-slate-600">
                  단순 암기가 아닌 문맥 속 의미를 파악하는 지능형 어휘 학습
                  시스템. 빈출 순위와 오답들을 기반으로 개인 맞춤형 단어장을
                  생성합니다.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100/80 p-8 text-left">
                <Headphones className="h-8 w-8 text-primary" />
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Listening Precision
                </h3>
                <p className="mt-2 text-slate-600">
                  국가별 억양과 소음이 섞인 실제 시험 환경을 완벽 구현. 파트별
                  핵심 키워드를 잡아내는 청취 훈련 모듈을 제공합니다.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100/80 p-8 text-left">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Reading Analytics
                </h3>
                <p className="mt-2 text-slate-600">
                  장문 독해의 속도와 정확도를 동시에 향상시킵니다. 문장 구조
                  분석 엔진을 통해 복잡한 비즈니스 문서를 빠르게 독해하는 능력을
                  키워줍니다.
                </p>
              </div>
            </div>
          </section>

          <section
            id="next-gen"
            className="grid items-center gap-16 md:grid-cols-2 lg:gap-24 scroll-mt-20"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-slate-900 p-8 text-center text-white shadow-2xl">
                <Zap className="h-10 w-10 text-yellow-400" />
                <p className="mt-4 text-5xl font-bold">98%</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-400">
                  EFFICIENCY
                </p>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-slate-100/80 p-8 text-center shadow-lg">
                <Target className="h-10 w-10 text-primary" />
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  Target
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-500">
                  PRECISION
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-6 rounded-2xl bg-slate-100/80 p-8 text-left shadow-lg">
                <BarChart2 className="h-10 w-10 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Smart Analytics
                  </h3>
                  <p className="mt-1 text-slate-600">
                    실시간 데이터 트래킹으로 매일 성장하는 실력을 확인하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-semibold text-primary">NEXT-GEN TECHNOLOGY</p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                성장을 위한
                <br />
                스마트한 데이터 분석
              </h2>
              <p className="text-lg text-slate-600">
                The Core Balance는 단순한 학습 툴이 아닙니다. 매일 업데이트되는
                방대한 토익 데이터를 분석하여 최신 출제 경향을 반영하고,
                사용자의 패턴을 학습하여 최적의 오답 노트를 자동 생성합니다.
              </p>
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800"
                asChild
              >
                <Link href="#">지금 시작하기</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} The Core Balance-TOEIC. All Rights
          Reserved.
        </p>
      </footer>
    </main>
  );
}
