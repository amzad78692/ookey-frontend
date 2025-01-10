import React from 'react'
import RealEstateShowcase from '../components/RealEstateShowcase'

const RealEstate = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Real Estate Listings</h1>
      <RealEstateShowcase />
    </div>
  )
}

export default RealEstate
