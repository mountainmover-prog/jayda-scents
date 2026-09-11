import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Variant, lineId } from '../types';
import { findProduct } from '../data/products';

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

/**
 * Only the three facts that belong to the shopper are stored: which product,
 * which size, how many. Prices, stock and product names are read back from the
 * live catalogue on load, so a basket left open overnight can never resurrect a
 * price we no longer sell at, or a product that has since been taken down.
 */
const STORAGE_KEY = 'jayda-cart-v1';

type StoredLine = { slug: string; sku: string; quantity: number };

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const lines: StoredLine[] = JSON.parse(raw);
    if (!Array.isArray(lines)) return [];

    return lines.flatMap((line) => {
      const product = findProduct(line.slug);
      if (!product) return [];                                  // delisted since
      const variant = product.variants.find((v) => v.sku === line.sku);
      if (!variant || variant.stock <= 0) return [];            // size gone or sold out
      const quantity = Math.min(Math.max(1, Math.floor(line.quantity)), variant.stock);
      if (!Number.isFinite(quantity)) return [];
      return [{ product, variant, quantity }];
    });
  } catch {
    // private browsing, blocked storage, or corrupt JSON — start with an empty cart
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  try {
    const lines: StoredLine[] = items.map((i) => ({
      slug: i.product.slug,
      sku: i.variant.sku,
      quantity: i.quantity,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // storage unavailable — the cart still works for this visit
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // read synchronously on first render so the basket count never flashes empty
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    writeStoredCart(cartItems);
  }, [cartItems]);

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
