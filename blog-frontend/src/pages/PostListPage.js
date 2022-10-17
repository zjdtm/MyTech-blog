import React from 'react';
import styled from 'styled-components';
import Footer from '../components/common/Footer';
import CategoryContainer from '../containers/category/CategoryContainer';
import ChatContainer from '../containers/chat/ChatContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
`;

const PostListPage = () => {
  return (
    <Container>
      <HeaderContainer />
      <PostListContainer />
      <ChatContainer />
      <CategoryContainer />
      <Footer />
    </Container>
  );
};

export default PostListPage;
