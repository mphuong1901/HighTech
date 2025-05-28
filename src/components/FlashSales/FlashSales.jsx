import React, { useState, useEffect, useMemo } from 'react';
import { Button, message } from 'antd';
import { LeftOutlined, RightOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import { smartphones, laptops, headphones, smartwatches } from '../../DATA/data';
import './FlashSales.css';

function FlashSales({ endTime }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Hàm lấy sản phẩm ngẫu nhiên từ tất cả danh mục
  const getRandomProducts = () => {
    // Gộp tất cả sản phẩm từ các danh mục
    const allProducts = [...smartphones, ...laptops, ...headphones, ...smartwatches];
    
    // Xử lý sản phẩm để đảm bảo có discount
    const processedProducts = allProducts.map(product => {
      // Tính giá khuyến mãi nếu chưa có
      if (!product.discount) {
        const originalPrice = product.originalPrice || product.price * 1.2;
        const discount = Math.floor(((originalPrice - product.price) / originalPrice) * 100);
        return {
          ...product,
          discount: discount > 0 ? discount : 10, // Mặc định giảm giá 10% nếu không có
          discountPrice: product.price,
          price: originalPrice
        };
      }
      return {
        ...product,
        discountPrice: product.price,
        price: product.originalPrice || product.price * 1.2
      };
    });
    
    // Trộn ngẫu nhiên và lấy 8 sản phẩm
    return processedProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  };
  
  // Khởi tạo danh sách sản phẩm flash sale ngẫu nhiên
  const flashSaleProducts = useMemo(() => getRandomProducts(), []);
  
  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };
  
  // Xử lý thêm/xóa khỏi danh sách yêu thích
  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      message.success(`Đã xóa ${product.name} khỏi danh sách yêu thích`);
    } else {
      addToWishlist(product);
      message.success(`Đã thêm ${product.name} vào danh sách yêu thích`);
    }
  };
  
  // Xử lý điều hướng sản phẩm
  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => (prev < flashSaleProducts.length - 4 ? prev + 1 : prev));
  };
  
  // Sửa lại logic endTime mặc định (3 ngày kể từ thời điểm render)
  const defaultEndTime = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    const end = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return end;
  }, []);
  const flashSaleEndTime = endTime ? new Date(endTime) : defaultEndTime;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = flashSaleEndTime;
      let difference = end.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        difference -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * (1000 * 60);
        const seconds = Math.floor(difference / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [flashSaleEndTime]);

  return (
    <div className="flash-sales-container">
      <div className="flash-sales-header">
        <div className="title-section">
          <div className="red-dot"></div>
          <h2>Today's</h2>
        </div>
        <div className="flash-sales-title">
          <h1>Flash Sales</h1>
          <div className="timer">
            <div className="timer-item">
              <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="timer-label">Days</span>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-item">
              <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="timer-label">Hours</span>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-item">
              <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-item">
              <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        </div>
        <div className="navigation-buttons">
          <Button 
            icon={<LeftOutlined />} 
            className="nav-button"
            shape="circle"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          />
          <Button 
            icon={<RightOutlined />} 
            className="nav-button"
            shape="circle"
            onClick={handleNext}
            disabled={currentIndex >= flashSaleProducts.length - 4}
          />
        </div>
      </div>

      <div className="flash-sales-products">
        {flashSaleProducts.slice(currentIndex, currentIndex + 4).map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <div className="discount-badge">-{product.discount}%</div>
              <div className="action-buttons">
                <Button 
                  shape="circle" 
                  icon={isInWishlist(product.id) ? <HeartFilled style={{ color: '#DB4444' }} /> : <HeartOutlined />} 
                  className="action-button" 
                  onClick={(e) => handleToggleWishlist(e, product)}
                />
              </div>
              <img src={product.image} alt={product.name} className="product-image" />
              <Button 
                className="add-to-cart-btn" 
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="discount-price">${product.discountPrice.toFixed(2)}</span>
                <span className="original-price">${product.price.toFixed(2)}</span>
              </div>
              <div className="product-rating">
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < Math.floor(product.rating) ? '#FFAD33' : '#D3D3D3' }}>★</span>
                  ))}
                </div>
                <span className="review-count">({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FlashSales;