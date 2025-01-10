import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Fresh Food & 
              <span className="block text-green-600">Premium Properties</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover fresh, locally sourced produce and premium real estate properties all in one place.
            </p>
            <div className="flex gap-4">
              <Link
                to="/product-category?category=vegetables"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Shop Fresh
              </Link>
              <Link
                to="/real-estate"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Properties
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1610348725531-843dff563e2c"
                    alt="Fresh Vegetables"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                    alt="Modern House"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1519996529931-28324d5a630e"
                    alt="Fresh Fruits"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                    alt="Luxury Property"
                    className="rounded-lg w-full h-40 object-cover"
                  />
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
