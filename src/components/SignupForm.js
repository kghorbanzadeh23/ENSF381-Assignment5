import React, { useState } from 'react';

const SignupForm = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword || !email) {
      alert('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Implement signup logic here
    console.log('Signing up with:', username, email, password);
  };

  return (
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <h1>Signup</h1>
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        style={{ marginBottom: '10px' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ marginBottom: '10px' }}
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
        style={{ marginBottom: '10px' }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ marginBottom: '10px' }}
      />
      <button type="submit" style={{ marginBottom: '10px' }}>Submit</button>
      <button type="button" onClick={onSwitchToLogin}>Switch to Login</button>
    </form>
  );
};

export default SignupForm;