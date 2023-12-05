import React from "react";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Login") === "true"
  );

  // useEffect to update isLoggedIn when localStorage changes
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Login") === "true");
  }, []);

  return (
    <div className="h-[10vh] flex items-center justify-between w-full">
      <div className="logo flex items-center justify-center h-full w-1/2 ">
        <img src={logo} alt="logo" className="w-24" />
      </div>
      <div className="links  h-full w-1/2 flex items-center justify-center">
        <ul className="flex gap-10 text-lg font-semibold">
          <a href="/">Home</a>
          {isLoggedIn ? <a href="/products">Products</a> : null}
          {!isLoggedIn ? <a href="/login">Login</a> : null}
          {/* <a href="/login">Login</a> */}
          {!isLoggedIn ? <a href="/signup">Sign Up</a> : null}
        </ul>
      </div>
    </div>
  );
};

export default Header;
