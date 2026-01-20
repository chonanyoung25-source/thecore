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
