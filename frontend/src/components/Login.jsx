import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


// import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext to manage authentication state

// Import axios for making HTTP requests
// Import necessary hooks and components from React and React Router
// Import axios for making HTTP requests
// Import necessary hooks and components from React and React Router


export default function Login() {
  const [identity, setIdentity] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Attempt login (request OTP)
      await axios.post('/auth/login', { email: identity, phone: identity });
      // On success, go to OTP verification (not implemented here)
      navigate('/verify-otp', { state: { identity } });
    } catch (err) {
      if (err.response?.status === 404) {
        // User not found → redirect to sign up
        navigate('/signup');
      } else {
        setError(err.response?.data?.error || 'Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-green-400">
      <form
        // onSubmit={handleSubmit}
        className="bg-white p-8 m-5 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <label className="block mb-2 text-sm font-medium text-gray-700">Email or Phone</label>
        <input
          name="identity"
          type="text"
          value={identity}
          onChange={e => setIdentity(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input

          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />



        {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Continue
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}