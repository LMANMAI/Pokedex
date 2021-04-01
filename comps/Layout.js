import React from 'react'
import Head from './Head';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <div>
            <Head />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout
