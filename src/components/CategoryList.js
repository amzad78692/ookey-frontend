import React from 'react'
import { Link } from 'react-router-dom'
import { FaCarrot, FaAppleAlt, FaHome, FaLeaf, FaLemon, FaWarehouse } from 'react-icons/fa'

const categories = [
  {
    id: 1,
    name: 'Vegetables',
    icon: <FaCarrot className="w-8 h-8" />,
    color: 'bg-green-100',
    textColor: 'text-green-600',
    link: '/product-category?category=vegetables'
  },
  {
    id: 2,
    name: 'Fruits',
    icon: <FaAppleAlt className="w-8 h-8" />,
    color: 'bg-red-100',
    textColor: 'text-red-600',
    link: '/product-category?category=fruits'
  },
  {
    id: 3,
    name: 'Organic',
    icon: <FaLeaf className="w-8 h-8" />,
    color: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    link: '/product-category?category=organic'
  },
  {
    id: 4,
    name: 'Citrus',
    icon: <FaLemon className="w-8 h-8" />,
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    link: '/product-category?category=citrus'
  },
  {
    id: 5,
    name: 'Houses',
    icon: <FaHome className="w-8 h-8" />,
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    link: '/real-estate?type=houses'
  },
  {
    id: 6,
    name: 'Commercial',
    icon: <FaWarehouse className="w-8 h-8" />,
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
    link: '/real-estate?type=commercial'
  }
]

const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          to={category.link}
          key={category.id}
          className="group"
        >
          <div className={`${category.color} rounded-xl p-6 transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-3 hover:shadow-lg`}>
            <div className={`${category.textColor}`}>
              {category.icon}
            </div>
            <h3 className={`text-sm md:text-base font-semibold ${category.textColor}`}>
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList