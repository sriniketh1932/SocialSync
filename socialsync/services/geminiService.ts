import { GoogleGenAI } from "@google/genai";

export const enhanceDescription = async (rawText: string, type: string): Promise<string> => {
  if (!rawText) return "";
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are an expert copywriter for a high-end social meetup app.
      Rewrite the following event description to be engaging, trustworthy, and clear.
      The event type is "${type}".
      Keep it under 50 words.
      Add relevant emojis.
      
      Raw Text: "${rawText}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || rawText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return rawText; // Fallback
  }
};

export const generateSafetyTips = async (eventType: string): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Give 3 short, bullet-point safety tips for someone attending a "${eventType}" meetup with strangers.
      Return ONLY a JSON array of strings. No markdown formatting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let text = response.text;
    if (!text) return ["Meet in a public place", "Tell a friend where you are going", "Trust your instincts"];
    
    // Clean up potential markdown code blocks to prevent JSON parse errors
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Safety Tips Error:", error);
    return ["Meet in a public place", "Tell a friend where you are going", "Trust your instincts"];
  }
};