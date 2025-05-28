import React from "react";
import { Modal, Typography, Rate, Button } from "antd";
import { HeartOutlined, EyeOutlined } from "@ant-design/icons";

function ProductDetailModal({ open, product, onClose, onFavorite, isFavorite, onAddToCart }) {
  if (!product) return null;
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
        <img src={product.image} alt={product.name} style={{width:220,height:220,objectFit:'contain',borderRadius:8,background:'#fafafa'}} />
        <div style={{flex:1}}>
          <Typography.Title level={4}>{product.name}</Typography.Title>
          <div style={{marginBottom:8}}>
            <span style={{color:'#DB4444',fontWeight:600,fontSize:20}}>${product.discountPrice || product.price}</span>
            {product.originalPrice && <span style={{marginLeft:12,color:'#888',textDecoration:'line-through'}}>${product.originalPrice}</span>}
            {product.discount && <span style={{marginLeft:12,color:'#DB4444',fontWeight:500}}>-{product.discount}%</span>}
          </div>
          <div style={{marginBottom:8}}>
            <Rate disabled defaultValue={product.rating} />
            <span style={{marginLeft:8,color:'#888'}}>({product.reviews} đánh giá)</span>
          </div>
          <div style={{marginBottom:16}}>
            <span style={{color:'#555'}}>{product.description}</span>
          </div>
          <div style={{display:'flex',gap:12,marginBottom:16}}>
            <Button
              icon={<HeartOutlined />}
              shape="circle"
              type={isFavorite ? 'primary' : 'default'}
              onClick={() => onFavorite(product.id)}
            />
            <Button
              icon={<EyeOutlined />}
              shape="circle"
              type="default"
              disabled
            />
            <Button
              type="primary"
              style={{marginLeft:8}}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;