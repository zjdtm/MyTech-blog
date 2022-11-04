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
    appearance: none;
    background-color: transparent;
    border: 2px solid #1a1a1a;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3b3b3b;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    min-height: 60px;
    min-width: 0;
    outline: none;
    padding: 16px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;

    :disabled {
      pointer-events: none;
    }

    :hover {
      color: #fff;
      background-color: #1a1a1a;
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transform: translateY(-2px);

      :active {
        box-shadow: none;
        transform: translateY(0);
      }
    }
  }
`;

const Button = styled.button`
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;

  :disabled {
    pointer-events: none;
  }

  :hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);

    :active {
      box-shadow: none;
      transform: translateY(0);
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container>
      <Nav>
        <Logo
          src="/assets/img/teco.png"
          onClick={() => (window.location.href = '/')}
        ></Logo>
        <NavLinks>
          {user ? (
            <>
              <span>{user.username}님 환영합니다</span>
              <img
                src={user.profilePicture}
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '10px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
                alt="프로필 이미지"
              />
              <Link to="/write">
                <span>글작성</span>
              </Link>
              <Button onClick={onLogout}>LOGGOUT</Button>
            </>
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
          <StyledLink to="/mypage">
            <button>
              <span>COMMUNITY</span>
            </button>
          </StyledLink>
          <StyledLink>
            <button
              onClick={() =>
                window.open('https://github.com/zjdtm/MyTech-blog')
              }
            >
              <span>GITHUB</span>
            </button>
          </StyledLink>
        </NavLinks>
      </Nav>
    </Container>
  );
};

export default Navbar;
