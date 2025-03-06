import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft, FaTruck, FaGift, FaPercent, FaHome, FaCarrot, FaCalendar, FaShoppingBag, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryApi from '../common';

// Dummy data for demonstration
const dummyCartItems = [
  // Vegetables and Fruits
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 49.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1546470427-f5c9439c4748",
    category: "vegetables",
    discount: 10,
    unit: "kg",
    seller: "Fresh Farm Produce"
  },
  {
    id: 2,
    name: "Green Bell Peppers",
    price: 39.99,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    category: "vegetables",
    discount: 0,
    unit: "kg",
    seller: "Organic Valley"
  },
  {
    id: 3,
    name: "Fresh Bananas",
    price: 69.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369",
    category: "fruits",
    discount: 15,
    unit: "dozen",
    seller: "Fresh Farm Produce"
  },
  {
    id: 4,
    name: "Kashmiri Red Apples",
    price: 149.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    category: "fruits",
    discount: 20,
    unit: "kg",
    seller: "Himalayan Fruits"
  },
  // Real Estate Properties
  {
    id: 101,
    name: "3 BHK Luxury Apartment Viewing",
    price: 1000.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    category: "real-estate",
    discount: 0,
    propertyType: "Apartment",
    location: "Whitefield, Bangalore",
    viewingDate: "2024-01-15",
    description: "Premium 3BHK apartment viewing slot",
    seller: "Prestige Group"
  },
  {
    id: 102,
    name: "Villa Property Tour",
    price: 1500.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    category: "real-estate",
    discount: 500,
    propertyType: "Villa",
    location: "Electronic City, Bangalore",
    viewingDate: "2024-01-16",
    description: "Exclusive villa tour with agent",
    seller: "Godrej Properties"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(dummyCartItems); // Using dummy data
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('30-45');
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  // Group items by category
  const groupedItems = cartItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalAmount(subtotal);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    toast.success('Cart updated successfully');
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    toast.success('Item removed from cart');
  };

  const applyPromoCode = () => {
    setIsApplyingPromo(true);
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'first10') {
        const discountAmount = totalAmount * 0.1;
        setDiscount(discountAmount);
        toast.success('10% discount applied successfully!');
      } else {
        toast.error('Invalid promo code');
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  useEffect(() => {
    calculateTotal(cartItems);
  }, []);

  const renderCartItem = (item) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-2xl shadow-sm p-6 mb-4 flex items-center hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-500"
          />
          {item.discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -₹{item.discount}
            </div>
          )}
        </div>
      </div>
      <div className="ml-8 flex-grow relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{item.name}</h3>
            <p className="text-sm text-gray-500">Sold by: {item.seller}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">₹{item.price.toFixed(2)}</span>
          </div>
        </div>
        {item.category === 'real-estate' ? (
          <div className="space-y-2 mt-3">
            <p className="flex items-center text-gray-600">
              <FaHome className="mr-2 text-blue-500" />
              <span className="font-medium">{item.propertyType}</span>
              <span className="mx-2">•</span>
              <span>{item.location}</span>
            </p>
            <p className="flex items-center text-gray-600">
              <FaCalendar className="mr-2 text-blue-500" />
              Viewing on: <span className="font-medium ml-1">{item.viewingDate}</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-3 mt-1">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Per {item.unit}
            </span>
            {item.discount > 0 && (
              <span className="text-green-600 text-sm flex items-center">
                <FaPercent className="w-3 h-3 mr-1" />
                {Math.round((item.discount / item.price) * 100)}% off
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1 shadow-sm border border-gray-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaMinus className="w-3 h-3 text-blue-600" />
              </motion.button>
              <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaPlus className="w-3 h-3 text-blue-600" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-600 text-sm flex items-center px-4 py-2 rounded-full hover:bg-red-50 transition-colors border border-red-200 hover:border-red-300"
            >
              <FaTrash className="w-3 h-3 mr-1.5" />
              Remove
            </motion.button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-800">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div className="flex items-center space-x-8">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 group bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </motion.button>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center">
              Shopping Cart
              {cartItems.length > 0 && (
                <span className="ml-4 text-sm font-normal text-white bg-blue-600 px-4 py-1 rounded-full shadow-md">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
          </div>
        </motion.div>
        
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="max-w-md mx-auto">
              <FaShoppingBag className="w-24 h-24 mx-auto text-blue-100 mb-8" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-lg">Start adding items to your cart and they will appear here</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium"
              >
                Start Shopping
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Groceries Section */}
              {(groupedItems.vegetables || groupedItems.fruits) && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                      <FaCarrot className="text-green-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Fresh Produce</h2>
                  </div>
                  <AnimatePresence>
                    {[...(groupedItems.vegetables || []), ...(groupedItems.fruits || [])].map(renderCartItem)}
                  </AnimatePresence>
                </div>
              )}

              {/* Real Estate Section */}
              {groupedItems['real-estate'] && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <FaHome className="text-blue-600 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Property Viewings</h2>
                  </div>
                  <AnimatePresence>
                    {groupedItems['real-estate'].map(renderCartItem)}
                  </AnimatePresence>
                </div>
              )}

              {/* Delivery Time Estimate */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl mt-6 flex items-center shadow-lg text-white"
              >
                <div className="bg-white/20 p-4 rounded-xl mr-6">
                  <FaTruck className="text-white w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-xl mb-2">Estimated Delivery Time</p>
                  <p className="text-blue-100 text-lg">
                    {groupedItems['real-estate'] 
                      ? 'Property viewing slots will be confirmed via email'
                      : `${deliveryTime} minutes for grocery delivery`}
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 border border-gray-100"
              >
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Order Summary</h2>

                {/* Promo Code Input */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl">
                      <FaGift className="text-blue-600 w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-800 text-lg">Have a promo code?</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium"
                    >
                      {isApplyingPromo ? 'Applying...' : 'Apply'}
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <FaPercent className="w-3 h-3 mr-1" />
                    Try 'FIRST10' for 10% off your first order!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 text-lg">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>Delivery Fee</span>
                    <span className="font-medium">₹49.00</span>
                  </div>
                  <div className="border-t-2 border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-2xl text-gray-800">
                      <span>Total</span>
                      <span>₹{(totalAmount - discount + 49).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Including GST</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl mt-8 hover:shadow-lg transition-all flex items-center justify-center space-x-3 font-medium text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    <FaLock className="w-4 h-4 mr-2" />
                    Proceed to Pay
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm relative z-10">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <div className="mt-6">
                  {groupedItems['real-estate'] ? (
                    <div className="bg-gray-50 rounded-xl p-4 flex items-start space-x-3">
                      <FaHome className="text-blue-500 w-5 h-5 mt-0.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Property viewing slots are subject to availability. We'll confirm your booking via email/WhatsApp within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4 flex items-start space-x-3">
                      <FaTruck className="text-blue-500 w-5 h-5 mt-0.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Free delivery on orders above ₹999. Standard delivery fee of ₹49 applies for orders below ₹999.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
