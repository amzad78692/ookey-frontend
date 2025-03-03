import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaArrowLeft, FaShoppingCart, FaHome, FaCarrot, FaLeaf, FaAppleAlt, FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, FaChevronDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Updated dummy data for Indian market
const dummyFavorites = [
  // Real Estate Properties
  {
    id: 1,
    name: "Premium Lake View Apartment",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    category: "real-estate",
    location: "Powai, Mumbai",
    beds: 3,
    baths: 2,
    area: "1,250 sq ft",
    type: "Apartment"
  },
  {
    id: 2,
    name: "Modern Family Villa",
    price: 15000000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    category: "real-estate",
    location: "Whitefield, Bangalore",
    beds: 4,
    baths: 3,
    area: "2,800 sq ft",
    type: "Villa"
  },
  // Vegetables
  {
    id: 3,
    name: "Fresh Organic Palak",
    price: 49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    category: "vegetables",
    unit: "250g",
    origin: "Local Farm",
    organic: true
  },
  {
    id: 4,
    name: "Premium Broccoli",
    price: 89,
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c",
    category: "vegetables",
    unit: "500g",
    origin: "Nashik Farms",
    organic: true
  },
  // Fruits
  {
    id: 5,
    name: "Alphonso Mangoes",
    price: 599,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
    category: "fruits",
    unit: "dozen",
    origin: "Ratnagiri",
    season: "Summer"
  },
  {
    id: 6,
    name: "Fresh Strawberries",
    price: 199,
    image: "https://images.unsplash.com/photo-1543528176-61b239494933",
    category: "fruits",
    unit: "box",
    origin: "Mahabaleshwar",
    organic: true
  }
];

// Memoized Card Components
const CardWrapper = memo(({ children }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-white/20 flex flex-col h-full"
  >
    {children}
  </motion.div>
));

const ImageSection = memo(({ item, onRemove, children }) => (
  <div className="relative group aspect-[4/3] overflow-hidden">
    <img 
      src={item.image} 
      alt={item.name}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
    <button
      onClick={() => onRemove(item.id)}
      className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3.5 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-110 group/btn z-10"
    >
      <FaHeart className="text-red-500 w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110" />
    </button>
    {children}
  </div>
));

// Memoized Property Card
const PropertyCard = memo(({ item, onRemove, onNavigate }) => (
  <CardWrapper>
    <ImageSection item={item} onRemove={onRemove}>
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-wrap gap-2 max-w-[90%]">
        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-2 shadow-lg">
          <FaHome className="text-blue-600 shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
          {item.type}
        </span>
        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/95 backdrop-blur-xl rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-lg">
          <FaMapMarkerAlt className="shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
          {item.location.split(',')[0]}
        </span>
      </div>
    </ImageSection>
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight line-clamp-2">{item.name}</h3>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FaRupeeSign className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <p className="text-xl sm:text-2xl font-bold text-blue-600">{(item.price/100000).toFixed(1)} <span className="text-sm sm:text-base font-semibold">Lac</span></p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-6 bg-gray-50/80 rounded-lg sm:rounded-xl p-2 sm:p-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaBed className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          <span className="text-gray-700 font-medium text-xs sm:text-sm">{item.beds}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaBath className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          <span className="text-gray-700 font-medium text-xs sm:text-sm">{item.baths}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FaRulerCombined className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          <span className="text-gray-700 font-medium text-xs sm:text-sm truncate">{item.area}</span>
        </div>
      </div>
      <button
        onClick={() => onNavigate('/property/' + item.id)}
        className="w-full mt-auto bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3"
      >
        View Details
        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></span>
      </button>
    </div>
  </CardWrapper>
));

