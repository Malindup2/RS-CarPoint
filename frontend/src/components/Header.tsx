import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RS Car Point</h1>
              <p className="text-sm text-gray-600">Premium Vehicle Sales</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="#inventory"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Inventory
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Services
            </a>
            <a
              href="#financing"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Financing
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Call Us Now</p>
              <p className="font-bold text-gray-900">+1 (555) 123-4567</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md">
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Home
              </a>
              <a
                href="#inventory"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Inventory
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Services
              </a>
              <a
                href="#financing"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Financing
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Call Us: +1 (555) 123-4567</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Get Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
