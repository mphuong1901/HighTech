import React from 'react';
import { useCart } from '../../components/CartContext';
import { Layout, Table, Button, InputNumber, Empty, Card, Typography, Space, Divider } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import MainHeader from '../../components/MainHeader/MainHeader';
import FooterBar from '../../components/FooterBar/FooterBar';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="cart-product-info">
          <img 
            src={record.image || `/src/Image/${record.name.replace(/\s+/g, '_')}.png`} 
            alt={record.name} 
            className="cart-product-image" 
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <div>
          {record.discountPrice ? (
            <>
              <Text strong className="discount-price">{record.discountPrice.toLocaleString('vi-VN')}$</Text>
              <br />
              <Text delete className="original-price">{record.price.toLocaleString('vi-VN')}$</Text>
            </>
          ) : (
            <Text strong>{record.price.toLocaleString('vi-VN')}$</Text>
          )}
        </div>
      ),
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value)}
          className="quantity-input"
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => {
        const price = record.discountPrice || record.price;
        return <Text strong>{(price * record.quantity).toLocaleString('vi-VN')}$</Text>;
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => removeFromCart(record.id)}
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#fafafa' }}>
      <HeaderBar />
      <MainHeader />
      <Layout>
        <Content style={{ padding: '32px', background: '#fafafa' }}>
          <div className="cart-container">
            <Title level={2}>Your shopping cart</Title>
            <Divider />
            
            {cartItems.length > 0 ? (
              <>
                <Table 
                  columns={columns} 
                  dataSource={cartItems.map(item => ({ ...item, key: item.id }))} 
                  pagination={false}
                  className="cart-table"
                />
                
                <div className="cart-summary">
                  <Card className="order-summary-card">
                    <Title level={4}>Total product value</Title>
                    <Divider />
                    <div className="summary-row">
                      <Text>Temporary:</Text>
                      <Text strong>{calculateTotal().toLocaleString('vi-VN')}$</Text>
                    </div>
                    <div className="summary-row">
                      <Text>Shipping cost:</Text>
                      <Text>Free</Text>
                    </div>
                    <Divider />
                    <div className="summary-row total">
                      <Text strong>Total:</Text>
                      <Text strong className="total-price">{calculateTotal().toLocaleString('vi-VN')}$</Text>
                    </div>
                    <Button 
                      type="primary" 
                      block 
                      size="large" 
                      className="checkout-button"
                      onClick={() => navigate('/checkout')}
                    >
                      Purchase now
                    </Button>
                  </Card>
                </div>
                
                <div className="cart-actions">
                  <Button 
                    type="default" 
                    icon={<ShoppingOutlined />} 
                    onClick={() => navigate('/home')}
                  >
                    Continue shopping
                  </Button>
                  <Button 
                    type="default" 
                    danger 
                    onClick={clearCart}
                  >
                    Delete all
                  </Button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <Empty 
                  description="Your cart is empty" 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
                <Button 
                  type="primary" 
                  icon={<ShoppingOutlined />} 
                  onClick={() => navigate('/home')}
                  className="continue-shopping-btn"
                >
                  Continue shopping
                </Button>
              </div>
            )}
          </div>
        </Content>
      </Layout>
      <FooterBar />
    </Layout>
  );
}

export default CartPage;