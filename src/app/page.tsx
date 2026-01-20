import DynamicBackground from '@/components/dynamic-background';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  BarChartBig,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import type { ReactNode } from 'react';
import CoreVisualization from '@/components/core-visualization';

const Feature = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <DynamicBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/80 to-background" />

      <div className="z-10 w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-8 text-center md:items-start md:text-left">
            <div className="flex items-center space-x-4">
              <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl animated-gradient-text">
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
              <span className="font-bold text-foreground">
                지금 바로 실천해보세요.
              </span>
            </p>

            <div className="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="h-auto px-8 py-4 font-headline text-lg font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto border-2 bg-background/50 px-8 py-4 font-headline text-lg font-bold backdrop-blur-sm transition-all hover:scale-105"
              >
                Explore Features
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <CoreVisualization />
          </div>
        </div>
      </div>


      <div className="absolute bottom-16 z-10 flex w-full flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-foreground/70">
        <Feature
          icon={<BookOpen className="h-5 w-5 text-accent" />}
          text="Comprehensive Content"
        />
        <Feature
          icon={<BarChartBig className="h-5 w-5 text-accent" />}
          text="Personalized Analytics"
        />
        <Feature
          icon={<GraduationCap className="h-5 w-5 text-accent" />}
          text="Expert Strategies"
        />
      </div>

      <footer className="absolute bottom-4 z-10 w-full text-center text-xs text-foreground/50">
        <p>
          &copy; {new Date().getFullYear()} The Core Balance-TOEIC. All Rights
          Reserved.
        </p>
      </footer>
    </main>
  );
}
