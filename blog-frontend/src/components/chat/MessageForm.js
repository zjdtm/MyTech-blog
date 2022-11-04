import { AppContext } from 'context/appContext';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MessageOutput = styled.div`
  width: 40vw;
  height: 50vh;
  border: 1px solid lightgray;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.auth);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const getFormatterDate = () => {
    const date = new Date();
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  };

  const todayDate = getFormatterDate();

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    console.log('room messages', roomMessages);
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours + ':' + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', message, user, time, todayDate, roomId);
    setMessage('');
  };

  return (
    <div>
      <MessageOutput>
        {!user && <div>Please Login</div>}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgidx) => (
                  <div className="message" key={msgidx}>
                    <p>{content}</p>
                  </div>
                ),
              )}
            </div>
          ))}
      </MessageOutput>
      <Form onSubmit={handleSubmit}>
        <Row style={{ display: 'flex', width: '20vw' }}>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={10}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: '10vh', backgroundColor: 'orange' }}
              disabled={!user}
            >
              보내기
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MessageForm;
