import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-blue-200">Vehicle Today</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              At RS Car Point, we offer premium quality vehicles with exceptional service. 
              Browse our extensive inventory of cars, trucks, and SUVs to find your dream vehicle.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
                Browse Inventory
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
                Schedule Test Drive
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">500+</div>
                <div className="text-sm text-blue-100">Vehicles Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">15+</div>
                <div className="text-sm text-blue-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">98%</div>
                <div className="text-sm text-blue-100">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              {/* Car Placeholder - You can replace this with an actual car image */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl h-64 lg:h-80 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-gray-600"
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
              
              {/* Feature highlights */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Quality Certified Vehicles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Flexible Financing Options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Comprehensive Warranty</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-full opacity-15"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
