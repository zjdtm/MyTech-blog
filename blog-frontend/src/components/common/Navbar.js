import React from 'react';
import styled from 'styled-components';
import {
  Link,
  useNavigate,
} from '../../../node_modules/react-router-dom/dist/index';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';

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
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
  color: gray;
`;

const StyledLink = styled(Link)`
  button {
    color: #ffff;
    border-radius: 10px;
    padding: 10px 25px;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: 0.5s;
    position: relative;
    display: inline-block;
    box-shadow: 0 0 20px #eee;
    outline: none;
    background-size: 200% auto;
    background-image: linear-gradient(
      to right,
      #ffeeee 0%,
      #ddefbb 51%,
      #ffeeee 100%
    );
    line-height: 42px;
    border: none;

    :hover {
      background-position: right center; /* change the direction of the change here */
      color: #fff;
      text-decoration: none;
    }

    span {
      font-size: medium;
      font-weight: bolder;
    }
  }
`;

const Button = styled.button`
  color: #ffff;
  border-radius: 10px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  display: inline-block;
  box-shadow: 0 0 20px #eee;
  outline: none;
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    #ffeeee 0%,
    #ddefbb 51%,
    #ffeeee 100%
  );
  line-height: 42px;
  border: none;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <Container>
      <Nav>
        <Logo
          src="assets/img/teco.png"
          onClick={() => (window.location.href = '/')}
        ></Logo>
        <NavLinks>
          {user ? (
            <Button onClick={onLogout}>LOGGOUT</Button>
          ) : (
            <>
              <StyledLink to="/login">
                <button>
                  <span>LOGIN</span>
                </button>
              </StyledLink>
              <StyledLink to="/register">
                <button>
                  <span>REGISTER</span>
                </button>
              </StyledLink>
            </>
          )}
          <StyledLink to="/">
            <button>
              <span>COMMUNITY</span>
            </button>
          </StyledLink>
          <StyledLink>
            <button>
              <span>GITHUB</span>
            </button>
          </StyledLink>
        </NavLinks>
      </Nav>
    </Container>
  );
};

export default Navbar;
