import React from 'react'
import { Link } from 'react-router-dom'

const products = {
  fruits: [
    {
      id: 1,
      name: 'Fresh Oranges',
      price: 4.99,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e'
    },
    {
      id: 2,
      name: 'Red Apples',
      price: 3.99,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6'
    },
    {
      id: 3,
      name: 'Bananas',
      price: 2.99,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1543218024-57a70143c369'
    },
    {
      id: 4,
      name: 'Strawberries',
      price: 5.99,
      unit: 'box',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6'
    }
  ],
  vegetables: [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: 3.49,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1546470427-f5c9439c4af6'
    },
    {
      id: 2,
      name: 'Broccoli',
      price: 2.99,
      unit: 'pc',
      image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c'
    },
    {
      id: 3,
      name: 'Carrots',
      price: 1.99,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37'
    },
    {
      id: 4,
      name: 'Bell Peppers',
      price: 4.49,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83'
    }
  ]
}

const FeaturedProducts = ({ category, heading }) => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products[category].map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-bold">
                    ${product.price}/{product.unit}
                  </p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
