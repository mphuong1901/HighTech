import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Card, Row, Col, Typography, Button, Rate, Modal, message } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import ProductDetailModal from './ProductDetailModal';
import './ProductList.css';
import { laptops, headphones, smartwatches, smartphones } from '../../DATA/data';

const { Title, Text } = Typography;
  
function ProductList({ title, category = 'laptops', viewAll = false, onViewAll }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(null);
  const [isViewAllModalVisible, setIsViewAllModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const getProductData = (category) => {
    switch (category) {
      case 'laptops': return laptops;
      case 'headphones': return headphones;
      case 'smartwatches': return smartwatches;
      case 'smartphones': return smartphones;
      default: return [];
    }
  };

  const toggleFavorite = (e, product) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      Modal.info({
        title: 'Removed from wishlist',
        content: `${product.name} has been removed from your wishlist.`,
        centered: true,
        okButtonProps: {
          style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
        },
        maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
        bodyStyle: { color: '#000' }
      });
    } else {
      addToWishlist(product);
      Modal.success({
        title: 'Added to wishlist',
        content: `${product.name} has been added to your wishlist.`,
        centered: true,
        okButtonProps: {
          style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
        },
        maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
        bodyStyle: { color: '#000' }
      });
    }
  };

  const handleQuickView = (productId) => {
    setQuickView(productId === quickView ? null : productId);
  };

  const products = getProductData(category);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Nếu viewAll=true thì hiển thị toàn bộ sản phẩm, nếu không thì hiển thị dạng carousel như cũ
  return (
    <div className="product-list-section">
      <div className="product-list-header">
        <Title level={4} style={{ color: '#DB4444', marginBottom: 16 }}>{title}</Title>
        <Button type="primary" onClick={onViewAll}>{viewAll ? 'Show Less' : 'View All'}</Button>
      </div>
      {viewAll ? (
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                className="product-card"
                hoverable
                cover={
                  <div className="product-image-container" onClick={() => setSelectedProduct(product)} style={{cursor:'pointer'}}>
                    {product.discount && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                    <img
                      alt={product.name}
                      src={product.image}
                      className="product-image"
                    />
                    <div className="product-actions">
                      <Button
                        type="text"
                        icon={isInWishlist(product.id) ? <HeartFilled style={{ color: '#DB4444' }} /> : <HeartOutlined />}
                        className={`action-button ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={e => toggleFavorite(e, product)}
                      />
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className={`action-button ${quickView === product.id ? 'active' : ''}`}
                        onClick={e => {e.stopPropagation(); setSelectedProduct(product);}}
                      />
                    </div>
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="add-to-cart-button"
                      onClick={(e) => {
                        handleAddToCart(e, product)
                        Modal.success({
                          title: 'Added to cart',
                          content: `${product.name} has been added to your cart.`,
                          centered: true,
                          okButtonProps: {
                            style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
                          },
                          maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
                          bodyStyle: { color: '#000' }
                        });
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>
                }
              >
                <div className="product-info">
                  <Title level={5} className="product-name">{product.name}</Title>
                  <div className="product-price">
                    <Text type="danger" strong>${product.price}</Text>
                    {product.originalPrice && (
                      <Text delete className="original-price">${product.originalPrice}</Text>
                    )}
                  </div>
                  <div className="product-rating">
                    <Rate disabled defaultValue={product.rating} />
                    <Text type="secondary">({product.reviews})</Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="carousel-container" style={{ position: 'relative', overflow: 'hidden' }}>
          <Button
            icon={<LeftOutlined />}
            className="carousel-button prev"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          />
          <Button
            icon={<RightOutlined />}
            className="carousel-button next"
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
          />
          <div
            className="carousel-track"
            style={{
              display: 'flex',
              width: `${totalPages * 100}%`,
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentPage * (100 / totalPages)}%)`
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="carousel-page"
                style={{ display: 'flex', width: '100%' }}
              >
                {products
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map(product => (
                    <div key={product.id} style={{ flex: '0 0 25%', padding: 8, boxSizing: 'border-box' }}>
                      <Card
                        className="product-card"
                        hoverable
                        cover={
                          <div className="product-image-container" onClick={() => setSelectedProduct(product)} style={{cursor:'pointer'}}>
                            {product.discount && (
                              <span className="discount-badge">-{product.discount}%</span>
                            )}
                            <img
                              alt={product.name}
                              src={product.image}
                              className="product-image"
                            />
                            <div className="product-actions">
                              <Button
                                type="text"
                                icon={isInWishlist(product.id) ? <HeartFilled style={{ color: '#DB4444' }} /> : <HeartOutlined />}
                                className={`action-button ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={e => toggleFavorite(e, product)}
                              />
                              <Button
                                type="text"
                                icon={<EyeOutlined />}
                                className={`action-button ${quickView === product.id ? 'active' : ''}`}
                                onClick={e => {e.stopPropagation(); setSelectedProduct(product);}}
                              />
                            </div>
                            <Button
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                              className="add-to-cart-button"
                              onClick={e => {
                                handleAddToCart(e, product)
                                Modal.success({
                                  title: 'Added to cart',
                                  content: `${product.name} has been added to your cart.`,
                                  centered: true,
                                  okButtonProps: {
                                    style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
                                  },
                                  maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
                                  bodyStyle: { color: '#000' }
                                });
                              }}
                            >
                              Add to cart
                            </Button>
                          </div>
                        }
                      >
                        <div className="product-info">
                          <Title level={5} className="product-name">{product.name}</Title>
                          <div className="product-price">
                            <Text type="danger" strong>${product.price}</Text>
                            {product.originalPrice && (
                              <Text delete className="original-price">${product.originalPrice}</Text>
                            )}
                          </div>
                          <div className="product-rating">
                            <Rate disabled defaultValue={product.rating} />
                            <Text type="secondary">({product.reviews})</Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal hiển thị chi tiết sản phẩm */}
      {selectedProduct && (
        <ProductDetailModal
          open={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onFavorite={(productId) => {
            toggleFavorite(null, selectedProduct);
          }}
          isFavorite={isInWishlist(selectedProduct.id)}
          onAddToCart={(productToAdd) => {
            addToCart(productToAdd);
            setSelectedProduct(null);
            Modal.success({
              title: 'Added to cart',
              content: `${productToAdd.name} has been added to your cart.`,
              centered: true,
              okButtonProps: {
                style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
              },
              maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
              bodyStyle: { color: '#000' }
            });
          }}
        />
      )}
    </div>
  );
}

ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['laptops', 'headphones', 'smartwatches', 'smartphones']).isRequired
};

// Tạo ProductCard component để tái sử dụng trong trang Search
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    Modal.success({
      title: 'Added to cart',
      content: `${product.name} has been added to your cart.`,
      centered: true,
      okButtonProps: {
        style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
      },
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
      bodyStyle: { color: '#000' }
    });
  };

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    const isCurrentlyInWishlist = isInWishlist(product.id);
    
    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id);
      Modal.info({
        title: 'Removed from wishlist',
        content: `${product.name} has been removed from your wishlist.`,
        centered: true,
        okButtonProps: {
          style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
        },
        maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
        bodyStyle: { color: '#000' }
      });
    } else {
      addToWishlist(product);
      Modal.success({
        title: 'Added to wishlist',
        content: `${product.name} has been added to your wishlist.`,
        centered: true,
        okButtonProps: {
          style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
        },
        maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
        bodyStyle: { color: '#000' }
      });
    }
  };

  return (
    <Card
      className="product-card"
      hoverable
      cover={
        <div className="product-image-container" onClick={() => setSelectedProduct(product)} style={{cursor:'pointer'}}>
          {product.discount && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
          <img
            alt={product.name}
            src={product.image}
            className="product-image"
          />
          <div className="product-actions">
            <Button
              type="text"
              icon={isInWishlist(product.id) ? <HeartFilled style={{ color: '#DB4444' }} /> : <HeartOutlined />}
              className={`action-button ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={e => { e.stopPropagation(); toggleFavorite(e, product)}}
            />
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="action-button"
              onClick={e => {e.stopPropagation(); setSelectedProduct(product);}}
            />
          </div>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            className="add-to-cart-button"
            onClick={(e) =>{
              e.stopPropagation();
              handleAddToCart(e, product);
              Modal.success({
                title: 'Added to cart',
                content: `${product.name} has been added to your cart.`,
                centered: true,
                okButtonProps: {
                  style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
                },
                maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
                bodyStyle: { color: '#000' }
              });
            }}
          >
            Add to cart
          </Button>
        </div>
      }
    >
      <div className="product-info">
        <Title level={4} style={{ color: '#DB4444', fontWeight: 'bold', marginBottom: 4, }}>{product.name}</Title>
        <div className="product-price">
          <Text style={{ color: '#DB4444', fontSize: 18, fontWeight: 'bold' }}>${product.price}</Text>
          {product.originalPrice && (
            <Text delete style={{ marginLeft: 8, color: '#999' }}>${product.originalPrice}</Text>
          )}
        </div>
        <div className="product-rating">
          <Rate disabled defaultValue={product.rating} style={{ fontSize: 14 }} />
          <Text type="secondary">({product.reviews})</Text>
        </div>
      </div>    
      {selectedProduct && (
        <ProductDetailModal
          open={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onFavorite={(productId) => {
            toggleFavorite(null, selectedProduct);
          }}
          isFavorite={isInWishlist(selectedProduct.id)}
          onAddToCart={(productToAdd) => {
            addToCart(productToAdd);
            setSelectedProduct(null);
            Modal.success({
              title: 'Added to cart',
              content: `${productToAdd.name} has been added to your cart.`,
              centered: true,
              okButtonProps: {
                style: { backgroundColor: '#DB4444', borderColor: '#DB4444', color: '#fff' },
              },
              maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
              bodyStyle: { color: '#000' }
            });
          }}
        />
      )}
    </Card>
  );
};

// Gán ProductCard vào ProductList để có thể sử dụng trong trang Search
ProductList.ProductCard = ProductCard;

export default ProductList;
