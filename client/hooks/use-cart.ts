import { useState, useEffect } from "react";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  product_thumbnail: string;
}

const CART_STORAGE_KEY = "ecommerce_cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.product_id === item.product_id);
      if (existing) {
        return prevCart.map((c) =>
          c.product_id === item.product_id
            ? { ...c, quantity: c.quantity + item.quantity }
            : c,
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((c) => c.product_id !== productId),
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((c) =>
          c.product_id === productId ? { ...c, quantity } : c,
        ),
      );
    }
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
}
