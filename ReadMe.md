# 🧳 Tourist Multilingual Chatbot (BYTRON)

A real-time multilingual AI-powered chatbot that works as a **personal tourist guide**.  
Built with **Full-Stack Development (React + Node.js + MongoDB)**, it helps travelers explore any city with **live suggestions, maps integration, food recommendations, and cultural tips** — all in their **own language** with **voice input/output**.

---

## 🚀 Features
- 🎤 **Voice Input (Speech-to-Text)** → Ask questions in any language.  
- 🔊 **Voice Output (Text-to-Speech)** → Bot replies back in the same language (text + sound).  
- 🌍 **Live Geolocation Tracking** → Access user’s current location to suggest nearby places.  
- 🗺️ **Continuous Guide Mode** → Keeps suggesting attractions as the user moves.  
- 🏙️ **Place Cards with Images** → Results shown as interactive cards with name, image, map link.  
- 🍴 **Food & Restaurant Recommendations** → Powered by Google Places API + Zomato integration.  
- ✈️ **Itinerary Suggestions** → Multi-day trip planning (e.g., "I am in Lucknow for 2 days").  
- 🔐 **Authentication & Personalization** → JWT-based login, user profiles with language, budget, food preferences.  

---

## 🏗️ Tech Stack
### Frontend
- React.js  
- Web Speech API (voice input/output)  
- Geolocation API  
- Axios (API calls)  

### Backend
- Node.js + Express  
- Google Cloud APIs (Translate, Maps Places, Directions, Text-to-Speech)  
- OpenWeather API (optional)  
- JWT Authentication  

### Database
- MongoDB / Firebase  

---

## 🔑 APIs Used
- [Google Translate API](https://cloud.google.com/translate) → Multilingual support  
- [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview) → Nearby attractions, hotels, restaurants  
- [Google Directions API](https://developers.google.com/maps/documentation/directions/start) → Navigation & transport  
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech) → Voice replies  
- [Zomato API](https://developers.zomato.com/) → Food/restaurant data (ratings, menus, links)  

---

## 📂 Project Structure
tourist-chatbot/
│
├── backend/                # Node.js backend
│   ├── server.js           # Express server entry point
│   ├── routes/             # API routes (chat, auth, places, etc.)
│   ├── controllers/        # Logic for handling chatbot + APIs
│   ├── models/             # DB models (users, preferences, sessions)
│   └── utils/              # Helper functions (translation, maps, etc.)
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main app container
│   │   ├── Chat.js         # Chat UI component
│   │   ├── components/     # UI components (cards, login, navbar)
│   │   ├── pages/          # Auth pages (Login, Signup, Profile)
│   │   └── assets/         # Icons, images, static resources
│
├── .env                    # API keys (Google, Zomato, etc.)
├── package.json            # Project metadata
└── README.md               # Project documentation

---

## ⚡ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/tourist-chatbot.git
cd tourist-chatbot


cd backend
npm install
node server.js


cd frontend
npm install
npm start