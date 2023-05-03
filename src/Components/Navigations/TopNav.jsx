import React from "react";
import { useLogoutMutation } from "../../Api/AuthApi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../Auth/AuthSlice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const TopNav = () => {
  const [logout, logoutStates] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh");
    const creds = { refresh: refreshToken };
    try {
      await logout(creds).unwrap();
      dispatch(logOut());
      toast.success("Logout successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/login");
    } catch (err) {
      toast.error(`UnAuthorized`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(logOut());
    }
  };
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-lg">
      <Link to="/" className="font-bold text-xl font-courgette">Morning Mail</Link>
      <div>
        <button onClick={handleLogout}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
