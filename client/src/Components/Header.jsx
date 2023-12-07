import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Header = () => {
  const { state, logout } = useAuth();
  const isLoggedIn = state.isLoggedIn;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.setItem("Login", "false");
      logout(state.userEmail);
      navigate("/");
      toast.success("Logged Out Successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Logout failed", error);
      toast.error("Logout failed. Please try again", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-[10vh] flex items-center justify-between w-full">
      <div className="logo flex items-center justify-center h-full w-1/2 ">
        <img src={logo} alt="logo" className="w-24" />
      </div>
      <div className="links  h-full w-1/2 flex items-center justify-center">
        <ul className="flex gap-10 text-lg font-semibold">
          <Link to="/">Home</Link>
          {isLoggedIn && <Link to="/products">Products</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
          {isLoggedIn && (
            <>
              <Link to="/cart">
                <ShoppingCartOutlinedIcon />
              </Link>
              <button onClick={handleLogout} className="cursor-pointer">
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
