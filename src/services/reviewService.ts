const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ReviewCreate {
  book_id: number;
  rating: number;
  review_text?: string;
  user_name?: string;
}

export const reviewService = {
  async submitReview(review: ReviewCreate): Promise<void> {
    const response = await fetch(`${API_URL}/public/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to submit review");
  },

  async getReviews(bookId: number): Promise<any[]> {
    const response = await fetch(`${API_URL}/public/reviews/${bookId}`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  async getTopReviews(bookId: number): Promise<any[]> {
    const response = await fetch(`${API_URL}/public/reviews/${bookId}/top`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },
};
