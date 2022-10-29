import axios from 'axios';

const API_URL = '/api/conversation';

const getChat = async (userId) => {
  const response = await axios.get(API_URL + '/' + userId);
  return response.data;
};

const getUserfriend = async (friendId) => {
  const response = await axios.get('/api/user?userId=' + friendId);
  return response.data;
};

const chatService = {
  getChat,
  getUserfriend,
};

export default chatService;
