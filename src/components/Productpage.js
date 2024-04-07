import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = checkLoginStatus();
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Fetch products if logged in
      fetch('http://127.0.0.1:5000/products') // Replace with your server's URL
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [navigate]);
  
  useEffect(() => {
    console.log("Productpage component rerendered");
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); 

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return null; 
        } else {
          return { ...item, quantity: item.quantity - 1 }; 
        }
      }
      return item;
    }).filter(item => item !== null); // Filter out null entries to remove removed items from cart

    console.log("Updated Cart Items:", updatedCartItems);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td><ProductList products={products} onAddToCart={addToCart} /></td>
            <td style={{ verticalAlign: 'top' }}><Cart cartItems={cartItems} onRemove={removeFromCart} /></td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

function checkLoginStatus() {
  // Get the user's auth token or other authentication-related information from localStorage
  const authToken = localStorage.getItem('start');

  // If there's a token, we assume the user is logged in
  // In a real-world scenario, you might also want to verify that the token is still valid
  const isLoggedIn = authToken !== null;

  return isLoggedIn;
}

export default Productpage;
