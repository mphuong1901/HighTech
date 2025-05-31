import React from 'react';
import { Typography, Row, Col, Card, Avatar, Divider, Space } from 'antd';
import { TeamOutlined, BulbOutlined, TrophyOutlined, EnvironmentOutlined } from '@ant-design/icons';
import MainHeader from '../components/MainHeader/MainHeader';

const { Title, Paragraph, Text } = Typography;

function About() {
  // Team information - can be updated with actual information


  return (
    <div>
      <MainHeader />
      <div style={{ padding: '40px 10%', background: '#f5f5f5' }}>
        <Typography>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 40 }}>About HighTech</Title>
          
          {/* Company Introduction */}
          <div style={{ marginBottom: 40 }}>
            <Title level={2}>
              <TeamOutlined /> Who We Are
            </Title>
            <Paragraph style={{ fontSize: 16 }}>
              HighTech is a premium technology provider established in 20XX. We've become one of the most trusted electronics distributors, offering high-quality products at competitive prices with dedicated customer service.
            </Paragraph>
          </div>

          {/* Vision & Mission */}
          <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
            <Col xs={24} md={12}>
              <Card 
                title={<><BulbOutlined /> Vision</>} 
                bordered={false} 
                style={{ height: '100%' }}
              >
                <Paragraph>
                  To become a leading technology solutions provider, delivering innovative products and services that enhance users' quality of life.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card 
                title={<><TrophyOutlined /> Mission</>} 
                bordered={false} 
                style={{ height: '100%' }}
              >
                <Paragraph>
                  To provide high-quality technology products at reasonable prices while delivering excellent shopping experiences and customer service.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Core Values */}
          <div style={{ marginBottom: 40 }}>
            <Title level={2}>Core Values</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card bordered={false}>
                  <Title level={4}>Quality</Title>
                  <Paragraph>
                    Commitment to high-quality products meeting international standards.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false}>
                  <Title level={4}>Innovation</Title>
                  <Paragraph>
                    Continuously updating and introducing the latest technology products.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false}>
                  <Title level={4}>Customer Focus</Title>
                  <Paragraph>
                    Placing customers at the center of all business activities.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Contact */}
          <div>
            <Title level={2}>
              <EnvironmentOutlined /> Location
            </Title>
            <Paragraph>
              Floor XX, XXX Building, XXX Street, XXX City
            </Paragraph>
            <Paragraph>
              Email: info@hightech.com | Phone: (024) XXXX XXXX
            </Paragraph>
          </div>
        </Typography>
      </div>
    </div>
  );
}

export default About;