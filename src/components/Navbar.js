import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser, selectIsLoggedIn } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import logo from '../assest/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaTimes
} from 'react-icons/fa';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(user)
  console.log(isLoggedIn)
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
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
    }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50">
            <img src={logo} width={80} height={80} className="rounded-full" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                    isActive(link.path)
                      ? link.isGreen
                        ? 'bg-green-50 text-green-600'
                        : 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
                {index === 1 && <div className="h-6 w-px bg-gray-200 my-auto"></div>}
              </React.Fragment>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
            >
              <FaSearch className="h-5 w-5" />
            </button>

            <Link
              to="/favorites"
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
            >
              <FaHeart className="h-5 w-5" />
            </Link>

            <Link
              to="/cart"
              className="hidden sm:flex p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50 transition-all duration-200"
            >
              <FaShoppingCart className="h-5 w-5" />
            </Link>

            {/* Profile Section */}
            <div className="hidden sm:block relative">
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="hidden md:block text-gray-700">{user?.name || 'User'}</span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Profile Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Orders
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
                        >
                          <FaSignOutAlt className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaUserCircle className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                    isActive(link.path)
                      ? link.isGreen
                        ? 'bg-green-50 text-green-600'
                        : 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-4">
                <Link
                  to="/cart"
                  className="block px-4 py-2 rounded-lg flex items-center space-x-3 text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span className="font-medium">Cart</span>
                </Link>
              </div>

              {/* Mobile Sign In */}
              {!isLoggedIn && (
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 text-center font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search properties, products, or services..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                  Search
                </button>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                    Luxury Homes
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                    Apartments
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200">
                    Fresh Vegetables
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200">
                    Organic Fruits
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
