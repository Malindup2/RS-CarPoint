import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, 
  faSearch, 
  faArrowUp, 
  faArrowDown, 
  faPause, 
  faPlay, 
  faTrash,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'broker' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-06-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'broker', status: 'active', joinDate: '2024-02-10', lastLogin: '2024-06-22' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'user', status: 'inactive', joinDate: '2024-03-05', lastLogin: '2024-06-18' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'broker', status: 'active', joinDate: '2024-01-28', lastLogin: '2024-06-23' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'user', status: 'active', joinDate: '2024-04-12', lastLogin: '2024-06-21' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handlePromoteToBroker = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: 'broker' } : user
    ));
    alert('User promoted to broker!');
  };

  const handleDemoteToUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: 'user' } : user
    ));
    alert('Broker demoted to user!');
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    alert('User status updated!');
  };

  const handleDeleteUser = async (userId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'broker': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  // Add this function to generate and download CSV
  const downloadUserReport = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Login'];
    const rows = filteredUsers.map(user => [user.name, user.email, user.role, user.status, user.joinDate, user.lastLogin]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'user_report.csv');
  };

  return (    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">User Management</h2>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>        <button 
          onClick={() => console.log('Add new user modal would open')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Add New User</span>
        </button>
        <button
          onClick={downloadUserReport}
          className="ml-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <span>Download Report</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Search Users</label>            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Role</label>            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="broker">Broker</option>
                <option value="admin">Admin</option>
              </select>
            </div></div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Status</label>            <div className="relative">
              <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Users ({filteredUsers.length})
          </h3>
        </div>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-slate-100 to-blue-100">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Join Date</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Login</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-200"
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {user.role === 'user' && (                        <button
                          onClick={() => handlePromoteToBroker(user.id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 text-xs bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                          <span>Promote</span>
                        </button>
                      )}
                      {user.role === 'broker' && (                        <button
                          onClick={() => handleDemoteToUser(user.id)}
                          className="flex items-center space-x-1 text-orange-600 hover:text-orange-900 text-xs bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                          <span>Demote</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`flex items-center space-x-1 text-xs px-3 py-2 rounded-lg transition-all duration-200 ${
                          user.status === 'active'
                            ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100'
                            : 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100'
                        }`}
                      >                        {user.status === 'active' ? (
                          <>
                            <FontAwesomeIcon icon={faPause} />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faPlay} />
                            <span>Activate</span>
                          </>
                        )}
                      </button>                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-900 text-xs bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">          No users found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default UserManagement;
