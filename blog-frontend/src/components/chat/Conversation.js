import React from 'react';
import styled from 'styled-components';

const ConversationContainer = styled.div`
  background-color: yellow;
  align-items: center;
  padding: 10px;
`;

const ConversationItems = styled.div`
  display: flex;

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

const Conversation = () => {
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
