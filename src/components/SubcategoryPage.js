import React, { useState, useEffect, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
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
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Subcategories</h1>
        <div className="mb-4 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Add New Subcategory
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Subcategory</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="category_id" className="block text-gray-700">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={newSubcategory.category_id}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newSubcategory.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newSubcategory.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {newSubcategory.image && (
                  <img
                    src={newSubcategory.image}
                    alt="Uploaded preview"
                    className="mt-4 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">#</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">Title</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">Description</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">Image</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">Category Name</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory, index) => (
              <tr key={subcategory._id} className="hover:bg-gray-100 transition duration-300">
                <td className="border border-gray-200 px-6 py-4 text-gray-700 text-center">{index + 1}</td>
                <td className="border border-gray-200 px-6 py-4 text-gray-700">{subcategory.title}</td>
                <td className="border border-gray-200 px-6 py-4 text-gray-700">{subcategory.description}</td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <img
                    src={subcategory.image}
                    alt={subcategory.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                  />
                </td>
                <td className="border border-gray-200 px-6 py-4 text-gray-700">{subcategory.category_id}</td>
                <td className="border border-gray-200 px-6 py-4 flex justify-center items-center space-x-4">
                  <FaTrash
                    onClick={() => handleDelete(subcategory._id)}
                    className="text-red-600 text-xl cursor-pointer hover:text-red-800 transition duration-300"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcategoryPage;
