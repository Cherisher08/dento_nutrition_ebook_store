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

// Determine how many testimonials to show based on screen width
const getTestimonialsPerScreen = (width: number): number => {
  if (width < 640) return 1; // Mobile
  if (width < 1024) return 2; // Tablet
  return 3; // Desktop
};

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Initialize with responsive value based on current window size
  const [testimonialsToShow, setTestimonialsToShow] = useState(() =>
    getTestimonialsPerScreen(typeof window !== "undefined" ? window.innerWidth : 1024),
  );

  // Track if screen is large (>= 1025px) for side button layout
  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1025 : true,
  );

  // Update carousel when window is resized
  useEffect(() => {
    const handleResize = () => {
      const itemsToShow = getTestimonialsPerScreen(window.innerWidth);
      setTestimonialsToShow(itemsToShow);
      setIsLargeScreen(window.innerWidth >= 1025);

      // Keep current index valid for the new item count
      setCurrentIndex((prev) => {
        const maxIndex = testimonials.length - itemsToShow;
        return prev > maxIndex ? maxIndex : prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
        What Readers Say
      </h3>

      {isLargeScreen ? (
        // Large screen: buttons on sides
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="shrink-0 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>

            {/* Testimonials Carousel */}
            <div className="overflow-hidden px-2 sm:px-4 flex-1">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / testimonialsToShow)}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full px-2 sm:px-4"
                    style={{ width: `${100 / testimonialsToShow}%` }}
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-4 sm:p-6 h-full border border-gray-100 flex flex-col">
                      <div className="mb-4">
                        <div className="font-semibold text-gray-900 text-base sm:text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {testimonial.location}
                        </div>
                      </div>
                      <div className="flex-1 flex items-start justify-center min-h-64 sm:min-h-80 md:min-h-96">
                        <img
                          src={testimonial.image}
                          alt={`Feedback from ${testimonial.name}`}
                          className="max-w-full max-h-64 sm:max-h-80 md:max-h-96 object-contain"
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
              className="shrink-0 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 flex-wrap px-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-blue-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Small/medium screen: buttons below full-width carousel
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-4 sm:px-0">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / testimonialsToShow)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="shrink-0 w-full px-2 sm:px-4"
                  style={{ width: `${100 / testimonialsToShow}%` }}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-4 sm:p-6 h-full border border-gray-100 flex flex-col">
                    <div className="mb-4">
                      <div className="font-semibold text-gray-900 text-base sm:text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="flex-1 flex items-start justify-center min-h-64 sm:min-h-80 md:min-h-96">
                      <img
                        src={testimonial.image}
                        alt={`Feedback from ${testimonial.name}`}
                        className="max-w-full max-h-64 sm:max-h-80 md:max-h-96 object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Below carousel */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 flex-wrap px-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-blue-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
