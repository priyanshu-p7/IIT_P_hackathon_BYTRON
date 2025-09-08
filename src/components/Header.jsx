import React, { useEffect, useState, useRef } from 'react';
import { Search, User, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bho', label: 'Bhojpuri' },
  { code: 'mr', label: 'Marathi' },
  { code: 'te', label: 'Telugu' },
  { code: 'bn', label: 'Bengali' },
  { code: 'kn', label: 'Kannada' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ta', label: 'Tamil' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ur', label: 'Urdu' },
];

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();
    }, 500);

    return () => clearInterval(interval);
  }, [selectedLanguage, setSelectedLanguage]);

  useEffect(() => {
    // Inject Google Translate script
    const addGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
    };

    
    

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: languages.map((l) => l.code).join(','),
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
        },
        'google_translate_element'
      );

      // Auto-select Hindi initially
      setTimeout(() => {
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }
      }, 1000);
    };

    addGoogleTranslateScript();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event('change'));
      setSelectedLanguage(lang.label);
      setShowLangDropdown(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search attractions, places..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center z-40 space-x-4">
        {/* Custom Google Translate Dropdown */}
        <div className="relative z-40" ref={dropdownRef}>
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm font-medium">{selectedLanguage}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showLangDropdown && (
            <div className="absolute right-0 mt-2 w-40 z-100 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden Google Translate Widget */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Custom CSS for Google Translate */}
      <style jsx>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-te-gadget-icon {
          display: none !important;
        }
        iframe[src*="translate.google.com"] {
          display: none !important;
        }
        .VIpgJd-ZVi9od-ORHb {
          display: none !important;
        }
        #goog-gt-tt, .goog-tooltip, .goog-te-balloon-frame {
          display: none !important;
        }
      `}</style>

    </header>
  );
};

export default Header;
