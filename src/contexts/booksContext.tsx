import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Define the Book interface locally to avoid dependency on books.ts
export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  cover_image?: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  description: string;
  details: {
    language: string;
    pages: number;
    format?: string;
    cod: string;
  };
  highlights?: string[];
  coverColor?: string;
  editorNote?: string;
  document_url?: string;
}

export interface Review {
  id: number;
  book_id: number;
  rating: number;
  review_text?: string;
  user_name?: string;
  created_at: string; // ISO date string
}

const bookContext = createContext<{
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  loading: boolean;
  refetch: () => void;
} | null>(null);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/public/books`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to load books from API", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <bookContext.Provider value={{ books, setBooks, loading, refetch: fetchBooks }}>
      {children}
    </bookContext.Provider>
  );
};

const useBooks = () => {
  const context = useContext(bookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useBooks;
