import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CategoryWiseProductDisplay = () => {
  const categories = [
    {
      id: 1,
      name: 'Fresh Fruits',
      description: 'Handpicked fresh fruits from local farms',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      products: [
        {
          id: 1,
          name: 'Organic Apples',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6'
        },
        {
          id: 2,
          name: 'Fresh Oranges',
          price: 3.99,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e'
        },
        {
          id: 3,
          name: 'Strawberries',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2'
        }
      ]
    },
    {
      id: 2,
      name: 'Fresh Vegetables',
      description: 'Farm-fresh vegetables for your daily needs',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      products: [
        {
          id: 4,
          name: 'Organic Tomatoes',
          price: 3.49,
          image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337'
        },
        {
          id: 5,
          name: 'Fresh Carrots',
          price: 2.99,
          image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37'
        },
        {
          id: 6,
          name: 'Green Lettuce',
          price: 2.49,
          image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f'
        }
      ]
    },
    {
      id: 3,
      name: 'Grocery Items',
      description: 'Essential grocery items for your pantry',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58',
      products: [
        {
          id: 7,
          name: 'Organic Rice',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c'
        },
        {
          id: 8,
          name: 'Whole Grain Pasta',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1'
        },
        {
          id: 9,
          name: 'Organic Quinoa',
          price: 6.99,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of products organized by categories for easy shopping
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Category Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-blue-600 font-bold mt-1">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-6 text-center">
                <Link
                  to={`/categories/${category.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View All {category.name}
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;