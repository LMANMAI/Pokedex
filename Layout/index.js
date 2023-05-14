import React from "react";
import { Header, Footer } from "../components";
import { LayoutWrapper } from "./styles";
const Layout = (props) => {
  return (
    <LayoutWrapper>
      <Header />
      {props.children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
