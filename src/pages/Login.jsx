import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserShield } from 'react-icons/fa';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, pass);
        toast.success('Welcome Back to Foodie! 🍔', { theme: 'dark' });
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
        toast.success('Account Created! 🎉', { theme: 'dark' });
      }
      navigate('/');
    } catch (err) {
      toast.error('Authentication Failed: ' + err.message, { theme: 'dark' });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 container">
      <div
        className="card-custom p-5 shadow-lg"
        style={{ width: '400px', borderRadius: '25px' }}
      >
        <div className="text-center mb-4">
          <div className="bg-dark p-3 rounded-circle d-inline-block mb-3 border border-secondary text-primary-custom">
            <FaUserShield size={35} />
          </div>
          <h3 className="fw-bold text-white">
            {isLogin ? 'Login' : 'Join Us'}
          </h3>
          <p className="text-off small">Access your profile to order food</p>
        </div>

        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary-custom w-100 py-2 shadow-sm">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p
          className="text-center mt-4 text-off small"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default Login;
