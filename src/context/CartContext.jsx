import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'kampus_alkitab_cart';
const TAX_RATE = 0.11; // PPN 11% sesuai regulasi Indonesia

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);
  const [toast, setToast] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        showToast(`"${item.title}" sudah ada di keranjang`, 'info');
        return prev;
      }
      showToast(`"${item.title}" ditambahkan ke keranjang`);
      return [...prev, { ...item, quantity: item.isPhysical ? 1 : 1 }];
    });
  }, [showToast]);

  const removeFromCart = useCallback((itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Computed values
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + (i.numericPrice * i.quantity), 0);
  const cartTax = Math.round(cartSubtotal * TAX_RATE);
  const cartTotal = cartSubtotal + cartTax;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartTax,
      cartTotal,
      toast,
      setToast,
      showToast,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
