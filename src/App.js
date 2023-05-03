import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./Layouts/RootLayout";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home/Home";
import RequireAuthLayout from "./Layouts/RequireAuthLayout";
import Dashboard from "./Components/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<RequireAuthLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
