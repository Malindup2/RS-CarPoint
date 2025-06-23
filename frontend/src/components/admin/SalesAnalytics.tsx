import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faDollarSign, 
  faCarSide, 
  faArrowUp,
  faArrowDown,
  faDownload,
  faFilter,
  faPercent
} from '@fortawesome/free-solid-svg-icons';
import {
  LineChart,
  BarChart,
  PieChart
} from '@mui/x-charts';
import { saveAs } from 'file-saver';
import * as api from '../../api';

interface SalesData {
  month: string;
  revenue: number;
  costs: number;
  profit: number;
  vehiclesSold: number;
}

interface VehicleTypeSales {
  type: string;
  value: number;
  percentage: number;
}

interface DealerPerformance {
  dealerName: string;
  sales: number;
  revenue: number;
  target: number;
}

const SalesAnalytics: React.FC = () => {  const [timeRange, setTimeRange] = useState<'6months' | '1year' | '2years'>('1year');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [vehicleTypeSales, setVehicleTypeSales] = useState<VehicleTypeSales[]>([]);
  const [dealerPerformance, setDealerPerformance] = useState<DealerPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to manually refresh analytics data
  const refreshAnalytics = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Fetch real data from API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try dedicated analytics endpoints
        try {
          const [
            salesResponse,
            vehicleTypesResponse,
            dealerPerformanceResponse
          ] = await Promise.all([
            api.getSalesData(timeRange),
            api.getVehicleTypeSales(timeRange),
            api.getDealerPerformance(timeRange)
          ]);

          setSalesData(salesResponse);
          setVehicleTypeSales(vehicleTypesResponse);
          setDealerPerformance(dealerPerformanceResponse);        } catch (analyticsError) {
          console.log('Dedicated analytics endpoints not available, calculating from existing data...');
          
          // Fallback: calculate from existing vehicles and deals
          const calculatedData = await calculateAnalyticsFromExistingData();
          setSalesData(calculatedData.salesData);
          setVehicleTypeSales(calculatedData.vehicleTypes);
          setDealerPerformance(calculatedData.dealers);
        }
      } catch (err: any) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'Failed to load analytics data');
        
        // Clear data on error - no fallback dummy data
        setSalesData([]);
        setVehicleTypeSales([]);
        setDealerPerformance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, refreshKey]);

  // Listen for vehicle status changes to refresh analytics
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'vehicleStatusChanged') {
        refreshAnalytics();
        localStorage.removeItem('vehicleStatusChanged'); // Clean up
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for direct events in the same tab
    const handleCustomEvent = () => {
      refreshAnalytics();
    };
    
    window.addEventListener('vehicleStatusChanged', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('vehicleStatusChanged', handleCustomEvent as EventListener);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `LKR ${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `LKR ${(amount / 100000).toFixed(1)}L`;
    } else {
      return `LKR ${amount.toLocaleString()}`;
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const currentMonthData = salesData[salesData.length - 1];
  const previousMonthData = salesData[salesData.length - 2];
  
  const revenueGrowth = previousMonthData ? calculateGrowth(currentMonthData?.revenue || 0, previousMonthData.revenue) : '0';
  const profitGrowth = previousMonthData ? calculateGrowth(currentMonthData?.profit || 0, previousMonthData.profit) : '0';
  const salesGrowth = previousMonthData ? calculateGrowth(currentMonthData?.vehiclesSold || 0, previousMonthData.vehiclesSold) : '0';

  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0);
  const totalProfit = salesData.reduce((sum, data) => sum + data.profit, 0);
  const totalVehiclesSold = salesData.reduce((sum, data) => sum + data.vehiclesSold, 0);
  const avgProfitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const downloadReport = async () => {
    try {
      // Try to get structured report from API
      const reportData = await api.getSalesReport(timeRange);
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      saveAs(blob, `sales-report-${timeRange}.json`);
    } catch (error) {
      // Fallback to local data if API fails
      const reportData = {
        summary: {
          totalRevenue: formatCurrency(totalRevenue),
          totalProfit: formatCurrency(totalProfit),
          totalVehiclesSold,
          avgProfitMargin: `${avgProfitMargin}%`
        },
        monthlySales: salesData,
        vehicleTypes: vehicleTypeSales,
        dealerPerformance
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      saveAs(blob, `sales-report-${timeRange}.json`);
    }
  };
  // Fallback function to calculate analytics from existing data
  const calculateAnalyticsFromExistingData = async () => {
    try {
      const [deals] = await Promise.all([
        api.getDeals()
      ]);

      // Calculate monthly sales data from deals
      const monthlyData: { [key: string]: SalesData } = {};
      const currentYear = new Date().getFullYear();
      
      // Initialize months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      months.forEach(month => {
        monthlyData[month] = {
          month,
          revenue: 0,
          costs: 0,
          profit: 0,
          vehiclesSold: 0
        };
      });

      // Process deals data
      deals.forEach((deal: any) => {
        if (deal.status === 'completed' && deal.completedDate) {
          const dealDate = new Date(deal.completedDate);
          if (dealDate.getFullYear() === currentYear) {
            const month = months[dealDate.getMonth()];
            if (monthlyData[month]) {
              monthlyData[month].revenue += deal.salePrice || 0;
              monthlyData[month].costs += deal.purchasePrice || deal.salePrice * 0.7; // Estimate 70% costs
              monthlyData[month].profit += (deal.salePrice || 0) - (deal.purchasePrice || deal.salePrice * 0.7);
              monthlyData[month].vehiclesSold += 1;
            }
          }
        }
      });

      // Calculate vehicle type sales
      const vehicleTypeCounts: { [key: string]: number } = {};
      deals.forEach((deal: any) => {
        if (deal.status === 'completed' && deal.vehicle) {
          const type = deal.vehicle.category || 'Other';
          vehicleTypeCounts[type] = (vehicleTypeCounts[type] || 0) + 1;
        }
      });

      const totalSold = Object.values(vehicleTypeCounts).reduce((sum: number, count: number) => sum + count, 0);
      const vehicleTypes: VehicleTypeSales[] = Object.entries(vehicleTypeCounts).map(([type, count]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        value: count,
        percentage: Math.round((count / totalSold) * 100)
      }));      // Calculate dealer performance (aggregate all sales as single entity if no dealer info available)
      const totalRevenueCalc = Object.values(monthlyData).reduce((sum, data) => sum + data.revenue, 0);
      const dealers: DealerPerformance[] = totalSold > 0 ? [
        { 
          dealerName: 'RS Car Point', 
          sales: totalSold, 
          revenue: totalRevenueCalc, 
          target: Math.max(totalSold * 1.2, 1) 
        }
      ] : [];

      return {
        salesData: Object.values(monthlyData),
        vehicleTypes,
        dealers
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg text-gray-600">Loading analytics data...</span>
        </div>
      )}      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">
            <FontAwesomeIcon icon={faDownload} className="text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Analytics Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-red-500">Data may be calculated from available information.</p>
        </div>
      )}

      {/* Main Content - Show even with error (fallback data) */}
      {!loading && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                Sales Analytics
              </h2>
              <p className="text-gray-600 mt-1">Track sales performance, revenue, and business insights</p>
            </div>            <div className="flex items-center space-x-4">
              
              
              {/* Time Range Filter */}
              <div className="relative">
                <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white font-medium"
                >
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="2years">Last 2 Years</option>
                </select>
              </div>
              
              <button
                onClick={downloadReport}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faDollarSign} className="text-3xl opacity-80" />            <div className={`flex items-center ${parseFloat(revenueGrowth) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  <FontAwesomeIcon icon={parseFloat(revenueGrowth) >= 0 ? faArrowUp : faArrowDown} className="mr-1" />
                  <span className="text-sm font-medium">{revenueGrowth}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(totalRevenue)}</h3>
              <p className="text-blue-100 text-sm">Total Revenue</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-3xl opacity-80" />            <div className={`flex items-center ${parseFloat(profitGrowth) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  <FontAwesomeIcon icon={parseFloat(profitGrowth) >= 0 ? faArrowUp : faArrowDown} className="mr-1" />
                  <span className="text-sm font-medium">{profitGrowth}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(totalProfit)}</h3>
              <p className="text-green-100 text-sm">Total Profit</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faCarSide} className="text-3xl opacity-80" />            <div className={`flex items-center ${parseFloat(salesGrowth) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  <FontAwesomeIcon icon={parseFloat(salesGrowth) >= 0 ? faArrowUp : faArrowDown} className="mr-1" />
                  <span className="text-sm font-medium">{salesGrowth}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold">{totalVehiclesSold.toLocaleString()}</h3>
              <p className="text-purple-100 text-sm">Vehicles Sold</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <FontAwesomeIcon icon={faPercent} className="text-3xl opacity-80" />
              </div>
              <h3 className="text-2xl font-bold">{avgProfitMargin}%</h3>
              <p className="text-orange-100 text-sm">Avg Profit Margin</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue vs Profit Line Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue vs Profit Trend</h3>
              {salesData.length > 0 ? (
                <LineChart
                  width={500}
                  height={300}
                  series={[
                    {
                      data: salesData.map(d => d.revenue / 1000000),
                      label: 'Revenue (M)',
                      color: '#3B82F6'
                    },
                    {
                      data: salesData.map(d => d.profit / 1000000),
                      label: 'Profit (M)',
                      color: '#10B981'
                    }
                  ]}
                  xAxis={[{ scaleType: 'point', data: salesData.map(d => d.month) }]}
                />
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-4xl mb-2 opacity-50" />
                    <p>No sales data available</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Vehicle Sales by Type Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sales by Vehicle Type</h3>          
              {vehicleTypeSales.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: vehicleTypeSales.map((item, index) => ({
                        id: index,
                        value: item.value,
                        label: item.type,
                      })),
                    },
                  ]}
                  width={500}
                  height={300}
                />
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCarSide} className="text-4xl mb-2 opacity-50" />
                    <p>No vehicle type data available</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Monthly Sales Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Vehicle Sales</h3>
            {salesData.length > 0 ? (
              <BarChart
                width={1000}
                height={400}
                series={[
                  {
                    data: salesData.map(d => d.vehiclesSold),
                    label: 'Vehicles Sold',
                    color: '#8B5CF6'
                  }
                ]}
                xAxis={[{ scaleType: 'band', data: salesData.map(d => d.month) }]}
              />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-500">
                <div className="text-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-4xl mb-2 opacity-50" />
                  <p>No monthly sales data available</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Dealer Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-900">Top Dealer Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dealer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Achievement</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dealerPerformance.map((dealer, index) => {
                    const achievement = ((dealer.sales / dealer.target) * 100).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{dealer.dealerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dealer.sales} vehicles
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(dealer.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dealer.target} vehicles
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className={`h-2 rounded-full ${parseFloat(achievement) >= 100 ? 'bg-green-500' : parseFloat(achievement) >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(parseFloat(achievement), 100)}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${parseFloat(achievement) >= 100 ? 'text-green-600' : parseFloat(achievement) >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {achievement}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}                </tbody>
              </table>
              {dealerPerformance.length === 0 && (
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-4xl mb-2 opacity-50" />
                    <p>No dealer performance data available</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default SalesAnalytics;
