import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Form, Input, Button, Typography, Row, Col, Card, Space, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, SendOutlined } from '@ant-design/icons';
import MainHeader from '../../components/MainHeader/MainHeader';
import { useNavigate } from 'react-router-dom';

import './Contact.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("mrbqnond");
  const navigate = useNavigate();
  const { Title, Paragraph, Text } = Typography;
  
  if (state.succeeded) {
    return (
      <div className="contact-success">
        <Card>
          <Title level={3}>Thank You!</Title>
          <Paragraph>Your message has been sent successfully. We will get back to you soon.</Paragraph>
          <Button type="primary" onClick={() => navigate("/home")} >Return to Home</Button>
        </Card>
      </div>
      
    );
  }
  
  return (
    <div>
      <MainHeader />
      <div className="contact-container">
        <Row gutter={[24, 24]} justify="center">
        <Col xs={24}>
          <Title level={2} className="page-title">Contact Us</Title>
          <Divider />
        </Col>
        
        {/* Contact Form */}
        <Col xs={24} md={12}>
          <Card title="Send Us a Message" className="contact-card">
            <form onSubmit={handleSubmit}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <label htmlFor="name">Full Name</label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email">Email Address</label>
                  <Input 
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="Your email"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject">Subject</label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="Message subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message">Message</label>
                  <Input.TextArea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    required
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />}
                  size="large"
                  disabled={state.submitting}
                  block
                >
                  Send Message
                </Button>
              </Space>
            </form>
          </Card>
        </Col>
        
        {/* Contact Information */}
        <Col xs={24} md={12}>
          <Card title="Contact Information" className="contact-card">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className="contact-info-item">
                <MailOutlined className="contact-icon" />
                <div>
                  <Text strong>Email</Text>
                  <Paragraph>info@hightech.com</Paragraph>
                </div>
              </div>
              
              <div className="contact-info-item">
                <PhoneOutlined className="contact-icon" />
                <div>
                  <Text strong>Phone</Text>
                  <Paragraph>(028) XXXX XXXX</Paragraph>
                </div>
              </div>
              
              <div className="contact-info-item">
                <HomeOutlined className="contact-icon" />
                <div>
                  <Text strong>Address</Text>
                  <Paragraph>
                  Floor XX, XXX Building, XXX Street, XXX City
                  </Paragraph>
                </div>
              </div>
              
              <div className="contact-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501714.3777334782!2d106.35554335472966!3d10.76192843195741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefdb25d923%3A0x4bcf54ddca2b7214!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1748466013610!5m2!1svi!2s"
                  width="100%" 
                  height="250" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
  );
}


export default ContactForm;