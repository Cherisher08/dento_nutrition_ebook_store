import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books } from '../data/books';


const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleBookSelect = (bookId: number) => {
    navigate(`/book/${bookId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return <div className="flex items-center flex-1 max-w-lg w-full mx-auto md:mx-8 relative mb-4 md:mb-0">
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        placeholder="Search eBooks..."
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
      />
    </div>

    {/* Search Results Dropdown */}
    {showResults && searchQuery && (
      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50">
        {filteredBooks.length > 0 ? (
          <div className="py-2">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                onClick={() => handleBookSelect(book.id)}
              >
                {book.cover_image ? (
                  <img src={book.cover_image} alt={book.title} className="h-12 w-9 rounded shadow-sm object-cover shrink-0" />
                ) : (
                  <div className={`h-12 w-9 rounded shadow-sm ${book.coverColor} shrink-0`}></div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{book.title}</h4>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            No results found
          </div>
        )}
      </div>
    )}
  </div>
}

export default Search;