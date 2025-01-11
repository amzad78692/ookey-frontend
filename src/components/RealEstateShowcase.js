import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHeart, FaShare, FaFilter } from 'react-icons/fa'

const properties = [
  {
    id: 1,
    title: 'Modern Villa with Pool',
    price: 850000,
    location: 'Beverly Hills, CA',
    beds: 4,
    baths: 3,
    area: 2800,
    type: 'Villa',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    description: 'Luxurious modern villa with private pool and stunning views.'
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    price: 450000,
    location: 'Downtown Manhattan, NY',
    beds: 2,
    baths: 2,
    area: 1200,
    type: 'Apartment',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    description: 'High-end apartment in the heart of Manhattan with city views.'
  },
  {
    id: 3,
    title: 'Seaside Property',
    price: 1200000,
    location: 'Miami Beach, FL',
    beds: 5,
    baths: 4,
    area: 3500,
    type: 'House',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    description: 'Spectacular beachfront property with direct ocean access.'
  }
]

const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Condo']
const priceRanges = ['Any', '$0-$500k', '$500k-$1M', '$1M+']

const RealEstateShowcase = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('Any')
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaFilter className="text-blue-600" />
            Filters
          </h2>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Price Range</label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedPrice(range)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedPrice === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative"
          >
            {/* Image Section */}
            <div className="relative h-64">
              <Link to={`/property/${property.id}`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.type}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(property.id)
                  }}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    favorites.includes(property.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <FaHeart className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200"
                >
                  <FaShare className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                ${property.price.toLocaleString()}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <Link to={`/property/${property.id}`}>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {property.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-2 flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-600" />
                {property.location}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {property.description}
              </p>
              <div className="flex justify-between items-center text-gray-600 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  <span>{property.beds} beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-blue-600" />
                  <span>{property.baths} baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRuler className="text-blue-600" />
                  <span>{property.area} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RealEstateShowcase
