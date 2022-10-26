import axios from 'axios';

const API_URL = '/api/posts';

const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return [...response.data];
};

const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

const getpostView = async (postId) => {
  const response = await axios.get(API_URL + '/' + postId);
  return response.data;
};

const updatePost = async (postId) => {
  const response = await axios.patch(API_URL + '/' + postId);
  return response.data;
};

const postService = {
  fetchPosts,
  createPost,
  getpostView,
  updatePost,
};

export default postService;
