import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Khởi tạo danh sách yêu thích từ localStorage khi component được mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setWishlistItems(parsedWishlist);
      setWishlistCount(parsedWishlist.length);
    }
  }, []);

  // Cập nhật localStorage khi wishlistItems thay đổi
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  // Thêm sản phẩm vào danh sách yêu thích
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, không thêm nữa
        return prevItems;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        return [...prevItems, product];
      }
    });
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Kiểm tra sản phẩm có trong danh sách yêu thích không
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Xóa toàn bộ danh sách yêu thích
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};