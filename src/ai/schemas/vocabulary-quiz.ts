import { z } from 'zod';

export const VocabularyQuizOutputSchema = z.object({
  word: z.string().describe('The English TOEIC vocabulary word to be tested.'),
  options: z
    .array(z.string())
    .describe('An array of 4 short Korean definitions (단답형 한글 뜻).'),
  answer: z.string().describe('The correct Korean definition for the word.'),
  explanation: z
    .string()
    .describe(
      'A brief explanation in Korean of why the answer is correct, including an example English sentence and its Korean translation.'
    ),
});

export type VocabularyQuizOutput = z.infer<typeof VocabularyQuizOutputSchema>;
