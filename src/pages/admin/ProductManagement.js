import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from "../../redux/slices/authSlice.js"

const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const token = useSelector(selectToken);
  const [subCategories, setsubCategories] = useState([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    subcategory_id: '',
    price: '',
    discount: '',
    stock: '',
    image_url: [],  // Changed to an array to handle multiple images
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === 'category_id') {
      const constData = subCategories.filter(item => item.category_id === e.target.value);
      setFilteredSubCategory(constData);
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = [];

    // Read each file as base64
    files.forEach(file => {
      const reader = new FileReader();

      reader.onloadend = () => {
        newImageUrls.push(reader.result);  // Store the base64 data

        // Once all files are read, update the state
        if (newImageUrls.length === files.length) {
          setFormData(prev => ({
            ...prev,
            image_url: [...prev.image_url, ...newImageUrls]
          }));
        }
      };

      reader.readAsDataURL(file);  // Read file as base64
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Update existing product
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ₹{token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          id:formData._id,
          ...formData
        }),
      });
      if (response.status) {
        toast.success('Product updated successfully!');
        fetchProducts();
      } else {
        toast.error(response.message || 'Failed to update product');
      }
      
    } else {

      const image_urls = await Promise.all(
        formData.image_url.map(async (item) => {
          try {
            const response = await fetch(SummaryApi.uploadImage.url, {
              method: SummaryApi.uploadImage.method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ image: item }),
            });
      
            const data = await response.json();
      
            return data.image_url || data.url || null; // Use correct key
          } catch (error) {
            console.error("Image upload failed:", error);
            return null; // Prevent undefined values
          }
        })
      );
      
      formData.image_url = image_urls.filter(url => url !== null); // Remove null values
      
      // Add new product
      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      const result = await response.json(); // Parse response JSON
      console.log("Add Product Response:", result);
      
      if (response.ok) {  // ✅ Use response.ok instead of response.status
        toast.success('Product added successfully');
        fetchProducts();
      } else {
        toast.error(result.message || 'Failed to add product');
      }
      
    }
    handleCloseModal();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      image_url: product.image_url || []  // Handle preexisting image URLs
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const response = await fetch(`₹{SummaryApi.deleteProduct.url}?id=₹{productId}`, {
        method: SummaryApi.deleteProduct.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ₹{token}`
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(result.message || 'Failed to delete Product');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: '',
      subcategory_id: '',
      price: '',
      discount: '',
      stock: '',
      image_url: [],
      description: ''
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getProducts.url, {
        method: SummaryApi.getProducts.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(SummaryApi.getCategories.url, {
        method: SummaryApi.getCategories.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status) {
        setCategories(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(SummaryApi.getSubCategory.url, {
        method: SummaryApi.getSubCategory.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status) {
        setsubCategories(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch subcategories');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  // Filter products when category changes or products update
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category_id === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Product Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          <FiPlus className="mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500 w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryFilter}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subcategory
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 flex-shrink-0">
                        <img
                          className="h-14 w-14 rounded-lg object-cover border border-gray-200 shadow-sm"
                          src={"https://via.placeholder.com/50"}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {categories.find(item=>item._id===product.category_id)?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {subCategories.find(item=>item._id===product.subcategory_id)?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">₹{product.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">₹{product.discount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FiEdit2 className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border w-[32rem] shadow-xl rounded-xl bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Subcategory options based on category selection */}
              {filteredSubCategory.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                  <select
                    name="subcategory_id"
                    value={formData.subcategory_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    <option value="">Select Subcategory</option>
                    {filteredSubCategory.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price, Discount, Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 015.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <span>Upload files</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                <div className="mt-4">
                  {formData.image_url.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {formData.image_url.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                            <img src={url} alt={`preview-₹{index}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
