import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import postService from 'features/api/postService';

export const createPost = createAsyncThunk('posts/create', async (postData) => {
  try {
    console.log(postData);
    return await postService.createPost(postData);
  } catch (error) {
    console.log(error);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    postAdd: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdd } = postsSlice.actions;

export default postsSlice.reducer;
