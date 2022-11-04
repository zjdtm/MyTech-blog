import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from '../node_modules/react-router-dom/dist/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import MyPage from 'pages/MyPage';
import { useState } from 'react';
import { AppContext, socket } from './context/appContext';

const App = () => {
  const [rooms, setRooms] = useState();
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
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
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
