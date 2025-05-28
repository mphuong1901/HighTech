import React from "react";
import { Card, Typography } from "antd";
import './PromoBanner.css';
const { Title } = Typography;
function PromoBanner() {
  return (
    <Card className="promo-banner-card" style={{ background: '#222', color: '#fff', textAlign: 'center', borderRadius: 16 }}>
      <Title level={4} style={{ color: '#fff' }}>Enhance Your Music Experience</Title>
      <div>Best audio devices for tech lovers. Shop now!</div>
    </Card>
  );
}
export default PromoBanner; 