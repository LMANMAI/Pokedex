import React from 'react'
import Header from './Head';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout
