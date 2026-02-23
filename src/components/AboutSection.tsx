import React from "react";
import { Award, CheckCircle } from "lucide-react";

const AUTHOR_NAME = "Dr. Sreeya";
const PROFILE_IMAGE = "/profile.jpeg"; // Place your image in public/ and use the correct path
const ABOUT_TEXT_1 =
  "I’m Dr. Sreeya, a Dental Surgeon with over 10 years of clinical experience and 5 years of specialization in Oral and Maxillofacial Surgery. I’ve completed a Fellowship in Advanced Aesthetic Dentistry from ILAMED, Germany. As a certified Laser Dentist, I focus on delivering precise, modern, and patient-centric dental care with an emphasis on long-term oral health.";
const ABOUT_TEXT_2 =
  "Alongside dentistry, I’m a Certified Maternal and Child Nutritionist and CPR Trainer, with a strong interest in how nutrition directly impacts children’s dental and overall health. Through The Dento Nutrition, I educate parents via webinars, evidence-based content, and thoughtfully designed e-books on nutritious recipes for kids. Having helped create 1000+ healthy smiles and being a mom of two boys myself, I combine professional expertise with real-life parenting insight to guide families toward healthier, happier futures.";
const ACCOLADES = [
  "Fellowship in Advanced Aesthetic Dentistry (ILAMED, Germany)",
  "Certified Laser Dentist",
  "Certified Maternal and Child Nutritionist",
  "10+ years clinical experience",
];

export const AboutSection: React.FC = () => {
  return (
    <div className="mt-6 sm:mt-8 px-4 sm:px-0">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">About the Author</h3>
      <div className="bg-white rounded-lg sm:rounded-2xl py-6 sm:py-8 px-3 sm:px-6 md:px-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4 justify-center w-full md:w-auto md:shrink-0">
          <div className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
            <img
              src={PROFILE_IMAGE}
              alt={AUTHOR_NAME}
              className="object-cover h-full w-full rounded-full"
            />
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">{AUTHOR_NAME}</h4>
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 fill-current" />
          </div>
        </div>
        <div className="w-full md:flex-1 space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-gray-600 text-left md:text-left leading-relaxed">
            {ABOUT_TEXT_1}
          </p>
          <p className="text-sm sm:text-base text-gray-600 text-left md:text-left leading-relaxed">
            {ABOUT_TEXT_2}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {ACCOLADES.map((accolade, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-gray-100"
              >
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">{accolade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
