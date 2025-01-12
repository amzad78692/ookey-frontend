import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaArrowLeft, FaShoppingCart, FaHome, FaCarrot, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Dummy favorite items for demonstration
const dummyFavorites = [
  // Real Estate Properties
  {
    id: 1,
    name: "Luxury Waterfront Apartment",
    price: 450000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    category: "real-estate",
    location: "Downtown",
    beds: 3,
    baths: 2,
    area: "2,100 sq ft",
    type: "Apartment"
  },
  {
    id: 2,
    name: "Modern Family Villa",
    price: 750000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    category: "real-estate",
    location: "Suburban Area",
    beds: 4,
    baths: 3,
    area: "3,500 sq ft",
    type: "Villa"
  },
  // Vegetables
  {
    id: 3,
    name: "Organic Baby Spinach",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    category: "vegetables",
    unit: "bunch",
    origin: "Local Farm",
    organic: true
  },
  {
    id: 4,
    name: "Fresh Broccoli",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c",
    category: "vegetables",
    unit: "head",
    origin: "Organic Valley",
    organic: true
  },
  // Fruits
  {
    id: 5,
    name: "Sweet Mangoes",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
    category: "fruits",
    unit: "kg",
    origin: "Imported",
    season: "Summer"
  },
  {
    id: 6,
    name: "Fresh Strawberries",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1543528176-61b239494933",
    category: "fruits",
    unit: "box",
    origin: "Local Farm",
    organic: true
  }
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Items', icon: FaHeart },
    { id: 'real-estate', name: 'Properties', icon: FaHome },
    { id: 'vegetables', name: 'Vegetables', icon: FaCarrot },
    { id: 'fruits', name: 'Fruits', icon: FaCarrot }
  ];

  const filteredFavorites = activeCategory === 'all' 
    ? favorites 
    : favorites.filter(item => item.category === activeCategory);

  const removeFromFavorites = (itemId) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
    toast.success('Removed from favorites');
  };

  const addToCart = (item) => {
    // Here you would typically make an API call to add to cart
    toast.success('Added to cart successfully');
  };

  const renderPropertyCard = (item) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => removeFromFavorites(item.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
        >
          <FaHeart className="text-red-500 w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">${item.price.toLocaleString()}</p>
        <div className="text-sm text-gray-500 mb-3">
          <p>{item.location}</p>
          <p>{item.beds} beds • {item.baths} baths • {item.area}</p>
        </div>
        <button
          onClick={() => navigate('/property/' + item.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );

  const renderGroceryCard = (item) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => removeFromFavorites(item.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
        >
          <FaHeart className="text-red-500 w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">${item.price} per {item.unit}</p>
        <div className="text-sm text-gray-500 mb-3">
          <p>{item.origin}</p>
          {item.organic && <p className="text-green-600">Organic</p>}
          {item.season && <p>Best in {item.season}</p>}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(item)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="mr-2 w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-16">
          <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-600 mb-8">Start adding items to your favorites!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Browse Items
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map(item => (
              item.category === 'real-estate' 
                ? renderPropertyCard(item)
                : renderGroceryCard(item)
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FavoritesPage;
