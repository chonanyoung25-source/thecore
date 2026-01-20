'use server';

/**
 * @fileOverview Generates a random TOEIC vocabulary quiz.
 *
 * - generateVocabularyQuiz - A function that generates the quiz.
 * - VocabularyQuizOutput - The return type for the generateVocabularyQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const VocabularyQuizOutputSchema = z.object({
  sentence: z
    .string()
    .describe('A sentence with a blank (_____) where a word is missing.'),
  options: z.array(z.string()).describe('An array of 4 word options.'),
  answer: z.string().describe('The correct word that fills the blank.'),
  explanation: z
    .string()
    .describe('A brief explanation of why the answer is correct.'),
});
export type VocabularyQuizOutput = z.infer<typeof VocabularyQuizOutputSchema>;

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
