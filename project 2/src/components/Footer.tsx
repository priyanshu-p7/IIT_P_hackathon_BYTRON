import React from 'react';
import { Facebook, Twitter, Instagram, HelpCircle, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Contact', icon: Phone },
    { label: 'FAQs', icon: HelpCircle },
    { label: 'Help Center', icon: Mail },
    { label: 'About', icon: null },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Footer Links */}
        <div className="flex items-center space-x-6">
          {footerLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center space-x-1 transition-colors duration-200"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <button
                key={index}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;