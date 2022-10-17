import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

const Container = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
`;

const Nav = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  height: 5rem;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const Slidebar = styled.div`
  background-color: yellowgreen;
  height: 50vh;
`;

const Header = () => {
  return (
    <Container>
      <Nav>
        <Logo src="assets/img/teco.png"></Logo>
        <NavLinks>
          <Link to="/login">LOGIN</Link>
          <Link to="/register">REGISTER</Link>
          <Link to="/">COMMUNITY</Link>
          <Link>GITHUB</Link>
        </NavLinks>
      </Nav>
      <Slidebar>Slidebar</Slidebar>
    </Container>
  );
};

export default Header;
