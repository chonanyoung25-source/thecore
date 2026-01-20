'use client';

import { generateVocabularyQuiz, VocabularyQuizOutput } from '@/ai/flows/generate-vocabulary-quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VocabularyQuizPage() {
  const [quiz, setQuiz] = useState<VocabularyQuizOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const fetchQuiz = async () => {
    setLoading(true);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuiz(null);
    try {
      const newQuiz = await generateVocabularyQuiz();
      setQuiz(newQuiz);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswer = (option: string) => {
    if (answered || !quiz) return;
    setAnswered(true);
    setSelectedAnswer(option);
  };

  const isCorrect = quiz && selectedAnswer === quiz.answer;

  const sentenceParts = quiz?.sentence.split('_____');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Vocabulary Quiz</CardTitle>
            <CardDescription>Choose the word that best fits the sentence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating a new question...</p>
              </div>
            )}
            {quiz && !loading && (
              <div className="space-y-4">
                {sentenceParts && (
                  <p className="text-lg text-center font-serif text-foreground/90 py-8">
                    {sentenceParts[0]}
                    <span className="font-bold text-xl text-primary underline decoration-dotted underline-offset-4 mx-2">
                      __________
                    </span>
                    {sentenceParts[1]}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quiz.options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        answered && option === quiz.answer
                          ? 'default'
                          : answered && option === selectedAnswer && option !== quiz.answer
                          ? 'destructive'
                          : 'outline'
                      }
                      className={cn(
                        'h-auto justify-start p-4 text-left transition-all',
                        {
                          'opacity-60':
                            answered && option !== quiz.answer && option !== selectedAnswer,
                        }
                      )}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {answered && (
                  <div
                    className={cn(
                      'rounded-md border p-4',
                      isCorrect
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-destructive/10 border-destructive/20'
                    )}
                  >
                    <h4
                      className={cn(
                        'font-bold',
                        isCorrect ? 'text-primary' : 'text-destructive'
                      )}
                    >
                      {isCorrect ? 'Correct!' : `Incorrect. The correct answer is "${quiz.answer}".`}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">{quiz.explanation}</p>
                  </div>
                )}
                <Button onClick={fetchQuiz} className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'New Question'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
