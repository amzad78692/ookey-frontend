import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser, selectIsLoggedIn } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import { FaUserCircle, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    toast.success('Successfully logged out!', {
      position: "top-right",
      autoClose: 3000,
    })
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600">
            OoKey
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
            <Link to="/product-category?category=vegetables" className="text-gray-600 hover:text-green-600">Vegetables</Link>
            <Link to="/product-category?category=fruits" className="text-gray-600 hover:text-green-600">Fruits</Link>
            <Link to="/real-estate" className="text-gray-600 hover:text-green-600">Real Estate</Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-green-600">
              <FaShoppingCart className="h-6 w-6" />
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 focus:outline-none"
                >
                  <FaUserCircle className="h-6 w-6" />
                  <span className="hidden md:block">{user?.name || 'User'}</span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
