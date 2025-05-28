import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography, Input, Row, Col, Empty, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import MainHeader from '../components/MainHeader/MainHeader';
import ProductList from '../components/ProductList/ProductList';
import FooterBar from '../components/FooterBar/FooterBar';
import { laptops, headphones, smartwatches, smartphones } from '../DATA/data';

const { Content } = Layout;
const { Title } = Typography;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  // Lấy query từ URL khi component được mount hoặc URL thay đổi
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    setSearchValue(query);
    performSearch(query);
  }, [location.search]);

  // Hàm tìm kiếm sản phẩm
  const performSearch = (query) => {
    setLoading(true);
    
    // Giả lập delay tìm kiếm
    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      // Tập hợp tất cả sản phẩm từ các danh mục
      const allProducts = [
        ...laptops,
        ...headphones,
        ...smartwatches,
        ...smartphones
      ];

      // Tìm kiếm theo tên sản phẩm (không phân biệt hoa thường)
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);
      setLoading(false);
    }, 500); // Delay 500ms để tạo hiệu ứng tìm kiếm
  };

  // Xử lý khi người dùng nhấn Enter để tìm kiếm
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fafafa' }}>
      <HeaderBar />
      <MainHeader />
      <Layout>
        <Content style={{ padding: '32px 32px 0 32px', background: '#fafafa' }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3}>Kết quả tìm kiếm cho: "{searchQuery}"</Title>
            <Input
              size="large"
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={handleSearch}
              style={{ maxWidth: 500, marginTop: 16 }}
            />
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size="large" />
            </div>
          ) : searchResults.length > 0 ? (
            <Row gutter={[16, 16]}>
              {searchResults.map(product => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductList.ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty 
              description="Không tìm thấy sản phẩm nào phù hợp" 
              style={{ margin: '40px 0' }}
            />
          )}
        </Content>
      </Layout>
      <FooterBar />
    </Layout>
  );
}

export default Search;