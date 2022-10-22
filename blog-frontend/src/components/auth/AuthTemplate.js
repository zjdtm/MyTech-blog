import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  background: #e0e3da;
  height: 120vh;
`;

const AuthTemplateContainer = styled.div`
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
`;

const Welcome = styled.div`
  background: #ffefca;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
`;

const LoginBox = styled.div`
  position: absolute;
  top: -10%;
  left: 5%;
  background: #fff9e6;
  width: 500px;
  height: 550px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const RightBox = styled.div`
  position: absolute;
  width: 50%;
  transition: 1s all ease;
  right: -2%;
  text-align: center;
`;

const Banana = styled.img`
  position: absolute;
  width: 350px;
  height: 500px;
  margin-top: 50%;
  left: 50%;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <AuthTemplateContainer>
        <Welcome>
          <LoginBox>{children}</LoginBox>
          <RightBox>
            <Banana src="/assets/img/banana.png" alt="flower2" />
          </RightBox>
        </Welcome>
      </AuthTemplateContainer>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
