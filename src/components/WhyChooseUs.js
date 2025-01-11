import React from 'react';
import { FaTruck, FaLeaf, FaShieldAlt, FaClock } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaTruck className="w-8 h-8 text-blue-600" />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered to your doorstep quickly and efficiently'
    },
    {
      icon: <FaLeaf className="w-8 h-8 text-green-600" />,
      title: 'Fresh & Organic',
      description: 'We source only the freshest and most organic products for you'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-purple-600" />,
      title: 'Secure Shopping',
      description: 'Your transactions are protected with advanced security measures'
    },
    {
      icon: <FaClock className="w-8 h-8 text-orange-600" />,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to help you'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're committed to providing the best shopping experience with quality products and excellent service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-gray-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-gray-400 w-6 h-6" />
            <span className="text-gray-600">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTruck className="text-gray-400 w-6 h-6" />
            <span className="text-gray-600">Express Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLeaf className="text-gray-400 w-6 h-6" />
            <span className="text-gray-600">Quality Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
