import React from 'react'

const Orders = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <p className="text-gray-600">No orders found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
