import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaBox, FaShoppingBasket } from 'react-icons/fa';

const CategorySection = () => {
  const categories = useSelector((state) => state.category);
  const [hoveredId, setHoveredId] = useState(null);
  const categoryList = categories && categories.length > 0 ? categories[0] : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-blue-500/10 p-4 rounded-full"
            >
              <FaShoppingBasket className="w-8 h-8 text-blue-600" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Discover Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated selection of products and services
          </p>
        </motion.div>

        {categoryList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 bg-white rounded-3xl shadow-xl"
          >
            <FaBox className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">No categories available at the moment</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {categoryList.map((category) => (
              <motion.div
                key={category._id}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(category._id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative"
              >
                <Link to={`/category/${category._id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
                      
                      {/* Category Stats */}
                      <AnimatePresence>
                        {hoveredId === category._id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
                          >
                            <span className="text-sm font-medium text-gray-900">
                              {/* Assuming you have these properties */}
                              {category.itemCount || '20+'} Items
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content Container */}
                    <div className="relative p-6">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {category.description}
                        </p>
                        
                        {/* Action Button */}
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-blue-600 font-medium"
                        >
                          Explore Now
                          <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      </motion.div>

                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-sm">Scroll to explore more categories</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;