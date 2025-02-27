import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationService from "./LocationService";
import logo from '../assest/ookey.jpeg';

const LocationMessage = () => {
  const [isOpened, setIsOpened] = useState(false); // State to manage modal open/close

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 animate-gradient mt-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 relative overflow-hidden border border-gray-100"
      >
        {/* Header with Logo and Subtitle */}
        <div className="text-center mb-6">
          <motion.img
            src={logo} // Replace with your logo URL
            alt="Logo"
            className="h-20 w-20 mx-auto mb-4 rounded-full border-4 border-green-100 shadow-md"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-gray-600 text-lg font-medium">
            Ookey hai! Sab Ok hai! 😊
          </p>
        </div>

        {/* Animated Icon */}
        <motion.div
          className="mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! 🚫
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          We're not serving in your area yet. Stay tuned! We're expanding quickly and might be in your neighborhood soon.
        </p>

        {/* Change Location Link */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpened(true)} // Open the modal
          className="w-full bg-gradient-to-r from-green-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-md"
        >
          Change your location
        </motion.button>

        {/* Decorative Sparkles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></motion.div>
          ))}
        </div>
      </motion.div>

      {/* LocationService Modal */}
      <LocationService
        isOpen={isOpened} // Pass the state to control modal open/close
        onClose={() => setIsOpened(false)} // Close the modal
      />
    </div>
  );
};

export default LocationMessage;