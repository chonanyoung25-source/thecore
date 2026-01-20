import DynamicBackground from '@/components/dynamic-background';
import CoreVisualization from '@/components/core-visualization';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import { BookOpenText, Headphones, FileText } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const vocabImage = PlaceHolderImages.find(p => p.id === 'vocab-promo');
  const listeningImage = PlaceHolderImages.find(p => p.id === 'listening-promo');
  const readingImage = PlaceHolderImages.find(p => p.id === 'reading-promo');

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground">
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
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
                  href="#"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Main
                </Link>
              </li>
              <li>
                <Link
                  href="#vocabulary"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link
                  href="#listening"
                  className="font-headline text-foreground/80 transition-colors hover:text-foreground"
                >
                  Listening
                </Link>
              </li>
              <li>
                <Link
                  href="#reading"
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
            <div className="flex flex-col items-center space-y-8 text-center md:items-start md:text-left -mt-24">
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

        <div className="absolute bottom-16 z-10 grid w-full max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-3">
          <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
            <CardHeader className="py-12 px-6">
              <div className="flex items-center gap-4">
                <BookOpenText className="w-8 h-8 text-foreground" />
                <CardTitle className="text-xl font-semibold text-foreground">
                  Vocabulary
                </CardTitle>
              </div>
              <CardDescription className="text-foreground/80 mt-2">
                Expand your word power.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
            <CardHeader className="py-12 px-6">
              <div className="flex items-center gap-4">
                <Headphones className="w-8 h-8 text-foreground" />
                <CardTitle className="text-xl font-semibold text-foreground">
                  Listening
                </CardTitle>
              </div>
              <CardDescription className="text-foreground/80 mt-2">
                Sharpen your listening skills.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-accent/30 bg-accent/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
            <CardHeader className="py-12 px-6">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-foreground" />
                <CardTitle className="text-xl font-semibold text-foreground">
                  Reading
                </CardTitle>
              </div>
              <CardDescription className="text-foreground/80 mt-2">
                Improve your reading comprehension.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <footer className="absolute bottom-4 z-10 w-full text-center text-xs text-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} The Core Balance-TOEIC. All
            Rights Reserved.
          </p>
        </footer>
      </section>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl space-y-32 px-4 py-24 sm:px-6 lg:px-8">
          {vocabImage && (
            <section
              id="vocabulary"
              className="grid items-center gap-12 md:grid-cols-2 lg:gap-24 scroll-mt-20"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src={vocabImage.imageUrl}
                  alt={vocabImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={vocabImage.imageHint}
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                  Unlock a World of Words
                </h2>
                <p className="text-lg text-gray-700">
                  Build a powerful vocabulary foundation. Our tools help you learn
                  and retain TOEIC-specific words efficiently, boosting your score
                  across all sections.
                </p>
                <Button size="lg" asChild>
                  <Link href="#">Start Learning Vocabulary</Link>
                </Button>
              </div>
            </section>
          )}

          {listeningImage && (
            <section
              id="listening"
              className="grid items-center gap-12 md:grid-cols-2 lg:gap-24 scroll-mt-20"
            >
              <div className="space-y-6 md:order-last">
                <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                  Sharpen Your Listening Comprehension
                </h2>
                <p className="text-lg text-gray-700">
                  From short talks to full conversations, train your ear to catch
                  every detail. Practice with a wide range of accents and
                  real-world scenarios.
                </p>
                <Button size="lg" asChild>
                  <Link href="#">Practice Listening</Link>
                </Button>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src={listeningImage.imageUrl}
                  alt={listeningImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={listeningImage.imageHint}
                />
              </div>
            </section>
          )}

          {readingImage && (
            <section
              id="reading"
              className="grid items-center gap-12 md:grid-cols-2 lg:gap-24 scroll-mt-20"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src={readingImage.imageUrl}
                  alt={readingImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={readingImage.imageHint}
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                  Read with Confidence and Speed
                </h2>
                <p className="text-lg text-gray-700">
                  Tackle any passage, from emails to articles. Improve your
                  reading speed and comprehension skills to ace the reading
                  section.
                </p>
                <Button size="lg" asChild>
                  <Link href="#">Start Reading</Link>
                </Button>
              </div>
            </section>
          )}
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
