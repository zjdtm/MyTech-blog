import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import MyPage from 'pages/MyPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/@:username" element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/@:username/:postId" element={<PostPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
