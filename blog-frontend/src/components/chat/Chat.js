import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainContainer, ChatContainer } from '@chatscope/chat-ui-kit-react';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from 'features/chat/chatSlice';
import Conversation from './Conversation';

const Container = styled.div`
  grid-area: chat;
  background-color: #131324;
  display: flex;
  border-radius: 20px;
`;

const ChatSidebar = styled.div`
  background-color: aliceblue;
  height: 100px;

  input {
    width: 98%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
  }
`;

const ChatBox = styled.div`
  background-color: red;
  height: 500px;
`;

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chats, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.chats,
  );

  useEffect(() => {
    if (user) {
      dispatch(getChat(user._id));
    }
  }, [user, dispatch]);

  return (
    <Container>
      <ChatSidebar>
        <input placeholder="Search for friends" className="chatMenuInput" />
        <Conversation />
      </ChatSidebar>
      <ChatBox>2</ChatBox>
    </Container>
  );
};

export default Chat;
