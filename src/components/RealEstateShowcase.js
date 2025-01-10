import React from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaRuler } from 'react-icons/fa'

const properties = [
  {
    id: 1,
    title: 'Modern Villa with Pool',
    price: 850000,
    location: 'Beverly Hills, CA',
    beds: 4,
    baths: 3,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    price: 450000,
    location: 'Downtown Manhattan, NY',
    beds: 2,
    baths: 2,
    area: 1200,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
  },
  {
    id: 3,
    title: 'Seaside Property',
    price: 1200000,
    location: 'Miami Beach, FL',
    beds: 5,
    baths: 4,
    area: 3500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
  }
]

const RealEstateShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <Link
          to={`/property/${property.id}`}
          key={property.id}
          className="group"
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                ${property.price.toLocaleString()}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <div className="flex justify-between items-center text-gray-600">
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
        </Link>
      ))}
    </div>
  )
}

export default RealEstateShowcase
