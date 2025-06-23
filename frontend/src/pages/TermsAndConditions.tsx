import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
              <p className="text-gray-600 text-lg">Last updated: June 23, 2025</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing and using the RS Car Point website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Vehicle Sales Terms</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Purchase Agreement</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>All vehicle sales are final upon completion of payment and documentation</li>
                    <li>Vehicles are sold "as-is" with disclosed conditions and history</li>
                    <li>Buyers are encouraged to inspect vehicles before purchase</li>
                    <li>We provide comprehensive vehicle history reports when available</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Terms</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Payment must be made in Sri Lankan Rupees (LKR)</li>
                    <li>We accept cash, bank transfers, and approved financing</li>
                    <li>A deposit may be required to hold a vehicle</li>
                    <li>Full payment is required before vehicle delivery</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Financing and Leasing</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Financing is subject to approval by our partner financial institutions</li>
                    <li>Interest rates and terms vary based on creditworthiness and vehicle type</li>
                    <li>Down payment requirements may apply</li>
                    <li>Early settlement discounts may be available</li>
                    <li>Default on payments may result in vehicle repossession</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vehicle Condition and Warranty</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Pre-Owned Vehicles</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>All vehicles undergo thorough inspection before sale</li>
                    <li>Known defects and issues are disclosed to buyers</li>
                    <li>Limited warranty may be provided on select vehicles</li>
                    <li>Buyers should verify all vehicle features and conditions</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Documentation and Registration</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Valid identification is required for all transactions</li>
                    <li>Vehicle registration transfer is buyer's responsibility</li>
                    <li>We assist with DMT paperwork and procedures</li>
                    <li>All fees related to registration transfer are buyer's responsibility</li>
                    <li>Insurance arrangements must be made by the buyer</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    RS Car Point shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Return and Exchange Policy</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>All sales are final unless otherwise specified in writing</li>
                    <li>Returns may be considered only for material misrepresentation</li>
                    <li>Exchange requests must be made within 48 hours of purchase</li>
                    <li>Return/exchange fees may apply</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>RS Car Point</strong></p>
                    <p className="text-gray-700 mb-2">Phone: 071 472 7813 (Randika) | 076 396 2388 (Yushan)</p>
                    <p className="text-gray-700 mb-2">Email: info@rscarpoint.lk</p>
                    <p className="text-gray-700">Website: www.rscarpoint.lk</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                  </p>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
