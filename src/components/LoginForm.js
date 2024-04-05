import React, { useState } from 'react';

const LoginForm = ({ onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both a username and a password.');
      return;
    }
    // Implement login logic here
    console.log('Logging in with:', username, password);
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
