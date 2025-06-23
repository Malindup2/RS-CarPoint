import React from 'react';
import { motion } from 'framer-motion';

const VehicleBrands: React.FC = () => {  const brands = [
    {
      id: 1,
      name: "Toyota",
      logo: require('../assets/Brands/toyota.png'),
      description: "Reliability & Innovation"
    },
    {
      id: 2,
      name: "Honda",
      logo: require('../assets/Brands/honda.png'),
      description: "Power of Dreams"
    },
    {
      id: 3,
      name: "Yamaha",
      logo: require('../assets/Brands/yamaha logo.png'),
      description: "Revs Your Heart"
    },
    {
      id: 4,
      name: "Bajaj",
      logo: require('../assets/Brands/bajaj.png'),
      description: "Inspiring Confidence"
    },
    {
      id: 5,
      name: "Nissan",
      logo: require('../assets/Brands/nissan.jpeg'),
      description: "Innovation That Excites"
    },
    {
      id: 6,
      name: "Mitsubishi",
      logo: require('../assets/Brands/mitsubishi.jpg'),
      description: "Drive Your Ambition"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Our <span className="text-blue-600">Vehicle Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are proud to offer vehicles from the world's most trusted and reliable automotive brands, 
            ensuring quality and performance in every purchase.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-center">
                {/* Brand Logo */}
                <div className="mb-3 flex items-center justify-center h-12">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-10 max-w-full object-contain transition-all duration-300"
                  />
                </div>
                  {/* Brand Name */}
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {brand.name}
                </h3>
                
                {/* Brand Description */}
                <p className="text-gray-600 text-xs font-medium">
                  {brand.description}
                </p>
              </div>
            </motion.div>          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 font-medium">Vehicles Sold</div>
            </div>            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">6</div>
              <div className="text-blue-100 font-medium">Trusted Brands</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-100 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleBrands;
