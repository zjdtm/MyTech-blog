import { getUser, getUserfriend } from 'features/chat/chatSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const ConversationContainer = styled.div`
  background-color: yellow;
  display: flex;
  padding: 10px;
  overflow: scroll;
`;

const ConversationItems = styled.div`
  display: flex;
  width: 100px;

  :hover {
    background-color: orange;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
  }

  span {
    width: 40px;
    height: 40px;
  }
`;

const Conversation = ({ conversation, currentUser }) => {
  const dispatch = useDispatch();
  const { friendUsers } = useSelector((state) => state.chats);

  useEffect(() => {
    if (currentUser) {
      const friendId = conversation.members.find((m) => m !== currentUser._id);

      dispatch(getUserfriend(friendId));
    }
  }, [conversation, currentUser, dispatch]);

  return (
    <ConversationContainer>
      <ConversationItems>
        <img src="/assets/img/banana.png" alt="프로필" />
        <span>이름</span>
      </ConversationItems>
    </ConversationContainer>
  );
};

export default Conversation;
