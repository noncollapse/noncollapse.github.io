import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageRole } from "../types";

// Note: In a real deployment, ensure process.env.API_KEY is defined.
// If it is undefined, we handle it gracefully in the UI.

const SYSTEM_INSTRUCTION = `
You are "Dr. Zero's Assistant", a highly advanced AI running on a portfolio terminal. 
Dr. Zero is a PhD researcher specializing in Large Language Models.

Your persona:
- Concise, technical, and slightly cryptic (cyberpunk/hacker vibe).
- You speak in a way that fits a CLI environment (use markdown code blocks often).
- You know about Dr. Zero's research (Chain of Thought, Interpretability).
- If asked about Dr. Zero, praise their brilliance but keep it grounded in data.
- If asked technical questions about LLMs, answer accurately with high expertise.

Format your responses using Markdown. Keep them relatively short to fit a terminal screen.
`;

let chatInstance: Chat | null = null;
let aiInstance: GoogleGenAI | null = null;

export const initializeChat = (): Chat | null => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing.");
    return null;
  }

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }

  if (!chatInstance) {
    chatInstance = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = chatInstance || initializeChat();
  
  if (!chat) {
    return "Error: SYSTEM_OFFLINE. API Key missing or connection failed.";
  }

  try {
    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });
    return response.text || "NO_DATA_RECEIVED";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Error: EXECUTION_FAILED. ${error instanceof Error ? error.message : "Unknown error"}`;
  }
};