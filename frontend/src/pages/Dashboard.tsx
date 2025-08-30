import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCarSide, 
  faUserTie, 
  faMoneyBillWave, 
  faChartLine,
  faUser,
  faCog,
  faSignOutAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const brokerStats = [
    { label: 'Vehicles Listed', value: '12', change: '+3 this month', icon: faCarSide, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Sales', value: 'LKR 2.1M', change: '+15% this month', icon: faMoneyBillWave, color: 'from-green-500 to-green-600' },
    { label: 'Commission Earned', value: 'LKR 420K', change: '+18% this month', icon: faChartLine, color: 'from-purple-500 to-purple-600' },
    { label: 'Active Leads', value: '8', change: '+2 new leads', icon: faUserTie, color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivities = [
    { action: 'Toyota Corolla 2020 - Inquiry received', time: '2 hours ago', type: 'inquiry' },
    { action: 'Honda Civic 2019 - Price updated', time: '5 hours ago', type: 'update' },
    { action: 'Nissan X-Trail 2018 - Sold', time: '1 day ago', type: 'sale' },
    { action: 'BMW 320i 2017 - New listing added', time: '2 days ago', type: 'listing' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">RS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  {user?.role === 'broker' ? 'Broker Dashboard' : 'Partner Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">{getGreeting()}, {user?.name || 'User'}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-2xl mb-8"
        >
          <h2 className="text-3xl font-bold mb-3">
            Welcome to Your {user?.role === 'broker' ? 'Broker' : 'Partner'} Dashboard
          </h2>
          <p className="text-blue-100 text-lg">
            {user?.role === 'broker' 
              ? 'Manage your vehicle listings, track sales, and monitor your performance'
              : 'Access your partner benefits and explore business opportunities'
            }
          </p>
        </motion.div>

        {/* Stats Grid - Only for brokers */}
        {user?.role === 'broker' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {brokerStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <FontAwesomeIcon icon={stat.icon} className="text-2xl text-white" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'sale' ? 'bg-green-500' :
                    activity.type === 'inquiry' ? 'bg-blue-500' :
                    activity.type === 'listing' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {user?.role === 'broker' ? (
                <>
                  <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 border border-blue-200">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <FontAwesomeIcon icon={faCarSide} className="text-white" />
                    </div>
                    <span className="font-medium text-blue-700">Add New Vehicle</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 border border-green-200">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <FontAwesomeIcon icon={faChartLine} className="text-white" />
                    </div>
                    <span className="font-medium text-green-700">View Sales Report</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 border border-purple-200">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <FontAwesomeIcon icon={faUserTie} className="text-white" />
                    </div>
                    <span className="font-medium text-purple-700">Manage Listings</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/"
                    className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 border border-blue-200"
                  >
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <FontAwesomeIcon icon={faCarSide} className="text-white" />
                    </div>
                    <span className="font-medium text-blue-700">Browse Vehicles</span>
                  </Link>
                  <Link 
                    to="/broker-signup"
                    className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 border border-green-200"
                  >
                    <div className="p-2 bg-green-500 rounded-lg">
                      <FontAwesomeIcon icon={faUserTie} className="text-white" />
                    </div>
                    <span className="font-medium text-green-700">Become a Broker</span>
                  </Link>
                </>
              )}
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-200 border border-orange-200">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <FontAwesomeIcon icon={faCog} className="text-white" />
                </div>
                <span className="font-medium text-orange-700">Settings</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="text-gray-900 font-medium">{user?.name || 'Not provided'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="text-gray-900 font-medium">{user?.email || 'Not provided'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                user?.role === 'broker' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user?.role || 'User'}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user?.status || 'Unknown'}
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
