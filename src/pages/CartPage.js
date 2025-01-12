import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft, FaTruck, FaGift, FaPercent, FaHome, FaCarrot } from 'react-icons/fa';
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

  // Animation variants
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
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
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
      className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center hover:shadow-md transition-shadow"
    >
      <div className="relative group">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg"></div>
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        {item.category === 'real-estate' ? (
          <div className="text-sm text-gray-500">
            <p>{item.propertyType} • {item.location}</p>
            <p>Viewing on: {item.viewingDate}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Per {item.unit}</p>
        )}
        {item.discount > 0 && (
          <p className="text-green-600 text-sm">Save ${item.discount}</p>
        )}
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            <FaMinus className="w-3 h-3 text-gray-600" />
          </motion.button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            <FaPlus className="w-3 h-3 text-gray-600" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-600 text-sm flex items-center"
        >
          <FaTrash className="w-3 h-3 mr-1" />
          Remove
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Continue Shopping
      </button>

      <h1 className="text-2xl font-bold mb-8 flex items-center">
        Your Cart
        {cartItems.length > 0 && (
          <span className="ml-3 text-sm font-normal text-gray-500">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        )}
      </h1>
      
      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <img 
            src="/empty-cart.svg" 
            alt="Empty Cart" 
            className="w-48 h-48 mx-auto mb-6"
          />
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add items to get started</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
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
                <div className="flex items-center mb-4">
                  <FaCarrot className="text-green-500 mr-2" />
                  <h2 className="text-xl font-semibold">Fresh Produce</h2>
                </div>
                {[...(groupedItems.vegetables || []), ...(groupedItems.fruits || [])].map(renderCartItem)}
              </div>
            )}

            {/* Real Estate Section */}
            {groupedItems['real-estate'] && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <FaHome className="text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold">Property Viewings</h2>
                </div>
                {groupedItems['real-estate'].map(renderCartItem)}
              </div>
            )}

            {/* Delivery Time Estimate */}
            <div className="bg-blue-50 p-4 rounded-lg mt-6 flex items-center">
              <FaTruck className="text-blue-600 w-5 h-5 mr-3" />
              <div>
                <p className="font-medium text-blue-900">Estimated Delivery Time</p>
                <p className="text-blue-700 text-sm">
                  {groupedItems['real-estate'] 
                    ? 'Property viewing slots will be confirmed via email'
                    : `${deliveryTime} minutes for grocery delivery`}
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Promo Code Input */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaGift className="text-blue-600" />
                  <span className="font-medium">Have a promo code?</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={isApplyingPromo}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isApplyingPromo ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Try 'FIRST10' for 10% off your first order!
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(totalAmount - discount + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-full mt-6 hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <span className="text-sm">({cartItems.length} items)</span>
              </motion.button>

              <div className="mt-6">
                {groupedItems['real-estate'] ? (
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <FaHome className="mr-2" />
                    Property viewing slots are subject to availability
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <FaTruck className="mr-2" />
                    Free delivery on orders above $50
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
