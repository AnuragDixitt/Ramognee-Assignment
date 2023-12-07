import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const email = localStorage.getItem("Email");

  const fetchCartDetails = async () => {
    console.log(email);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/products/user_cart_details?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        console.log(responseData[0]);

        setCartItems(responseData);
        console.log("Cart details fetched successfully");
        console.log(cartItems);
      } else {
        console.error("Error fetching cart details");
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-md hover:shadow-md transition duration-300 ease-in-out"
          >
            {/* Product Image */}
            {item.image && (
              <img
                src={item.image}
                alt={`Product: {item._id}`}
                className="mx-auto mb-4 rounded-md"
                style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            )}

            <p className="text-lg font-semibold mb-2">
              Product ID: {item.product}
            </p>
            <p className="text-base mb-2">Quantity: {item.quantity}</p>
            <p className="text-base">Price: ₹{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6 text-xl font-semibold">
          Total Cart Value : ₹
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Cart;
