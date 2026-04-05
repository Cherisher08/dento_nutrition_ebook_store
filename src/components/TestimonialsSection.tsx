import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Deepadharshini K",
    location: "Chennai",
    image: "/Feedback_1.png",
  },
  {
    name: "Subhashree S",
    location: "Coimbatore",
    image: "/Feedback_2.png",
  },
  {
    name: "Akalya Krishnaswamy",
    location: "Coimbatore",
    image: "/Feedback_3.png",
  },
  {
    name: "Ramya K",
    location: "Tiruppur",
    image: "/Feedback_4.png",
  },
  {
    name: "Divya Dharshini R",
    location: "Tiruppur",
    image: "/Feedback_5.png",
  },
  {
    name: "Tulasi P",
    location: "Erode",
    image: "/Feedback_6.png",
  },
  {
    name: "Chandhana K",
    location: "Coimbatore",
    image: "/Feedback_7.png",
  },
  {
    name: "Nandhini SS",
    location: "Erode",
    image: "/Feedback_8.png",
  },
  {
    name: "Kaviya R",
    location: "Coimbatore",
    image: "/Feedback_9.png",
  },
  {
    name: "Renuka Shree S",
    location: "Chennai",
    image: "/Feedback_10.png",
  },
  {
    name: "Pragalya Keerthivasan",
    location: "Tiruppur",
    image: "/Feedback_11.png",
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
                className="shrink-0 w-full px-4"
                style={{ width: `${100 / testimonialsToShow}%` }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-6 h-full border border-gray-100 flex flex-col">
                  <div className="mb-4">
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                  <div className="flex-1 flex items-start justify-center min-h-96">
                    <img
                      src={testimonial.image}
                      alt={`Feedback from ${testimonial.name}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
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
