import React, { useState, useEffect } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';

const LoginPage = () =>{
    const [showLogin, setShowLogin] = useState(true);

  const switchForm = () => {
    setShowLogin(!showLogin);
  };
    return (
<div>
    <Header/>
    {showLogin ? (
        <LoginForm onSwitchToSignup={switchForm} />
      ) : (
        <SignupForm onSwitchToLogin={switchForm} /> // Assuming you have this component
      )}
    <Footer/>
</div>
    );
};

export default LoginPage;