import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default RootLayout;
