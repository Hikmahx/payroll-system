import React from "react";
import Header from "./Header";
import Main from "./Main";

const Layout = () => {
  return (
    <div className="dashboard font-nunito">
      <section className="">
        <div className="wrapper relative">
          <Header />
        </div>
        <Main />
      </section>
    </div>
  );
};

export default Layout;
