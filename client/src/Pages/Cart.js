import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const email = localStorage.getItem("Email");
        const response = await fetch(`http://127.0.0.1:5000/api/cart/${email}`);

        if (response.ok) {
          const cartData = await response.json();
          setCartItems(cartData.cart);
        } else {
          console.error("Error fetching cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id.$oid}>
              <p>Product ID: {item.product}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
