import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login, register, reset } from '../../features/auth/authSlice';
import Spinner from 'components/common/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from 'context/appContext';

const AuthFormBlock = styled.div`
  img {
    width: 200px;
    height: 300px;
    position: absolute;
    top: -23%;
    left: 25%;
  }

  h1 {
    font-family: sans-serif;
    text-align: center;
    margin-top: 95px;
    text-transform: uppercase;
    font-size: 2em;
    letter-spacing: 8px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  width: 500px;
  height: 400px;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 9px;
  margin: 10px auto;
  ::placeholder {
    color: rgba(#fff, 1);
    letter-spacing: 2px;
    font-size: 1.3em;
  }
`;

const StyledInputProfile = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 80px;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid gray;
    object-fit: cover;
  }

  .uploadImage {
    text-align: center;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    bottom: 0;
    right: -20px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  background-color: black;
  color: white;
`;

const AuthFooter = styled.div`
  margin-top: -8%;
  text-align: center;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type }) => {
  const text = textMap[type];
  const { socket } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    profilePicture: '',
  });

  const { email, username, password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      socket.emit('new-user');
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }

    dispatch(reset());
  }, [user, isError, socket, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setImagePreview(URL.createObjectURL(image));
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: image,
    }));
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'rulvkvph');

    try {
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/djp1gbf5d/image/upload',
        {
          method: 'post',
          body: data,
        },
      );
      const urlData = await res.json();

      return urlData.url;
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    if (text === '회원가입') {
      e.preventDefault();

      if (password !== passwordConfirm) {
        toast.error('패스워드가 일치하지 않습니다', {
          position: 'top-center',
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      } else {
        const userData = {
          email,
          username,
          password,
          profilePicture: image ? await uploadImage(image) : '',
        };

        dispatch(register(userData));
      }
    } else {
      const userData = {
        username,
        password,
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthFormBlock>
      <img src="assets/img/tree.png" alt="tree" />
      <h1>{text}</h1>
      <LoginForm onSubmit={onSubmit}>
        {type === 'register' && (
          <StyledInputProfile>
            <img
              src={imagePreview || '/assets/img/profile.png'}
              alt="profileImg"
            />
            <label htmlFor="image">
              <FontAwesomeIcon className="uploadImage" icon={faPlus} />
            </label>
            <StyledInput
              id="image"
              name="profilePicture"
              type="file"
              hidden
              accept="image/png, image/jpeg"
              onChange={onChangeImage}
            />
          </StyledInputProfile>
        )}
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          value={username}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={onChange}
          />
        )}
        <StyledInput
          autoComplete="password"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={onChange}
          />
        )}
        <Button type="submit" className="submitbtn">
          Submit
        </Button>
      </LoginForm>
      <AuthFooter>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">이미 회원이신가요 ?</Link>
        )}
      </AuthFooter>
      <ToastContainer />
    </AuthFormBlock>
  );
};

export default AuthForm;
