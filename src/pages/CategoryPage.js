import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaFilter, FaSort, FaSpinner, FaHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
// Import your cart action here
// import { addToCart } from '../store/cartSlice';

// Enhanced category data based on CategorySection
const categoryData = {
  'real-estate': {
    name: 'Real Estate',
    description: 'Find your dream property',
    color: 'blue',
    items: [
      {
        id: 1,
        name: 'Luxury Apartment',
        price: 250000,
        rating: 4.8,
        reviews: 15,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400',
        description: 'Modern 3BHK apartment with premium amenities',
        location: 'Downtown Area',
        features: ['24/7 Security', 'Swimming Pool', 'Gym', 'Parking'],
        area: '1800 sq ft'
      }
    ]
  },
  'vegetables': {
    name: 'Vegetables',
    description: 'Fresh & organic vegetables',
    color: 'green',
    items: [
      {
        id: 1,
        name: 'Organic Mixed Vegetables Pack',
        price: 29.99,
        rating: 4.5,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400',
        description: 'Fresh organic vegetables sourced directly from farms',
        weight: '5kg',
        organic: true,
        farmLocation: 'Local Organic Farms'
      }
    ]
  },
  'fruits': {
    name: 'Fruits',
    description: 'Fresh seasonal fruits',
    color: 'red',
    items: []
  },
  'footwear': {
    name: 'Footwear',
    description: 'Premium footwear collection',
    color: 'purple',
    items: []
  },
  'fashion-wears': {
    name: 'Fashion Wears',
    description: 'Trendy fashion for everyone',
    color: 'pink',
    items: []
  },
  'electronics': {
    name: 'Electronics',
    description: 'Latest gadgets & devices',
    color: 'yellow',
    items: []
  },
  'essential-products': {
    name: 'Essential Products',
    description: 'Daily necessities',
    color: 'orange',
    items: []
  },
  'b2b-business': {
    name: 'B2B Business',
    description: 'Business solutions',
    color: 'indigo',
    items: []
  }
};

// Generate category-specific dummy items
const generateDummyItems = (category) => {
  const items = [];
  const baseData = categoryData[category] || {
    name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'Category items',
    color: 'gray',
    items: []
  };

  for (let i = 1; i <= 5; i++) {
    const baseItem = {
      id: i,
      rating: 4 + Math.random() * 0.9,
      reviews: Math.floor(Math.random() * 200) + 50,
      image: `https://picsum.photos/400/300?random=${i}`,
    };

    switch(category) {
      case 'real-estate':
        items.push({
          ...baseItem,
          name: `${['Luxury', 'Modern', 'Cozy', 'Spacious', 'Premium'][i-1]} Property`,
          price: (200000 + i * 100000),
          description: `Beautiful ${i} bedroom property with amazing amenities`,
          location: ['Downtown', 'Suburb', 'Beach Front', 'City Center', 'Hill View'][i-1],
          features: ['24/7 Security', 'Swimming Pool', 'Gym', 'Parking'],
          area: `${1500 + i * 300} sq ft`
        });
        break;
      
      case 'vegetables':
      case 'fruits':
        items.push({
          ...baseItem,
          name: `Organic ${baseData.name} Pack ${i}`,
          price: 9.99 + i * 5,
          description: `Fresh and organic ${baseData.name.toLowerCase()}`,
          weight: `${i}kg`,
          organic: true,
          farmLocation: 'Local Organic Farms'
        });
        break;

      case 'footwear':
      case 'fashion-wears':
        items.push({
          ...baseItem,
          name: `${baseData.name} Item ${i}`,
          price: 49.99 + i * 20,
          description: `Stylish and comfortable ${baseData.name.toLowerCase()}`,
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Black', 'White', 'Blue', 'Red'],
          material: ['Cotton', 'Leather', 'Synthetic', 'Canvas', 'Wool'][i-1]
        });
        break;

      case 'electronics':
        items.push({
          ...baseItem,
          name: `${['Smart', 'Pro', 'Elite', 'Premium', 'Ultra'][i-1]} Device ${i}`,
          price: 199.99 + i * 100,
          description: 'High-performance electronic device',
          warranty: '1 Year',
          features: ['Wireless', 'Smart Connect', 'HD Display', 'Long Battery']
        });
        break;

      default:
        items.push({
          ...baseItem,
          name: `${baseData.name} Item ${i}`,
          price: 29.99 + i * 10,
          description: `Quality ${baseData.name.toLowerCase()} product`,
        });
    }
  }

  return { ...baseData, items };
};

const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filterPrice, setFilterPrice] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = generateDummyItems(id);
        if (!data) {
          throw new Error('Category not found');
        }
        
        setCategoryItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleAddToCart = (item) => {
    // Implement your cart logic here
    // dispatch(addToCart(item));
    // Show toast notification
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
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  };

  const filterItems = (items) => {
    if (!items || filterPrice === 'all') return items;
    const [min, max] = filterPrice.split('-').map(Number);
    return items.filter(item => item.price >= min && (!max || item.price <= max));
  };

  const getPriceRanges = () => {
    if (!categoryItems?.items.length) return [];
    const prices = categoryItems.items.map(item => item.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    const range = max - min;
    const step = range / 4;

    return [
      { value: `0-${min}`, label: `Under $${min.toLocaleString()}` },
      { value: `${min}-${min + step}`, label: `$${min.toLocaleString()} - $${(min + step).toLocaleString()}` },
      { value: `${min + step}-${min + 2 * step}`, label: `$${(min + step).toLocaleString()} - $${(min + 2 * step).toLocaleString()}` },
      { value: `${min + 2 * step}`, label: `Above $${(min + 2 * step).toLocaleString()}` }
    ];
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

  if (!categoryItems || !categoryItems.items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
        <p className="text-gray-600">No items found in this category</p>
      </div>
    );
  }

  const filteredAndSortedItems = sortItems(filterItems(categoryItems.items));

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryItems.name}</h1>
          <p className="text-xl text-gray-600">{categoryItems.description}</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-500" />
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              {getPriceRanges().map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              List
            </button>
          </div>
        </div>

        {/* Items Display */}
        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" :
          "space-y-6"
        }>
          <AnimatePresence>
            {filteredAndSortedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'pb-[66.67%]'}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`${viewMode === 'list' ? 'absolute w-full h-full object-cover' : 'absolute inset-0 w-full h-full object-cover'}`}
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => handleShare(item)}
                  >
                    <FaShare className="text-gray-600" />
                  </button>
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <button className="text-red-500 hover:text-red-600">
                      <FaHeart />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  {item.location && (
                    <div className="flex items-center text-gray-500 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  
                  {item.features && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${item.price.toLocaleString()}
                    </span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-gray-700">{item.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({item.reviews})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPage;
