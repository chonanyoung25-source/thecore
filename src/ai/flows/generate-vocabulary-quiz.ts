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
  prompt: `You are an expert TOEIC test creator, fluent in both English and Korean.
Generate one multiple-choice vocabulary question for a Korean-speaking user.
The user must choose the correct Korean meaning for the given English word.

- **Word**: Provide a single English TOEIC vocabulary word.
- **Options**: Provide 4 options. Each must be a short, single-word or phrase Korean definition (단답형 한글 뜻). One of them must be the correct one.
- **Answer**: Provide the correct Korean definition from the options.
- **Explanation**: Provide a clear, concise explanation in Korean about why the answer is correct. Include an example sentence in English using the word, along with its Korean translation.
- **Difficulty**: Ensure the difficulty is appropriate for a student aiming for a high TOEIC score.`,
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
