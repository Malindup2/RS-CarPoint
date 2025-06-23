import React from 'react';

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Total Vehicles', value: '856', change: '+8%', icon: '🚗' },
    { label: 'Active Brokers', value: '45', change: '+5%', icon: '👨‍💼' },
    { label: 'Monthly Revenue', value: 'LKR 2.5M', change: '+15%', icon: '💰' },
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Vehicle added', user: 'Admin', time: '15 minutes ago' },
    { action: 'User promoted to broker', user: 'Jane Smith', time: '1 hour ago' },
    { action: 'Vehicle sold', user: 'Mike Wilson', time: '2 hours ago' },
    { action: 'New inquiry received', user: 'Sarah Johnson', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-blue-100">Manage users, vehicles, and monitor your business performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200">
              <span className="text-xl">➕</span>
              <span className="font-medium text-blue-700">Add New Vehicle</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition duration-200">
              <span className="text-xl">👥</span>
              <span className="font-medium text-green-700">Manage Users</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition duration-200">
              <span className="text-xl">📊</span>
              <span className="font-medium text-purple-700">View Reports</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition duration-200">
              <span className="text-xl">⚙️</span>
              <span className="font-medium text-orange-700">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
