import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Deepadharshini K",
    location: "Chennai",
    testimonial:
      "I attended one of her webinars and was really impressed by how clearly she explained child nutrition. I also asked a few doubts personally, and she patiently clarified everything. You can see her clinical experience in the way she guides.",
  },
  {
    name: "Subhashree S",
    location: "Coimbatore",
    testimonial:
      "I have followed many nutrition pages, but her advice feels more genuine and medically sound. During the webinar, she addressed even small concerns seriously. That made a big difference.",
  },
  {
    name: "Karthik R",
    location: "Coimbatore",
    testimonial:
      "My wife and I had a 1:1 consultation regarding our child's eating habits. She didn't rush at all and gave practical suggestions that actually worked for us. Very approachable and knowledgeable.",
  },
  {
    name: "Ramya K",
    location: "Tiruppur",
    testimonial:
      "After attending her webinar, I feel much more confident about feeding my toddler. Her guidance is realistic and suits our daily routine.",
  },
  {
    name: "Divya Dharshini R",
    location: "Tiruppur",
    testimonial:
      "Liked how she combines her medical knowledge with practical nutrition advice. It's not just theory — everything she suggests is doable.",
  },
  {
    name: "Tulasi P",
    location: "Erode",
    testimonial:
      "I have attended many online sessions before, but hers stood out because she actually engages with the audience and answers questions in detail.",
  },
  {
    name: "Chandhana K",
    location: "Coimbatore",
    testimonial:
      "I appreciate how approachable she is. Even after the session, she guided me on a few follow-up doubts. That kind of support is rare.",
  },
  {
    name: "Nandhini SS",
    location: "Erode",
    testimonial:
      "The webinar was very informative without being overwhelming. She explained things in a simple way that even elders at home could understand and follow.",
  },
  {
    name: "Kaviya R",
    location: "Coimbatore",
    testimonial:
      "We also got her ebooks later, but what really made the difference was her guidance during the session. It helped us understand how to use those recipes correctly for our child.",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const testimonialsToShow = 3;
  const maxIndex = testimonials.length - testimonialsToShow;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Readers Say</h3>

      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        {/* Testimonials Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / testimonialsToShow)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full px-4"
                style={{ width: `${100 / testimonialsToShow}%` }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-6 h-full border border-gray-100">
                  <div className="mb-4">
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{testimonial.testimonial}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
