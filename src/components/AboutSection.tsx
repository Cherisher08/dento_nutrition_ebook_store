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
    <div className="mt-8 flex justify-center max-w-[40%]">
      <div className="w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">About the Author</h3>
        {/* Profile Image Row */}
        <div className="flex justify-center flex-col items-center">
          <div className="h-32 w-32 bg-pink-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-pink-200">
            <img src={PROFILE_IMAGE} alt={AUTHOR_NAME} className="object-cover h-full w-full" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-xl font-bold text-gray-900 text-center">{AUTHOR_NAME}</h4>
            <CheckCircle className="h-5 w-5 text-pink-500 fill-current" />
          </div>
        </div>
        {/* About Text Row */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          <p className="text-gray-600 mb-4 text-center">{ABOUT_TEXT_1}</p>
          <p className="text-gray-600 mb-4 text-center">{ABOUT_TEXT_2}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {ACCOLADES.map((accolade, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
              >
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
