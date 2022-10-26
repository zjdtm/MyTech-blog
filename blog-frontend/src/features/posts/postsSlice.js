import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postService from 'features/api/postService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    return await postService.fetchPosts();
  } catch (error) {
    console.log(error);
  }
});

export const createPost = createAsyncThunk('posts/create', async (postData) => {
  try {
    return await postService.createPost(postData);
  } catch (error) {
    console.log(error);
  }
});

export const getPostView = createAsyncThunk('posts/view', async (postId) => {
  try {
    return await postService.getpostView(postId);
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk('posts/update', async (postId) => {
  try {
    return await postService.updatePost(postId);
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const postsSlice = createSlice({
  name: 'posts',
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
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(getPostView.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostView.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPostView.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      });
  },
});

export const selectAllPosts = (state) => state.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);

export const { postAdd } = postsSlice.actions;

export default postsSlice.reducer;
