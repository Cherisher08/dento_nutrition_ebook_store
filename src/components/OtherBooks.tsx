import React from "react";
import type { Book } from "../data/books";
import { ArrowRight } from "lucide-react";

interface OtherBooksProps {
  currentBookId: number;
  books: Book[];
  onBookClick: (book: Book) => void;
}

export const OtherBooks: React.FC<OtherBooksProps> = ({ currentBookId, books, onBookClick }) => {
  const otherBooks = books.filter((book) => book.id !== currentBookId);

  if (otherBooks.length === 0) return null;

  return (
    <div className="mt-8 pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Other Books You Might Like</h3>

      <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x">
        {otherBooks.map((book) => (
          <div
            key={book.id}
            className="shrink-0 w-72 snap-start bg-white rounded-xl border border-gray-100 p-4 transition-all hover:shadow-md cursor-pointer group"
            onClick={() => onBookClick(book)}
          >
            {book.cover_image ? (
              <div className="w-full max-w-sm aspect-4/5 rounded-2xl shadow-2xl overflow-hidden mb-8 transform transition-transform hover:scale-105 duration-300">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className={`w-full max-w-sm aspect-4/5 rounded-2xl shadow-2xl ${book.coverColor} flex items-center justify-center p-8 mb-8 transform transition-transform hover:scale-105 duration-300`}
              >
                <div className="text-center text-white">
                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                  <p className="text-lg opacity-90 mb-2">{book.subtitle}</p>
                  <p className="font-medium opacity-75">{book.author}</p>
                </div>
              </div>
            )}

            <h4 className="font-bold text-gray-900 truncate mb-1">{book.title}</h4>

            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-gray-900">₹{book.price}</span>
              <button className="p-2 rounded-full bg-gray-50 text-gray-600 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
