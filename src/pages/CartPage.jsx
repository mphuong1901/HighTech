import React from 'react';
import { useCart } from '../components/CartContext';
import { Layout, Table, Button, InputNumber, Empty, Card, Typography, Space, Divider } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import MainHeader from '../components/MainHeader/MainHeader';
import FooterBar from '../components/FooterBar/FooterBar';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Sản phẩm',
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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <div>
          {record.discountPrice ? (
            <>
              <Text strong className="discount-price">{record.discountPrice.toLocaleString('vi-VN')}₫</Text>
              <br />
              <Text delete className="original-price">{record.price.toLocaleString('vi-VN')}₫</Text>
            </>
          ) : (
            <Text strong>{record.price.toLocaleString('vi-VN')}₫</Text>
          )}
        </div>
      ),
    },
    {
      title: 'Số lượng',
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
      title: 'Tổng tiền',
      key: 'total',
      render: (_, record) => {
        const price = record.discountPrice || record.price;
        return <Text strong>{(price * record.quantity).toLocaleString('vi-VN')}₫</Text>;
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
            <Title level={2}>Giỏ hàng của bạn</Title>
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
                    <Title level={4}>Tổng đơn hàng</Title>
                    <Divider />
                    <div className="summary-row">
                      <Text>Tạm tính:</Text>
                      <Text strong>{calculateTotal().toLocaleString('vi-VN')}₫</Text>
                    </div>
                    <div className="summary-row">
                      <Text>Phí vận chuyển:</Text>
                      <Text>Miễn phí</Text>
                    </div>
                    <Divider />
                    <div className="summary-row total">
                      <Text strong>Tổng cộng:</Text>
                      <Text strong className="total-price">{calculateTotal().toLocaleString('vi-VN')}₫</Text>
                    </div>
                    <Button type="primary" block size="large" className="checkout-button">
                      Thanh toán
                    </Button>
                  </Card>
                </div>
                
                <div className="cart-actions">
                  <Button 
                    type="default" 
                    icon={<ShoppingOutlined />} 
                    onClick={() => navigate('/home')}
                  >
                    Tiếp tục mua sắm
                  </Button>
                  <Button 
                    type="default" 
                    danger 
                    onClick={clearCart}
                  >
                    Xóa giỏ hàng
                  </Button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <Empty 
                  description="Giỏ hàng của bạn đang trống" 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
                <Button 
                  type="primary" 
                  icon={<ShoppingOutlined />} 
                  onClick={() => navigate('/home')}
                  className="continue-shopping-btn"
                >
                  Tiếp tục mua sắm
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