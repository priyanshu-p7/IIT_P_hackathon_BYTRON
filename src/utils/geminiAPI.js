import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyBvkh9z7B3Jr4eldZExpT2D3PhldvLiSuk";
const API_KEY = "AIzaSyDeS0dATpxLCK_46HT8xCo6o1mVP1kfGvs";
const genAI = new GoogleGenerativeAI(API_KEY);

let CHAT_HISTORY = [];

// ✅ Combined response (JSON places + text explanation)
export const generateBotFullResponse = async (userMessage) => {
  let places = [];
  let textResponse = "";

  try {
    // ====== 1. JSON places response ======
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const jsonPrompt = `
      You are a multilingual AI travel assistant.
      Respond ONLY with a valid JSON array of places, restaurants, hotels (whichever user is asking about).
      Do not add any text before or after the JSON.

      Each place must include:
      - id (number, unique)
      - name (string)
      - description (string, max 2 sentences)
      - rating (number 1.0 - 5.0)
      - image (string, valid image URL)
      - category (one of: "Attractions", "Food", "Stay", "Emergency")
      - position (array: [latitude, longitude])

      User's message: "${userMessage}"
      Chat history: ${JSON.stringify(CHAT_HISTORY, null, 2)}

      
    `;

    console.log(CHAT_HISTORY);
    
    const jsonResult = await model.generateContent(jsonPrompt);
    let rawText = jsonResult.response.text().trim();
    rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

    try {
      places = JSON.parse(rawText);
      places = places.map((p, idx) => ({ id: p.id ?? idx + 1, ...p }));
    } catch (err) {
      console.error("❌ Failed to parse AI JSON:", rawText);
      places = [];
    }

    // ====== 2. Natural text response ======
    const textPrompt = `
      You are a *multilingual AI travel assistant*.
      - Always give accurate, concise, and friendly answers.
      - Focus on travel-related topics: tourist spots, hotels, restaurants, culture, routes, safety tips, history.
      - If the question is not about travel, politely redirect the user back to travel-related help.
      - Use simple sentences (2–6 lines max) and add bullet points if listing places.
      - Answer in the same language the user is using.

      User's message: "${userMessage}"
      Chat history: ${JSON.stringify(CHAT_HISTORY, null, 2)}
    `;

    const textResult = await model.generateContent(textPrompt);
    textResponse = textResult.response.text();
    // textResponse = textResponse.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Save both to chat history
    const historyEntry = {
      userMessage,
      textResponse,
      places,
      timestamp: new Date(),
    };
    CHAT_HISTORY.push(historyEntry);

    return { places, textResponse };
  } catch (error) {
    console.error("🔥 Error in generateBotFullResponse:", error);
    return { places: [], textResponse: "⚠️ Sorry, something went wrong." };
  }
};
