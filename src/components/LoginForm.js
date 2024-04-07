import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both a username and a password.');
      return;
    }
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.message === 'Login successful') {
        navigate('/products'); // Navigate to the products page
      } else {
        alert('Error: ' + data.error); // Show error message if login failed
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  return (
    <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label for='username'>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
      />
      <br></br>
      <label for='password'>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter you password"
        required
      />
      <br></br>
      <button type="submit">Login</button>
      <br></br>
      <button type="button" onClick={onSwitchToSignup}>Switch to Signup</button>
    </form>
  );
};

export default LoginForm;
