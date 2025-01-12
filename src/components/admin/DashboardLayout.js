import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUsers, FiFileText, FiMenu, FiX } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import { HiOutlineDocumentReport } from 'react-icons/hi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FiHome className="w-5 h-5" />, title: 'Overview' },
    { path: '/admin/products', icon: <FiShoppingBag className="w-5 h-5" />, title: 'Products' },
    { path: '/admin/real-estate', icon: <BsBuilding className="w-5 h-5" />, title: 'Real Estate' },
    { path: '/admin/users', icon: <FiUsers className="w-5 h-5" />, title: 'Users' },
    { path: '/admin/orders', icon: <FiFileText className="w-5 h-5" />, title: 'Orders' },
    { path: '/admin/reports', icon: <HiOutlineDocumentReport className="w-5 h-5" />, title: 'Reports' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/admin-panel" className="text-xl font-bold text-indigo-600">
            Ookey Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 pt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 transition-colors rounded-lg ${
                location.pathname === item.path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
