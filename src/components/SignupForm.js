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
    <form onSubmit={handleSignup} >
      <h1>Signup</h1>
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
        placeholder="Enter your password"
        required
      />
      <br></br>
      <label for='confirmpassword'>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your Password"
        required
      />
      <br></br>
      <label for='email'>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter you email"
        required
      />
      <br></br>
      <button type="submit">Submit</button>
      <br></br>
      <button type="button" onClick={onSwitchToLogin}>Switch to Login</button>
    </form>
  );
};

export default SignupForm;