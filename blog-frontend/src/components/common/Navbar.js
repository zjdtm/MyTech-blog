import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

const Container = styled.div`
  grid-area: header;
`;

const Nav = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 50px 10px 50px;
  height: 5rem;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
  color: gray;
`;

const Navbar = () => {
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
    </Container>
  );
};

export default Navbar;
