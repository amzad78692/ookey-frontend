import React, { useState, useEffect } from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaFilter, FaSort, FaSpinner, FaHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = useSelector((state) => state.category);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(SummaryApi.getProducts.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        
        const data = await response.json();
        console.log(id,data)
        const categoryWiseData = data.data.filter(product => product.category_id === id)
        setCategoryList(categoryWiseData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href,
      });
    }
  };

  const sortItems = (items) => {
    if (!items) return [];
    const sorted = [...items];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const filteredItems = categoryList.filter(item => selectedCategory === 'all' ? true : item.category === selectedCategory);
  const sortedItems = sortItems(filteredItems);
  console.log(sortedItems)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative mt-16 overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="py-10 md:py-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  Discover Our <span className="text-yellow-300">Premium</span> Collection
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Explore our handpicked selection of high-quality products crafted just for you
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-4 backdrop-blur-lg bg-opacity-90">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <FaSort className="mr-2 text-blue-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* <div className="flex items-center">
                <FaFilter className="mr-2 text-blue-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const categoryId = e.target.value;
                    setSelectedCategory(categoryId);
                    navigate(`/category/${categoryId}`); // Redirect to the selected category
                  }}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {Array.isArray(categories[0]) &&
                    categories[0].map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                </select>
              </div> */}

              <div className="flex-grow md:text-right">
                <span className="text-gray-500">
                  Showing {sortedItems.length} products
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Product Image Placeholder with Gradient */}
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(item)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaShare className="text-gray-600 text-sm" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaHeart className="text-gray-600 text-sm" />
                    </motion.button>
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute bottom-4 left-4">
                    {item.stock < 10 ? (
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Only {item.stock} left
                      </div>
                    ) : (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        In Stock
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  {/* Title and Description */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{(item.price).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
                  >
                    <FaShoppingCart className="text-sm" />
                    Add to Cart
                  </motion.button>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>Fast Delivery</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>Top Rated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <FaShoppingCart className="inline-block text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
