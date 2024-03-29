import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginForm from './components/LoginForm';
import LoginPage from './components/LoginPage';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<LoginPage />} />    
        </Routes>
      </div>
    </Router>
  );
};

export default App;
