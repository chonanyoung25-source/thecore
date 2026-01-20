'use server';

/**
 * @fileOverview Generates a random TOEIC vocabulary quiz.
 *
 * - generateVocabularyQuiz - A function that generates the quiz.
 */

import { ai } from '@/ai/genkit';
import {
  VocabularyQuizOutput,
  VocabularyQuizOutputSchema,
} from '@/ai/schemas/vocabulary-quiz';

export async function generateVocabularyQuiz(): Promise<VocabularyQuizOutput> {
  return generateVocabularyQuizFlow();
}

const prompt = ai.definePrompt({
  name: 'generateVocabularyQuizPrompt',
  output: { schema: VocabularyQuizOutputSchema },
  prompt: `You are an expert TOEIC test creator.
Generate a single multiple-choice vocabulary question suitable for the TOEIC test.
The user needs to choose the word that best completes the sentence.
Provide a sentence with a single blank (represented as _____).
Provide 4 options, one of which is the correct answer.
Provide the correct answer.
Provide a clear and concise explanation for the correct answer.
Ensure the difficulty is appropriate for a student aiming for a high TOEIC score.`,
});

const generateVocabularyQuizFlow = ai.defineFlow(
  {
    name: 'generateVocabularyQuizFlow',
    outputSchema: VocabularyQuizOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
