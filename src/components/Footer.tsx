import { Instagram, Mail } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              <span className="text-blue-400">DENTO</span> NUTRITION
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              &copy; {new Date().getFullYear()} Dento Nutrition. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/thedentonutrition/"
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              <Instagram />
            </a>
            <a
              href="mailto:sreeya.dentonutrition@gmail.com"
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
