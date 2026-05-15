import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // Inisialisasi dari localStorage jika ada
    try {
      const localData = localStorage.getItem('kampus_alkitab_wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.warn("Gagal membaca wishlist dari localStorage", error);
      return [];
    }
  });

  // Simpan ke localStorage setiap kali ada perubahan pada wishlist
  useEffect(() => {
    try {
      localStorage.setItem('kampus_alkitab_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.warn("Gagal menyimpan wishlist ke localStorage", error);
    }
  }, [wishlist]);

  const toggleWishlist = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, clearWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
