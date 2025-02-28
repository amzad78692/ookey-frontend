import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingCart, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const CategoryWiseProductDisplay = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      id: 1,
      name: 'Fresh Fruits',
      description: 'Handpicked fresh fruits from local farms',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      backgroundColor: 'from-orange-500/10 to-yellow-500/10',
      products: [
        {
          id: 1,
          name: 'Organic Apples',
          price: 4.99,
          rating: 4.5,
          reviews: 128,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
          discount: 10,
          unit: 'kg'
        },
        {
          id: 2,
          name: 'Fresh Oranges',
          price: 3.99,
          rating: 4.3,
          reviews: 95,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
          discount: 15,
          unit: 'kg'
        },
        {
          id: 3,
          name: 'Strawberries',
          price: 5.99,
          rating: 4.7,
          reviews: 156,
          image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
          discount: 20,
          unit: 'box'
        }
      ]
    },
    // ... other categories with similar enhanced data structure
  ];

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setLoading(false), 1000);
    
    // Load liked products from localStorage
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      setLikedProducts(JSON.parse(savedLikes));
    }
    
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newLikes = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      localStorage.setItem('likedProducts', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      toast.success(`${product.name} added to cart!`);
      return newCart;
    });
  };

  const ProductCard = ({ product, categoryColor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full text-gray-800 hover:text-blue-600 shadow-lg"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full text-gray-800 hover:text-red-500 shadow-lg"
              onClick={() => toggleLike(product.id)}
            >
              {likedProducts.includes(product.id) ? (
                <FaHeart className="h-5 w-5 text-red-500" />
              ) : (
                <FaRegHeart className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-2">
          <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center mt-1 space-x-1">
            <FaStar className="text-yellow-400 h-4 w-4" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">per {product.unit}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fresh Picks for You
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover quality products from our curated categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Category Card */}
              <div className={`bg-gradient-to-br ${category.backgroundColor} p-1 rounded-3xl shadow-xl`}>
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Category Header */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h3 className="text-3xl font-bold text-white mb-3">
                            {category.name}
                          </h3>
                          <p className="text-white/90 text-lg">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Products Grid */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {category.products.map(product => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          categoryColor={category.backgroundColor}
                        />
                      ))}
                    </div>

                    {/* View All Link */}
                    <motion.div 
                      className="mt-12 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        to={`/categories/${category.id}`}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Explore All {category.name}
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;