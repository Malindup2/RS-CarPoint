import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faCar, 
  faUserTie, 
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: faUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Vehicles', value: '856', change: '+8%', icon: faCar, color: 'from-green-500 to-green-600' },
    { label: 'Active Brokers', value: '45', change: '+5%', icon: faUserTie, color: 'from-purple-500 to-purple-600' },
    { label: 'Monthly Revenue', value: 'LKR 2.5M', change: '+15%', icon: faMoneyBillWave, color: 'from-yellow-500 to-yellow-600' },
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Vehicle added', user: 'Admin', time: '15 minutes ago' },
    { action: 'User promoted to broker', user: 'Jane Smith', time: '1 hour ago' },
    { action: 'Vehicle sold', user: 'Mike Wilson', time: '2 hours ago' },
    { action: 'New inquiry received', user: 'Sarah Johnson', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-3">Welcome to Admin Dashboard</h2>
        <p className="text-blue-100 text-lg">Manage users, vehicles, and monitor your business performance</p>
      </div>{/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1 font-medium">{stat.change}</p>
              </div>              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <FontAwesomeIcon icon={stat.icon} className="text-2xl text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>{/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 border border-blue-200">              <div className="p-2 bg-blue-500 rounded-lg">
                <span className="text-lg text-white">➕</span>
              </div>
              <span className="font-medium text-blue-700">Add New Vehicle</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 border border-green-200">              <div className="p-2 bg-green-500 rounded-lg">
                <span className="text-lg text-white">👥</span>
              </div>
              <span className="font-medium text-green-700">Manage Users</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 border border-purple-200">              <div className="p-2 bg-purple-500 rounded-lg">
                <span className="text-lg text-white">📊</span>
              </div>
              <span className="font-medium text-purple-700">View Reports</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-200 border border-orange-200">              <div className="p-2 bg-orange-500 rounded-lg">
                <span className="text-lg text-white">⚙️</span>
              </div>
              <span className="font-medium text-orange-700">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
