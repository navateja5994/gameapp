import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/entry-video');
  };

  const handleSignupSuccess = () => {
    navigate('/entry-video');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
      maxWidth: '400px',
      height: '500px',
      margin: '50px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.5s ease-in-out'
    }}>
      <div style={{
        width: '100%',
        transition: 'transform 0.5s ease-in-out',
        transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
      <div style={{
        width: '100%',
        transition: 'transform 0.5s ease-in-out',
        transform: isLogin ? 'translateX(100%)' : 'translateX(0)',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        <Signup onSignupSuccess={handleSignupSuccess} />
      </div>
      <button
        onClick={toggleForm}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          padding: '8px 12px',
          backgroundColor: '#39ff14',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 10pxrgb(255, 255, 255), 0 0 20pxrgb(243, 250, 242)',
          boxShadow: '0 0 5pxrgb(14, 15, 14)',
          userSelect: 'none',
          zIndex: 10,
        }}
      >
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Dashboard;
