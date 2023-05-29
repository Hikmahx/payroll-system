import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="dashboard-main h-[calc(100%_-_160px)] ml-auto bg-very-light-gray w-[calc(100%_-_80px)] lg:w-[calc(100%_-_240px)] overflow-hidden">
      <Outlet />
    </main>
  );
};

export default Main;
