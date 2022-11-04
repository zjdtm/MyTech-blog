import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MessageForm from './MessageForm';
import Sidebar from './Sidebar';

const Chat2 = () => {
  return (
    <Container>
      <Row style={{ display: 'flex' }}>
        <Col md={5} style={{ width: '20%', height: '80vh' }}>
          <Sidebar />
        </Col>
        <Col md={8} style={{ width: '40%', height: '80vh' }}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat2;
