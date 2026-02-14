
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookPage } from './pages/BookPage';
import { BookProvider } from './contexts/booksContext';

function App() {

  return (
    <BrowserRouter>
      <BookProvider>
        <div className="min-h-screen bg-white text-slate-900">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/book/1" replace />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
          <Footer />
        </div>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
