import React, { createContext, useContext, useEffect, useState } from "react";
import { books as bk, type Book } from "../data/books";
// import axios from "axios";

const bookContext = createContext<{ books: Book[], setBooks: React.Dispatch<React.SetStateAction<Book[]>>, loading: boolean } | null>(null);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // const response = await axios.get("");
        // setBooks(response.data);
        setBooks(bk)
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return <bookContext.Provider value={{ books, setBooks, loading }}>
    {children}
  </bookContext.Provider>
}

const useBooks = () => {
  const context = useContext(bookContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
}


export default useBooks;