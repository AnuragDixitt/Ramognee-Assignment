import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [userId, setUserId] = useState(""); // Set an initial value or use your authentication logic
  const [cartItems, setCartItems] = useState([]);

  const fetchUserCart = async () => {
    try {
      const response = await fetch(`/cart?userId=${userId}`);

      if (response.ok) {
        const userCart = await response.json();
        console.log("User Cart:", userCart); // Log the response
        setCartItems(userCart);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserCart();
    }
  }, [userId]);

  return (
    <div>
      <h1>Cart Page</h1>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={fetchUserCart}>Fetch Cart</button>

      <div>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index}>
              <p>
                Product: {item.product.productName} - Quantity: {item.quantity}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
