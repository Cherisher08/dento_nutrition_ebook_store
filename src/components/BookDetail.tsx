import React from "react";
import { type Book } from "../data/books";
import { FileText, BookOpen, Check, Languages } from "lucide-react";

interface BookDetailProps {
  book: Book;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 mt-6">
      {/* Left Column: Cover Image */}
      <div className="flex flex-col items-center">
        {book.cover_image ? (
          <div className="w-full max-w-sm aspect-4/5 rounded-2xl shadow-2xl overflow-hidden mb-8 transform transition-transform hover:scale-105 duration-300">
            <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className={`w-full max-w-sm aspect-3/4 rounded-2xl shadow-2xl ${book.coverColor} flex items-center justify-center p-8 mb-8 transform transition-transform hover:scale-105 duration-300`}
          >
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
              <p className="text-xl opacity-90 mb-4">{book.subtitle}</p>
              <p className="font-medium opacity-75">{book.author}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between w-full max-w-sm px-4">
          <div className="flex flex-col items-center">
            <Languages className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">{book.details.language}</span>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">
              {book.details.pages || "N/A"} Pages
            </span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">{book.details.format}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8 w-full max-w-sm">
          <button className="flex-1 py-3 px-6 rounded-xl cursor-pointer bg-cyan-200 font-bold text-gray-900 hover:bg-cyan-300 transition-colors shadow-sm">
            Buy ₹{book.price}{" "}
            {book.originalPrice && (
              <span className="line-through pl-2 text-gray-600">₹{book.originalPrice}</span>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Book Info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{book.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xl text-gray-600">{book.author}</p>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded uppercase tracking-wide">
            {book.publisher}
          </span>
        </div>

        {book.rating && (
          <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < Math.floor(book.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-500 font-medium">({book.reviews} ratings)</span>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About the eBook</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>
          <div className="space-y-3">
            {book.highlights?.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {book.editorNote && (
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <h4 className="font-bold text-pink-900 mb-2">Editor's Note</h4>
            <p className="text-blue-600 text-sm italic">"{book.editorNote}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
