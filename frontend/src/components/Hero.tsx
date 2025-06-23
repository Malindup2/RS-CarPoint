import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={require('../assets/video.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          {/* Selective Dark Overlay - lighter to show video content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"></div>
      </div>      {/* Content Overlay - Minimal */}
      <div className="relative z-10 w-full flex items-end pb-20">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-2xl mx-auto">            <div className="space-y-4 text-center">
              {/* Main Heading */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  Premium Quality <span className="text-blue-400">Pre-Owned</span> Vehicles
                </h1>
                <p className="text-lg lg:text-xl text-blue-300 font-medium">
                  Exceptional Quality at Reasonable Prices
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-105">
                  Browse Vehicles
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  Contact Us
                </button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 text-white justify-center items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Call Randika</p>
                    <p className="font-bold text-sm">071 472 7813</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Call Yushan</p>
                    <p className="font-bold text-sm">076 396 2388</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
