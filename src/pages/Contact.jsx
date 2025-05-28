import React from 'react';
import { Typography, Form, Input, Button, Row, Col, Card, Divider, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import MainHeader from '../components/MainHeader/MainHeader';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

function Contact() {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // Process contact form submission here
  };

  return (
    <div>
      <MainHeader />
      <div style={{ padding: '40px 10%', background: '#f5f5f5' }}>
        <Typography>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 40 }}>Contact Us</Title>
          
          <Row gutter={[40, 40]}>
            {/* Contact Form */}
            <Col xs={24} lg={14}>
              <Card bordered={false} style={{ height: '100%' }}>
                <Title level={3}>Send Us a Message</Title>
                <Paragraph style={{ marginBottom: 20 }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Paragraph>
                
                <Form
                  name="contact"
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ remember: true }}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                      >
                        <Input size="large" placeholder="Enter your name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email!' },
                          { type: 'email', message: 'Invalid email format!' }
                        ]}
                      >
                        <Input size="large" placeholder="Enter your email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                  >
                    <Input size="large" placeholder="Enter your phone number" />
                  </Form.Item>
                  
                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter a subject!' }]}
                  >
                    <Input size="large" placeholder="Enter subject" />
                  </Form.Item>
                  
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message!' }]}
                  >
                    <TextArea rows={5} placeholder="Enter your message" />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" style={{ backgroundColor: '#DB4444', borderColor: '#DB4444' }}>
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            {/* Contact Information */}
            <Col xs={24} lg={10}>
              <Card bordered={false} style={{ height: '100%', backgroundColor: '#DB4444', color: 'white' }}>
                <Title level={3} style={{ color: 'white' }}>Contact Information</Title>
                <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                
                <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: 20 }}>
                  <Space>
                    <EnvironmentOutlined style={{ fontSize: 24 }} />
                    <div>
                      <Text strong style={{ color: 'white', display: 'block' }}>Address</Text>
                      <Text style={{ color: 'white' }}>Floor XX, XXX Building, XXX Street, XXX City</Text>
                    </div>
                  </Space>
                  
                  <Space>
                    <PhoneOutlined style={{ fontSize: 24 }} />
                    <div>
                      <Text strong style={{ color: 'white', display: 'block' }}>Phone</Text>
                      <Text style={{ color: 'white' }}>(024) XXXX XXXX</Text>
                    </div>
                  </Space>
                  
                  <Space>
                    <MailOutlined style={{ fontSize: 24 }} />
                    <div>
                      <Text strong style={{ color: 'white', display: 'block' }}>Email</Text>
                      <Text style={{ color: 'white' }}>info@hightech.com</Text>
                    </div>
                  </Space>
                </Space>
                
                <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                
                <Title level={4} style={{ color: 'white' }}>Business Hours</Title>
                <Paragraph style={{ color: 'white' }}>
                  Monday - Friday: 8:00 AM - 5:30 PM
                </Paragraph>
                <Paragraph style={{ color: 'white' }}>
                  Saturday: 8:00 AM - 12:00 PM
                </Paragraph>
                <Paragraph style={{ color: 'white' }}>
                  Sunday: Closed
                </Paragraph>
              </Card>
            </Col>
          </Row>
          
          {/* Map */}
          <div style={{ marginTop: 40 }}>
            <Title level={3}>Location Map</Title>
            <div style={{ width: '100%', height: '350px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Google Maps will be embedded here</Text>
            </div>
          </div>
        </Typography>
      </div>
    </div>
  );
}

export default Contact;