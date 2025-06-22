import React, { useState } from 'react';

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
  ];

  const categories = [
    { id: 'all', name: 'All Vehicles', icon: '🚗' },
    { id: 'car', name: 'Cars', icon: '🚗' },
    { id: 'bike', name: 'Motorcycles', icon: '🏍️' },
    { id: 'scooter', name: 'Scooters', icon: '🛵' },
    { id: 'threewheeler', name: 'Three Wheelers', icon: '🛺' }
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
  });

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Our Vehicle Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect vehicle from our extensive collection of cars, motorcycles, scooters, and three-wheelers across Sri Lanka.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter({...activeFilter, category: category.id})}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition duration-300 ${
                activeFilter.category === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {category.id === 'all' ? vehicles.length : vehicles.filter(v => v.category === category.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={activeFilter.brand}
                onChange={(e) => setActiveFilter({...activeFilter, brand: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={activeFilter.priceRange}
                onChange={(e) => setActiveFilter({...activeFilter, priceRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >                <option value="all">All Prices</option>
                <option value="under-500k">Under LKR 5 Lks</option>
                <option value="500k-1m">LKR 5-10 Lks</option>
                <option value="1m-3m">LKR 10-30 Lks</option>
                <option value="3m-5m">LKR 30-50 Lks</option>
                <option value="over-5m">Over LKR 50 Lks</option>
              </select>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={activeFilter.yearRange}
                onChange={(e) => setActiveFilter({...activeFilter, yearRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={activeFilter.fuelType}
                onChange={(e) => setActiveFilter({...activeFilter, fuelType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                value={activeFilter.transmission}
                onChange={(e) => setActiveFilter({...activeFilter, transmission: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Auto">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={activeFilter.condition}
                onChange={(e) => setActiveFilter({...activeFilter, condition: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Conditions</option>
                <option value="brand-new">Brand New</option>
                <option value="unregistered">Unregistered</option>
                <option value="registered">Registered (Used)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={activeFilter.location}
                onChange={(e) => setActiveFilter({...activeFilter, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-600">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </span>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>
        </div>

        {/* Vehicle Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Vehicle Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-64 h-48' : 'h-48'} bg-gradient-to-br from-gray-200 to-gray-300`}>
                {vehicle.featured && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {vehicle.condition.toUpperCase()}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {vehicle.category === 'car' && '🚗'}
                    {vehicle.category === 'bike' && '🏍️'}
                    {vehicle.category === 'scooter' && '🛵'}
                    {vehicle.category === 'threewheeler' && '🛺'}
                  </span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {vehicle.title}
                  </h3>
                  <span className="text-xl font-bold text-blue-600 ml-2">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">📅</span>
                    <span className="text-gray-600">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">⛽</span>
                    <span className="text-gray-600">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">🏁</span>
                    <span className="text-gray-600">{formatMileage(vehicle.mileage)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">⚙️</span>
                    <span className="text-gray-600">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">🏭</span>
                    <span className="text-gray-600">{vehicle.engineCapacity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-600">{vehicle.location}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
                    View Details
                  </button>
                  <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
            Load More Vehicles
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleInventory;
