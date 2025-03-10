import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaFilter, FaSort, FaSpinner, FaHeart, FaShare, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

        const response = await fetch(`${SummaryApi.getProducts.url}?category_id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(id, data);

        setCategoryList(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
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

  const ProductCard = ({ item, onAddToCart, onShare }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    };

    const prevImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    const discountedPrice = item.price - (item.price * (item.discount / 100));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          {/* Product Image Carousel */}
          <div className="relative h-72 overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={item.images[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Image Navigation Buttons */}
            {item.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4"
              >
                <button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
                >
                  <FaChevronLeft className="text-gray-800 text-sm" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
                >
                  <FaChevronRight className="text-gray-800 text-sm" />
                </button>
              </motion.div>
            )}

            {/* Image Indicators */}
            {item.images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 transform ${
                      currentImageIndex === index 
                        ? 'bg-white scale-125 w-3'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Discount Badge */}
            {item.discount > 0 && (
              <div className="absolute top-4 left-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
                >
                  {item.discount}% OFF
                </motion.div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(item);
                }}
                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <FaShare className="text-gray-700 text-sm" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <FaHeart className="text-gray-700 text-sm" />
              </motion.button>
            </div>

            {/* Stock Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4"
            >
              {item.stock < 10 ? (
                <div className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  Only {item.stock} left
                </div>
              ) : (
                <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  In Stock
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="p-6">
            {/* Title and Description */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {item.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  ₹{discountedPrice.toLocaleString()}
                </span>
                {item.discount > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{item.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddToCart(item)}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-3.5 px-4 rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-xl"
            >
              <FaShoppingCart className="text-sm" />
              Add to Cart
            </motion.button>

            {/* Additional Info */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  <FaStar className="text-yellow-400" />
                  <span>Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

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
            <ProductCard
              key={item._id}
              item={item}
              onAddToCart={handleAddToCart}
              onShare={handleShare}
            />
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
