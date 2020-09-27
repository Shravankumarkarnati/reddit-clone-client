import React from "react";
import NavBar from "./navBar";
import Head from "next/head";

interface layoutProps {}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Coterie</title>
      </Head>
      <div className="layout">
        <NavBar />
        {children}
      </div>
    </>
  );
};
export default Layout;
