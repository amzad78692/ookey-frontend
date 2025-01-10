import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-green-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-green-100 mb-8">
            Get the latest updates about new products, properties, and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
