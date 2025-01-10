import React from 'react';
import { FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview = () => {
  // Sample data - replace with actual data from your backend
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,426',
      icon: <FiDollarSign className="w-6 h-6" />,
      change: '+8.1%',
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: '2,142',
      icon: <FiUsers className="w-6 h-6" />,
      change: '+12.5%',
      color: 'bg-blue-500',
    },
    {
      title: 'Products Sold',
      value: '1,257',
      icon: <FiShoppingBag className="w-6 h-6" />,
      change: '+3.2%',
      color: 'bg-purple-500',
    },
    {
      title: 'Property Inquiries',
      value: '384',
      icon: <BsBuilding className="w-6 h-6" />,
      change: '+14.6%',
      color: 'bg-yellow-500',
    },
  ];

  const chartData = [
    { name: 'Jan', sales: 4000, inquiries: 2400 },
    { name: 'Feb', sales: 3000, inquiries: 1398 },
    { name: 'Mar', sales: 2000, inquiries: 9800 },
    { name: 'Apr', sales: 2780, inquiries: 3908 },
    { name: 'May', sales: 1890, inquiries: 4800 },
    { name: 'Jun', sales: 2390, inquiries: 3800 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                <Bar dataKey="inquiries" fill="#82ca9d" name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New order placed</p>
                    <p className="text-sm text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-indigo-600">$123.45</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
