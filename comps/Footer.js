import React from "react";
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100vw;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center; 
  p{
      font-size: 13px;
      color: #212121;
      font-family: Helvetica, sans-serif;
  }
`;
const Footer = () => {
  return (
    <Container>
      <p>Made with {"</>"} by Lucas Maidana</p>
    </Container>
  );
};

export default Footer;
