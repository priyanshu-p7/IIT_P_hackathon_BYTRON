import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAMH7kU9SLQB6v_4J99IKQj6d_lwBQal1A";
const genAI = new GoogleGenerativeAI(API_KEY);

// ✨ Travel-focused Bot Response
export const generateBotResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 🔹 Stronger prompt to enforce JSON only
    const prompt = `
      You are a multilingual AI travel assistant.
      Respond ONLY with a valid JSON array of places.
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

      Example response:
      [
        {
          "id": 1,
          "name": "Eiffel Tower",
          "description": "Iconic Paris landmark with observation decks.",
          "rating": 4.8,
          "image": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
          "category": "Attractions",
          "position": [48.8584, 2.2945]
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // 🔹 Clean possible code block wrappers
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);

      // 🔹 Ensure each place has an id
      parsed = parsed.map((place, idx) => ({
        id: place.id ?? idx + 1,
        ...place,
      }));

      return parsed;
    } catch (e) {
      console.error("❌ Failed to parse AI response as JSON:", text);
      return [];
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return [];
  }
};

// ✨ Translation Helper
export const translateText = async (text, targetLanguage = "en") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Translate this text into **${targetLanguage}**.
      Return only the translated text, no explanations.
      Text: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error translating text:", error);
    return "⚠️ Sorry, I encountered an error translating the text.";
  }
};
