import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatService from 'features/api/chatService';
import { act } from 'react-dom/test-utils';

export const getChat = createAsyncThunk('chat/getChat', async (userId) => {
  try {
    return await chatService.getChat(userId);
  } catch (e) {
    console.log(e);
  }
});

export const getUserfriend = createAsyncThunk(
  'chat/getUser',
  async (friendId) => {
    try {
      return await chatService.getUserfriend(friendId);
    } catch (e) {
      console.log(e);
    }
  },
);

const initialState = {
  chats: [],
  friendUsers: [],
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
      .addCase(getUserfriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserfriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friendUsers.push(action.payload);
        state.friendUsers = [
          ...new Set(state.friendUsers.map(JSON.stringify)),
        ].map(JSON.parse);
      })
      .addCase(getUserfriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.friendUsers = null;
      });
  },
});

export default chatSlice.reducer;
