'use server';

/**
 * @fileOverview Generates a dynamic background for the TOEIC cover page using generative AI.
 *
 * - generateDynamicBackground - A function that generates the dynamic background.
 * - GenerateDynamicBackgroundInput - The input type for the generateDynamicBackground function.
 * - GenerateDynamicBackgroundOutput - The return type for the generateDynamicBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as fs from 'fs';

const GenerateDynamicBackgroundInputSchema = z.object({
  referenceImage: z
    .string()
    .describe(
      "A reference image for the background style, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateDynamicBackgroundInput = z.infer<typeof GenerateDynamicBackgroundInputSchema>;

const GenerateDynamicBackgroundOutputSchema = z.object({
  backgroundImage: z
    .string()
    .describe('The generated dynamic background image as a data URI.'),
});
export type GenerateDynamicBackgroundOutput = z.infer<typeof GenerateDynamicBackgroundOutputSchema>;

export async function generateDynamicBackground(
  input: GenerateDynamicBackgroundInput
): Promise<GenerateDynamicBackgroundOutput> {
  return generateDynamicBackgroundFlow(input);
}

const generateDynamicBackgroundFlow = ai.defineFlow(
  {
    name: 'generateDynamicBackgroundFlow',
    inputSchema: GenerateDynamicBackgroundInputSchema,
    outputSchema: GenerateDynamicBackgroundOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {media: {url: input.referenceImage}},
        {
          text:
            'generate a dynamic background based on this image, create subtle animations and dynamic effects to enhance the cover page visual appeal.',
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media) {
      throw new Error('no media returned');
    }

    return {backgroundImage: media.url};
  }
);
