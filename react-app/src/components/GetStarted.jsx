import React from 'react';
import './GetStarted.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function GetStarted() {
  const navigate = useNavigate();  // Initialize navigate hook

  const handleGetStarted = () => {
    navigate('/home');  // Use navigate to redirect to home page
  };

  return (
    <div className="get-started-container">
      <img 
        src="/images/environment.jpg" 
        alt="Car" 
        className="get-started-image" 
      />
      <div className="get-started-content">
        <h1>Welcome to Our Website</h1>
        <p>
          Explore cars, buy or sell your vehicles, and manage your ads easily with our platform!
        </p>
        <button 
          className="btn btn-primary" 
          onClick={handleGetStarted}>  {/* Update onClick to call handleGetStarted */}
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;
