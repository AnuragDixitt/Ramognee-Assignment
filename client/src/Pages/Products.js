import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
// import { fetchProducts } from '../lib/Calls';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
  }, []);
  console.log(products);
  return (
    <div className="h-[90vh] w-full flex flex-col items-center gap-10 ">
      <p className="text-6xl">Products</p>

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard data={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
