import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Variant, lineId } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity?: number) => void;
  removeFromCart: (slug: string, sku: string) => void;
  updateQuantity: (slug: string, sku: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: Variant, quantity = 1) => {
    setCartItems((prev) => {
      const id = lineId(product.slug, variant.sku);
      const existing = prev.find((i) => lineId(i.product.slug, i.variant.sku) === id);
      if (existing) {
        return prev.map((i) =>
          lineId(i.product.slug, i.variant.sku) === id
            ? // never let the cart exceed what is actually on the shelf
              { ...i, quantity: Math.min(i.quantity + quantity, variant.stock) }
            : i
        );
      }
      return [...prev, { product, variant, quantity: Math.min(quantity, variant.stock) }];
    });
  };

  const removeFromCart = (slug: string, sku: string) => {
    const id = lineId(slug, sku);
    setCartItems((prev) => prev.filter((i) => lineId(i.product.slug, i.variant.sku) !== id));
  };

  const updateQuantity = (slug: string, sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug, sku);
      return;
    }
    const id = lineId(slug, sku);
    setCartItems((prev) =>
      prev.map((i) =>
        lineId(i.product.slug, i.variant.sku) === id
          ? { ...i, quantity: Math.min(quantity, i.variant.stock) }
          : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce((total, i) => total + i.variant.priceTzs * i.quantity, 0);

  const getCartCount = () => cartItems.reduce((n, i) => n + i.quantity, 0);

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
