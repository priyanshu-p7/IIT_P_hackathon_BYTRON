import { useState } from "react";
import { generateBotResponse } from "../utils/geminiAPI";

const ChatPanel = ({ selectedLanguage, onRecommendations }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      // 🔹 Ask Gemini for places
      const inputWithHistory = `${input} ${messages.map((m) => m.text).join(" ")}`;
      const places = await generateBotResponse(inputWithHistory);

      if (Array.isArray(places)) {
        // 🔹 Send places to App -> MapPanel
        onRecommendations(places);

        // 🔹 Add AI confirmation message
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: `✅ Found ${places.length} places.` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ Couldn't fetch travel recommendations." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error while fetching response." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xs ${msg.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 text-gray-900"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a destination..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
