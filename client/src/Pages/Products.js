import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useAuth } from "../Components/AuthContext";
// import { fetchProducts } from '../lib/Calls';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState();

  useEffect(() => {
    const fetchCartCounts = async () => {
      try {
        const email = localStorage.getItem("Email");

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
          setCartCounts(responseData);
          console.log("Cart count updated successfully");
        } else {
          console.error("Error updating cart count");
        }
      } catch (error) {
        console.error("Error updating cart count: ", error);
      }
    };
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    fetchCartCounts();
  }, []);
  // console.log(cartCounts?.filter((cart) => cart.product === 1));
  return (
    <div className="h-[90vh] w-full flex flex-col items-center gap-10 ">
      <p className="text-6xl">Products</p>

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              data={product}
              cartCounts={cartCounts.filter(
                (cart) => cart.product === product.id
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
