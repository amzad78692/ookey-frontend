import React, { useState } from 'react';
import { FiEye, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: '#ORD001',
      customer: 'John Doe',
      date: '2025-01-10',
      total: 125.50,
      status: 'Pending',
      items: [
        { id: 1, name: 'Fresh Apples', quantity: 2, price: 45.50 },
        { id: 2, name: 'Organic Carrots', quantity: 3, price: 80.00 }
      ],
      shipping: {
        address: '123 Main St, City, Country',
        method: 'Express Delivery'
      },
      payment: {
        method: 'Credit Card',
        status: 'Paid'
      }
    },
    {
      id: '#ORD002',
      customer: 'Jane Smith',
      date: '2025-01-09',
      total: 89.99,
      status: 'Shipped',
      items: [
        { id: 3, name: 'Fresh Oranges', quantity: 1, price: 89.99 }
      ],
      shipping: {
        address: '456 Oak St, City, Country',
        method: 'Standard Delivery'
      },
      payment: {
        method: 'PayPal',
        status: 'Paid'
      }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === 'All' || order.status === filterStatus;
    const searchMatch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View order details"
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Mark as shipped"
                        >
                          <FiTruck className="w-5 h-5" />
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                          className="text-green-600 hover:text-green-900"
                          title="Mark as delivered"
                        >
                          <FiCheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel order"
                        >
                          <FiXCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Order Details - {selectedOrder.id}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            
            <div className="space-y-4">
              {/* Customer & Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.customer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Order Date</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.date}</p>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Shipping Information</h4>
                <div className="mt-1 text-sm text-gray-900">
                  <p>{selectedOrder.shipping.address}</p>
                  <p className="mt-1">Method: {selectedOrder.shipping.method}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Order Items</h4>
                <div className="mt-2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="2" className="px-4 py-2 text-sm font-medium text-gray-900">Total</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Payment Information</h4>
                <div className="mt-1 text-sm text-gray-900">
                  <p>Method: {selectedOrder.payment.method}</p>
                  <p className="mt-1">Status: {selectedOrder.payment.status}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
