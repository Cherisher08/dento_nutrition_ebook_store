import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookPage } from "./pages/BookPage";
import { BookProvider } from "./contexts/booksContext";
import { AuthProvider } from "./contexts/authContext";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes with Header/Footer layout */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-white text-slate-900">
                  <Header />
                  <Navigate to="/book/1" replace />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/book/:id"
              element={
                <div className="min-h-screen bg-white text-slate-900">
                  <Header />
                  <BookPage />
                  <Footer />
                </div>
              }
            />
            {/* Admin route — no Header/Footer */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AuthProvider>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
