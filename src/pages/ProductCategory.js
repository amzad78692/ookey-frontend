import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ProductCategory = () => {
  const location = useLocation();
  const { category, searchQuery } = location.state || {};
  const { categories, setCategories } = useState([]);

  // Static product data
  const products = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      category: 'fruits',
      price: 4.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
      description: 'Sweet and crispy organic apples, perfect for healthy snacking.'
    },
    {
      id: 2,
      name: 'Ripe Bananas',
      category: 'fruits',
      price: 3.99,
      rating: 4.3,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
      description: 'Fresh bananas rich in potassium and natural sweetness.'
    },
    {
      id: 3,
      name: 'Fresh Carrots',
      category: 'vegetables',
      price: 2.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      description: 'Organic carrots, perfect for salads and cooking.'
    },
    {
      id: 4,
      name: 'Organic Tomatoes',
      category: 'vegetables',
      price: 3.49,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
      description: 'Juicy tomatoes grown without pesticides.'
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
      description: 'Fresh and crispy spinach leaves.'
    },
    {
      id: 6,
      name: 'Organic Oranges',
      category: 'fruits',
      price: 5.99,
      rating: 4.8,
      reviews: 143,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
      description: 'Sweet and juicy oranges packed with vitamin C.'
    }
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || category.toLowerCase() === 'produce' || product.category.toLowerCase().includes(category.toLowerCase());
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // const fetchCategories = async () => {
  //   try {
  //     console.log('first')
  //     const response = await fetch(SummaryApi.getCategories.url, {
  //       method: SummaryApi.getCategories.method,
  //       credentials: 'include'
  //     });
  //     const data = await response.json();
  //     if (data.status) {
  //       console.log(data.data)
  //       setCategories(data.data);
  //     }
  //   } catch (error) {
  //     toast.error('Failed to fetch categories');
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2">
              Search results for: "{searchQuery}"
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 m-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <FaShoppingCart className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price and Add to Cart */}
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

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search or category filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
