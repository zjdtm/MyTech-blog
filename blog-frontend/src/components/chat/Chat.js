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
`;

const ChatImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;

  &:hover {
    width: 90px;
    height: 90px;
  }
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
  const { chats, isLoading, isSuccess } = useSelector((state) => state.chats);

  useEffect(() => {
    if (user) {
      dispatch(getChat(user._id));
    }
  }, [user, dispatch]);

  return (
    <Container>
      <ChatSidebar>
        <ChatRoomContainer>
          {chats.map((c) => (
            <ChatRoom key={c._id}>
              <ChatImage src="/assets/img/monkey.png" alt="로고" />
              <span>{c.members.find((m) => m !== user._id)}</span>
            </ChatRoom>
          ))}
        </ChatRoomContainer>
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
