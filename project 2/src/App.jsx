import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import MapPanel from './components/MapPanel.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('chat');

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main Dashboard */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="w-1/2 border-r border-gray-200">
            <ChatPanel />
          </div>
          
          {/* Right Panel - Map & Recommendations */}
          <div className="w-1/2">
            <MapPanel />
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
