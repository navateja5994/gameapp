import React, { useState } from 'react';
import BackgroundLayout from './BackgroundLayout';
import Card from './Card';
import { auth, googleProvider } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile 
} from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    avatar: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', username: '', avatar: null });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        if (formData.avatar) {
          const photoURL = URL.createObjectURL(formData.avatar);
          await updateProfile(user, { photoURL });
        }
        if (formData.username) {
          await updateProfile(user, { displayName: formData.username });
        }
      }
      setFormData({ email: '', password: '', username: '', avatar: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLayout>
      <Card>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <label>Username:</label><br />
              <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required /><br />
              <label>Avatar:</label><br />
              <input type="file" name="avatar" accept="image/*" onChange={handleChange} /><br />
            </>
          )}
          <label>Email:</label><br />
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required /><br />
          <label>Password:</label><br />
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required /><br />
          <button type="submit" disabled={loading}>{loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Signup')}</button>
        </form>
        <button onClick={toggleForm} className="toggle-btn" disabled={loading}>
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
        <hr />
        <button onClick={handleGoogleSignIn} className="google-signin-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Sign in with Google'}
        </button>
      </Card>
    </BackgroundLayout>
  );
};

export default Auth;
