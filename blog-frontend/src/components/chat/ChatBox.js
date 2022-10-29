import React from 'react';
import styled from 'styled-components';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: ${(props) => (props.props === true ? 'flex-end' : '')};
`;

const ChatTop = styled.div`
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  p {
    /* align-items: ${(props) => (props.own ? 'flex-end' : '')}; */
    padding: 10px;
    border-radius: 20px;
    background-color: #1877f2;
    color: white;
    max-width: 300px;
  }
`;

const ChatBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const ChatBox = ({ own }) => {
  return (
    <ChatBoxContainer props={own}>
      <ChatTop>
        <img src="/assets/img/banana.png" alt="프로필 이미지" />
        <p>MessageTextMessageTextMessageTex MessageTextMessageTextMessageTex</p>
      </ChatTop>
      <ChatBottom>1hour ago</ChatBottom>
    </ChatBoxContainer>
  );
};

export default ChatBox;
