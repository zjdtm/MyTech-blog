import React from 'react';
import styled from 'styled-components';
import Footer from '../components/common/Footer';
import Slide from '../components/main/Slide';
import CategoryContainer from '../containers/category/CategoryContainer';
import ChatContainer from '../containers/chat/ChatContainer';
import NavbarContainer from '../containers/common/NavbarContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const Container = styled.div`
  display: grid;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    'header header header'
    'slide slide slide'
    'chat main cat'
    'chat main cat'
    'footer footer footer';
  grid-template-rows: 100px 1fr 60px;
  grid-template-columns: 400px 1fr 300px;
`;

const PostListPage = () => {
  return (
    <Container>
      <NavbarContainer />
      <Slide />
      <ChatContainer />
      <PostListContainer />
      <CategoryContainer />
      <Footer />
    </Container>
  );
};

export default PostListPage;
