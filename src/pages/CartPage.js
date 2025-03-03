import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft, FaTruck, FaGift, FaPercent, FaHome, FaCarrot, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryApi from '../common';

// Dummy data for demonstration
const dummyCartItems = [
  // Vegetables and Fruits
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 2.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1546470427-f5c9439c4748",
    category: "vegetables",
    discount: 0.5,
    unit: "kg"
  },
  {
    id: 2,
    name: "Green Bell Peppers",
    price: 1.99,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    category: "vegetables",
    discount: 0,
    unit: "kg"
  },
  {
    id: 3,
    name: "Fresh Bananas",
    price: 3.49,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369",
    category: "fruits",
    discount: 0.75,
    unit: "dozen"
  },
  {
    id: 4,
    name: "Red Apples",
    price: 4.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    category: "fruits",
    discount: 1,
    unit: "kg"
  },
  // Real Estate Properties
  {
    id: 101,
    name: "Luxury Apartment Viewing",
    price: 50.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    category: "real-estate",
    discount: 0,
    propertyType: "Apartment",
    location: "Downtown",
    viewingDate: "2024-01-15",
    description: "Premium 2BHK apartment viewing slot"
  },
  {
    id: 102,
    name: "Villa Property Tour",
    price: 75.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    category: "real-estate",
    discount: 25,
    propertyType: "Villa",
    location: "Suburban Area",
    viewingDate: "2024-01-16",
    description: "Exclusive villa tour with agent"
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
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
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
      className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm p-6 mb-4 flex items-center hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="relative group">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg"></div>
      </div>
      <div className="ml-6 flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
        <p className="text-blue-600 font-medium text-lg">${item.price.toFixed(2)}</p>
        {item.category === 'real-estate' ? (
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p className="flex items-center">
              <FaHome className="mr-2 text-blue-500" />
              {item.propertyType} • {item.location}
            </p>
            <p className="flex items-center">
              <FaCalendar className="mr-2 text-blue-500" />
              Viewing on: {item.viewingDate}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-1">Per {item.unit}</p>
        )}
        {item.discount > 0 && (
          <p className="text-green-600 text-sm mt-2 flex items-center">
            <FaPercent className="mr-1 w-3 h-3" />
            Save ${item.discount}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end space-y-3">
        <div className="flex items-center space-x-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            <FaMinus className="w-3 h-3 text-blue-600" />
          </motion.button>
          <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            <FaPlus className="w-3 h-3 text-blue-600" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-600 text-sm flex items-center px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
        >
          <FaTrash className="w-3 h-3 mr-1.5" />
          Remove
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 mt-20">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 group bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </motion.button>

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-10 text-gray-800 flex items-center"
        >
          Your Cart
          {cartItems.length > 0 && (
            <span className="ml-4 text-sm font-normal text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <img 
              src="/empty-cart.svg" 
              alt="Empty Cart" 
              className="w-64 h-64 mx-auto mb-8 opacity-75"
            />
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Groceries Section */}
              {(groupedItems.vegetables || groupedItems.fruits) && (
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FaCarrot className="text-green-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Fresh Produce</h2>
                  </div>
                  <AnimatePresence>
                    {[...(groupedItems.vegetables || []), ...(groupedItems.fruits || [])].map(renderCartItem)}
                  </AnimatePresence>
                </div>
              )}

              {/* Real Estate Section */}
              {groupedItems['real-estate'] && (
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaHome className="text-blue-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Property Viewings</h2>
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
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl mt-6 flex items-center shadow-sm"
              >
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                  <FaTruck className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Estimated Delivery Time</p>
                  <p className="text-blue-700">
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
                className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 border border-gray-100"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>

                {/* Promo Code Input */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaGift className="text-blue-600 w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-800">Have a promo code?</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
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
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-xl text-gray-800">
                      <span>Total</span>
                      <span>${(totalAmount - discount + 5).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl mt-8 hover:shadow-lg transition-all flex items-center justify-center space-x-3 font-medium"
                >
                  <span>Proceed to Checkout</span>
                  <span className="bg-blue-500 bg-opacity-25 px-3 py-1 rounded-full text-sm">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </motion.button>

                <div className="mt-6">
                  {groupedItems['real-estate'] ? (
                    <p className="text-sm text-gray-500 flex items-center justify-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaHome className="mr-2 text-blue-500" />
                      Property viewing slots are subject to availability
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 flex items-center justify-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaTruck className="mr-2 text-blue-500" />
                      Free delivery on orders above $50
                    </p>
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
