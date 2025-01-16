import React, { useState, useEffect, useCallback } from 'react';
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { selectToken } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

const SubcategoryPage = () => {
  const token = useSelector(selectToken);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState({
    category_id: '',
    title: '',
    description: '',
    image: '',
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getCategories.url, {
        method: SummaryApi.getCategories.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status) {
        setCategories(result.data);
      } else {
        toast.error(result.message || 'Failed to fetch categories');
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  }, [token]);

  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getSubCategory.url, {
        method: SummaryApi.getSubCategory.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status) {
        setSubcategories(result.data);
      } else {
        toast.error(result.message || 'Failed to fetch subcategories');
      }
    } catch (error) {
      toast.error('Failed to fetch subcategories');
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSubcategory(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.addSubCategory.url, {
        method: SummaryApi.addSubCategory.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          category_id: newSubcategory.category_id,
          title: newSubcategory.title,
          description: newSubcategory.description,
          image: newSubcategory.image
        }),
      });

      const result = await response.json();
      if (result.status) {
        toast.success('Subcategory added successfully');
        await Promise.all([fetchCategories(), fetchSubCategories()]);
        setShowModal(false); // Close the modal after success
        setNewSubcategory({ category_id: '', title: '', description: '', image: '' });
      } else {
        toast.error(result.message || 'Failed to create subcategory');
      }
    } catch (error) {
      toast.error('Error creating subcategory');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${SummaryApi.deleteSubCategory.url}?id=${id}`, {
        method: SummaryApi.deleteSubCategory.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });

      const result = await response.json();
      if (result.status) {
        toast.success('Subcategory deleted successfully');
        await Promise.all([fetchCategories(), fetchSubCategories()]);
      } else {
        toast.error(result.message || 'Failed to delete subcategory');
      }
    } catch (error) {
      toast.error('Error deleting subcategory');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Subcategories
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and organize your subcategories
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add New Subcategory</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {subcategories.map((subcategory, index) => (
                  <tr 
                    key={subcategory._id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{subcategory.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{subcategory.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={subcategory.image}
                        alt={subcategory.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{subcategory.category_id}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(subcategory._id)}
                        className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Add New Subcategory
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={newSubcategory.category_id}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newSubcategory.title}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newSubcategory.description}
                    onChange={handleFormChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {newSubcategory.image && (
                    <div className="mt-2">
                      <img
                        src={newSubcategory.image}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoryPage;
