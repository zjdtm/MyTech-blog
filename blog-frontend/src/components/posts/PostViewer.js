import Spinner from 'components/common/Spinner';
import { reset } from 'features/auth/authSlice';
import {
  fetchPosts,
  getPostById,
  getPostView,
} from 'features/posts/postsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const PostViewerContainer = styled.div`
  background-color: #e4ebf5;
  border-radius: 10px;
  margin: 10px;
  height: 100vh;
  overflow: hidden;
`;

const PostBox = styled.div`
  align-items: center;
  margin: 10px;
  height: 100vh;
  border-radius: 20px;
  box-shadow: 0.8rem 0.8rem 1.4rem #c8d0e7, -0.2rem -2rem 1.8rem #ffff;
`;

const PostHead = styled.div`
  background-color: #e4ebf5;
`;

const PostImage = styled.div`
  background-color: red;
  width: 50px;
  height: 30px;
  float: right;
`;

const PostBody = styled.div``;

const PostTagBox = styled.div`
  display: flex;

  p {
    margin: 10px;
  }
`;

const PostViewer = () => {
  const dispatch = useDispatch();
  const { username, postId } = useParams();

  const post = useSelector((state) => getPostById(state, postId));

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  //   dispatch(() => getPostView(postId));
  // }, [isError, message, posts, isSuccess, postId, dispatch]);

  if (!post) {
    return <div>게시물이 존재하지 않습니다.</div>;
  }

  return (
    <PostViewerContainer>
      <PostBox>
        <PostHead>
          <h1>{post.title}</h1>
          <span>{username}</span>
        </PostHead>
        <PostImage>
          <p>이미지</p>
        </PostImage>
        <PostTagBox>
          {post.tags.map((tag) => (
            <p>{tag}</p>
          ))}
        </PostTagBox>
        <PostBody
          dangerouslySetInnerHTML={{
            __html: `${post.body}`,
          }}
        ></PostBody>
      </PostBox>
    </PostViewerContainer>
  );
};

export default PostViewer;
