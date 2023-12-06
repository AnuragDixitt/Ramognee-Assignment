import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "../assets/cart.png"; // Import your cart icon
import { useAuth } from "./AuthContext";

const Header = () => {
  const { state, logout } = useAuth();
  console.log(state);
  const isLoggedIn = state.isLoggedIn;
  const [userProducts, setUserProducts] = useState([]); // Assuming you have a state for user's products
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("Login", "false");
    logout(state.userEmail);
    navigate("/");
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
                <img
                  src={ShoppingCartIcon}
                  alt="cart-icon"
                  className="w-8 cursor-pointer"
                />
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
