import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuthLayout = () => {
  const token = useSelector((state) => state.auth.token);
  const refreshToken = localStorage.getItem("refresh");

  if (token || refreshToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuthLayout;
