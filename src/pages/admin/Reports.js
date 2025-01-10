import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FiDownload, FiCalendar } from 'react-icons/fi';

const Reports = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('sales');

  // Sample data - replace with actual data from your backend
  const salesData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 2000, orders: 15 },
    { name: 'Thu', sales: 2780, orders: 20 },
    { name: 'Fri', sales: 1890, orders: 14 },
    { name: 'Sat', sales: 2390, orders: 17 },
    { name: 'Sun', sales: 3490, orders: 22 },
  ];

  const categoryData = [
    { name: 'Fruits', value: 400 },
    { name: 'Vegetables', value: 300 },
    { name: 'Organic', value: 300 },
    { name: 'Imported', value: 200 },
  ];

  const realEstateData = [
    { month: 'Jan', inquiries: 65, deals: 4 },
    { month: 'Feb', inquiries: 45, deals: 3 },
    { month: 'Mar', inquiries: 85, deals: 6 },
    { month: 'Apr', inquiries: 55, deals: 4 },
    { month: 'May', inquiries: 75, deals: 5 },
    { month: 'Jun', inquiries: 95, deals: 7 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleExportReport = () => {
    // Implement report export functionality
    console.log('Exporting report...');
  };

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">$24,560</p>
          <p className="mt-2 text-sm text-green-600">+8.2% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Average Order Value</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">$156</p>
          <p className="mt-2 text-sm text-green-600">+4.3% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Total Orders</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">157</p>
          <p className="mt-2 text-sm text-green-600">+12.5% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">3.2%</p>
          <p className="mt-2 text-sm text-red-600">-1.1% from last period</p>
        </div>
      </div>
    </div>
  );

  const renderRealEstateReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inquiries and Deals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiries & Deals</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realEstateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inquiries" stroke="#8884d8" name="Inquiries" />
                <Line type="monotone" dataKey="deals" stroke="#82ca9d" name="Closed Deals" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Apartments', value: 45 },
                    { name: 'Houses', value: 30 },
                    { name: 'Commercial', value: 25 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Real Estate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Total Properties</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">45</p>
          <p className="mt-2 text-sm text-green-600">+5 new this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Active Listings</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">32</p>
          <p className="mt-2 text-sm text-gray-600">71% of total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Avg. Time to Sell</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">45d</p>
          <p className="mt-2 text-sm text-green-600">-5 days from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">$1.2M</p>
          <p className="mt-2 text-sm text-green-600">+15.3% from last month</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 3 months</option>
              <option value="year">Last 12 months</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="sales">Sales Report</option>
              <option value="real-estate">Real Estate Report</option>
            </select>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {reportType === 'sales' ? renderSalesReport() : renderRealEstateReport()}
    </div>
  );
};

export default Reports;
