import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 
  faFilter,
  faSort,
  faCar,
  faEdit, 
  faTrash,
  faEye
} from '@fortawesome/free-solid-svg-icons';

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
  const [filterStatus, setFilterStatus] = useState<string>('all');  const [sortBy, setSortBy] = useState<string>('addedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  return (    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">Vehicle Management</h2>
          <p className="text-gray-600 mt-1">Manage vehicle inventory and listings</p>
        </div>        <button 
          onClick={() => console.log('Add new vehicle modal would open')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">{vehicles.length}</div>
          <div className="text-sm text-gray-600">Total Vehicles</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl font-bold text-green-600">{vehicles.filter(v => v.status === 'Available').length}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">{vehicles.filter(v => v.status === 'Reserved').length}</div>
          <div className="text-sm text-gray-600">Reserved</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl font-bold text-red-600">{vehicles.filter(v => v.status === 'Sold').length}</div>
          <div className="text-sm text-gray-600">Sold</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Search Vehicles</label>            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Make Filter */}
          <div>            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Make</label>            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterMake}
                onChange={(e) => setFilterMake(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">All Makes</option>
                {getUniqueMakes().map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
          </div>          {/* Fuel Type Filter */}
          <div>            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Fuel Type</label>            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterFuelType}
                onChange={(e) => setFilterFuelType(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Status</label>            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Sort */}
          <div>            <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>            <div className="relative">
              <FontAwesomeIcon icon={faSort} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
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
      </div>      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedVehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >            {/* Vehicle Image Placeholder */}
            <div className="h-48 bg-gradient-to-r from-blue-100 to-slate-100 flex items-center justify-center">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <FontAwesomeIcon icon={faCar} className="text-4xl text-blue-600" />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {vehicle.make} {vehicle.model}
                </h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
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

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">                  <button
                    onClick={() => console.log('Edit vehicle:', vehicle.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Status Change Buttons */}
                {vehicle.status !== 'Sold' && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Reserved')}
                      disabled={vehicle.status === 'Reserved'}
                      className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                        vehicle.status === 'Reserved'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      }`}
                    >
                      Reserve
                    </button>
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Sold')}
                      className="px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl text-sm transition-all duration-200"
                    >
                      Mark Sold
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>      {filteredAndSortedVehicles.length === 0 && (        <div className="text-center py-12 text-gray-500">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faEye} className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
          <p>No vehicles found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
