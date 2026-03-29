import React, { useState } from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: number;
    book_id: number;
    rating: number;
    review_text?: string;
    user_name?: string;
    created_at: string;
  };
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const TRUNCATE_LENGTH = 200;
  const shouldTruncate = review.review_text && review.review_text.length > TRUNCATE_LENGTH;
  const displayText =
    shouldTruncate && !showFullText && review.review_text
      ? review.review_text.slice(0, TRUNCATE_LENGTH) + "..."
      : review.review_text;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
      {/* Header: Rating and Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
      </div>

      {/* User Name */}
      {review.user_name && (
        <div className="font-semibold text-gray-900 mb-2">{review.user_name}</div>
      )}

      {/* Review Text */}
      {review.review_text && (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p>{displayText}</p>
          {shouldTruncate && !showFullText && (
            <button
              onClick={() => setShowFullText(true)}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-1"
            >
              Show more
            </button>
          )}
          {showFullText && (
            <button
              onClick={() => setShowFullText(false)}
              className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-1"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

