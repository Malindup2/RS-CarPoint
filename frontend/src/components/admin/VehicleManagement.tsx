import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  condition: 'Excellent' | 'Good' | 'Fair';
  status: 'Available' | 'Sold' | 'Reserved';
  images: string[];
  addedDate: string;
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 3500000,
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'Excellent',
      status: 'Available',
      images: [],
      addedDate: '2024-06-01'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 2800000,
      mileage: 62000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      condition: 'Good',
      status: 'Available',
      images: [],
      addedDate: '2024-06-05'
    },
    {
      id: 3,
      make: 'Nissan',
      model: 'Leaf',
      year: 2021,
      price: 4200000,
      mileage: 25000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      condition: 'Excellent',
      status: 'Sold',
      images: [],
      addedDate: '2024-06-10'
    },
    {
      id: 4,
      make: 'Toyota',
      model: 'Prius',
      year: 2018,
      price: 2200000,
      mileage: 78000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      condition: 'Good',
      status: 'Reserved',
      images: [],
      addedDate: '2024-06-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState<string>('all');
  const [filterFuelType, setFilterFuelType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('addedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Filter and sort vehicles
  const filteredAndSortedVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = filterMake === 'all' || vehicle.make === filterMake;
      const matchesFuelType = filterFuelType === 'all' || vehicle.fuelType === filterFuelType;
      const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
      
      return matchesSearch && matchesMake && matchesFuelType && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Vehicle];
      const bValue = b[sortBy as keyof Vehicle];
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleDeleteVehicle = (vehicleId: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    }
  };

  const handleStatusChange = (vehicleId: number, newStatus: Vehicle['status']) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
    ));
  };

  const getUniqueMakes = () => {
    return Array.from(new Set(vehicles.map(vehicle => vehicle.make)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-red-100 text-red-800';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Management</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Add New Vehicle
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Vehicles</label>
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Make Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Make</label>
            <select
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Makes</option>
              {getUniqueMakes().map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Fuel Type</label>
            <select
              value={filterFuelType}
              onChange={(e) => setFilterFuelType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="addedDate-desc">Newest First</option>
              <option value="addedDate-asc">Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="mileage-asc">Mileage: Low to High</option>
              <option value="mileage-desc">Mileage: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedVehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Vehicle Image Placeholder */}
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>

            {/* Vehicle Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {vehicle.make} {vehicle.model}
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mileage:</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Type:</span>
                  <span className="font-medium">{vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transmission:</span>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span>Condition:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(vehicle.condition)}`}>
                    {vehicle.condition}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEditingVehicle(vehicle)}
                    className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition duration-200 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition duration-200 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>

                {/* Status Change Buttons */}
                {vehicle.status !== 'Sold' && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Reserved')}
                      disabled={vehicle.status === 'Reserved'}
                      className={`px-3 py-1 rounded-lg text-sm transition duration-200 ${
                        vehicle.status === 'Reserved'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      }`}
                    >
                      Reserve
                    </button>
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Sold')}
                      className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm transition duration-200"
                    >
                      Mark Sold
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAndSortedVehicles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No vehicles found matching your search criteria.
        </div>
      )}

      {/* Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{vehicles.filter(v => v.status === 'Available').length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{vehicles.filter(v => v.status === 'Reserved').length}</div>
            <div className="text-sm text-gray-600">Reserved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{vehicles.filter(v => v.status === 'Sold').length}</div>
            <div className="text-sm text-gray-600">Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{vehicles.length}</div>
            <div className="text-sm text-gray-600">Total Vehicles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;
