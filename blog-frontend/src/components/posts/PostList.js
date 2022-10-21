import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

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

// const PostImage = styled.div`
//   flex: 1;

//   img {
//     width: 100%;
//     max-height: 400px;
//     object-fit: cover;
//   }
// `;

const PostContent = styled.div`
  flex: 1;
`;

const PostList = () => {
  const posts = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
      tags: ['java', 'kotlin'],
      img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
      tags: ['java', 'kotlin'],
      img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
      tags: ['java', 'kotlin'],
      img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
      tags: ['java', 'kotlin'],
      img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <Container>
      <Posts>
        {posts.map((post) => (
          <Post key={post.id}>
            <PostContent>
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <p>{post.tags}</p>
              </Link>
            </PostContent>
          </Post>
        ))}
      </Posts>
    </Container>
  );
};

export default PostList;
