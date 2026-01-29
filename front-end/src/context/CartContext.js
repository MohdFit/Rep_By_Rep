import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart on mount and when user logs in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, productType, quantity, selectedSize, selectedColor) => {
    try {
      setLoading(true);
      const response = await cartService.addToCart(
        productId,
        productType,
        quantity,
        selectedSize,
        selectedColor
      );
      if (response.success) {
        setCart(response.data);
        return { success: true, message: response.message };
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartService.updateCartItem(itemId, quantity);
      if (response.success) {
        setCart(response.data);
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await cartService.removeFromCart(itemId);
      if (response.success) {
        setCart(response.data);
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.clearCart();
      if (response.success) {
        setCart(response.data);
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
