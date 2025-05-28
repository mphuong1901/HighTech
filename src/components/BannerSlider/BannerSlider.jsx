import React from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import './BannerSlider.css';
const { Title } = Typography;

function BannerSlider() {
  return (
    <Card className="banner-card" bordered={false}>
      <Row align="middle" justify="space-between" className="banner-content">
        <Col xs={24} sm={24} md={14} lg={14}>
          <div className="banner-text">
            <Title level={2}>iPhone 14 Series</Title>
            <Title level={3}>Up to 10% off Voucher</Title>
            <Button type="primary" size="large" className="shop-now-btn">Shop Now →</Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} className="banner-image-col">
          <img 
            src="/images/iphone14.png" 
            alt="iPhone 14 Series" 
            className="banner-img" 
          />
        </Col>
      </Row>
    </Card>
  );
}
export default BannerSlider;