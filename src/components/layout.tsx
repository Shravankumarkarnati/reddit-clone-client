import React from "react";
import MainWrapper from "./mainWrapper";
import NavBar from "./navBar";

interface layoutProps {}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <MainWrapper>
      <NavBar />
      {children}
    </MainWrapper>
  );
};
export default Layout;
