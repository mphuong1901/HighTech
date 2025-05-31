import React from "react";
import { Modal, Typography, Rate, Button, Row, Col, Divider, List } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function ProductDetailModal({ open, product, onClose, onFavorite, isFavorite, onAddToCart }) {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      styles={{
        body: {
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
      style={{ borderRadius: 20, overflow: 'hidden' }}
    >
      <Row gutter={[32, 24]} align="top">
        <Col xs={24} sm={10}>
          <div style={{ position: 'relative' }}>
            {product.discount && (
              <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: '#DB4444',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14
              }}>
                -{product.discount}%
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 16,
                background: '#fff',
                padding: 20,
              }}
            />
          </div>
        </Col>

        <Col xs={24} sm={14} style={{ flex: 1 }}>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 16, color: '#000' }}>
            {product.name}
          </Typography.Title>

          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <Rate disabled defaultValue={product.rating} style={{ fontSize: 16, color: '#DB4444' }} />
            <span style={{ marginLeft: 8, color: '#000' }}>
              ({product.reviews} reviews)
            </span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: '#000' }}>
              ${product.discountPrice || product.price}
            </span>
            {product.originalPrice && (
              <span style={{
                marginLeft: 12,
                color: '#000',
                opacity: 0.5,
                textDecoration: 'line-through',
                fontSize: 18
              }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {product.description && (
            <div style={{ marginBottom: 20 }}>
              <Typography.Paragraph style={{ fontSize: 16, color: '#000', marginBottom: 0 }}>
                {product.description}
              </Typography.Paragraph>
            </div>
          )}

          {product.specs && (
            <>
              <Divider style={{ margin: '16px 0', borderColor: '#DB4444' }} />
              <div style={{ marginBottom: 20 }}>
                <Typography.Title level={5} style={{ marginBottom: 12, color: '#000' }}>
                  Specification:
                </Typography.Title>
                <List
                  size="small"
                  bordered
                  style={{ background: '#fff', borderRadius: 8, borderColor: '#DB4444' }}
                  dataSource={Object.entries(product.specs)}
                  renderItem={([key, value]) => (
                    <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500, textTransform: 'capitalize', color: '#000' }}>{key}:</span>
                      <span style={{ color: '#000' }}>{value}</span>
                    </List.Item>
                  )}
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ background: '#DB4444', borderColor: '#DB4444', color: '#fff' }}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              Add to cart
            </Button>
            <Button
              icon={<HeartOutlined />}
              size="large"
              type={isFavorite ? 'primary' : 'default'}
              style={{
                ...(isFavorite
                  ? { background: '#DB4444', borderColor: '#DB4444', color: '#fff' }
                  : { borderColor: '#DB4444', color: '#000' }),
                cursor: 'pointer'
              }}
              onClick={() => {
                if (onFavorite && product?.id) {
                  onFavorite(product.id);
                }
              }}
            >
              {isFavorite ? 'Saved' : 'Add to wishlist'}
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default ProductDetailModal;