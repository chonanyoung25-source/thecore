'use client';

import { generateVocabularyQuiz } from '@/ai/flows/generate-vocabulary-quiz';
import { VocabularyQuizOutput } from '@/ai/schemas/vocabulary-quiz';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { addErrorWord } from '@/lib/error-note-storage';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VocabularyQuizPage() {
  const [quiz, setQuiz] = useState<VocabularyQuizOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [addedToErrorNote, setAddedToErrorNote] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuiz(null);
    setAddedToErrorNote(false);
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

    // If answer is wrong, add to error notes
    if (option !== quiz.answer) {
      // Generate a unique ID for AI-generated quiz words
      const wordId = `quiz-${quiz.word.toLowerCase()}`;
      addErrorWord(
        wordId,
        quiz.word,
        quiz.answer,
        'n./v./adj.', // We don't have part of speech from AI quiz
        quiz.explanation,
        0 // Phase 0 for AI-generated quizzes
      );
      setAddedToErrorNote(true);
    }
  };

  const isCorrect = quiz && selectedAnswer === quiz.answer;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
            <Link href="/error-note" className="flex items-center gap-2">
              📝 My Error Note
            </Link>
          </Button>
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Vocabulary Quiz</CardTitle>
            <CardDescription>
              Choose the definition that best fits the word.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Generating a new question...
                </p>
              </div>
            )}
            {quiz && !loading && (
              <div className="space-y-4">
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    What is the meaning of this word?
                  </p>
                  <h2 className="text-4xl font-bold text-primary tracking-tight">
                    {quiz.word}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {quiz.options.map((option) => (
                    <Button
                      key={option}
                      variant={
                        answered && option === quiz.answer
                          ? 'default'
                          : answered &&
                            option === selectedAnswer &&
                            option !== quiz.answer
                            ? 'destructive'
                            : 'outline'
                      }
                      className={cn(
                        'h-auto justify-start p-4 text-left transition-all leading-normal',
                        {
                          'opacity-60':
                            answered &&
                            option !== quiz.answer &&
                            option !== selectedAnswer,
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
                      {isCorrect ? 'Correct!' : `Incorrect.`}
                    </h4>
                    {!isCorrect && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        The correct answer is:{' '}
                        <span className="font-semibold text-foreground">
                          {quiz.answer}
                        </span>
                      </p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {quiz.explanation}
                    </p>
                    {addedToErrorNote && (
                      <div className="mt-3 flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-md">
                        <span className="text-purple-600">📝</span>
                        <p className="text-sm text-purple-700 font-medium">
                          오답 노트에 추가되었습니다!
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <Button
                  onClick={fetchQuiz}
                  className="w-full"
                  disabled={loading}
                >
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
