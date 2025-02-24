import React, { useState } from 'react';

const LocationMessage = () => {
  const [isNotified, setIsNotified] = useState(false);

  const handleNotifyMe = () => {
    setIsNotified(true);
    setTimeout(() => {
      setIsNotified(false);
    }, 3000); // Reset notification after 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-50 to-blue-50 animate-gradient">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 transform transition-all hover:scale-105 hover:shadow-3xl">
        {/* Animated Icon */}
        <div className="mb-6 animate-float">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-purple-600"
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
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
          Oops! 🚫
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          We're not serving in your area yet. Stay tuned! We're expanding quickly and might be in your neighborhood soon.
        </p>


        {/* Decorative Sparkles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMessage;