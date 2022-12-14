import axios from 'axios';

const API_URL = '/api/conversation';

const createChat = async (chat) => {
  const response = await axios.post(API_URL, chat);
  return response.data;
};

const getChat = async (userId) => {
  const response = await axios.get(API_URL + '/' + userId);
  return response.data;
};

const getMessages = async (conversationId) => {
  const response = await axios.get('/api/messages/' + conversationId);
  return response.data;
};

const postMessage = async (message) => {
  const response = await axios.post('/api/messages', message);
  return response.data;
};

const chatService = {
  getChat,
  createChat,
  getMessages,
  postMessage,
};

export default chatService;
