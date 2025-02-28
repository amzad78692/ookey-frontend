import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationService from "./LocationService";
import logo from '../assest/ookey.jpeg';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const LocationMessage = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-50 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-lg w-full mx-4 relative overflow-hidden"
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo Section */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.img
              src={logo}
              alt="Ookey Logo"
              className="h-24 w-24 mx-auto rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <h2 className="text-2xl font-bold text-gray-800">Ookey</h2>
              <p className="text-green-600 font-medium">Ookey hai! Sab Ok hai! 😊</p>
            </motion.div>
          </motion.div>

          {/* Location Icon */}
          <motion.div
            className="mb-8"
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
              <FaMapMarkerAlt className="h-16 w-16 mx-auto text-green-600 relative z-10" />
            </div>
          </motion.div>

          {/* Message Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              We're Coming Soon!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              We're expanding rapidly across India. Be the first to know when we arrive in your neighborhood!
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <button
                onClick={() => setIsOpened(true)}
                className="group w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <span>Change Location</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => window.history.back()}
                className="w-full py-4 px-6 rounded-2xl font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
              >
                Go Back
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Location Service Modal */}
      <AnimatePresence>
        {isOpened && (
          <LocationService
            isOpen={isOpened}
            onClose={() => setIsOpened(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationMessage;