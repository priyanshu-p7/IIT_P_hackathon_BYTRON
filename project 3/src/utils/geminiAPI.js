import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// ✨ Travel-focused Bot Response
export const generateBotResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Strong system-style prompt
    const prompt = `
      You are a **multilingual AI travel assistant**. 
      - Always give accurate, concise, and friendly answers.  
      - Focus on travel-related topics: tourist spots, hotels, restaurants, culture, routes, safety tips, history.  
      - If the question is not about travel, politely redirect the user back to travel-related help.  
      - Use simple sentences (2–4 lines max) and add bullet points if listing places.  
      - Answer in the same language the user is using.  

      User's message: "${userMessage}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Error generating response:', error);
    return '⚠️ Sorry, I encountered an error. Please try again.';
  }
};

// ✨ Translation Helper
export const translateText = async (text, targetLanguage = 'en') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Translate this text into **${targetLanguage}**. 
      Return only the translated text, no explanations.
      Text: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Error translating text:', error);
    return '⚠️ Sorry, I encountered an error translating the text.';
  }
};