import React, { useEffect, useState } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { reviewService } from "../services/reviewService";

interface ReviewsSectionProps {
  bookId: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getTopReviews(bookId);
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Review Form */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review
            </h4>
            <ReviewForm
              bookId={bookId}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reviews ({reviews.length})
          </h4>
          <ReviewList reviews={reviews} loading={loading} />
        </div>
      </div>
    </div>
  );
};
