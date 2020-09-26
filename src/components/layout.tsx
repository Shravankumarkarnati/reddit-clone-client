import React from "react";
import NavBar from "./navBar";

interface layoutProps {}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
};
export default Layout;
