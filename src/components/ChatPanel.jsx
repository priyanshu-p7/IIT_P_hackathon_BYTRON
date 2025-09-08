import { useState, useEffect } from "react";
import { generateBotFullResponse } from "../utils/geminiAPI";
import ReactMarkdown from "react-markdown";
import { Mic, Volume2 } from "lucide-react";


const ChatPanel = ({ selectedLanguage, onRecommendations }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      // Remove fixed language to allow browser to auto-detect language
      rec.lang = '';
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      setRecognition(rec);
    }
  }, [selectedLanguage]);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage || 'en-US';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      // 🔹 Ask Gemini for places
      const inputWithHistory = `${input} ${messages.map((m) => m.text).join(" ")}`;
      const { places, textResponse } = await generateBotFullResponse(inputWithHistory);

      if (Array.isArray(places)) {
        // 🔹 Send places to App -> MapPanel
        onRecommendations(places);


        // 🔹 Add AI confirmation message
        if(places.length > 0){
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: `✅ Found ${places.length} places.` }
          ]);
        }
        
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: textResponse || "⚠️ Couldn't generate text." }
        ]);
        setInput("");
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
            className={`p-3 rounded-lg max-w-xs relative ${msg.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 text-gray-900"
              }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
            {msg.sender === "ai" && (
              <button
                onClick={() => speak(msg.text)}
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-800"
                title="Speak"
              >
                <Volume2 size={16} />
              </button>
            )}
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
          onClick={toggleListening}
          className={`px-3 py-2 rounded-lg ${isListening ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}
          disabled={!recognition}
          title={isListening ? 'Stop Listening' : 'Start Listening'}
        >
          <Mic size={20} />
        </button>
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
