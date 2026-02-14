
import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  author: string;
  profile: {
    about: string;
    accolades: string[];
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ author, profile }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
        <div className="h-20 w-20 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
          <span className="text-pink-600 text-2xl font-bold">{author.charAt(0)}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-xl font-bold text-gray-900">{author}</h4>
            <CheckCircle className="h-5 w-5 text-pink-500 fill-current" />
          </div>

          <p className="text-gray-600 mb-4">
            {profile.about}
          </p>

          <div className="flex flex-wrap gap-4">
            {profile.accolades?.map((accolade, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <Award className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-semibold text-gray-700">{accolade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
