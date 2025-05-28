import React from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faLaptop, faHeadphones, faClock } from '@fortawesome/free-solid-svg-icons';
import './MainContent.css';

const { Content, Sider } = Layout;

function MainContent({ bannerData }) {
  return (
    <Layout>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0,display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Menu.Item key="0" icon={<FontAwesomeIcon icon={faMobileScreen} />}>Smartphone</Menu.Item>
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faLaptop} />}>Laptop</Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faHeadphones} />}>Headphones</Menu.Item>
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faClock} />}>Smartwatch</Menu.Item>
        </Menu>
      </Sider>
      
      <Content>
        <div className="banner-card">
          <Row align="middle">
            <Col xs={24} md={12}>
              <div className="banner-content">
                <div className="banner-text">
                  <h2>{bannerData.title}</h2>
                  <h3>{bannerData.subtitle}</h3>
                  <button className="shop-now-btn">
                    Shop Now
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="banner-image-col">
              <img
                src={bannerData.image}
                alt="Banner"
                className="banner-img"
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default MainContent;