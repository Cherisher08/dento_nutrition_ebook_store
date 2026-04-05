import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import Search from "./Search";
import { CartModal } from "./Cart/CartModal";
import { useCart } from "../hooks/useCart";

export const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Dento Nutrition Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-blue-400">DENTO</span> NUTRITION
          </h1>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center max-md:hidden">
          <Search />
        </div>

        {/* Right: Cart Icon + Hamburger Menu */}
        <div className="flex items-center gap-4 ml-4">
          {/* Shopping Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-orange-500 transition cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-500 transition cursor-pointer"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer"
                >
                  Admin Console
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
