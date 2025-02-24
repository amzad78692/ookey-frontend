import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const CategorySection = () => {
  const categories = useSelector((state) => state.category);

  // Ensure categories[0] exists and is an array
  const categoryList = categories && categories.length > 0 ? categories[0] : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Shop By Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of products and services
          </p>
        </motion.div>

        {/* Check if categoryList is empty */}
        {categoryList.length === 0 ? (
          <p className="text-center text-gray-500">No categories available</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {categoryList.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link to={`/category/${category._id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} mix-blend-multiply opacity-60`} />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <motion.h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 transition-transform duration-300">
                        {category.title}
                      </motion.h3>
                      <p className="text-gray-200 text-sm transform group-hover:translate-y-0 transition-transform duration-300">
                        {category.description}
                      </p>
                      <div className="mt-4 flex items-center">
                        <span className="text-white text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                          Explore Category
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
