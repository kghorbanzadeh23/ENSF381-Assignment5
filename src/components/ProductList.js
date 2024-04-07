// ProductList.js
import React, {useEffect, useState} from 'react';
import Product from './Product';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetch('/products')
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Update the products state with the fetched data
        setProducts(data);
      })
      .catch(error => {
        console.error('There was a problem fetching the products:', error);
      });
  }, []); // The empty array as a second argument ensures this effect runs once on mount

  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;