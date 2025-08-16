
import { GoogleGenAI, Type } from "@google/genai";
import type { Scene } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const adventureStepSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A vivid, engaging description of the current scene and story development. Should be about 2-3 paragraphs long.",
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of 3 distinct, actionable choices for the player.",
      items: { type: Type.STRING },
    },
    imagePrompt: {
      type: Type.STRING,
      description: "A detailed, artistic prompt for an image generator based on the scene description. e.g., 'An ancient, moss-covered stone altar in a glowing cavern, fantasy, detailed, epic lighting'.",
    },
  },
  required: ["description", "choices", "imagePrompt"],
};

const generateImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: `${prompt}, dark fantasy art, cinematic, detailed, epic`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error('Image generation failed, no images returned.');
  }
  
  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

const getSystemInstruction = (history: string[]): string => {
  const storySoFar = history.length > 0
    ? `Here is the story so far:\n${history.join('\n---\n')}`
    : "This is the very beginning of the adventure.";

  return `You are the Dungeon Master for a dynamic, text-based, high-fantasy adventure game. Your goal is to create an immersive and continuous narrative.
${storySoFar}
Based on the player's last choice, you must continue the story.
- Describe the new scene vividly and engagingly.
- The story should be coherent and build upon previous events.
- Provide exactly 3 distinct, interesting, and actionable choices for the player.
- Generate a detailed, artistic prompt for an image generator that captures the essence of the scene.
- Adhere strictly to the provided JSON schema for your response.`;
};

export const generateAdventureStep = async (history: string[], playerChoice: string): Promise<Scene> => {
  const systemInstruction = getSystemInstruction(history);
  const prompt = `The player chose: "${playerChoice}". Now, continue the story.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: adventureStepSchema,
    },
  });

  if (!response.text) {
    throw new Error('Received an empty response from Gemini text generation.');
  }

  const parsedResponse = JSON.parse(response.text);

  if (!parsedResponse.description || !parsedResponse.choices || !parsedResponse.imagePrompt) {
      throw new Error("Invalid JSON structure from Gemini.");
  }

  const imageUrl = await generateImage(parsedResponse.imagePrompt);

  return {
    description: parsedResponse.description,
    choices: parsedResponse.choices,
    imageUrl,
  };
};
