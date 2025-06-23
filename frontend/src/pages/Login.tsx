import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login submission here
    console.log('Login submitted:', formData);
    
    // Simple demo logic - in real app, check credentials with backend
    if (formData.email === 'admin@rscarpoint.com' && formData.password === 'admin123') {
      // Redirect to admin dashboard
      window.location.href = '/admin';
    } else {
      // Regular user login logic
      console.log('Regular user login');
    }
  };

  return (    <div className="min-h-screen relative flex items-center justify-center">      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/signin.mp4" type="video/mp4" />
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6 mt-16">        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to your partner account</p>
        </div>        {/* Login Card */}
        <motion.div
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white border-opacity-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-white placeholder-gray-300"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-white placeholder-gray-300"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-white border-opacity-30 rounded bg-white bg-opacity-20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-300 hover:text-blue-200">
                  Forgot password?
                </a>
              </div>
            </div>            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Sign In
            </button>            <div className="text-center">
              <p className="text-sm text-gray-200">
                Don't have an account?{' '}
                <Link to="/broker-signup" className="font-medium text-blue-300 hover:text-blue-200">
                  Become a Partner
                </Link>
              </p>
              
              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                <p className="text-xs text-gray-200 mb-2">Demo Credentials:</p>
                <p className="text-xs text-blue-200">Admin: admin@rscarpoint.com / admin123</p>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
