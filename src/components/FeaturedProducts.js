import React, { useContext } from 'react';
import { FaStar, FaShoppingCart, FaHeart, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryApi from '../common';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { fetchUserAddToCart } = useContext(Context);
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Organic Apples',
      price: 399,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
      category: 'Fruits',
      description: 'Fresh and juicy organic apples, perfect for healthy snacking',
      brandName: 'Nature\'s Best',
      productImage: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6']
    },
    {
      id: 2,
      name: 'Premium Carrots',
      price: 249,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      category: 'Vegetables',
      description: 'Premium quality fresh carrots from local farms',
      brandName: 'Farm Fresh',
      productImage: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37']
    },
    {
      id: 3,
      name: 'Fresh Strawberries',
      price: 499,
      rating: 4.8,
      reviews: 143,
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
      category: 'Fruits',
      description: 'Sweet and juicy strawberries, freshly picked',
      brandName: 'Berry Good',
      productImage: ['https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2']
    },
    {
      id: 4,
      name: 'Organic Tomatoes',
      price: 299,
      rating: 4.4,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
      category: 'Vegetables',
      description: 'Organic tomatoes, perfect for salads and cooking',
      brandName: 'Green Earth',
      productImage: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337']
    }
  ];

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      const data = await response.json();

      if (data.status) {
        toast.success('Product added to cart!');
        fetchUserAddToCart();
        navigate(`/product/${product.id}`);
      } else {
        toast.error(data.message || 'Failed to add product to cart');
      }
    } catch (error) {
      toast.error('Error adding product to cart');
      console.error('Add to cart error:', error);
    }
  };

  const handleAddToFavorites = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to favorites');
      return;
    }

    try {
      const response = await fetch(SummaryApi.addToFavorites.url, {
        method: SummaryApi.addToFavorites.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product.id
        })
      });

      const data = await response.json();

      if (data.status) {
        toast.success('Product added to favorites!');
      } else {
        toast.error(data.message || 'Failed to add product to favorites');
      }
    } catch (error) {
      toast.error('Error adding product to favorites');
      console.error('Add to favorites error:', error);
    }
  };

  const navigateToProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-blue-50 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products, chosen for their exceptional quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateToProductDetails(product.id)}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80" />
                
                {/* Wishlist Button */}
                <div className="absolute top-4 right-4">
                  <button 
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                    onClick={(e) => handleAddToFavorites(e, product)}
                  >
                    <FaHeart className="text-gray-600 hover:text-red-500 w-5 h-5" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 flex items-center gap-2 shadow-lg">
                    <FaTag className="text-blue-500" />
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="w-5 h-5" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
