import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: footer;
  background-color: darkgray;
  display: flex;
  justify-content: space-around;
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

const Footer = () => {
  return (
    <Container>
      <FooterRow>
        <Logo src="/assets/img/teco.png" />
      </FooterRow>
      <FooterRow>
        <h4>TECHMONGO</h4>
        <h3>github</h3>
        <h3>facebook</h3>
      </FooterRow>
    </Container>
  );
};

export default Footer;
