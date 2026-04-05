import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookPage } from "./pages/BookPage";
import { BookProvider } from "./contexts/booksContext";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { CartModalProvider } from "./contexts/cartModalContext";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <BookProvider>
          <AuthProvider>
            <CartModalProvider>
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
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </CartModalProvider>
          </AuthProvider>
        </BookProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
