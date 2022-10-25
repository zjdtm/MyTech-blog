import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
