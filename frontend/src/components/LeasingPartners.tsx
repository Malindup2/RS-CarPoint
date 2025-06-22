import React from 'react';

const LeasingPartners: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Our Trusted <span className="text-blue-600">Leasing Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We partner with Sri Lanka's leading financial institutions to provide you with competitive 
            vehicle financing options and hassle-free leasing solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative mb-16">
          <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 py-10 px-6 relative">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
              <div className="marquee-container">
              <div className="marquee-content">
                <div className="flex items-center space-x-12 min-w-max">
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/commercial.jpeg')} alt="Commercial Bank" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/credit.png')} alt="Credit Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/lb.png')} alt="LB Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/lolc.png')} alt="LOLC Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/vallibel.png')} alt="Vallibel Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/download.png')} alt="Partner Bank" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center space-x-12 min-w-max">
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/commercial.jpeg')} alt="Commercial Bank" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/credit.png')} alt="Credit Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/lb.png')} alt="LB Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/lolc.png')} alt="LOLC Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/vallibel.png')} alt="Vallibel Finance" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={require('../assets/download.png')} alt="Partner Bank" className="max-h-16 max-w-36 object-contain filter drop-shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="text-center mt-6">            <p className="text-sm text-gray-500 font-medium">
              ✨ Trusted by <span className="text-blue-600 font-semibold">10,000+</span> satisfied customers 
              • <span className="text-green-600 font-semibold">LKR 50 Cr+</span> vehicles financed
            </p>
          </div>
        </div>        
        {/* Financing Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Competitive Rates</h3>
            <p className="text-gray-600 text-center leading-relaxed">Interest rates starting from <span className="font-semibold text-blue-600">8.5% p.a.</span> with flexible terms tailored to your needs</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">From 8.5% APR</span>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Quick Approval</h3>
            <p className="text-gray-600 text-center leading-relaxed">Get approved within <span className="font-semibold text-green-600">24-48 hours</span> with minimal documentation and hassle-free process</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">24-48 Hours</span>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a4 4 0 004 4h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Flexible Terms</h3>
            <p className="text-gray-600 text-center leading-relaxed">Up to <span className="font-semibold text-purple-600">7 years</span> repayment period with customizable monthly payment plans</p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Up to 7 Years</span>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Pre-Approved?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your vehicle financing journey today. Our team will connect you with the best leasing partner for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl">
                Get Pre-Approved Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-xl transition duration-300">
                Compare Loan Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeasingPartners;
