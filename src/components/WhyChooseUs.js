import React from 'react'
import { FaTruck, FaLeaf, FaHome, FaShieldAlt } from 'react-icons/fa'

const features = [
  {
    icon: <FaTruck className="w-8 h-8" />,
    title: 'Same Day Delivery',
    description: 'Get your fresh produce delivered to your doorstep on the same day'
  },
  {
    icon: <FaLeaf className="w-8 h-8" />,
    title: 'Fresh & Organic',
    description: 'All our products are fresh, organic, and locally sourced'
  },
  {
    icon: <FaHome className="w-8 h-8" />,
    title: 'Premium Properties',
    description: 'Carefully curated selection of premium real estate properties'
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: 'Secure Transactions',
    description: 'Safe and secure payment processing for all transactions'
  }
]

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best quality products and services to our customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-green-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
