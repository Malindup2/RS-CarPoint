import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">RS Car Point</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to RS Car Point</h2>
          <p className="text-gray-600 mb-4">
            Your trusted destination for quality vehicles and exceptional service.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            View Inventory
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Car Model {item}</h3>
                <p className="text-gray-600 mt-2">Modern vehicle with great features and excellent performance.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-bold">$25,000</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm transition duration-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2025 RS Car Point. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
