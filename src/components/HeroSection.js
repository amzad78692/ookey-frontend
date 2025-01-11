import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaArrowRight, FaHome, FaCarrot, FaBed, FaBath, FaRuler } from 'react-icons/fa'

const HeroSection = () => {
  const navigate = useNavigate();
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
    <div className="relative min-h-[600px] bg-gradient-to-r from-slate-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/images/pattern.png')" }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Category Toggle - Moved to top */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 bg-white p-2 rounded-full shadow-md">
            <button
              onClick={() => setActiveCategory('realestate')}
              className={`
                px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300
                ${activeCategory === 'realestate'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <FaHome />
              Real Estate
            </button>
            <button
              onClick={() => setActiveCategory('produce')}
              className={`
                px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300
                ${activeCategory === 'produce'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <FaCarrot />
              Fresh Produce
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeIn">
            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 animate-slideUp">
                {categories[activeCategory].title}
                <span className="block text-blue-600">
                  {activeCategory === 'realestate' ? 'Premium Living' : 'Premium Quality'}
                </span>
              </h1>
              <p className="text-lg text-gray-600 animate-slideUp">
                {categories[activeCategory].subtitle}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder={categories[activeCategory].searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pr-12 transition-all duration-300"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>

            {/* Features - Only show for real estate */}
            {activeCategory === 'realestate' && (
              <div className="grid grid-cols-3 gap-4 animate-slideUp">
                {categories.realestate.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-blue-500">{feature.icon}</span>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 animate-slideUp">
              <button
                onClick={handleCTAClick}
                className={`
                  group px-8 py-4 text-white rounded-full hover:shadow-lg transition-all duration-300 
                  flex items-center gap-2 bg-gradient-to-r 
                  ${activeCategory === 'realestate' 
                    ? 'from-blue-500 to-blue-600' 
                    : 'from-green-500 to-green-600'
                  }
                `}
              >
                {categories[activeCategory].ctaText}
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/contact"
                className={`
                  px-8 py-4 border-2 rounded-full transition-colors duration-300
                  ${activeCategory === 'realestate'
                    ? 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500'
                    : 'border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-500'
                  }
                `}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative animate-fadeIn">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 animate-float">
                <div className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={categories[activeCategory].images[currentImageIndex]}
                    alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  {activeCategory === 'realestate' && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Premium Villa</span>
                      <span className="text-blue-600 font-semibold">$850,000</span>
                    </div>
                  )}
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={categories[activeCategory].images[(currentImageIndex + 1) % 3]}
                    alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  {activeCategory === 'realestate' && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Modern Apartment</span>
                      <span className="text-blue-600 font-semibold">$420,000</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6 mt-12 animate-floatReverse">
                <div className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={categories[activeCategory].images[(currentImageIndex + 2) % 3]}
                    alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  {activeCategory === 'realestate' && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Luxury Condo</span>
                      <span className="text-blue-600 font-semibold">$650,000</span>
                    </div>
                  )}
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={categories[activeCategory].images[currentImageIndex]}
                    alt={activeCategory === 'realestate' ? "Property" : "Fresh Produce"}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  {activeCategory === 'realestate' && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Family Home</span>
                      <span className="text-blue-600 font-semibold">$550,000</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
