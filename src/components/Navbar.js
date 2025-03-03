import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser, selectIsLoggedIn } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import logo from '../assest/ookey.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import LocationService from './LocationService';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaHome,
  FaBuilding,
  FaCarrot,
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaStore
} from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import SummaryApi from '../common';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add new useEffect for body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    dispatch(logout());
    const urlWithQuery = `${SummaryApi.logout_user.url}`;
    const dataResponse = await fetch(urlWithQuery, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });
    setIsProfileOpen(false);
    toast.success('Successfully logged out!');
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', icon: <FaHome className="h-4 w-4" />, label: 'Home' },
    { path: '/real-estate', icon: <FaBuilding className="h-4 w-4" />, label: 'Properties' },
    {
      path: '/product-category?category=vegetables',
      icon: <FaCarrot className="h-4 w-4" />,
      label: 'Fresh Produce',
      isGreen: true
    },
  ];

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }),
    exit: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    }
  };

  // Quick action button hover animation
  const quickActionVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/" className="flex items-center space-x-2 z-50">
              <img 
                src={logo} 
                width={80} 
                height={80} 
                className="rounded-full shadow-md" 
                alt="Logo" 
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced animations */}
          <div className="hidden lg:flex space-x-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  to={link.path}
                  className={`px-5 py-2.5 rounded-full flex items-center space-x-2.5 transition-all duration-300 ${
                    isActive(link.path)
                      ? link.isGreen
                        ? 'bg-green-50 text-green-600 shadow-sm shadow-green-100'
                        : 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {link.icon}
                  </motion.div>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </motion.div>
            ))}

            {/* Products Dropdown with enhanced animations */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                className={`px-5 py-2.5 rounded-full flex items-center space-x-2.5 transition-all duration-300 ${
                  isProductsDropdownOpen 
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaStore className="h-4 w-4" />
                <span className="font-medium">All Products</span>
                <motion.div
                  animate={{ rotate: isProductsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="h-3 w-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden"
                  >
                    <div className="py-2">
                      {Array.isArray(categories[0]) ? (
                        categories[0].map((category, index) => (
                          <motion.div
                            key={category._id}
                            variants={menuItemVariants}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link
                              to={`/category/${category._id}`}
                              className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                              onClick={() => setIsProductsDropdownOpen(false)}
                            >
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <FaStore className="mr-3 h-4 w-4" />
                              </motion.div>
                              <span className="font-medium">{category.title}</span>
                            </Link>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-500 px-4 py-3">No categories available</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side Icons with enhanced animations */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              variants={quickActionVariants}
              whileHover="hover"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-300"
            >
              <FaSearch className="h-5 w-5" />
            </motion.button>

            <motion.div variants={quickActionVariants} whileHover="hover">
              <Link
                to="/cart"
                className="flex p-2.5 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors duration-300"
              >
                <FaShoppingCart className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={quickActionVariants} whileHover="hover">
              <Link
                to="/favourite"
                className="flex p-2.5 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors duration-300"
              >
                <FaHeart className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.button
              variants={quickActionVariants}
              whileHover="hover"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex p-2.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-300"
            >
              <FaLocationDot className="h-5 w-5" />
            </motion.button>

            {/* Profile Section with enhanced animations */}
            <div className="relative">
              {isLoggedIn ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-blue-50 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden text-white shadow-md"
                    >
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold">
                          {(user?.first_name?.[0] || '') + (user?.last_name?.[0] || '')}
                        </span>
                      )}
                    </motion.div>
                    <span className="font-medium text-gray-700">
                      {user?.first_name || "User"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.first_name || user?.last_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUserCircle className="h-4 w-4 text-gray-400" />
                          <span>Profile Settings</span>
                        </Link>
                        {user?.role === 1 && (
                          <Link
                            to="/admin"
                            className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaStore className="h-4 w-4 text-gray-400" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <FaSignOutAlt className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    <FaUserCircle className="h-5 w-5" />
                    <span className="font-medium">Sign In</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button with enhanced animation */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-300"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              variants={mobileMenuVariants}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Mobile Menu Header */}
                <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
                  <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <img 
                      src={logo} 
                      width={45} 
                      height={45} 
                      className="rounded-full shadow-md" 
                      alt="Logo" 
                    />
                    <span className="font-semibold text-gray-800">Ookey</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-200"
                  >
                    <FaTimes className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Mobile Quick Actions */}
                <div className="px-6 py-4 flex justify-around border-b border-gray-100 bg-gray-50">
                  {[
                    { icon: <FaSearch />, label: 'Search', action: () => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }},
                    { icon: <FaShoppingCart />, label: 'Cart', path: '/cart' },
                    { icon: <FaHeart />, label: 'Favourite', path: '/favourite' },
                    { icon: <FaLocationDot />, label: 'Location', action: () => {
                      setIsLocationModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      variants={menuItemVariants}
                      custom={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20"
                    >
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="flex flex-col items-center space-y-2 p-3 text-gray-600 hover:text-blue-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="h-6 w-6"
                          >
                            {item.icon}
                          </motion.div>
                          <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="flex flex-col items-center space-y-2 p-3 text-gray-600 hover:text-blue-600 w-full"
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="h-6 w-6"
                          >
                            {item.icon}
                          </motion.div>
                          <span className="text-xs font-medium">{item.label}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Navigation Links */}
                <div className="px-6 py-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      variants={menuItemVariants}
                      custom={index}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-200 ${
                          isActive(link.path)
                            ? link.isGreen
                              ? 'bg-green-50 text-green-600'
                              : 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-5 h-5"
                        >
                          {link.icon}
                        </motion.div>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Products Categories */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="text-sm font-semibold text-gray-500 mb-3 px-2">
                    Products Categories
                  </div>
                  <div className="space-y-2">
                    {Array.isArray(categories[0]) ? (
                      categories[0].map((category) => (
                        <Link
                          key={category._id}
                          to={`/category/${category._id}`}
                          className="flex items-center space-x-4 px-5 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaStore className="h-5 w-5" />
                          <span className="font-medium">{category.title}</span>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 px-4 py-3">No categories available</p>
                    )}
                  </div>
                </div>

                {/* Mobile Profile Section */}
                <div className="mt-auto px-6 py-4 border-t border-gray-100 bg-gray-50">
                  {isLoggedIn ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 px-4 py-3 bg-white rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                          {user?.image ? (
                            <img
                              src={user.image}
                              alt="User"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-lg font-semibold">
                              {(user?.first_name?.[0] || '') + (user?.last_name?.[0] || '')}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user?.first_name || "User"}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-4 px-5 py-3.5 text-gray-700 hover:bg-white rounded-xl transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUserCircle className="h-5 w-5" />
                        <span className="font-medium">Profile Settings</span>
                      </Link>
                      {user?.role === 1 && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-4 px-5 py-3.5 text-gray-700 hover:bg-white rounded-xl transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaStore className="h-5 w-5" />
                          <span className="font-medium">Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-4 px-5 py-3.5 text-red-600 hover:bg-white rounded-xl transition-all duration-200"
                      >
                        <FaSignOutAlt className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-md transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUserCircle className="h-5 w-5" />
                      <span className="font-medium">Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay with enhanced animations */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search properties, products, or services..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  Search
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                    Luxury Homes
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                    Apartments
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200 transform hover:scale-105">
                    Fresh Vegetables
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200 transform hover:scale-105">
                    Organic Fruits
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLocationModalOpen && (
        <LocationService isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;