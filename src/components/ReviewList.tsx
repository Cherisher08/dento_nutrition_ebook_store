import React from "react";
import { ReviewCard } from "./ReviewCard";

interface ReviewListProps {
  reviews: {
    id: number;
    book_id: number;
    rating: number;
    review_text?: string;
    user_name?: string;
    created_at: string;
  }[];
  loading?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-4 animate-pulse h-32"
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No reviews yet</p>
        <p className="text-sm mt-1">Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};