// Memoized Grocery Card
const GroceryCard = memo(({ item, onRemove, onAddToCart }) => (
  <CardWrapper>
    <ImageSection item={item} onRemove={onRemove}>
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-wrap gap-2 max-w-[90%]">
        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 ${item.category === 'vegetables' ? 'bg-green-600/95' : 'bg-red-600/95'} backdrop-blur-xl rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-lg`}>
          {item.category === 'vegetables' ? <FaCarrot className="shrink-0 w-3 h-3 sm:w-4 sm:h-4" /> : <FaAppleAlt className="shrink-0 w-3 h-3 sm:w-4 sm:h-4" />}
          {item.category === 'vegetables' ? 'Vegetable' : 'Fruit'}
        </span>
        {item.organic && (
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600/95 backdrop-blur-xl rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-lg">
            <FaLeaf className="shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
            Organic
          </span>
        )}
      </div>
    </ImageSection>
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight line-clamp-2">{item.name}</h3>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FaRupeeSign className="text-emerald-600 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <p className="text-xl sm:text-2xl font-bold text-emerald-600">{item.price} <span className="text-sm sm:text-base font-semibold text-gray-600">/ {item.unit}</span></p>
      </div>
      <div className="bg-gray-50/80 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <FaMapMarkerAlt className="text-gray-500 shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-gray-700 font-medium text-xs sm:text-sm">{item.origin}</span>
        </div>
        {item.season && (
          <div className="text-xs sm:text-sm text-gray-600">
            Best Season: <span className="font-semibold text-gray-800">{item.season}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => onAddToCart(item)}
        className="w-full mt-auto bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-emerald-700 hover:via-emerald-800 hover:to-green-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3"
      >
        <FaShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        Add to Cart
        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></span>
      </button>
    </div>
  </CardWrapper>
));

// Memoized Category Dropdown
const CategoryDropdown = memo(({ categories, activeCategory, onSelect, isOpen, onToggle, Icon }) => (
  <div className="relative mb-6 sm:mb-8">
    <button
      onClick={onToggle}
      className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-sm sm:text-base font-semibold text-gray-700">
          {categories.find(cat => cat.id === activeCategory)?.name || 'All Items'}
        </span>
      </div>
      <FaChevronDown 
        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-100/50 z-50 overflow-hidden"
        >
          <div className="py-2">
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => onSelect(category.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm sm:text-base transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CategoryIcon className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const categories = useMemo(() => [
    { id: 'all', name: 'All Items', icon: FaHeart },
    { id: 'real-estate', name: 'Properties', icon: FaHome },
    { id: 'vegetables', name: 'Vegetables', icon: FaCarrot },
    { id: 'fruits', name: 'Fruits', icon: FaAppleAlt }
  ], []);

  const filteredFavorites = useMemo(() => 
    activeCategory === 'all' 
      ? favorites 
      : favorites.filter(item => item.category === activeCategory),
    [favorites, activeCategory]
  );

  const selectedCategory = useMemo(() => 
    categories.find(cat => cat.id === activeCategory),
    [categories, activeCategory]
  );

  const Icon = selectedCategory?.icon || FaHeart;

  const removeFromFavorites = useCallback((itemId) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
    toast.success('Removed from favorites');
  }, []);

  const addToCart = useCallback((item) => {
    toast.success('Added to cart successfully');
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setIsDropdownOpen(false);
  }, []);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden bg-[#fafafa]">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-purple-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-[30rem] h-[30rem] bg-pink-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-blue-600 group bg-white/90 backdrop-blur-xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center sm:text-right">
            My Favorites
          </h1>
        </div>

        <CategoryDropdown
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          Icon={Icon}
        />

        {filteredFavorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl"
          >
            <FaHeart className="w-16 sm:w-20 h-16 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">No favorites yet</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Start adding items to your favorites!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base inline-flex items-center gap-3"
            >
              Browse Items
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredFavorites.map(item => (
                <div key={item.id} className="h-full">
                  {item.category === 'real-estate' 
                    ? <PropertyCard 
                        item={item} 
                        onRemove={removeFromFavorites}
                        onNavigate={handleNavigate}
                      />
                    : <GroceryCard 
                        item={item} 
                        onRemove={removeFromFavorites}
                        onAddToCart={addToCart}
                      />
                  }
                </div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
