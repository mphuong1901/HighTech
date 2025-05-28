import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Card, Row, Col, Typography, Button, Rate, Modal, message } from "antd";
import { HeartOutlined, HeartFilled, EyeOutlined, ShoppingCartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
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
    message.success(`Added ${product.name} to cart`);
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
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      message.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      message.success(`Added ${product.name} to wishlist`);
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
                      onClick={(e) => handleAddToCart(e, product)}
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
                              onClick={e => handleAddToCart(e, product)}
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
      <Modal
        visible={!!selectedProduct}
        title={selectedProduct ? <span style={{fontWeight:700, fontSize:26, color:'#ff3e7f', fontFamily:'Montserrat, Arial, sans-serif', letterSpacing:1}}>{selectedProduct.name}</span> : ''}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
        centered
        styles={{
          body: {
            background: 'linear-gradient(135deg, #f8e1ff 0%, #ffe6e6 100%)',
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 8px 32px rgba(255,62,127,0.12)',
            minHeight: 340
          }
        }}
        style={{borderRadius: 28, overflow: 'hidden'}}
      >
        {selectedProduct && (
          <div style={{display:'flex',alignItems:'center',gap:32,justifyContent:'center',flexWrap:'wrap'}}>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{maxWidth:'220px',borderRadius:18,boxShadow:'0 4px 16px #ffb6d5',marginBottom:16}} />
            <div style={{textAlign:'left',maxWidth:340}}>
              <div style={{marginBottom:12}}>
                <span style={{fontWeight:700,fontSize:22,color:'#ff3e7f',fontFamily:'Montserrat, Arial, sans-serif'}}>${selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <span style={{marginLeft:12,textDecoration:'line-through',color:'#bdbdbd',fontSize:16}}>${selectedProduct.originalPrice}</span>
                )}
              </div>
              <div style={{marginBottom:12}}>
                <Rate disabled defaultValue={selectedProduct.rating} style={{color:'#ff3e7f'}} />
                <span style={{color:'#888',marginLeft:8}}>({selectedProduct.reviews} đánh giá)</span>
              </div>
              <div style={{marginBottom:18}}>
                <span style={{fontSize:16,color:'#333',fontFamily:'Montserrat, Arial, sans-serif'}}>{selectedProduct.description ? selectedProduct.description : ''}</span>
                {selectedProduct.specs && (
                  <div style={{marginTop:12, background:'#fff6fa', borderRadius:10, padding:'12px 18px', boxShadow:'0 2px 8px #ffd6e6', fontSize:15, color:'#5a5a5a'}}>
                    <div style={{fontWeight:600, color:'#ff3e7f', marginBottom:6}}>Specification:</div>
                    <ul style={{margin:0, paddingLeft:18}}>
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <li key={key}><span style={{fontWeight:500}}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div style={{display:'flex',gap:12}}>
                <Button type="primary" icon={<ShoppingCartOutlined />} style={{background:'linear-gradient(90deg,#ff3e7f,#ffb86c)',border:'none',fontWeight:600,fontSize:16,borderRadius:12,padding:'0 24px'}} onClick={()=>{
                  addToCart(selectedProduct);
                  message.success(`Đã thêm ${selectedProduct.name} vào giỏ hàng`);
                }}>Thêm vào giỏ</Button>
                <Button icon={<HeartOutlined />} style={{color:'#ff3e7f',border:'1.5px solid #ff3e7f',fontWeight:600,fontSize:16,borderRadius:12,padding:'0 20px',background:'#fff'}} onClick={()=>{/* handle add to wishlist */}}>Add to wishlist</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
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
    message.success(`Added ${product.name} to cart`);
  };

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      message.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      message.success(`Added ${product.name} to wishlist`);
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
              onClick={e => toggleFavorite(e, product)}
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
            onClick={(e) => handleAddToCart(e, product)}
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

      {selectedProduct && (
        <Modal
          title={selectedProduct.name}
          open={!!selectedProduct}
          onCancel={() => setSelectedProduct(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedProduct(null)}>
              Đóng
            </Button>,
            <Button 
              key="add" 
              type="primary" 
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                addToCart(selectedProduct);
                message.success(`Đã thêm ${selectedProduct.name} vào giỏ hàng`);
                setSelectedProduct(null);
              }}
            >
              Thêm vào giỏ
            </Button>
          ]}
          width={700}
        >
          <Row gutter={16}>
            <Col span={12}>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                style={{ width: '100%', height: 'auto' }} 
              />
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <Title level={4}>{selectedProduct.name}</Title>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <Rate disabled defaultValue={selectedProduct.rating} style={{ fontSize: 14 }} />
                  <Text type="secondary" style={{ marginLeft: 8 }}>({selectedProduct.reviews} đánh giá)</Text>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Text type="danger" style={{ fontSize: 24, fontWeight: 'bold' }}>
                    ${selectedProduct.price}
                  </Text>
                  {selectedProduct.originalPrice && (
                    <Text delete style={{ marginLeft: 8 }}>
                      ${selectedProduct.originalPrice}
                    </Text>
                  )}
                </div>
                <div>
                  <Text>Mô tả sản phẩm:</Text>
                  <p>{selectedProduct.description || 'Sản phẩm công nghệ cao cấp với nhiều tính năng hiện đại.'}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      )}
    </Card>
  );
};

// Gán ProductCard vào ProductList để có thể sử dụng trong trang Search
ProductList.ProductCard = ProductCard;

export default ProductList;
