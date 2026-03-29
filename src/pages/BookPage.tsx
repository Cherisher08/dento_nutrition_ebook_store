import React, { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { BookDetail } from "../components/BookDetail";
import { AboutSection } from "../components/AboutSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { OtherBooks } from "../components/OtherBooks";
import { ReviewsSection } from "../components/ReviewsSection";
import useBooks from "../contexts/booksContext";
import Loader from "../components/Loader";
import Search from "../components/Search";

export const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, loading } = useBooks();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const bookId = Number(id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    if (books.length > 0) {
      return <Navigate to={`/book/${books[0].id}`} replace />;
    }
    return <div className="text-center py-20 text-xl text-gray-600">Book not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="md:hidden mt-2">
        <Search />
      </div>

      <BookDetail book={book} />

      <AboutSection />

      <TestimonialsSection />

      <OtherBooks
        currentBookId={book.id}
        books={books}
        onBookClick={(b) => navigate(`/book/${b.id}`)}
      />

      <ReviewsSection bookId={book.id} />
    </div>
  );
};
