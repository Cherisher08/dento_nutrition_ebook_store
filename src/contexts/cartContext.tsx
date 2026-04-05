import React, { createContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (book: Omit<CartItem, "quantity">) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getDiscountedPrice: () => number;
  getTotalDiscount: () => number;
  getCartCount: () => number;
  isBookInCart: (bookId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage on mount
    const savedCart = localStorage.getItem("dento_nutrition_cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to load cart from localStorage:", e);
        return [];
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dento_nutrition_cart", JSON.stringify(items));
  }, [items]);

  /**
   * Discount strategy: ₹100 off per additional book
   * Examples:
   * - 1 book @₹299 = ₹299 (no discount)
   * - 2 books @₹299 each = ₹299 + (₹299 - ₹100) = ₹498
   * - 3 books @₹299, @₹299, @₹199 = ₹299 + ₹199 + ₹99 = ₹597
   *
   * Calculation:
   * - Sort by price descending (to discount cheaper books first)
   * - 1st book: full price
   * - 2nd+ books: price - ₹100 (minimum ₹0 if book price < ₹100)
   */
  const getDiscountedPrice = (): number => {
    if (items.length === 0) return 0;

    // Expand items by quantity and sort by price descending
    const allBooks = items
      .flatMap((item) => Array(item.quantity).fill(item.price))
      .sort((a, b) => b - a);

    // 1st book full price, rest with ₹100 discount
    return allBooks.reduce((total, price, index) => {
      if (index === 0) {
        return total + price;
      }
      return total + Math.max(0, price - 100);
    }, 0);
  };

  const getTotalPrice = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalDiscount = (): number => {
    return getTotalPrice() - getDiscountedPrice();
  };

  const getCartCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (book: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.bookId === book.bookId);
      if (existingItem) {
        // If book already in cart, increase quantity
        return prevItems.map((item) =>
          item.bookId === book.bookId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        // Add new book with quantity 1
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.bookId !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) => (item.bookId === bookId ? { ...item, quantity } : item)),
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const isBookInCart = (bookId: number): boolean => {
    return items.some((item) => item.bookId === bookId);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getDiscountedPrice,
    getTotalDiscount,
    getCartCount,
    isBookInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
