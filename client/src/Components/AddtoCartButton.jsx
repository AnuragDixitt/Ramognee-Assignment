import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddtoCartButton = ({ data, cartCounts }) => {
  const [count, setCount] = useState(cartCounts?.quantity ?? 0);

  const fetchAndUpdateCart = async (apiEndpoint) => {
    try {
      const email = localStorage.getItem("Email");
      const info = {
        userId: email,
        id: data.id,
        price: data.price,
        image: data.image,
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
        if (apiEndpoint === "http://127.0.0.1:5000/api/products/add")
          toast.success("Product added succesfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        else {
          toast.success("Product removed succesfully", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  const handleAddToCart = async () => {
    await fetchAndUpdateCart("http://127.0.0.1:5000/api/products/add");
  };

  const handleRemoveFromCart = async () => {
    await fetchAndUpdateCart("http://127.0.0.1:5000/api/products/remove");
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div
        className={`h-12 rounded-2xl flex items-center justify-between px-4 w-full text-lg font-semibold ${
          count > 0 ? "bg-[#ffd84d]" : "bg-[#ffd84d]"
        } border-r ${count > 0 ? "border-[#ffd84d]" : "border-[#ffd84d]"}`}
      >
        <button
          onClick={handleRemoveFromCart}
          disabled={count === 0}
          className={`focus:outline-none ${
            count === 0 ? "cursor-not-allowed" : ""
          }`}
        >
          <RemoveCircleOutlineIcon />
        </button>
        {count > 0 ? `${count}` : "0"}
        <button onClick={handleAddToCart}>
          <AddCircleOutlineIcon className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default AddtoCartButton;
