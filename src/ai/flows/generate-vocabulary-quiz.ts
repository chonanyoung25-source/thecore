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
The user needs to choose the definition that best fits the given word.
Provide a single TOEIC vocabulary word.
Provide 4 options, which are definitions. One of the definitions is the correct one.
Provide the correct definition as the answer.
Provide a clear and concise explanation for why the answer is correct, and include an example sentence using the word.
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
