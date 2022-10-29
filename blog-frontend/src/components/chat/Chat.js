import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from 'features/chat/chatSlice';
import Conversation from './Conversation';
import ChatBox from './ChatBox';

const Container = styled.div`
  grid-area: chat;
  background-color: white;
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

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
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
      <ChatContent>
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
      </ChatContent>
    </Container>
  );
};

export default Chat;
