import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaArrowRight, FaHome, FaCarrot, FaBed, FaBath, FaRuler } from 'react-icons/fa'
import {useSelector} from 'react-redux'
import patternImage from '../assest/pattern2.jpg'

const HeroSection = () => {
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  console.log(category)
  const [activeCategory, setActiveCategory] = useState('realestate')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = {
    realestate: {
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
      ],
      title: 'Find Your Dream Property',
      subtitle: 'Discover premium properties in prime locations with our extensive real estate listings',
      features: [
        { icon: <FaBed />, text: 'Multiple Bedrooms' },
        { icon: <FaBath />, text: 'Modern Amenities' },
        { icon: <FaRuler />, text: 'Spacious Layouts' }
      ],
      searchPlaceholder: "Search by location, property type, or features...",
      ctaText: "Browse Properties"
    },
    produce: {
      images: [
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop'
      ],
      title: 'Fresh & Organic',
      subtitle: 'Quality fruits and vegetables delivered to your doorstep',
      features: [],
      searchPlaceholder: "Search for fruits & vegetables...",
      ctaText: "Shop Fresh"
    }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % categories[activeCategory].images.length
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [activeCategory])

  const handleCTAClick = () => {
    if (activeCategory === 'realestate') {
      navigate('/real-estate');
    } else {
      navigate('/product-category', { 
        state: { 
          category: 'produce',
          searchQuery: searchQuery 
        } 
      });
    }
  };

  return (
    <div className="relative min-h-screen pt-16 sm:pt-12 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-hidden">
      {/* Background Pattern with Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-repeat opacity-5 animate-pulse" style={{ backgroundImage: `url(${patternImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80 backdrop-blur-[1px]" />
      </div>

      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-12 md:py-16 relative z-10">
        {/* Category Toggle - Enhanced */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg w-[95%] sm:w-auto mx-auto hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={() => setActiveCategory('realestate')}
              className={`
                px-6 py-3.5 rounded-full flex items-center justify-center sm:justify-start gap-3 transition-all duration-500
                transform hover:scale-[1.02] active:scale-95 w-full sm:w-auto
                ${activeCategory === 'realestate'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50/80'
                }
              `}
            >
              <FaHome className="text-xl" />
              <span className="text-base font-semibold">Real Estate</span>
            </button>
            <button
              onClick={() => setActiveCategory('produce')}
              className={`
                px-6 py-3.5 rounded-full flex items-center justify-center sm:justify-start gap-3 transition-all duration-500
                transform hover:scale-[1.02] active:scale-95 w-full sm:w-auto
                ${activeCategory === 'produce'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50/80'
                }
              `}
            >
              <FaCarrot className="text-xl" />
              <span className="text-base font-semibold">Fresh Produce</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content - Enhanced */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Title and Description */}
            <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 animate-slideUp leading-[1.2]">
                {categories[activeCategory].title}
                <span className={`block mt-2 lg:mt-3 ${
                  activeCategory === 'realestate'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-400'
                    : 'bg-gradient-to-r from-green-600 to-green-400'
                } bg-clip-text text-transparent`}>
                  {activeCategory === 'realestate' ? 'Premium Living' : 'Premium Quality'}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 animate-slideUp max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {categories[activeCategory].subtitle}
              </p>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="relative max-w-xl mx-auto lg:mx-0 group">
              <input
                type="text"
                placeholder={categories[activeCategory].searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pr-14 
                transition-all duration-300 text-base placeholder-gray-400 bg-white/90 backdrop-blur-sm
                shadow-sm group-hover:shadow-md"
              />
              <FaSearch className={`absolute right-5 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 ${
                activeCategory === 'realestate' ? 'text-blue-500' : 'text-green-500'
              }`} />
            </div>

            {/* Features - Enhanced for real estate */}
            {activeCategory === 'realestate' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slideUp max-w-xl mx-auto lg:mx-0">
                {categories.realestate.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm 
                    hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] group"
                  >
                    <span className="text-blue-500 text-2xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slideUp max-w-xl mx-auto lg:mx-0">
              <button
                onClick={handleCTAClick}
                className={`
                  group px-8 py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-500 
                  flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95
                  bg-gradient-to-r w-full sm:w-auto relative overflow-hidden
                  ${activeCategory === 'realestate' 
                    ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                    : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }
                `}
              >
                <span className="relative z-10 text-white text-base font-semibold">{categories[activeCategory].ctaText}</span>
                <FaArrowRight className="relative z-10 text-white transform transition-transform duration-500 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <Link
                to="/contact-us"
                className={`
                  px-8 py-4 rounded-full transition-all duration-500 backdrop-blur-sm
                  flex items-center justify-center gap-3 w-full sm:w-auto text-base font-semibold
                  transform hover:scale-[1.02] active:scale-95 border-2
                  ${activeCategory === 'realestate'
                    ? 'border-blue-200 text-blue-600 hover:bg-blue-50/50 hover:border-blue-300'
                    : 'border-green-200 text-green-600 hover:bg-green-50/50 hover:border-green-300'
                  }
                `}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Content - Image Grid Enhanced */}
          <div className="relative animate-fadeIn order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-xl mx-auto">
              <div className="space-y-4 sm:space-y-6 animate-float">
                <div className="group bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={categories[activeCategory].images[currentImageIndex]}
                      alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                      className="w-full h-40 sm:h-52 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {activeCategory === 'realestate' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  {activeCategory === 'realestate' && (
                    <div className="mt-3 flex justify-between items-center px-1">
                      <span className="text-sm font-medium text-gray-700">Premium Villa</span>
                      <span className="text-sm font-bold text-blue-600">₹850,000</span>
                    </div>
                  )}
                </div>
                <div className="group bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={categories[activeCategory].images[(currentImageIndex + 1) % 3]}
                      alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                      className="w-full h-40 sm:h-52 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {activeCategory === 'realestate' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  {activeCategory === 'realestate' && (
                    <div className="mt-3 flex justify-between items-center px-1">
                      <span className="text-sm font-medium text-gray-700">Modern Apartment</span>
                      <span className="text-sm font-bold text-blue-600">₹420,000</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12 animate-floatReverse">
                <div className="group bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={categories[activeCategory].images[(currentImageIndex + 2) % 3]}
                      alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                      className="w-full h-40 sm:h-52 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {activeCategory === 'realestate' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  {activeCategory === 'realestate' && (
                    <div className="mt-3 flex justify-between items-center px-1">
                      <span className="text-sm font-medium text-gray-700">Luxury Condo</span>
                      <span className="text-sm font-bold text-blue-600">₹650,000</span>
                    </div>
                  )}
                </div>
                <div className="group bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={categories[activeCategory].images[currentImageIndex]}
                      alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                      className="w-full h-40 sm:h-52 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {activeCategory === 'realestate' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  {activeCategory === 'realestate' && (
                    <div className="mt-3 flex justify-between items-center px-1">
                      <span className="text-sm font-medium text-gray-700">Family Home</span>
                      <span className="text-sm font-bold text-blue-600">₹550,000</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default HeroSection
