import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import ChatPanel from "./components/ChatPanel.jsx";
import MapPanel from "./components/MapPanel.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("chat");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [recommendations, setRecommendations] = useState([]); // shared state

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {/* Main Dashboard */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="w-1/2 border-r border-gray-200">
            <ChatPanel
              selectedLanguage={selectedLanguage}
              onRecommendations={setRecommendations}
            />
          </div>

          {/* Right Panel - Map & Recommendations */}
          <div className="w-1/2">
            <MapPanel recommendations={recommendations} />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
