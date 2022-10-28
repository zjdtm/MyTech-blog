import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatService from 'features/api/chatService';

export const fetchChats = createAsyncThunk('chat/fetchChat', async () => {
  try {
    return await fetchChats.fetchChats();
  } catch (error) {
    console.log(error);
  }
});

export const getChat = createAsyncThunk('chat/getChat', async (userId) => {
  try {
    return await chatService.getChat(userId);
  } catch (e) {
    console.log(e);
  }
});

const initialState = {
  chats: [],
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
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chats = null;
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
      });
  },
});

export default chatSlice.reducer;
