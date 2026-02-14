
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              <span className="text-pink-600">DENTO</span> PRESS
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              &copy; {new Date().getFullYear()} Dento Press. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
