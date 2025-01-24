import React, { useContext } from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
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
        // Navigate to product details after adding to cart
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
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products, chosen for their exceptional quality and value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigateToProductDetails(product.id)}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-0 right-0 m-2 flex gap-2">
                <button 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleAddToFavorites(e, product)}
                >
                  <FaHeart className="text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <FaShoppingCart className="text-gray-600 hover:text-blue-500" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 m-2">
                <span className="px-2 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-700">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400">
                  <FaStar />
                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
