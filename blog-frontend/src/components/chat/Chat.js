import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  createChat,
  getChat,
  getMessages,
  postMessage,
} from 'features/chat/chatSlice';
import ChatBox from './ChatBox';
import { useRef } from 'react';
import { io } from 'socket.io-client';
import { current } from '@reduxjs/toolkit';
import { createPost } from 'features/posts/postsSlice';

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
  width: 30%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #ffd400;
  margin: 10px;
  border-radius: 20%;
  color: white;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    img {
      width: 90px;
      height: 90px;
    }
  }
`;

const NoUserChatRoom = styled.div`
  margin: 30%;
  display: flex;
  flex-direction: column;
`;

const ChatImage = styled.img`
  width: 100px;
  height: 100px;
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
  const { chats, chatMessages, isLoading, isSuccess } = useSelector(
    (state) => state.chats,
  );
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(io('ws://localhost:8900'));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  const handleRoomClick = async (c) => {
    const chat = {
      senderId: user._id,
      receiverId: c,
    };

    dispatch(createChat(chat));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    dispatch(postMessage(message));
    dispatch(getMessages(currentChat._id));
    setNewMessage('');
  };

  // useEffect(() => {
  //   arrivalMessage &&
  //   currentChat?.members.includes(arrivalMessage.sender) &&
  //   dispatch
  // })

  useEffect(() => {
    if (user) {
      dispatch(getChat(user._id));
      socket.current.emit('addUser', user._id);
      socket.current.on('getUsers', (users) => {
        console.log(users);
      });
    }

    if (currentChat) {
      dispatch(getMessages(currentChat._id));
    }
  }, [user, currentChat, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <Container>
      <ChatSidebar>
        <ChatRoomContainer>
          {chats && user ? (
            chats.map((c) => (
              <ChatRoom key={c._id} onClick={() => setCurrentChat(c)}>
                <ChatImage src="/assets/img/monkey.png" alt="로고" />
                {user ? (
                  <span>{c.members.find((m) => m !== user._id)}</span>
                ) : null}
              </ChatRoom>
            ))
          ) : (
            <NoUserChatRoom>
              <ChatImage src="/assets/img/monkey.png" alt="로고" />
              <span>회원만 가능합니다.</span>
            </NoUserChatRoom>
          )}
        </ChatRoomContainer>
      </ChatSidebar>
      <ChatContent>
        {chats && user
          ? chatMessages.map((m) => (
              <div ref={scrollRef}>
                <ChatBox key={m._id} message={m} own={m.sender === user._id} />
              </div>
            ))
          : null}
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
