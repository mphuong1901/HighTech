import React, { useState } from "react";
import { Menu, Input, Badge, Drawer, List, Avatar, Button } from "antd";
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import './MainHeader.css';
import UserMenu from "../UserMenu";

function MainHeader() {
  const { cartCount } = useCart();
  const { wishlistItems, wishlistCount, removeFromWishlist, addToCart } = useWishlist();
  const { addToCart: addProductToCart } = useCart();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isWishlistVisible, setIsWishlistVisible] = useState(false);
  
  return (
    <div className="main-header">
      <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>HighTech</div>
      <Menu mode="horizontal" defaultSelectedKeys={['1']} className="main-menu">
        <Menu.Item key="1" onClick={() => navigate('/home')}>Home</Menu.Item>
        <Menu.Item key="2" onClick={() => navigate('/contact')}>Contact</Menu.Item>
        <Menu.Item key="3" onClick={() => navigate('/about')}>About</Menu.Item>

      </Menu>
      <div className="header-actions">
        <Input 
          className="search-input" 
          placeholder="What are you looking for?" 
          prefix={<SearchOutlined />} 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={() => {
            if (searchValue.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
            }
          }}
        />
        <Badge count={wishlistCount}>
          <HeartOutlined className="header-icon" onClick={() => setIsWishlistVisible(true)} />
        </Badge>
        <Badge count={cartCount}>
          <ShoppingCartOutlined className="header-icon" onClick={() => navigate('/cart')} />
        </Badge>
        <UserMenu />
        
        <Drawer 
          title="Danh sách yêu thích" 
          placement="right" 
          onClose={() => setIsWishlistVisible(false)} 
          open={isWishlistVisible}
          width={400}
        >
          {wishlistItems.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={wishlistItems}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button 
                      icon={<ShoppingCartOutlined />} 
                      onClick={() => {
                        addProductToCart(item);
                        removeFromWishlist(item.id);
                      }}
                    />,
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={() => removeFromWishlist(item.id)}
                    />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} shape="square" size={64} />}
                    title={item.name}
                    description={<span style={{ color: '#DB4444' }}>${item.discountPrice ? item.discountPrice.toFixed(2) : item.price.toFixed(2)}</span>}
                  />
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Danh sách yêu thích trống</p>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
}

export default MainHeader;