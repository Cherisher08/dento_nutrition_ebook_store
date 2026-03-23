import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/authContext";
import { apiGetBooks, apiCreateBook, apiUpdateBook, apiDeleteBook } from "../../api/adminApi";
import { type Book } from "../../contexts/booksContext";
import BookFormModal from "./BookFormModal";
import ConfirmDialog from "./ConfirmDialog";

type BookPayload = Omit<Book, "id">;

export default function BookList() {
  const { token, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalBook, setModalBook] = useState<Book | null | undefined>(undefined); // undefined = closed
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await apiGetBooks(token);
      setBooks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSave = async (payload: BookPayload) => {
    if (!token) return;
    if (modalBook) {
      await apiUpdateBook(token, modalBook.id, payload);
    } else {
      await apiCreateBook(token, payload);
    }
    await fetchBooks();
  };

  const handleDelete = async () => {
    if (!token || !deleteTarget) return;
    await apiDeleteBook(token, deleteTarget.id);
    setDeleteTarget(null);
    await fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Admin Console</h1>
            <p className="text-xs text-gray-500">Dento Nutrition</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-500 transition font-medium cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Books</h2>
            <p className="text-sm text-gray-500">
              {books.length} book{books.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setModalBook(null)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
          >
            + Add Book
          </button>
        </div>

        {/* States */}
        {loading && <div className="text-center py-16 text-gray-400">Loading books…</div>}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* Book Cards */}
        {!loading && !error && (
          <div className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
              >
                {/* Cover */}
                <div
                  className={`w-12 h-16 rounded-lg shrink-0 overflow-hidden ${!book.cover_image ? book.coverColor || "bg-gray-300" : ""}`}
                >
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{book.title}</p>
                  {book.subtitle && (
                    <p className="text-sm text-gray-500 truncate">{book.subtitle}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-bold text-orange-600">₹{book.price}</span>
                    {book.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                    {book.rating && <span className="text-xs text-gray-500">★ {book.rating}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setModalBook(book)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(book)}
                    className="px-3 py-1.5 text-sm border border-red-200 rounded-lg hover:bg-red-50 text-red-500 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {books.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                No books yet. Click <strong>+ Add Book</strong> to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {modalBook !== undefined && (
        <BookFormModal
          book={modalBook}
          onSave={handleSave}
          onClose={() => setModalBook(undefined)}
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
