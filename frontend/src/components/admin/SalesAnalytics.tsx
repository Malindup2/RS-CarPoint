import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, 
  faChartLine, 
  faPercent, 
  faCar,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faChartBar,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SalesData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  unitsSold: number;
}

interface VehicleTypeData {
  type: string;
  value: number;
  color: string;
}

const SalesAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('12months');

  // Sample sales data for the last 12 months
  const salesData: SalesData[] = [
    { month: 'Jan', revenue: 12500000, cost: 9500000, profit: 3000000, unitsSold: 25 },
    { month: 'Feb', revenue: 15200000, cost: 11800000, profit: 3400000, unitsSold: 32 },
    { month: 'Mar', revenue: 18700000, cost: 14200000, profit: 4500000, unitsSold: 41 },
    { month: 'Apr', revenue: 14800000, cost: 11200000, profit: 3600000, unitsSold: 28 },
    { month: 'May', revenue: 22100000, cost: 16800000, profit: 5300000, unitsSold: 47 },
    { month: 'Jun', revenue: 19600000, cost: 14900000, profit: 4700000, unitsSold: 39 },
    { month: 'Jul', revenue: 25300000, cost: 19200000, profit: 6100000, unitsSold: 52 },
    { month: 'Aug', revenue: 21800000, cost: 16500000, profit: 5300000, unitsSold: 44 },
    { month: 'Sep', revenue: 18900000, cost: 14300000, profit: 4600000, unitsSold: 37 },
    { month: 'Oct', revenue: 24700000, cost: 18700000, profit: 6000000, unitsSold: 49 },
    { month: 'Nov', revenue: 27200000, cost: 20600000, profit: 6600000, unitsSold: 56 },
    { month: 'Dec', revenue: 31500000, cost: 23800000, profit: 7700000, unitsSold: 63 }
  ];

  // Vehicle type distribution
  const vehicleTypeData: VehicleTypeData[] = [
    { type: 'Sedan', value: 35, color: '#3B82F6' },
    { type: 'SUV', value: 28, color: '#10B981' },
    { type: 'Hatchback', value: 20, color: '#F59E0B' },
    { type: 'Luxury', value: 12, color: '#8B5CF6' },
    { type: 'Electric', value: 5, color: '#EF4444' }
  ];

  // Calculate key metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCost = salesData.reduce((sum, item) => sum + item.cost, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  const totalUnitsSold = salesData.reduce((sum, item) => sum + item.unitsSold, 0);
  const profitMargin = ((totalProfit / totalRevenue) * 100);
  const avgSalePrice = totalRevenue / totalUnitsSold;

  // Calculate growth percentages (comparing last 6 months to previous 6 months)
  const recentRevenue = salesData.slice(-6).reduce((sum, item) => sum + item.revenue, 0);
  const previousRevenue = salesData.slice(0, 6).reduce((sum, item) => sum + item.revenue, 0);
  const revenueGrowth = ((recentRevenue - previousRevenue) / previousRevenue) * 100;

  const recentProfit = salesData.slice(-6).reduce((sum, item) => sum + item.profit, 0);
  const previousProfit = salesData.slice(0, 6).reduce((sum, item) => sum + item.profit, 0);
  const profitGrowth = ((recentProfit - previousProfit) / previousProfit) * 100;

  const formatCurrency = (value: number) => {
    return `LKR ${(value / 1000000).toFixed(1)}M`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Sales Analytics
          </h2>
          <p className="text-gray-600 mt-1">Track revenue, costs, profits, and business insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="24months">Last 24 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center mt-1">
                <FontAwesomeIcon 
                  icon={revenueGrowth >= 0 ? faArrowUp : faArrowDown} 
                  className={`text-sm mr-1 ${revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} 
                />
                <span className={`text-sm ${revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Profit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
              <div className="flex items-center mt-1">
                <FontAwesomeIcon 
                  icon={profitGrowth >= 0 ? faArrowUp : faArrowDown} 
                  className={`text-sm mr-1 ${profitGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} 
                />
                <span className={`text-sm ${profitGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(profitGrowth).toFixed(1)}%
                </span>
              </div>
            </div>            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="text-xl text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900">{profitMargin.toFixed(1)}%</p>
              <p className="text-sm text-gray-500 mt-1">Industry avg: 15%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faPercent} className="text-xl text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Units Sold</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalUnitsSold)}</p>
              <p className="text-sm text-gray-500 mt-1">Avg: {formatCurrency(avgSalePrice)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCar} className="text-xl text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Profit Trend */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Revenue vs Profit Trend</h3>
            <FontAwesomeIcon icon={faChartLine} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value), '']}
                labelStyle={{ color: '#333' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Profit"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vehicle Type Distribution */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Sales by Vehicle Type</h3>
            <FontAwesomeIcon icon={faCar} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {vehicleTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.type}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Units Sold */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Monthly Units Sold</h3>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                formatter={(value: any) => [value, 'Units']}
                labelStyle={{ color: '#333' }}
              />
              <Bar dataKey="unitsSold" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue vs Cost Analysis */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Revenue vs Cost Analysis</h3>
            <FontAwesomeIcon icon={faChartBar} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value), '']}
                labelStyle={{ color: '#333' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
                name="Cost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">Best Performing Month</h4>
            <p className="text-blue-600">December 2024</p>
            <p className="text-sm text-blue-500">Revenue: {formatCurrency(31500000)}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">Highest Profit Margin</h4>
            <p className="text-green-600">July 2024</p>
            <p className="text-sm text-green-500">Margin: 24.1%</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
            <h4 className="font-semibold text-purple-800 mb-2">Growth Trend</h4>
            <p className="text-purple-600">Positive</p>
            <p className="text-sm text-purple-500">+{revenueGrowth.toFixed(1)}% revenue growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalesAnalytics;
