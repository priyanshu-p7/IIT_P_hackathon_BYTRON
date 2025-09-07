import React from 'react';
import { Home, MessageCircle, Map, Heart, User, Settings, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 shadow-sm">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Map className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6" />
              
              {/* Tooltip */}
              <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Emergency Button */}
      <button className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center text-white transition-colors duration-200 group relative">
        <AlertTriangle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          Emergency
        </div>
      </button>
    </div>
  );
};

export default Sidebar;