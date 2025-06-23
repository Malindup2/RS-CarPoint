import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Special Financing Offers",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Trusted Car Dealership",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V7H20A1,1 0 0,1 21,8V16A1,1 0 0,1 20,17H15V19A3,3 0 0,1 12,22A3,3 0 0,1 9,19V17H4A1,1 0 0,1 3,16V8A1,1 0 0,1 4,7H9V5A3,3 0 0,1 12,2M12,4A1,1 0 0,0 11,5V7H13V5A1,1 0 0,0 12,4M12,8.5L10.5,10L11.5,11L12.5,10L11,8.5M12,13.5L10.5,15L12,16.5L13.5,15L12,13.5Z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Transparent Pricing",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Expert Car Service",
      description: "Our stress-free finance department that can find financial solutions to save you money.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,7H17.5L19,11H5L6.5,7M7,13A1.5,1.5 0 0,1 8.5,14.5A1.5,1.5 0 0,1 7,16A1.5,1.5 0 0,1 5.5,14.5A1.5,1.5 0 0,1 7,13M17,13A1.5,1.5 0 0,1 18.5,14.5A1.5,1.5 0 0,1 17,16A1.5,1.5 0 0,1 15.5,14.5A1.5,1.5 0 0,1 17,13Z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
