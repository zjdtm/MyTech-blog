import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { fetchPosts } from 'features/posts/postsSlice';
import { toast } from 'react-toastify';
import Spinner from 'components/common/Spinner';

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
  const dispatch = useDispatch();

  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(fetchPosts());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Posts>
        {posts.map((post) => (
          <Post key={post._id}>
            <PostContent>
              <Link className="link" to={`/@${post.user.username}/${post._id}`}>
                <h1>{post.title}</h1>
                <p>{post.body.substring(0, 50)}...</p>
              </Link>
            </PostContent>
          </Post>
        ))}
      </Posts>
    </Container>
  );
};

export default PostList;
