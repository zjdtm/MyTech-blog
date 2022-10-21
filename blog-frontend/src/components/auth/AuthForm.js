import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthFormBlock = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 300px;
    position: absolute;
    top: -16%;
    left: 7%;
  }

  h1 {
    font-family: sans-serif;
    text-align: center;
    margin-top: 95px;
    text-transform: uppercase;
    /* color: #fff; */
    font-size: 2em;
    letter-spacing: 8px;
  }
`;

const StyledInput = styled.input`
  background: white;
  width: 75%;
  color: #fff;
  border-radius: 10px;
  padding: 9px;
  margin: 10px auto;
  &::placeholder {
    color: rgba(#fff, 1);
    letter-spacing: 2px;
    font-size: 1.3em;
    font-weight: 100;
  }
  &:focus {
    color: gray;
  }
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
  return (
    <AuthFormBlock>
      <img src="assets/img/tree.png" alt="tree" />
      <h1>{text}</h1>
      <StyledInput
        autoComplete="username"
        name="username"
        placeholder="아이디"
      />
      <StyledInput
        autoComplete="new-password"
        name="password"
        placeholder="비밀번호"
        type="password"
      />
      {type === 'register' && (
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
        />
      )}
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
