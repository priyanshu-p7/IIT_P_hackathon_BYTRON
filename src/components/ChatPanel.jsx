import React, { useState } from 'react';
import { Send, Mic, AlertTriangle, Globe, MapPin, Calendar } from 'lucide-react';
import { generateBotResponse, translateText } from '../utils/geminiAPI';

const ChatPanel = ({ selectedLanguage }) => {
  const languageMap = {
    'English': 'en',
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Italian': 'it',
    'Japanese': 'ja',
    'Chinese': 'zh'
  };

  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your travel assistant. How can I help you explore today?",
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'user',
      content: "I'm looking for good restaurants near me",
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'bot',
      content: "I've found several great restaurants in your area! Check the map on the right to see their locations, or I can provide more details about specific cuisines.",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const quickActions = [
  //   { icon: AlertTriangle, label: 'Emergency Help', color: 'bg-red-600 hover:bg-red-700' },
  //   { icon: Globe, label: 'Translate', color: 'bg-emerald-600 hover:bg-emerald-700' },
  //   { icon: MapPin, label: 'Popular Attractions', color: 'bg-blue-600 hover:bg-blue-700' },
  //   { icon: Calendar, label: 'Book Services', color: 'bg-amber-600 hover:bg-amber-700' },
  // ];

  const handleQuickAction = async (label) => {
    if (label === 'Translate') {
      if (messages.length === 0) return;
      const lastUserMessage = [...messages].reverse().find(m => m.type === 'user');
      if (!lastUserMessage) return;

      setIsLoading(true);
      try {
        const targetLangCode = languageMap[selectedLanguage] || 'en';
        const translatedText = await translateText(lastUserMessage.content, targetLangCode);
        const translationMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: translatedText,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, translationMessage]);
      } catch (error) {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Sorry, I encountered an error while translating.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        const botContent = await generateBotResponse(inputMessage);
        const botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botContent,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        const errorResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">TA</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Travel Assistant</h3>
            <p className="text-sm text-emerald-600">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        {/* <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.label)}
                className={`${action.color} text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2`}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div> */}

        {/* Message Input */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
