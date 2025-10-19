import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.status || res.status === 200) {
        navigate('/login');
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-teal-400 to-emerald-400 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          <div className="relative">
            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          <div className="relative">
            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          {error && (
            <p className="text-center text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide
              bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500
              hover:from-emerald-500 hover:to-sky-500
              transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300
              ${loading ? 'opacity-70 cursor-not-allowed animate-pulse' : ''}
            `}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:text-emerald-600 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
