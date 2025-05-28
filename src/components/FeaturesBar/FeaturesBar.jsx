import React from "react";
import { Row, Col, Card } from "antd";
import '../FeaturesBar/FeaturesBar.css';

function FeaturesBar() {
  return (
    <Row gutter={24} className="features-bar-row">
      <Col span={8}>
        <Card bordered={false} className="features-bar-card">
          <b>Free & Fast Delivery</b>
          <div>Free delivery for all orders over $50</div>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false} className="features-bar-card">
          <b>24/7 Customer Service</b>
          <div>Friendly 24/7 customer support</div>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false} className="features-bar-card">
          <b>Money Back Guarantee</b>
          <div>We return money within 30 days</div>
        </Card>
      </Col>
    </Row>
  );
}

export default FeaturesBar; 