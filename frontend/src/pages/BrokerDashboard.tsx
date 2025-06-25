import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faClipboard, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BrokerDashboard: React.FC = () => {
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch vehicles data
    const fetchVehicles = async () => {
      try {
        // This would normally use your API
        setVehicles([
          { id: 1, make: 'Toyota', model: 'Corolla', year: 2022, price: 25000, status: 'Available' },
          { id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 22000, status: 'Available' },
          { id: 3, make: 'Mazda', model: 'CX-5', year: 2023, price: 30000, status: 'Available' }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <div className="text-2xl font-bold mb-10">RS Carpoint</div>
        <nav className="mt-10">
          <div className="mt-4 mb-6">
            <p className="text-gray-300 uppercase text-xs mb-4 tracking-wider">Broker Dashboard</p>
            <Link to="/dashboard" className="flex items-center py-2 px-4 bg-blue-700 rounded-lg">
              <FontAwesomeIcon icon={faCar} className="mr-3" />
              <span>Vehicles</span>
            </Link>
            <Link to="/dashboard/profile" className="flex items-center mt-4 py-2 px-4 text-gray-300 hover:bg-blue-700 rounded-lg">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              <span>Profile</span>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center mt-20 py-2 px-4 text-gray-300 hover:bg-blue-700 rounded-lg w-full"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Vehicles</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-10">Loading vehicles...</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Make & Model
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle: any) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.make} {vehicle.model}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vehicle.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${vehicle.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrokerDashboard;
