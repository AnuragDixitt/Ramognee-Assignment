import React, { useState } from "react";

const AddtoCartButton = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [count, setCount] = useState(0);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("Email");
      const info = {
        userId: email,
        id: data.id,
      };

      const response = await fetch("http://127.0.0.1:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        setCount(response.count);
        console.log(response.json());
        console.log("Product added to cart successfully");
        setIsAddedToCart(true);
        // Update the state or trigger a callback to update the UI
      } else {
        console.error("Error adding product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("Email");
      const info = {
        userId: email,
        id: data.id,
      };

      const response = await fetch(
        "http://127.0.0.1:5000/api/products/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      if (response.ok) {
        setCount(count - 1);
        console.log("Product removed from cart successfully");
        setIsAddedToCart(false);
        // Update the state or trigger a callback to update the UI
      } else {
        console.error("Error removing product from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <button
        className={`h-12 rounded-l-2xl w-1/2 text-lg font-semibold ${
          isAddedToCart ? "bg-[#ffd84d]" : "bg-[#ffd84d]"
        } border-r ${isAddedToCart ? "border-[#ffd84d]" : "border-[#ffd84d]"}`}
        onClick={handleAddToCart}
      >
        {isLoading
          ? "Adding..."
          : isAddedToCart
          ? "Add to Cart" + { count }
          : "Add to Cart"}
      </button>
      {isAddedToCart && (
        <button
          className="h-12 rounded-r-2xl w-1/2 text-lg font-semibold bg-red-500"
          onClick={handleRemoveFromCart}
          // disabled={isLoading}
        >
          {isLoading ? "Removing..." : "Remove"}
        </button>
      )}
    </div>
  );
};

export default AddtoCartButton;
