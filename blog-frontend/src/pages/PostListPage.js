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
    'header header'
    'slide slide'
    'cat cat '
    'chat main '
    'footer footer ';
  grid-template-rows: 100px 520px;
  grid-template-columns: 500px 1fr;
`;

const PostListPage = () => {
  return (
    <Container>
      <NavbarContainer />
      <Slide />
      <CategoryContainer />
      <ChatContainer />
      <PostListContainer />
      <Footer />
    </Container>
  );
};

export default PostListPage;
