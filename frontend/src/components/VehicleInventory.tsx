import React, { useState } from 'react';
import { 
  FaCar, 
  FaMotorcycle, 
  FaTruck, 
  FaSearch, 
  FaMapMarkerAlt, 
  FaGasPump, 
  FaCogs, 
  FaCalendarAlt, 
  FaTachometerAlt,
  FaStar,
  FaList,
  FaTh
} from 'react-icons/fa';
import { GiAutoRepair } from 'react-icons/gi';
import { MdElectricScooter } from 'react-icons/md';

interface Vehicle {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  category: 'car' | 'bike' | 'scooter' | 'threewheeler';
  condition: 'brand-new' | 'registered' | 'unregistered';
  location: string;
  image?: string;
  featured?: boolean;
  engineCapacity?: string;
}

interface FilterOptions {
  category: string;
  brand: string;
  priceRange: string;
  yearRange: string;
  fuelType: string;
  transmission: string;
  condition: string;
  location: string;
}

const VehicleInventory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOptions>({
    category: 'all',
    brand: 'all',
    priceRange: 'all',
    yearRange: 'all',
    fuelType: 'all',
    transmission: 'all',
    condition: 'all',
    location: 'all'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price-low');
  // Helper function to render icons
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'FaCar':
        return <FaCar className={className} />;
      case 'FaMotorcycle':
        return <FaMotorcycle className={className} />;
      case 'MdElectricScooter':
        return <MdElectricScooter className={className} />;
      case 'FaTruck':
        return <FaTruck className={className} />;
      case 'FaSearch':
        return <FaSearch className={className} />;
      case 'FaTh':
        return <FaTh className={className} />;
      case 'FaList':
        return <FaList className={className} />;
      case 'FaStar':
        return <FaStar className={className} />;
      case 'FaTachometerAlt':
        return <FaTachometerAlt className={className} />;
      case 'FaGasPump':
        return <FaGasPump className={className} />;
      case 'FaCogs':
        return <FaCogs className={className} />;
      case 'FaMapMarkerAlt':
        return <FaMapMarkerAlt className={className} />;
      default:
        return <FaCar className={className} />;
    }
  };

  // Sample vehicle data representing Sri Lankan market
  const vehicles: Vehicle[] = [
    {
      id: 1,
      title: 'Toyota Aqua Hybrid',
      brand: 'Toyota',
      model: 'Aqua',
      year: 2018,
      price: 4250000,
      mileage: 45000,
      fuelType: 'Hybrid',
      transmission: 'Auto',
      category: 'car',
      condition: 'registered',
      location: 'Colombo',
      engineCapacity: '1500cc',
      featured: true
    },
    {
      id: 2,
      title: 'Honda Vezel Hybrid',
      brand: 'Honda',
      model: 'Vezel',
      year: 2020,
      price: 6500000,
      mileage: 25000,
      fuelType: 'Hybrid',
      transmission: 'Auto',
      category: 'car',
      condition: 'registered',
      location: 'Kandy',
      engineCapacity: '1500cc',
      featured: true
    },
    {
      id: 3,
      title: 'Yamaha FZ-S V3',
      brand: 'Yamaha',
      model: 'FZ-S V3',
      year: 2021,
      price: 485000,
      mileage: 8000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      category: 'bike',
      condition: 'registered',
      location: 'Galle',
      engineCapacity: '149cc'
    },
    {
      id: 4,
      title: 'Honda Dio Deluxe',
      brand: 'Honda',
      model: 'Dio Deluxe',
      year: 2022,
      price: 295000,
      mileage: 3000,
      fuelType: 'Petrol',
      transmission: 'Auto',
      category: 'scooter',
      condition: 'registered',
      location: 'Colombo',
      engineCapacity: '109cc'
    },
    {
      id: 5,
      title: 'Bajaj RE Three Wheeler',
      brand: 'Bajaj',
      model: 'RE Compact',
      year: 2019,
      price: 750000,
      mileage: 35000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      category: 'threewheeler',
      condition: 'registered',
      location: 'Negombo',
      engineCapacity: '236cc'
    },
    {
      id: 6,
      title: 'Suzuki Wagon R',
      brand: 'Suzuki',
      model: 'Wagon R',
      year: 2017,
      price: 2850000,
      mileage: 52000,
      fuelType: 'Petrol',
      transmission: 'Auto',
      category: 'car',
      condition: 'registered',
      location: 'Matara',
      engineCapacity: '1000cc'
    },
    {
      id: 7,
      title: 'TVS Jupiter 125',
      brand: 'TVS',
      model: 'Jupiter 125',
      year: 2021,
      price: 275000,
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Auto',
      category: 'scooter',
      condition: 'registered',
      location: 'Kurunegala',
      engineCapacity: '124cc'
    },
    {
      id: 8,
      title: 'Hero Splendor Plus',
      brand: 'Hero',
      model: 'Splendor Plus',
      year: 2020,
      price: 225000,
      mileage: 18000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      category: 'bike',
      condition: 'registered',
      location: 'Anuradhapura',
      engineCapacity: '97cc'
    }
  ];  const categories = [
    { id: 'all', name: 'All Vehicles', icon: 'FaCar' },
    { id: 'car', name: 'Cars', icon: 'FaCar' },
    { id: 'bike', name: 'Motorcycles', icon: 'FaMotorcycle' },
    { id: 'scooter', name: 'Scooters', icon: 'MdElectricScooter' },
    { id: 'threewheeler', name: 'Three Wheelers', icon: 'FaTruck' }
  ];

  const brands = ['All Brands', 'Toyota', 'Honda', 'Suzuki', 'Nissan', 'Mazda', 'Yamaha', 'TVS', 'Hero', 'Bajaj'];
  const locations = ['All Locations', 'Colombo', 'Kandy', 'Galle', 'Matara', 'Negombo', 'Kurunegala', 'Anuradhapura', 'Jaffna'];
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `LKR ${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `LKR ${(price / 100000).toFixed(1)} Lks`;
    } else {
      return `LKR ${price.toLocaleString()}`;
    }
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} km`;
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (activeFilter.category !== 'all' && vehicle.category !== activeFilter.category) return false;
    if (activeFilter.brand !== 'all' && activeFilter.brand !== 'All Brands' && vehicle.brand !== activeFilter.brand) return false;
    return true;
  });  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-gray-100">
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-black bg-clip-text text-transparent mb-8 leading-tight">
            Browse Our Vehicle Collection
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Find the perfect vehicle from our extensive collection of cars, motorcycles, scooters, and three-wheelers across Sri Lanka.
          </p>
          <div className="mt-6 w-32 h-1 bg-gradient-to-r from-blue-600 to-black mx-auto rounded-full"></div>
        </div>{/* Category Tabs */}        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter({...activeFilter, category: category.id})}
              className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeFilter.category === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl border-2 border-blue-300'
                  : 'bg-white text-gray-800 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-700 border-2 border-gray-200 hover:border-blue-300 shadow-lg'
              }`}
            >
              {renderIcon(category.icon, "text-2xl group-hover:scale-110 transition-transform duration-300")}
              <span className="font-semibold">{category.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                activeFilter.category === category.id
                  ? 'bg-white text-blue-700'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
              }`}>
                {category.id === 'all' ? vehicles.length : vehicles.filter(v => v.category === category.id).length}
              </span>
            </button>
          ))}
        </div>{/* Advanced Filters */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 mb-12 border-2 border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-black bg-clip-text text-transparent">
              Advanced Filters
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-black mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6">            {/* Brand Filter */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Brand</label>
              <select
                value={activeFilter.brand}
                onChange={(e) => setActiveFilter({...activeFilter, brand: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Price Range</label>
              <select
                value={activeFilter.priceRange}
                onChange={(e) => setActiveFilter({...activeFilter, priceRange: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >                <option value="all">All Prices</option>
                <option value="under-500k">Under LKR 5 Lks</option>
                <option value="500k-1m">LKR 5-10 Lks</option>
                <option value="1m-3m">LKR 10-30 Lks</option>
                <option value="3m-5m">LKR 30-50 Lks</option>
                <option value="over-5m">Over LKR 50 Lks</option>
              </select>
            </div>            {/* Year Range */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Year</label>
              <select
                value={activeFilter.yearRange}
                onChange={(e) => setActiveFilter({...activeFilter, yearRange: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                <option value="all">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2020-2022">2020-2022</option>
                <option value="2017-2019">2017-2019</option>
                <option value="2014-2016">2014-2016</option>
                <option value="before-2014">Before 2014</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Fuel Type</label>
              <select
                value={activeFilter.fuelType}
                onChange={(e) => setActiveFilter({...activeFilter, fuelType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                <option value="all">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>            {/* Transmission */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Transmission</label>
              <select
                value={activeFilter.transmission}
                onChange={(e) => setActiveFilter({...activeFilter, transmission: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                <option value="all">All Types</option>
                <option value="Auto">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Condition */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Condition</label>
              <select
                value={activeFilter.condition}
                onChange={(e) => setActiveFilter({...activeFilter, condition: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                <option value="all">All Conditions</option>
                <option value="brand-new">Brand New</option>
                <option value="unregistered">Unregistered</option>
                <option value="registered">Registered (Used)</option>
              </select>
            </div>

            {/* Location */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">Location</label>
              <select
                value={activeFilter.location}
                onChange={(e) => setActiveFilter({...activeFilter, location: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>            {/* Search Button */}
            <div className="flex items-end">              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-black text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                {renderIcon('FaSearch', "text-sm")}
                Search
              </button>
            </div>
          </div>
        </div>        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <span className="text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </span>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-lg text-blue-600 transform scale-105' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                {renderIcon('FaTh', "w-5 h-5")}
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-lg text-blue-600 transform scale-105' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                {renderIcon('FaList', "w-5 h-5")}
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 font-medium text-gray-700 shadow-sm"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>
        </div>        {/* Vehicle Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
            : 'space-y-3'
        }`}>{filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Vehicle Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-32'} bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-50 group-hover:to-gray-100 transition-all duration-300`}>                {vehicle.featured && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    {renderIcon('FaStar', "text-xs")}
                    FEATURED
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {vehicle.condition.toUpperCase()}
                </div>                <div className="absolute inset-0 flex items-center justify-center">
                  {vehicle.category === 'car' && renderIcon('FaCar', "text-4xl text-gray-500")}
                  {vehicle.category === 'bike' && renderIcon('FaMotorcycle', "text-4xl text-gray-500")}
                  {vehicle.category === 'scooter' && renderIcon('MdElectricScooter', "text-4xl text-gray-500")}
                  {vehicle.category === 'threewheeler' && renderIcon('FaTruck', "text-4xl text-gray-500")}
                </div></div>

              {/* Vehicle Details */}
              <div className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                    {vehicle.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(vehicle.price)}
                    </span>
                    <span className="text-xs text-gray-500">{vehicle.year}</span>
                  </div>
                </div>                {/* Compact Specs */}                <div className="grid grid-cols-2 gap-1 mb-3 text-xs">
                  <div className="flex items-center space-x-1">
                    {renderIcon('FaTachometerAlt', "text-gray-400 text-sm")}
                    <span className="text-gray-600">{formatMileage(vehicle.mileage)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderIcon('FaGasPump', "text-gray-400 text-sm")}
                    <span className="text-gray-600">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderIcon('FaCogs', "text-gray-400 text-sm")}
                    <span className="text-gray-600">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderIcon('FaMapMarkerAlt', "text-gray-400 text-sm")}
                    <span className="text-gray-600">{vehicle.location}</span>
                  </div>
                </div>{/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded text-xs transition duration-300">
                    View Details
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-1.5 px-3 rounded text-xs transition duration-300">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-black via-gray-800 to-blue-900 hover:from-blue-900 hover:via-black hover:to-gray-900 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-3xl">
            Load More Vehicles
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleInventory;
