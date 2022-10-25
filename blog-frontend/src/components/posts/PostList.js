import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { selectAllPosts } from 'features/posts/postsSlice';

const Container = styled.div`
  grid-area: main;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 50px;
`;

const Post = styled.div`
  display: flex;
  gap: 50px;
`;

const PostContent = styled.div`
  flex: 1;
`;

const PostList = () => {
  const posts = useSelector(selectAllPosts);

  return (
    <Container>
      <Posts>
        {/* {posts.map((post) => (
          <Post key={post.id}>
            <PostContent>
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </Link>
            </PostContent>
          </Post>
        ))} */}
      </Posts>
    </Container>
  );
};

export default PostList;
