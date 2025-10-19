import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MdEmail, MdLock } from 'react-icons/md';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/user/login', formData);

      if (res.data.status) {
        localStorage.setItem('token', res.data.token);

        const profileRes = await axios.get('http://localhost:8080/api/user/profile', {
          headers: { Authorization: `Bearer ${res.data.token}` },
        });

        localStorage.setItem('user', JSON.stringify(profileRes.data));
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch {
      setError('Invalid email or password');
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
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="Email address"
              autoComplete="email"
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
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-center text-red-600 text-sm font-medium">{error}</div>
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-teal-600 font-semibold hover:text-emerald-600 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
