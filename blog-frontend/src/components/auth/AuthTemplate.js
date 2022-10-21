import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  background: #cbc0d3;
  height: 100vh;
`;

const AuthTemplateContainer = styled.div`
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
`;

const Welcome = styled.div`
  background: #ffff;
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
`;

const PinkBox = styled.div`
  position: absolute;
  top: -10%;
  left: 5%;
  background: #eac7cc;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  z-index: 2;
`;

const RightBox = styled.div`
  position: absolute;
  width: 50%;
  transition: 1s all ease;
  right: -2%;
  text-align: center;
`;

const Title = styled.div`
  font-family: sans-serif;
  text-align: center;
  font-size: 1.8rem;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
`;

const Desc = styled.div`
  margin-top: -8px;
`;

const Account = styled.div`
  margin-top: 45%;
  font-size: 10px;
`;

const Flower = styled.img`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 46%;
  left: 29%;
  opacity: 0.7;
`;

const LinkButton = styled(Link)`
  padding: 12px;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 11px;
  border-radius: 10px;
  margin: auto;
  outline: none;
  display: block;
  &:hover {
    background: #eac7cc;
    color: #ffff;
    transition: background-color 0.8s ease-out;
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <AuthTemplateContainer>
        <Welcome>
          <PinkBox>{children}</PinkBox>
          <RightBox>
            <Title>BLOOM&BOUQUET</Title>
            <Desc>pick your perfect bouquet</Desc>
            <Flower
              src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"
              alt="flower2"
            />
            <Account>don't have an account</Account>
            <LinkButton to="/">REACTERS</LinkButton>
          </RightBox>
        </Welcome>
      </AuthTemplateContainer>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
