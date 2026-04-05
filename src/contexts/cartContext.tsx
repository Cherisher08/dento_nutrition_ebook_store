import React, { createContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

export interface DiscountTier {
  tier: "none" | "combo" | "full";
  discount: number;
  itemCount: number;
  nextTierAt?: number;
  message: string;
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
  getDiscountTier: () => DiscountTier;
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
   * Discount strategy: Tiered combo discounts
   * - 1 book: ₹0 discount
   * - 2-3 books: ₹100 discount
   * - 4+ books: ₹200 discount
   *
   * Examples:
   * - 1 book @₹299 = ₹299 (no discount)
   * - 2 books @₹299 each = ₹598 → ₹498 (save ₹100)
   * - 3 books @₹299, @₹299, @₹349 = ₹947 → ₹847 (save ₹100)
   * - 4 books @₹299, @₹299, @₹349, @₹499 = ₹1446 → ₹1246 (save ₹200)
   */
  const getDiscountedPrice = (): number => {
    const totalItems = getCartCount();
    const totalPrice = getTotalPrice();

    if (totalItems === 0 || totalItems === 1) {
      return totalPrice;
    } else if (totalItems <= 3) {
      return totalPrice - 100;
    } else {
      return totalPrice - 200;
    }
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

  const getDiscountTier = (): DiscountTier => {
    const itemCount = getCartCount();

    if (itemCount === 0) {
      return {
        tier: "none",
        discount: 0,
        itemCount: 0,
        nextTierAt: 2,
        message: "Add 2 books to get ₹100 discount!",
      };
    } else if (itemCount === 1) {
      return {
        tier: "none",
        discount: 0,
        itemCount: 1,
        nextTierAt: 2,
        message: "Add 1 more to unlock ₹100 savings!",
      };
    } else if (itemCount <= 3) {
      const itemsNeeded = 4 - itemCount;
      return {
        tier: "combo",
        discount: 100,
        itemCount,
        nextTierAt: 4,
        message: `Add ${itemsNeeded} more to unlock ₹200 savings! (${itemCount}/4)`,
      };
    } else {
      return {
        tier: "full",
        discount: 200,
        itemCount,
        message: "✓ Maximum discount unlocked!",
      };
    }
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
    getDiscountTier,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
