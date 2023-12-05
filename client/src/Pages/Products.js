import React, {useState, useEffect} from 'react'
// import { fetchProducts } from '../lib/Calls';

const Products= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
     
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        
      }
    };

    
    fetchData();
  }, []);
  console.log(products)
  return (
    <div className='h-[90vh] w-full'>
      Products
    </div>
  )
}
export default Products

