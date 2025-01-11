import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter subscription will be handled later
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest products, exclusive offers, and healthy living tips. Join our community today!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe
              <FaPaperPlane />
            </button>
          </form>

          <p className="text-blue-200 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
