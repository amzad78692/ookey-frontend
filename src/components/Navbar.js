import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser, selectIsLoggedIn } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaHome, FaBuilding, FaCarrot, FaSearch, FaHeart } from 'react-icons/fa'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    toast.success('Successfully logged out!', {
      position: "top-right",
      autoClose: 3000,
    })
    navigate('/')
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBuilding className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              OoKey
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                isActive('/') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaHome className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/real-estate"
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                isActive('/real-estate')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaBuilding className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 my-auto"></div>
            <Link
              to="/product-category?category=vegetables"
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                isActive('/product-category') && location.search.includes('vegetables')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaCarrot className="h-4 w-4" />
              <span>Fresh Produce</span>
            </Link>
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
              className="p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50 transition-all duration-200"
            >
              <FaShoppingCart className="h-5 w-5" />
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUserCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="hidden md:block text-gray-700">{user?.name || 'User'}</span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
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
                        to="/admin/dashboard"
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
                  </div>
                )}
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
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 animate-slideDown">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search properties, products, or services..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
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
        </div>
      )}
    </nav>
  )
}

export default Navbar
