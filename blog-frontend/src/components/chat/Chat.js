import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getChat, getMessages, postMessage } from 'features/chat/chatSlice';
import ChatBox from './ChatBox';
import { useRef } from 'react';
import { io } from 'socket.io-client';

const Container = styled.div`
  grid-area: chat;
  border-radius: 20px;
  height: 75vh;
  display: flex;
  flex-direction: column;
`;

const ChatSidebar = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ChatRoomContainer = styled.div`
  width: 101%;
  height: 15vh;
  display: flex;
`;

const ChatRoom = styled.div`
  width: 28%;
  height: 100%;
  align-items: center;
  display: flex;
  /* flex-direction: column; */
  background-color: #ffd400;
  margin: 10px;
  border-radius: 20%;
  color: white;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const ChatImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const ChatContent = styled.div`
  height: 50vh;
  overflow: scroll;
`;

const ChatInput = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  textarea {
    width: 80%;
    height: 90px;
    padding: 10px;
  }

  button {
    margin: auto;
    width: 100px;
    height: 50px;
    border: none;
    cursor: pointer;
    background-color: coral;
    border-radius: 5px;
  }
`;

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chats, chatMessages } = useSelector((state) => state.chats);
  const [roomName, setRoomName] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(io('ws://localhost:8900'));
  const scrollRef = useRef();

  const RoomEntry = (r) => {
    setRoomName(r);
    dispatch(getMessages(r));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: roomName,
    };

    dispatch(postMessage(message));
    dispatch(getMessages(roomName));
    setNewMessage('');
  };

  useEffect(() => {
    socket.current.emit('addUser', user._id);
  }, [user]);

  console.log(socket);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <Container>
      <ChatSidebar>
        <ChatRoomContainer>
          <ChatRoom onClick={() => RoomEntry('back-end')}>
            <ChatImage src="/assets/img/monkey.png" alt="로고" />
            <span>백엔드</span>
          </ChatRoom>
          <ChatRoom onClick={() => RoomEntry('front-end')}>
            <ChatImage src="/assets/img/monkey.png" alt="로고" />
            <span>프론트엔드</span>
          </ChatRoom>
          <ChatRoom onClick={() => RoomEntry('community')}>
            <ChatImage src="/assets/img/monkey.png" alt="로고" />
            <span>커뮤니티</span>
          </ChatRoom>
        </ChatRoomContainer>
      </ChatSidebar>
      <ChatContent>
        {chats && user ? (
          chatMessages.map((m) => (
            <div key={m._id} ref={scrollRef}>
              <ChatBox key={m._id} message={m} own={m.sender === user._id} />
            </div>
          ))
        ) : (
          <div style={{ margin: '20%' }}>
            <ChatImage src="/assets/img/monkey.png" alt="로고" />
            <span>회원만 사용할 수 있어요</span>
          </div>
        )}
      </ChatContent>
      <ChatInput>
        {chats && user ? (
          <>
            <textarea
              placeholder="write something..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button onClick={handleSubmit}>send</button>
          </>
        ) : null}
      </ChatInput>
    </Container>
  );
};

export default Chat;
