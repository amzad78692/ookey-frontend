import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RealEstateManagement = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Apartment',
      type: 'Apartment',
      price: 250000,
      location: 'Downtown',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      description: 'Beautiful modern apartment in prime location',
      inquiries: [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', message: 'Interested in viewing', status: 'Pending' }
      ]
    },
    {
      id: 2,
      title: 'Family House',
      type: 'House',
      price: 450000,
      location: 'Suburbs',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      description: 'Spacious family house with garden',
      inquiries: []
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    price: '',
    location: '',
    status: 'Available',
    image: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProperty) {
      setProperties(prev => prev.map(property => 
        property.id === selectedProperty.id 
          ? { ...formData, id: property.id, inquiries: property.inquiries }
          : property
      ));
      toast.success('Property updated successfully!');
    } else {
      setProperties(prev => [...prev, { ...formData, id: Date.now(), inquiries: [] }]);
      toast.success('Property added successfully!');
    }
    handleCloseModal();
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setFormData(property);
    setShowModal(true);
  };

  const handleDelete = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property.id !== propertyId));
      toast.success('Property deleted successfully!');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
    setFormData({
      title: '',
      type: '',
      price: '',
      location: '',
      status: 'Available',
      image: '',
      description: ''
    });
  };

  const handleViewInquiries = (property) => {
    setSelectedProperty(property);
    setShowInquiryModal(true);
  };

  const handleInquiryStatusChange = (propertyId, inquiryId, newStatus) => {
    setProperties(prev => prev.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          inquiries: property.inquiries.map(inquiry => 
            inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
          )
        };
      }
      return property;
    }));
    toast.success('Inquiry status updated!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Real Estate Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          Add Property
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-900">${property.price.toLocaleString()}</p>
              <p className="mt-2 text-sm text-gray-600">{property.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(property)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleViewInquiries(property)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View Inquiries ({property.inquiries.length})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Property Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedProperty ? 'Edit Property' : 'Add New Property'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {selectedProperty ? 'Update' : 'Add'} Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inquiries Modal */}
      {showInquiryModal && selectedProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Inquiries for {selectedProperty.title}</h3>
              <button onClick={() => setShowInquiryModal(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            {selectedProperty.inquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProperty.inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{inquiry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{inquiry.email}</div>
                          <div>{inquiry.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">{inquiry.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            inquiry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            inquiry.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleInquiryStatusChange(selectedProperty.id, inquiry.id, 'Approved')}
                            className="text-green-600 hover:text-green-900 mr-2"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleInquiryStatusChange(selectedProperty.id, inquiry.id, 'Rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No inquiries yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateManagement;
