import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  message,
  Modal
} from 'antd';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function CheckoutPage() {
  const [form] = Form.useForm();
  const { cartItems, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePayment = (values) => {
    console.log("Customer information:", values);
    console.log("Cart:", cartItems);
    setIsModalVisible(true); // Hiển thị modal mã QR
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    message.success('Payment successful!');
    clearCart();
    navigate('/home');
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: 32,
        background: '#fff',
        borderRadius: 12,
      }}
    >
      <Title level={2}>Payment information</Title>
      <Divider />
      <Form layout="vertical" form={form} onFinish={handlePayment}>
        <Form.Item
          label="Full name"
          name="name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="John Smith" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Invalid email!' },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="0123456789" />
        </Form.Item>

        <Form.Item
          label="Adress"
          name="address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="123 Street ABC, District XYZ, XXX"
          />
        </Form.Item>

        <Divider />
        <Text strong>Total: </Text>
        <Text style={{ fontSize: 20, marginLeft: 8, color: '#DB4444' }}>
          {calculateTotal().toLocaleString('vi-VN')} $
        </Text>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" size="large" block>
            Payment
          </Button>
        </Form.Item>
      </Form>

      {/* Modal hiển thị QR */}
      <Modal
        title="Scan code to payment"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Paid
          </Button>,
        ]}
        centered
      >
        <div style={{ textAlign: 'center' }}>
        <img
            src="/MB-NGUYEN MINH PHUONG -123456789.png"
            alt="Payment QR code"
            style={{ maxWidth: '100%', borderRadius: 8 }}
        />
          <p style={{ marginTop: 16, fontWeight: 'bold' }}>
            Total: {calculateTotal().toLocaleString('vi-VN')} $
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default CheckoutPage;
