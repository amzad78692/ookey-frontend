import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Real Estate',
      description: 'Find your perfect home with our extensive collection of premium properties',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
      color: 'from-blue-500/80 to-indigo-600/80'
    },
    {
      id: 2,
      name: 'Vegetables',
      description: 'Fresh, organic vegetables sourced directly from local farmers',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop&q=60',
      color: 'from-green-500/80 to-emerald-600/80'
    },
    {
      id: 3,
      name: 'Fruits',
      description: 'Seasonal and exotic fruits from around the world',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop&q=60',
      color: 'from-red-500/80 to-rose-600/80'
    },
    {
      id: 4,
      name: 'Footwear',
      description: 'Step out in style with our premium footwear collection',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60',
      color: 'from-purple-500/80 to-violet-600/80'
    },
    {
      id: 5,
      name: 'Fashion Wears',
      description: 'Latest fashion trends for every style and occasion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60',
      color: 'from-pink-500/80 to-fuchsia-600/80'
    },
    {
      id: 6,
      name: 'Electronics',
      description: 'Cutting-edge electronics and smart devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60',
      color: 'from-yellow-500/80 to-amber-600/80'
    },
    {
      id: 7,
      name: 'Essential Products',
      description: 'Quality everyday essentials for your daily needs',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60',
      color: 'from-orange-500/80 to-amber-600/80'
    },
    {
      id: 8,
      name: 'B2B Business',
      description: 'Comprehensive solutions for business growth',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60',
      color: 'from-indigo-500/80 to-violet-600/80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
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
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Shop By Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of products and services
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} mix-blend-multiply opacity-60`} />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 transition-transform duration-300"
                    >
                      {category.name}
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
      </div>
    </div>
  );
};

export default CategorySection;
