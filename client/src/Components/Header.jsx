import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "../assets/cart.png"; // Import your cart icon

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Login") === "true"
  );
  const [userProducts, setUserProducts] = useState([]); // Assuming you have a state for user's products
  const navigate = useNavigate();

  // useEffect to update isLoggedIn and userProducts when localStorage changes
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Login") === "true");

    // Fetch or set user products based on your implementation
    // Example: Fetch user products from your backend
    if (isLoggedIn) {
      // Replace this with your actual logic to fetch user products
      // setUserProducts(fetchUserProducts());
    }
  }, [isLoggedIn]); // Trigger useEffect when isLoggedIn changes

  const handleLogout = () => {
    // Perform logout logic, clear localStorage or perform any necessary actions
    localStorage.setItem("Login", "false");

    // Redirect to the home page after logout
    navigate("/");
  };

  console.log(isLoggedIn);

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
