import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      price: 4.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
      category: 'Fruits'
    },
    {
      id: 2,
      name: 'Premium Carrots',
      price: 2.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      category: 'Vegetables'
    },
    {
      id: 3,
      name: 'Fresh Strawberries',
      price: 5.99,
      rating: 4.8,
      reviews: 143,
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
      category: 'Fruits'
    },
    {
      id: 4,
      name: 'Organic Tomatoes',
      price: 3.49,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
      category: 'Vegetables'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products, chosen for their exceptional quality and value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-0 right-0 m-2">
                <button 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart functionality will be added later
                  }}
                >
                  <FaShoppingCart className="text-gray-600" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 m-2">
                <span className="px-2 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-700">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>

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
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart functionality will be added later
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
