'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '@/types';

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  giftNote: string;
  setGiftNote: (note: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const cartKey = 'dancing-bee-cart-v1';
const noteKey = 'dancing-bee-cart-note-v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [giftNote, setGiftNoteState] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(cartKey);
      const storedNote = localStorage.getItem(noteKey);
      if (stored) setItems(JSON.parse(stored));
      if (storedNote) setGiftNoteState(storedNote);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items]);

  const setGiftNote = (note: string) => {
    setGiftNoteState(note);
    localStorage.setItem(noteKey, note);
  };

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.productId === item.productId && cartItem.variant === item.variant);
      if (existing) {
        return current.map((cartItem) => cartItem.productId === item.productId && cartItem.variant === item.variant ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem);
      }
      return [...current, item];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, variant?: string) => {
    setItems((current) => current.filter((item) => !(item.productId === productId && item.variant === variant)));
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) return removeItem(productId, variant);
    setItems((current) => current.map((item) => item.productId === productId && item.variant === variant ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setItems([]);
    setGiftNote('');
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, giftNote, setGiftNote }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
