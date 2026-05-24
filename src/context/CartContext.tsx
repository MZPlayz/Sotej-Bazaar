"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [cartDiscount, setCartDiscount] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sotej_bazaar_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
    const savedCoupon = localStorage.getItem("sotej_bazaar_coupon");
    if (savedCoupon) {
      setCouponCode(savedCoupon);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sotej_bazaar_cart", JSON.stringify(cart));
  }, [cart]);

  // Handle discount calculations when subtotal or coupon changes
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (couponCode.toUpperCase() === "SOTEJ15") {
      setCartDiscount(cartSubtotal * 0.15); // 15% discount
      localStorage.setItem("sotej_bazaar_coupon", couponCode);
    } else if (couponCode.toUpperCase() === "FRESH20") {
      setCartDiscount(cartSubtotal * 0.20); // 20% discount
      localStorage.setItem("sotej_bazaar_coupon", couponCode);
    } else {
      setCartDiscount(0);
      localStorage.removeItem("sotej_bazaar_coupon");
    }
  }, [couponCode, cartSubtotal]);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingItemIndex].quantity + quantity;
        // Limit check based on stock count if needed, otherwise cap at 20 for convenience
        newCart[existingItemIndex].quantity = Math.min(newQty, product.stockCount);
        return newCart;
      }
      return [...prevCart, { product, quantity: Math.min(quantity, product.stockCount) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stockCount) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setCartDiscount(0);
    localStorage.removeItem("sotej_bazaar_cart");
    localStorage.removeItem("sotej_bazaar_coupon");
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === "SOTEJ15" || formattedCode === "FRESH20") {
      setCouponCode(formattedCode);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        couponCode,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
