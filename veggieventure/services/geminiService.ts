
import { GoogleGenAI, Type } from "@google/genai";
import { FunFact } from "../types";

export const getFunFact = async (itemName: string): Promise<FunFact> => {
  // Fix: Initialize GoogleGenAI with process.env.API_KEY directly as a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give me a kid-friendly fun fact and a silly joke about ${itemName}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: {
              type: Type.STRING,
              description: 'A simple, amazing fact for kids about the food item.',
            },
            joke: {
              type: Type.STRING,
              description: 'A silly, G-rated joke about the food item.',
            },
          },
          required: ["fact", "joke"],
        },
      },
    });

    // Fix: response.text is a property getter, not a method
    const jsonStr = response.text?.trim() || '{"fact": "Error loading fact.", "joke": "Why did the fruit cross the road? To get to the other side!"}';
    return JSON.parse(jsonStr) as FunFact;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      fact: `Did you know that ${itemName} is super healthy for your growing body?`,
      joke: `What is ${itemName}'s favorite music? Rock 'n' Roll!`
    };
  }
};
