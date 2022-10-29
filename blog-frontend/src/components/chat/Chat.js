import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from 'features/chat/chatSlice';
import Conversation from './Conversation';
import ChatBox from './ChatBox';

const Container = styled.div`
  grid-area: chat;
  border-radius: 20px;
  height: 75vh;
`;

const ChatSidebar = styled.div`
  background-color: aliceblue;
  height: 100px;
  margin: 10px;

  input {
    width: 98%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
  }
`;

const ConversationContainer = styled.div``;

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
        <ConversationContainer>
          <input placeholder="Search for friends" className="chatMenuInput" />
          {isSuccess === true && user ? (
            chats.map((c) => (
              <Conversation conversation={c} currentUser={user} />
            ))
          ) : (
            <Conversation />
          )}
        </ConversationContainer>
      </ChatSidebar>
      <ChatContent>
        <ChatBox own={true} />
        <ChatBox />
        <ChatBox own={true} />
        <ChatBox />
      </ChatContent>
      <ChatInput>
        <textarea placeholder="write something..."></textarea>
        <button>send</button>
      </ChatInput>
    </Container>
  );
};

export default Chat;
