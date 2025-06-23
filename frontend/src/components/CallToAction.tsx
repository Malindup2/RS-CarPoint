import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Ready to Find Your 
              <span className="block text-blue-300">Perfect Vehicle?</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Don't wait any longer. Our team of experts is ready to help you find 
              the perfect vehicle that fits your needs and budget. Get started today!
            </p>
              <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Free vehicle consultation and inspection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Competitive leasing through trusted partners</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Trade-in evaluations and assistance</span>
              </div>            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
                Get Pre-Approved
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300">
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Get a Free Quote</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-blue-100 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-blue-100 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="071 234 5678"
                />
              </div>

              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-blue-100 mb-2">
                  Vehicle Type Interest
                </label>
                <select
                  id="vehicleType"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="text-gray-900">Select vehicle type</option>
                  <option value="car" className="text-gray-900">Car</option>
                  <option value="bike" className="text-gray-900">Motorcycle</option>
                  <option value="scooter" className="text-gray-900">Scooter</option>
                  <option value="threewheeler" className="text-gray-900">Three Wheeler</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-blue-100 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >                  <option value="" className="text-gray-900">Select budget range</option>
                  <option value="under-500k" className="text-gray-900">Under LKR 5 Lks</option>
                  <option value="500k-1m" className="text-gray-900">LKR 5-10 Lks</option>
                  <option value="1m-3m" className="text-gray-900">LKR 10-30 Lks</option>
                  <option value="3m-5m" className="text-gray-900">LKR 30-50 Lks</option>
                  <option value="5m-1cr" className="text-gray-900">LKR 50 Lks - 1 Cr</option>
                  <option value="over-1cr" className="text-gray-900">Over LKR 1 Cr</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
              >
                Get My Free Quote
              </button>
            </form>            <p className="text-sm text-blue-200 text-center mt-4">
              We respect your privacy. Contact Randika (071 472 7813) or Yushan (076 396 2388) for immediate assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
