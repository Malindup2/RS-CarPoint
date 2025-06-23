import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 
  faFilter,
  faSort,
  faEdit, 
  faTrash,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as api from '../../api';
import Modal from './Modal';

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
  engineCapacity?: string;
  manufactureDate?: string;
  description?: string;
  imageBase64?: string;
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState<string>('all');
  const [filterFuelType, setFilterFuelType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('addedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  // Form state for add/edit
  const initialFormState = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCapacity: '',
    manufactureDate: '',
    description: '',
    imageFile: null,
  };
  const [form, setForm] = useState<any>(initialFormState);

  useEffect(() => {
    api.getVehicles().then(setVehicles);
  }, []);

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

  const handleDeleteVehicle = async (vehicleId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this vehicle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      await api.deleteVehicle(vehicleId.toString());
      api.getVehicles().then(setVehicles);
      alert('Vehicle deleted successfully!');
    }
  };
  const handleStatusChange = async (vehicleId: number, newStatus: Vehicle['status']) => {
    try {
      setUpdatingStatus(vehicleId); // Set loading state
      // Find the vehicle to update
      const vehicleToUpdate = vehicles.find(v => v.id === vehicleId);
      if (!vehicleToUpdate) return;      // Update the vehicle status in the backend
      await api.updateVehicle(vehicleId.toString(), {
        ...vehicleToUpdate,
        status: newStatus
      });

      // If marking as sold, create a deal record
      if (newStatus === 'Sold') {
        try {
          await api.createDeal({
            vehicleId: vehicleId,
            vehicle: vehicleToUpdate,
            salePrice: vehicleToUpdate.price,
            purchasePrice: vehicleToUpdate.price * 0.7, // Estimate purchase price as 70% of sale price
            status: 'completed',
            completedDate: new Date().toISOString(),
            customerName: 'Walk-in Customer', // Default customer name
            customerEmail: 'customer@example.com', // Default email
            notes: `Vehicle sold through admin panel on ${new Date().toLocaleDateString()}`
          });
        } catch (dealError) {
          console.error('Failed to create deal record:', dealError);
          // Don't fail the status update if deal creation fails
        }
      }

      // Update the local state
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
      ));      // Show success message
      Swal.fire({
        title: 'Success!',
        text: `Vehicle marked as ${newStatus.toLowerCase()} successfully!`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      // Trigger analytics refresh
      localStorage.setItem('vehicleStatusChanged', Date.now().toString());
      window.dispatchEvent(new CustomEvent('vehicleStatusChanged'));

    } catch (error) {
      console.error('Error updating vehicle status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update vehicle status. Please try again.',
        icon: 'error'
      });
    } finally {
      setUpdatingStatus(null); // Reset loading state
    }
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

  const openAddModal = () => {
    setForm(initialFormState);
    setAddModalOpen(true);
  };
  const openEditModal = (vehicle: Vehicle) => {
    setForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      engineCapacity: vehicle.engineCapacity || '',
      manufactureDate: vehicle.manufactureDate || '',
      description: vehicle.description || '',
      imageFile: null,
    });
    setEditVehicle(vehicle);
    setEditModalOpen(true);
  };
  const closeModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setEditVehicle(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle = await api.createVehicle({
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
      fuelType: form.fuelType,
      transmission: form.transmission,
      engineCapacity: form.engineCapacity,
      manufactureDate: form.manufactureDate,
      description: form.description,
      status: 'Available',
    });
    // If image file selected, upload it
    if (form.imageFile) {
      await api.uploadVehicleImage(newVehicle.id.toString(), form.imageFile);
    }
    api.getVehicles().then(setVehicles);
    closeModal();
    alert('Vehicle added successfully!');
  };

  const handleEditVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVehicle) return;
    await api.updateVehicle(editVehicle.id.toString(), {
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
      fuelType: form.fuelType,
      transmission: form.transmission,
      engineCapacity: form.engineCapacity,
      manufactureDate: form.manufactureDate,
      description: form.description,
      status: editVehicle.status,
    });
    // If image file selected, upload it
    if (form.imageFile) {
      await api.uploadVehicleImage(editVehicle.id.toString(), form.imageFile);
    }
    api.getVehicles().then(setVehicles);
    closeModal();
    alert('Vehicle updated successfully!');
  };

  // Add this function to generate and download CSV
  const downloadVehicleReport = () => {
    const headers = ['Brand', 'Model', 'Year', 'Price', 'Mileage', 'Fuel', 'Engine Capacity', 'Manufacture Date', 'Gear Type', 'Status', 'Description'];
    const rows = filteredAndSortedVehicles.map(vehicle => [
      vehicle.make,
      vehicle.model,
      vehicle.year,
      vehicle.price,
      vehicle.mileage,
      vehicle.fuelType,
      vehicle.engineCapacity || '',
      vehicle.manufactureDate || '',
      vehicle.transmission,
      vehicle.status,
      vehicle.description || ''
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'vehicle_report.csv');
  };

  return (    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">Vehicle Management</h2>
          <p className="text-gray-600 mt-1">Manage vehicle inventory and listings</p>
        </div>        <button 
          onClick={openAddModal}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Vehicle</span>
        </button>
        <button
          onClick={downloadVehicleReport}
          className="ml-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <span>Download Report</span>
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
          >            {/* Vehicle Image */}
            <div className="h-48 relative overflow-hidden">
              {vehicle.imageBase64 ? (
                <>
                  <img 
                    src={`data:image/jpeg;base64,${vehicle.imageBase64}`} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-100 to-slate-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FontAwesomeIcon icon={faEye} className="text-4xl mb-2 opacity-50" />
                    <p className="text-sm">No Image Available</p>
                  </div>
                </div>
              )}
            </div>            {/* Vehicle Details */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {vehicle.make} {vehicle.model}
                </h3>
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
                    onClick={() => openEditModal(vehicle)}
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
                </div>                {/* Status Change Buttons */}
                {vehicle.status !== 'Sold' && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Reserved')}
                      disabled={vehicle.status === 'Reserved' || updatingStatus === vehicle.id}
                      className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                        vehicle.status === 'Reserved' || updatingStatus === vehicle.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      }`}
                    >
                      {updatingStatus === vehicle.id ? 'Updating...' : 
                       vehicle.status === 'Reserved' ? 'Reserved' : 'Reserve'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(vehicle.id, 'Sold')}
                      disabled={updatingStatus === vehicle.id}
                      className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                        updatingStatus === vehicle.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {updatingStatus === vehicle.id ? 'Updating...' : 'Mark Sold'}
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

      {/* Add Vehicle Modal */}
      <Modal open={isAddModalOpen} onClose={closeModal} title="Add New Vehicle">
        <form onSubmit={handleAddVehicle} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input name="make" value={form.make} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <input name="model" value={form.model} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input name="price" type="number" value={form.price} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuel</label>
              <select name="fuelType" value={form.fuelType} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mileage</label>
              <input name="mileage" type="number" value={form.mileage} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Engine Capacity (cc)</label>
              <input name="engineCapacity" type="number" value={form.engineCapacity} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Manufacture Date</label>
              <input name="manufactureDate" type="date" value={form.manufactureDate} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gear Type</label>
              <select name="transmission" value={form.transmission} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" accept="image/*" onChange={e => setForm({ ...form, imageFile: e.target.files?.[0] })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" rows={3} />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* Edit Vehicle Modal */}
      <Modal open={isEditModalOpen} onClose={closeModal} title="Edit Vehicle">
        <form onSubmit={handleEditVehicle} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input name="make" value={form.make} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <input name="model" value={form.model} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input name="price" type="number" value={form.price} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuel</label>
              <select name="fuelType" value={form.fuelType} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mileage</label>
              <input name="mileage" type="number" value={form.mileage} onChange={handleFormChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Engine Capacity (cc)</label>
              <input name="engineCapacity" type="number" value={form.engineCapacity} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Manufacture Date</label>
              <input name="manufactureDate" type="date" value={form.manufactureDate} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gear Type</label>
              <select name="transmission" value={form.transmission} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input type="file" accept="image/*" onChange={e => setForm({ ...form, imageFile: e.target.files?.[0] })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded-lg px-3 py-2" rows={3} />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehicleManagement;
