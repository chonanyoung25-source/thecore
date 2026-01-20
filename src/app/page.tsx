import DynamicBackground from '@/components/dynamic-background';
import CoreVisualization from '@/components/core-visualization';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <DynamicBackground />

      <header className="absolute top-0 right-0 z-20 p-8">
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="#"
                className="font-headline text-foreground/80 transition-colors hover:text-foreground"
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-headline text-foreground/80 transition-colors hover:text-foreground"
              >
                Vocabulary
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-headline text-foreground/80 transition-colors hover:text-foreground"
              >
                Listening
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-headline text-foreground/80 transition-colors hover:text-foreground"
              >
                Reading
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/80 to-background" />

      <div className="z-10 w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-8 text-center md:items-start md:text-left -mt-8">
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
              <span className="font-bold text-foreground underline decoration-accent underline-offset-4">
                지금 바로 실천해보세요.
              </span>
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <CoreVisualization />
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 z-10 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
        <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-foreground">
              Vocabulary
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-foreground">
              Listening
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-foreground">
              Reading
            </CardTitle>
          </CardHeader>
        </Card>
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
