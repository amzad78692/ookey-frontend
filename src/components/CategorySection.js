import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaShoppingBasket, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const CategorySection = () => {
  const categories = useSelector((state) => state.category);
  const categoryList = categories && categories[0] ? categories[0] : [];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-blue-50 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full animate-bounce shadow-lg shadow-blue-500/30">
              <FaShoppingBasket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Discover Our Categories
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of products and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          {categoryList.map((category) => (
            <div 
              key={category._id} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 flex items-center gap-2 shadow-lg">
                    <FaMapMarkerAlt className="text-blue-500" />
                    {category.pincodes?.length || 0} Locations
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 flex items-center gap-2 shadow-lg">
                    <FaClock className="text-purple-500" />
                    24/7 Available
                  </span>
                </div>
              </div>
              
              <div className="p-8 relative">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-8 line-clamp-2 text-lg leading-relaxed">
                  {category.description}
                </p>
                <Link 
                  to={`/category/${category._id}`}
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors text-lg bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-all duration-300"
                >
                  Explore Category
                  <FaArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-3 text-gray-600 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-gray-100">
            <span className="text-base font-medium">Scroll to explore more categories</span>
            <div className="animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;