import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import EntryVideoPage from './EntryVideoPage';
import UserProfile from './UserProfile';
import Leaderboard from './Leaderboard';
import Games from './Games';
import TicTacToe from './TicTacToe';
import BackgroundLayout from './BackgroundLayout';
import Tetris from './Tetris';
import Game2048 from './2048';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState({
    gamerTag: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          gamerTag: firebaseUser.displayName || '',
          username: firebaseUser.displayName || '',
          email: firebaseUser.email || ''
        });
      } else {
        setUser({
          gamerTag: '',
          username: '',
          email: ''
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const isAuthenticated = Boolean(user.email && user.email.trim() !== '');

  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="logo">Games Platform</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">User Profile</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/games">Games</Link></li>
        </ul>
      </nav>
      <BackgroundLayout>
        <div className="content">
          <Routes>
<Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/entry-video" element={isAuthenticated ? <EntryVideoPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile user={user} updateUser={updateUser} /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/games" element={isAuthenticated ? <Games /> : <Navigate to="/login" />} />
            <Route path="/tictactoe" element={isAuthenticated ? <TicTacToe /> : <Navigate to="/login" />} />
            <Route path="/tetris" element={isAuthenticated ? <Tetris /> : <Navigate to="/login" />} />
            <Route path="/2048" element={isAuthenticated ? <Game2048 /> : <Navigate to="/login" />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </BackgroundLayout>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
