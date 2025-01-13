import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCarrot, FaAppleAlt, FaShoePrints, FaTshirt, FaLaptop, FaShoppingBasket, FaIndustry, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Real Estate',
      icon: <FaHome className="text-5xl mb-4 text-blue-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-blue-50 to-blue-100',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200',
      textColor: 'text-blue-500',
      description: 'Find your dream property',
      itemCount: '2,500+ Listings'
    },
    {
      id: 2,
      name: 'Vegetables',
      icon: <FaCarrot className="text-5xl mb-4 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-green-50 to-green-100',
      hoverColor: 'hover:from-green-100 hover:to-green-200',
      textColor: 'text-green-500',
      description: 'Fresh & organic vegetables',
      itemCount: '500+ Items'
    },
    {
      id: 3,
      name: 'Fruits',
      icon: <FaAppleAlt className="text-5xl mb-4 text-red-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-red-50 to-red-100',
      hoverColor: 'hover:from-red-100 hover:to-red-200',
      textColor: 'text-red-500',
      description: 'Fresh seasonal fruits',
      itemCount: '300+ Items'
    },
    {
      id: 4,
      name: 'Footwear',
      icon: <FaShoePrints className="text-5xl mb-4 text-purple-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-purple-50 to-purple-100',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200',
      textColor: 'text-purple-500',
      description: 'Premium footwear collection',
      itemCount: '1,000+ Products'
    },
    {
      id: 5,
      name: 'Fashion Wears',
      icon: <FaTshirt className="text-5xl mb-4 text-pink-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-pink-50 to-pink-100',
      hoverColor: 'hover:from-pink-100 hover:to-pink-200',
      textColor: 'text-pink-500',
      description: 'Trendy fashion for everyone',
      itemCount: '5,000+ Styles'
    },
    {
      id: 6,
      name: 'Electronics',
      icon: <FaLaptop className="text-5xl mb-4 text-yellow-600 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-yellow-50 to-yellow-100',
      hoverColor: 'hover:from-yellow-100 hover:to-yellow-200',
      textColor: 'text-yellow-600',
      description: 'Latest gadgets & devices',
      itemCount: '1,500+ Gadgets'
    },
    {
      id: 7,
      name: 'Essential Products',
      icon: <FaShoppingBasket className="text-5xl mb-4 text-orange-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-orange-50 to-orange-100',
      hoverColor: 'hover:from-orange-100 hover:to-orange-200',
      textColor: 'text-orange-500',
      description: 'Daily necessities',
      itemCount: '2,000+ Products'
    },
    {
      id: 8,
      name: 'B2B Business',
      icon: <FaIndustry className="text-5xl mb-4 text-indigo-500 transform group-hover:scale-110 transition-transform duration-300" />,
      color: 'from-indigo-50 to-indigo-100',
      hoverColor: 'hover:from-indigo-100 hover:to-indigo-200',
      textColor: 'text-indigo-500',
      description: 'Business solutions',
      itemCount: '500+ Services'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Shop By Category
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our wide range of products and services across different categories
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="relative"
          >
            <Link
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`group block p-8 rounded-2xl bg-gradient-to-br ${category.color} ${category.hoverColor} transition-all duration-500 shadow-lg hover:shadow-2xl`}
            >
              <div className="text-center relative z-10">
                <div className="mb-6">
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold ${category.textColor} mb-3`}>
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="text-sm font-medium text-gray-500">
                  {category.itemCount}
                </div>
                <div className={`absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${category.textColor}`}>
                  <FaArrowRight />
                </div>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategorySection;
