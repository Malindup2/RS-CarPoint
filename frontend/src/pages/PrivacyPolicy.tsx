import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-lg sticky top-0 z-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={require('../assets/logo.png')} alt="RS Car Point" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">RS Car Point</h1>
                <p className="text-sm text-blue-600 font-medium">Where Your Choice</p>
              </div>
            </div>            <a 
              href="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600 text-lg">Last updated: June 23, 2025</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to RS Car Point ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Name and contact information (phone number, email address)</li>
                    <li>Financial information for vehicle financing applications</li>
                    <li>Government-issued identification for vehicle purchases</li>
                    <li>Vehicle preferences and purchase history</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Process vehicle sales and financing applications</li>
                    <li>Communicate with you about our services and offers</li>
                    <li>Improve our website and customer experience</li>
                    <li>Comply with legal obligations and regulations</li>
                    <li>Prevent fraud and ensure transaction security</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Financial institutions for vehicle financing purposes</li>
                    <li>Legal authorities when required by law</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Insurance companies for vehicle coverage</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our website uses cookies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>RS Car Point</strong></p>
                    <p className="text-gray-700 mb-2">Phone: 071 472 7813 (Randika) | 076 396 2388 (Yushan)</p>
                    <p className="text-gray-700 mb-2">Email: info@rscarpoint.lk</p>
                    <p className="text-gray-700">Website: www.rscarpoint.lk</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <p className="text-gray-400">
            © 2025 RS Car Point. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
