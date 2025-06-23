import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/admin/AdminSidebar';
import UserManagement from '../components/admin/UserManagement';
import VehicleManagement from '../components/admin/VehicleManagement';
import DashboardOverview from '../components/admin/DashboardOverview';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Welcome, Admin</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
