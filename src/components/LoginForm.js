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
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <h1>Login</h1>
        <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
        style={{ marginBottom: '10px' }}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter you password"
        required
        style={{ marginBottom: '10px' }}
      />
      <button type="submit" style={{ marginBottom: '10px' }}>Login</button>
      <button type="button" onClick={onSwitchToSignup}>Switch to Signup</button>
    </form>
  );
};

export default LoginForm;
