import React, { useState } from "react";
import {
  faCircleUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../Api/AuthApi";
import { setAccessToken } from "./AuthSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, signupStates] = useSignupMutation();

  const handleSignup = async (e) => {
    e.preventDefault();
    const creds = { name, email, password, re_password: passwordConfirm };
    try {
      const res = await signup(creds).unwrap();
      const accessToken = res.access;
      const refreshToken = res.refresh;
      dispatch(setAccessToken({ accessToken, refreshToken }));
      toast.success("Signup successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.data.name) {
        toast.error(`Name: ${err?.data?.name[0]}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (err.data.email) {
        toast.error(`Email: ${err?.data?.email[0]}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (err.data.password) {
        toast.error(`Password: ${err?.data?.password[0]}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (err.data.re_password) {
        toast.error(`Confirm Password: ${err?.data?.re_password[0]}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
              icon={faCircleUser}
              className="p-3.5 border-r-2 text-2xl text-gray-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent w-full p-3.5 outline-none text-gray-600"
            />
          </div>
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
          <div className="border-2 flex rounded-lg my-5 relative">
            <FontAwesomeIcon
              icon={faKey}
              className="p-3.5 border-r-2 text-2xl text-gray-400"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="bg-transparent w-full p-3.5 pr-10 outline-none text-gray-600"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              className="absolute right-3 top-4 text-gray-400 cursor-pointer text-xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <div className="mt-10 mb-6 flex justify-between items-center">
            <input
              type="submit"
              value="Sign up"
              onClick={handleSignup}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-lg cursor-pointer w-full"
            />
          </div>
          <div className="flex gap-2">
            Already have a account?
            <Link to="/login" className="text-sky-500">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
