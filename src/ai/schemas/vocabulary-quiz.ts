import { z } from 'zod';

export const VocabularyQuizOutputSchema = z.object({
  word: z.string().describe('The vocabulary word to be tested.'),
  options: z
    .array(z.string())
    .describe('An array of 4 definitions, one of which is correct.'),
  answer: z.string().describe('The correct definition for the word.'),
  explanation: z
    .string()
    .describe(
      'A brief explanation of why the answer is correct, including an example sentence.'
    ),
});

export type VocabularyQuizOutput = z.infer<typeof VocabularyQuizOutputSchema>;
