import React from 'react';
import styled from 'styled-components';

const ConversationContainer = styled.div`
  background-color: yellow;
  align-items: center;
  padding: 10px;
`;

const ConversationItems = styled.div`
  display: flex;
  span {
    width: 40px;
    height: 40px;
  }
`;

const Conversation = () => {
  return (
    <ConversationContainer>
      <ConversationItems>
        <span>이미지</span>
        <span>이름</span>
      </ConversationItems>
    </ConversationContainer>
  );
};

export default Conversation;
