import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #39ff14', borderRadius: '8px', color: '#39ff14', textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' }}>
      <h2 style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' }}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' }}>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' }}>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
