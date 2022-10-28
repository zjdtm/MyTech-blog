import axios from 'axios';

const API_URL = '/api/conversation';

const getChat = async (userId) => {
  console.log(userId);
  const response = await axios.get(API_URL + '/' + userId);
  return response.data;
};

const chatService = {
  getChat,
};

export default chatService;
