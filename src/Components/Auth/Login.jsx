import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../Api/AuthApi";
import { setAccessToken } from "./AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, loginStates] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const creds = { email, password };
    try {
      const res = await login(creds).unwrap();
      const accessToken = res.access;
      const refreshToken = res.refresh;
      dispatch(setAccessToken({ accessToken, refreshToken }));
      toast.success("Login successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <main>
      <div className="py-16 px-6 max-w-2xl mx-auto select-none">
        <h1 className="text-center font-bold text-4xl mb-10 text-green-700 font-courgette">
          MORNING MAIL
        </h1>
        <form>
          <div className="border-2 flex rounded-lg my-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="p-3.5 border-r-2 text-2xl text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full p-3.5 outline-none text-gray-600"
            />
          </div>
          <div className="border-2 flex rounded-lg my-5 relative">
            <FontAwesomeIcon
              icon={faKey}
              className="p-3.5 border-r-2 text-2xl text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full p-3.5 pr-10 outline-none text-gray-600"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-3 top-4 text-gray-400 cursor-pointer text-xl"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="mt-10 mb-6 flex justify-between items-center">
            <input
              type="submit"
              value="Login"
              onClick={handleLogin}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-lg cursor-pointer w-full"
            />
          </div>
          <div className="flex gap-2">
            Don't have a account?
            <Link to="/signup" className="text-sky-500">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
