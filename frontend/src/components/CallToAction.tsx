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
            </p>              <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Free vehicle consultation and inspection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Competitive rates and quick approvals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          </div>          {/* Right Column - Location */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Visit Our Showroom</h3>
            
            {/* Google Maps Embed */}
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.123456789!2d80.123456!3d5.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTknMTUuNiJOIDgwwrAwNycyNC40IkU!5e0!3m2!1sen!2slk!4v1640995200000!5m2!1sen!2slk&q=Kirinda+Puhulwella+Matara+Sri+Lanka"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RS Car Point Location"
              ></iframe>
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Address</h4>
                  <p className="text-blue-100 leading-relaxed">
                    RS Car Point<br />
                    Kirinda Puhulwella<br />
                    Matara, Sri Lanka<br />
                    Southern Province
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Opening Hours</h4>
                  <div className="text-blue-100 space-y-1">
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: By Appointment Only</p>
                    <p className="text-sm text-blue-200 mt-2">
                      Call ahead to ensure availability
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Contact Numbers</h4>
                  <div className="text-blue-100 space-y-1">
                    <p><span className="font-medium">Randika:</span> 071 472 7813</p>
                    <p><span className="font-medium">Yushan:</span> 076 396 2388</p>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="pt-4 border-t border-white border-opacity-20">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Kirinda+Puhulwella+Matara+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-blue-200 text-center mt-6">
              Located in the beautiful coastal area of Matara. Visit us to explore our extensive collection of premium vehicles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
