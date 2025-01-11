import React from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaFilter, FaSort } from 'react-icons/fa';

const CategoryPage = () => {
  const { id } = useParams();

  // Static category data
  const categories = {
    1: {
      name: 'Fresh Fruits',
      description: 'Fresh and organic fruits sourced directly from local farms',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      products: [
        {
          id: 1,
          name: 'Organic Apples',
          price: 4.99,
          rating: 4.5,
          reviews: 128,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
          description: 'Sweet and crispy organic apples'
        },
        {
          id: 2,
          name: 'Fresh Oranges',
          price: 3.99,
          rating: 4.3,
          reviews: 95,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
          description: 'Juicy oranges rich in Vitamin C'
        },
        {
          id: 3,
          name: 'Strawberries',
          price: 5.99,
          rating: 4.8,
          reviews: 143,
          image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
          description: 'Sweet and fresh strawberries'
        },
        {
          id: 4,
          name: 'Bananas',
          price: 2.99,
          rating: 4.6,
          reviews: 112,
          image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
          description: 'Ripe and ready-to-eat bananas'
        }
      ]
    },
    2: {
      name: 'Fresh Vegetables',
      description: 'Farm-fresh vegetables for your daily needs',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      products: [
        {
          id: 5,
          name: 'Organic Tomatoes',
          price: 3.49,
          rating: 4.4,
          reviews: 112,
          image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
          description: 'Fresh and juicy tomatoes'
        },
        {
          id: 6,
          name: 'Fresh Carrots',
          price: 2.99,
          rating: 4.7,
          reviews: 156,
          image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
          description: 'Crunchy organic carrots'
        },
        {
          id: 7,
          name: 'Green Lettuce',
          price: 2.49,
          rating: 4.5,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f',
          description: 'Fresh and crispy lettuce'
        }
      ]
    },
    3: {
      name: 'Grocery Items',
      description: 'Essential grocery items for your pantry',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58',
      products: [
        {
          id: 8,
          name: 'Organic Rice',
          price: 8.99,
          rating: 4.6,
          reviews: 178,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
          description: 'Premium quality organic rice'
        },
        {
          id: 9,
          name: 'Whole Grain Pasta',
          price: 4.99,
          rating: 4.4,
          reviews: 134,
          image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1',
          description: 'Healthy whole grain pasta'
        }
      ]
    }
  };

  const category = categories[id] || {
    name: 'Category Not Found',
    description: 'The category you are looking for does not exist',
    products: []
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/90 text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FaFilter />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FaSort />
                Sort
              </button>
            </div>
            <p className="text-gray-600">
              Showing {category.products.length} products
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 m-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <FaShoppingCart className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {category.products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600">
              Try checking out our other categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
