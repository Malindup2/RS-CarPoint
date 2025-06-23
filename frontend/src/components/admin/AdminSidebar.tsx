import React from 'react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'vehicles', label: 'Vehicle Management', icon: '🚗' },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">RS</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">RS Car Point</h2>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Admin Info */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Administrator</p>
            <p className="text-xs text-gray-500">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
