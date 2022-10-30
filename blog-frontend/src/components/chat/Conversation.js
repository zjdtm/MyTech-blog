import { getUser, getUserfriend } from 'features/chat/chatSlice';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  background-color: yellow;
  width: 100px;
  height: 100px;
  margin: 10px;
  color: white;
  display: flex;
`;

const Items = styled.div`
  background-color: aliceblue;
  margin: 10px;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  :hover {
    background-color: orange;
  }
`;

const Text = styled.span`
  color: black;
  width: 40px;
  height: 40px;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;

const Conversation = ({ conversation, currentUser }) => {
  return (
    <Container>
      <Text>이미지</Text>
      <Text>텍스트</Text>
    </Container>
  );
};
export default Conversation;
