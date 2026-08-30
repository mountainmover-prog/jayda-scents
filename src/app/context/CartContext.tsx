import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Perfume } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (perfumeId: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (perfume: Perfume) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.perfume.id === perfume.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { perfume, quantity: 1 }];
    });
  };

  const removeFromCart = (perfumeId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.perfume.id !== perfumeId));
  };

  const updateQuantity = (perfumeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.perfume.id === perfumeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.perfume.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
