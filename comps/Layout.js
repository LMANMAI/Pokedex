import React from 'react'
import Header from './Head';
import Footer from './Footer';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
   
`;
const Layout = (props) => {
    return (
        <Wrapper>
            <Header />
            {props.children}
            <Footer />
        </Wrapper>
    )
}

export default Layout
