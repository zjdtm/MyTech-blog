import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login, register, reset } from '../../features/auth/authSlice';
import Spinner from 'components/common/Spinner';

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

const Button = styled.button`
  border-radius: 10px;
  background-color: black;
  color: white;
`;

const AuthFooter = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type }) => {
  const text = textMap[type];
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
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
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    if (text === '회원가입') {
      e.preventDefault();

      if (password !== passwordConfirm) {
        toast.error('Password do not match');
      } else {
        const userData = {
          email,
          username,
          password,
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
          <Link to="/login">로그인</Link>
        )}
      </AuthFooter>
    </AuthFormBlock>
  );
};

export default AuthForm;
