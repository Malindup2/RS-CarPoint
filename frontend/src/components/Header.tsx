import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (    <motion.header 
      className="bg-white shadow-xl border-b-4 border-blue-600 sticky top-0 z-50 backdrop-blur-sm bg-white/95"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center py-4">{/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden">
              <img 
                src={require('../assets/rs.jpg')} 
                alt="RS Car Point Logo" 
                className="w-full h-full object-cover"
              />
            </div>            <div>
              <h1 className="text-2xl font-bold text-gray-900">RS Car Point</h1>
              <p className="text-sm text-gray-600">Where Your Choice</p>
            </div>
          </div>          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 group ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-blue-600 transition-all duration-300 transform -translate-x-1/2 ${
                isActive('/') ? 'w-8' : 'w-0 group-hover:w-8'
              }`}></span>
            </Link>
            <Link
              to="/services"
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 group ${
                isActive('/services') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-blue-600 transition-all duration-300 transform -translate-x-1/2 ${
                isActive('/services') ? 'w-8' : 'w-0 group-hover:w-8'
              }`}></span>
            </Link>
            <Link
              to="/blog"
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 group ${
                isActive('/blog') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Blog
              <span className={`absolute bottom-0 left-1/2 h-0.5 bg-blue-600 transition-all duration-300 transform -translate-x-1/2 ${
                isActive('/blog') ? 'w-8' : 'w-0 group-hover:w-8'
              }`}></span>
            </Link>
          </nav>{/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-3 text-right">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Call Randika</p>
                <p className="font-bold text-gray-900 text-sm">071 472 7813</p>
              </div>
            </div>            <Link 
              to="/broker-signup"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Become a Partner
            </Link>
          </div>          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-gray-200 bg-gradient-to-b from-white to-blue-50"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isActive('/') ? 'text-blue-600 bg-blue-100' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isActive('/services') ? 'text-blue-600 bg-blue-100' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/blog"
                className={`px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isActive('/blog') ? 'text-blue-600 bg-blue-100' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link><div className="pt-4 mt-4 border-t border-gray-300">
                <div className="flex items-center space-x-2 mb-3 px-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Call Randika</p>
                    <p className="font-bold text-gray-900 text-sm">071 472 7813</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4 px-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Call Yushan</p>
                    <p className="font-bold text-gray-900 text-sm">076 396 2388</p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                  Get Quote
                </button>              </div>
            </nav>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
