// src/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

export default function SignUp() {
    // const [name, setName] = useState('');
    // const [Email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            
            // Send the form data to the signup endpoint
            console.log("Form data before sending to the signup endpoint:", form);
            await axios.post('/auth/signup/', form);

            // On successful signup, navigate to OTP verification
            // navigate('/verify-otp', { state: { ...form } });
            console.log("Form data before sending to the signup endpoint:", form);
        } catch (err) {
            setError(err.response?.data?.error || 'Sign up failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-green-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 m-5 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">Create Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition hover:scale-105 "
                >
                    Sign Up
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login-register" className="text-blue-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
}
