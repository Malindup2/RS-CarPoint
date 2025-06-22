import React from 'react';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  image?: string;
  featured?: boolean;
}

const VehicleInventory: React.FC = () => {
  // Sample vehicle data - in a real app this would come from an API
  const vehicles: Vehicle[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 28500,
      mileage: 15000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      featured: true
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      price: 24900,
      mileage: 22000,
      fuelType: 'Gasoline',
      transmission: 'Manual'
    },
    {
      id: 3,
      make: 'BMW',
      model: 'X5',
      year: 2023,
      price: 58000,
      mileage: 8000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      featured: true
    },
    {
      id: 4,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2022,
      price: 45000,
      mileage: 18000,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: 5,
      make: 'Ford',
      model: 'F-150',
      year: 2023,
      price: 42000,
      mileage: 12000,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: 6,
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      price: 39000,
      mileage: 5000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      featured: true
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Vehicles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium vehicles. Each car is thoroughly 
            inspected and comes with our quality guarantee.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition duration-300">
            All Vehicles
          </button>
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-medium transition duration-300">
            Sedans
          </button>
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-medium transition duration-300">
            SUVs
          </button>
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-medium transition duration-300">
            Trucks
          </button>
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-medium transition duration-300">
            Electric
          </button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              {/* Vehicle Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                {vehicle.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                {/* Vehicle Specs */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{formatMileage(vehicle.mileage)} miles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{vehicle.year}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    View Details
                  </button>
                  <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    Test Drive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
            View All Inventory ({vehicles.length + 25}+ Vehicles)
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleInventory;
