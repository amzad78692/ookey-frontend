import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit2, FiMapPin, FiPhone, FiMail, FiCamera, FiTruck, FiPackage } from 'react-icons/fi';
import { MdStorefront, MdVerified } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import EditProfileModal from '../components/modals/EditProfileModal';
import ImageUploadModal from '../components/modals/ImageUploadModal';

const categories = [
  { name: 'Real Estate', icon: '🏠', color: 'from-blue-500 to-blue-600' },
  { name: 'Vegetable', icon: '🥬', color: 'from-green-500 to-green-600' },
  { name: 'Fruits', icon: '🍎', color: 'from-red-500 to-red-600' },
  { name: 'Shoes', icon: '👟', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Clothes', icon: '👕', color: 'from-purple-500 to-purple-600' },
  { name: 'Electronics', icon: '📱', color: 'from-gray-700 to-gray-800' },
  { name: 'Essential Products', icon: '🛍️', color: 'from-pink-500 to-pink-600' },
  { name: 'B2B Business', icon: '🤝', color: 'from-indigo-500 to-indigo-600' }
];

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);

  // Handler functions
  const handleProfileUpdate = (updatedData) => {
    console.log('Updated profile data:', updatedData);
    // Implement your profile update logic here
  };

  const handleImageUpload = (file) => {
    console.log('Uploaded image:', file);
    // Implement your image upload logic here
  };

  const stats = [
    { label: 'Total Orders', value: '24', icon: FiPackage, color: 'bg-blue-500' },
    { label: 'Total Spent', value: '$2,156', icon: IoStatsChart, color: 'bg-green-500' },
    { label: 'Active Orders', value: '3', icon: FiTruck, color: 'bg-yellow-500' },
    { label: 'Wishlist Items', value: '12', icon: FiHeart, color: 'bg-red-500' },
  ];

  const recentOrders = [
    { 
      id: 1, 
      date: '2025-01-15', 
      status: 'Delivered', 
      total: 299.99, 
      items: 3,
      products: [
        { name: 'iPhone 15 Pro', price: 199.99, image: 'https://placehold.co/50x50' },
        { name: 'AirPods Pro', price: 100.00, image: 'https://placehold.co/50x50' }
      ]
    },
    { 
      id: 2, 
      date: '2025-01-10', 
      status: 'Processing', 
      total: 149.50, 
      items: 2,
      products: [
        { name: 'Nike Air Max', price: 149.50, image: 'https://placehold.co/50x50' }
      ]
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8 p-8">
            {/* User Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg group">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                      <FiUser className="w-10 h-10 text-blue-500" />
                    </div>
                  )}
                  <button 
                    onClick={() => setIsImageUploadOpen(true)}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiCamera className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-3xl font-bold text-gray-800">{user?.first_name} {user?.last_name}</h2>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiMail className="w-4 h-4" />
                      <span>{user?.email || 'john@example.com'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiPhone className="w-4 h-4" />
                      <span>{user?.mobile || '+1 234 567 890'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Info & Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                  <FiUser className="w-5 h-5 text-blue-500" />
                  <span>Personal Information</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiMapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800">{user?.address || '123 Main St, City, Country'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MdStorefront className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-800">January 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                  <FiHeart className="w-5 h-5 text-rose-500" />
                  <span>Interests</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer transition-all
                        ${selectedCategory === category.name 
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                          : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {order.products.map((product, index) => (
                          <img 
                            key={index}
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <span className={`inline-flex px-3 py-1 text-sm rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-72">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', icon: FiUser, label: 'Profile' },
                    { id: 'orders', icon: FiShoppingBag, label: 'Orders' },
                    { id: 'wishlist', icon: FiHeart, label: 'Wishlist' },
                    { id: 'settings', icon: FiSettings, label: 'Settings' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all">
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            user={user}
            onSave={handleProfileUpdate}
          />
        )}

        {isImageUploadOpen && (
          <ImageUploadModal
            isOpen={isImageUploadOpen}
            onClose={() => setIsImageUploadOpen(false)}
            onUpload={handleImageUpload}
            type="profile"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
