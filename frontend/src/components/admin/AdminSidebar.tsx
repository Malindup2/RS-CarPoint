import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar, 
  faUsers, 
  faCar,
  faChartLine,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: faChartBar },
    { id: 'analytics', label: 'Sales Analytics', icon: faChartLine },
    { id: 'users', label: 'User Management', icon: faUsers },
    { id: 'vehicles', label: 'Vehicle Management', icon: faCar },
  ];

  return (    <div className="bg-gradient-to-b from-slate-900 to-slate-800 w-64 min-h-screen shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">RS</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">RS Car Point</h2>
            <p className="text-sm text-slate-300">Admin Panel</p>
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105'
                }`}
              >                <FontAwesomeIcon icon={item.icon} className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 mt-8">        
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Admin Info */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-slate-700 bg-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Administrator</p>
            <p className="text-xs text-slate-400">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
