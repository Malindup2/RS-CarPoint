import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'broker' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
  password?: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'id'>) => void;
  user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    joinDate: '',
    lastLogin: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      const { id, ...userData } = user;
      setFormData(userData);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal open={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Add New User'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {!user && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="broker">Broker</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal; 