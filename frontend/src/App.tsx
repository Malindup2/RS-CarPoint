import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VehicleInventory from './components/VehicleInventory';
import VehicleBrands from './components/VehicleBrands';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import LeasingPartners from './components/LeasingPartners';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <VehicleInventory />
        <VehicleBrands />
        <WhyChooseUs />
        <Testimonials />
        <LeasingPartners />
        <CallToAction />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
