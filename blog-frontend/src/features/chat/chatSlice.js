import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatService from 'features/api/chatService';

export const getChat = createAsyncThunk('chat/getChat', async (userId) => {
  try {
    return await chatService.getChat(userId);
  } catch (e) {
    console.log(e);
  }
});

export const createChat = createAsyncThunk('chat/createChat', async (chat) => {
  try {
    return await chatService.createChat(chat);
  } catch (e) {
    console.log(e);
  }
});

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (conversationId) => {
    try {
      return await chatService.getMessages(conversationId);
    } catch (e) {
      console.log(e);
    }
  },
);

export const postMessage = createAsyncThunk(
  'chat/postMessage',
  async (message) => {
    try {
      return await chatService.postMessage(message);
    } catch (e) {
      console.log(e);
    }
  },
);

const initialState = {
  chats: [],
  chatMessages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chats = null;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chatMessages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chatMessages = null;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.chatMessages += action.payload;
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.message = action.payload;
        state.chatMessages = null;
      });
  },
});

export default chatSlice.reducer;
