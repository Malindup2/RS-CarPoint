import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import VehicleInventory from './components/VehicleInventory';
import LeasingPartners from './components/LeasingPartners';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <VehicleInventory />
        <LeasingPartners />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
