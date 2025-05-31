import React from "react";
import { Card, Typography, Button, Row, Col } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import bannerMusic from "../../Image/Banner music.jpg";
import './PromoBanner.css';
const { Title } = Typography;
function PromoBanner() {
  return (
    <Card className="promo-banner-card" style={{ background: 'linear-gradient(90deg, #0A0A0A 0%, #3A3A3A 100%)', color: '#fff', borderRadius: 16, overflow: 'hidden', padding: 0 }}>
      <Row align="middle" gutter={0}>
        <Col xs={24} sm={12} style={{ padding: '24px' }}>
          <div className="promo-content">
            <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>Enhance Your Music Experience</Title>
            <Typography.Paragraph style={{ color: '#ccc', fontSize: 16, marginBottom: 24 }}>
              Immerse yourself in crystal-clear sound with our premium headphones. Experience music like never before with noise cancellation and superior audio quality.
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={24} sm={12} className="promo-image-container">
          <img 
            src={bannerMusic} 
            alt="Premium Headphones" 
            className="promo-image" 
          />
        </Col>
      </Row>
    </Card>
  );
}
export default PromoBanner;