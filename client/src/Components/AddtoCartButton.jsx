import React, { useEffect, useState } from "react";

const AddtoCartButton = ({ data, cartCounts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(cartCounts?.quantity);
  // console.log(cartCounts);
  // useEffect(() => {
  //   const fetchCartCount = async () => {
  //     try {
  //       const email = localStorage.getItem("Email");
  //       const info = {
  //         userId: email,
  //         id: data.id,
  //       };

  //       const response = await fetch("http://127.0.0.1:5000/api/products", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(info),
  //       });

  //       if (response.ok) {
  //         const responseData = await response.json();
  //         setCount(responseData.count);
  //         console.log("Cart count updated successfully");
  //       } else {
  //         console.error("Error updating cart count");
  //       }
  //     } catch (error) {
  //       console.error("Error updating cart count: ", error);
  //     }
  //   };

  //   fetchCartCount();
  // }, [data.id]);

  const fetchAndUpdateCart = async (apiEndpoint) => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("Email");
      const info = {
        userId: email,
        id: data.id,
      };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        const responseData = await response.json();
        setCount(responseData.count);
        console.log("Cart updated successfully");
      } else {
        console.error("Error updating cart");
      }
    } catch (error) {
      console.error("Error updating cart: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    await fetchAndUpdateCart("http://127.0.0.1:5000/api/products/add");
  };

  const handleRemoveFromCart = async () => {
    await fetchAndUpdateCart("http://127.0.0.1:5000/api/products/remove");
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className={`h-12 rounded-2xl w-full text-lg font-semibold ${
          count > 0 ? "bg-[#ffd84d]" : "bg-[#ffd84d]"
        } border-r ${count > 0 ? "border-[#ffd84d]" : "border-[#ffd84d]"}`}
        onClick={handleAddToCart}
      >
        {isLoading
          ? "Adding..."
          : count > 0
          ? `Add to Cart (${count})`
          : "Add to Cart"}
      </button>
      {count > 0 && (
        <button
          className="h-12 rounded-2xl w-full text-lg font-semibold bg-red-500"
          onClick={handleRemoveFromCart}
          disabled={isLoading}
        >
          {isLoading ? "Removing..." : "Remove"}
        </button>
      )}
    </div>
  );
};

export default AddtoCartButton;
