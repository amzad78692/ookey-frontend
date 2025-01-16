import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common";
import { selectToken } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const INITIAL_FORM_STATE = {
  category_id: "",
  title: "",
  description: "",
  image: null,
};

// Animation variants
const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const contentVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.2, delay: 0.1 } 
  },
  exit: { 
    scale: 0.95, 
    opacity: 0, 
    transition: { duration: 0.2 } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3 } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3 } 
  },
};

// Error Messages
const ERROR_MESSAGES = {
  FILE_SIZE: "Image size should be less than 5MB",
  FILE_TYPE: "Please upload a valid image file (JPG, PNG, or GIF)",
  REQUIRED_FIELDS: "Please fill in all required fields and upload an image",
  DELETE_FAILED: "Failed to delete subcategory",
  UPDATE_FAILED: "Failed to update subcategory",
  CREATE_FAILED: "Failed to create subcategory",
};

// SubcategoryCard Component
const SubcategoryCard = React.memo(({ subcategory, onEdit, onDelete }) => {
  const handleEditClick = useCallback(() => {
    onEdit(subcategory.id);
  }, [onEdit, subcategory.id]);

  const handleDeleteClick = useCallback(() => {
    onDelete(subcategory.id);
  }, [onDelete, subcategory.id]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={subcategory.image}
          alt={subcategory.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white">
            {subcategory.title}
          </h3>
          <p className="text-gray-200 text-sm">
            Category ID: {subcategory.category_id}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4 line-clamp-2">{subcategory.description}</p>
        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            onClick={handleEditClick}
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
            onClick={handleDeleteClick}
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

SubcategoryCard.displayName = 'SubcategoryCard';

// Form Modal Component
const FormModal = React.memo(({ 
  show, 
  editMode, 
  formData, 
  imagePreview, 
  loading, 
  onSubmit, 
  onChange, 
  onImageChange, 
  onClose,
  fileInputRef,
  categories,
  selectedCategory,
  handleChange2,
  onImagePreviewClear
}) => {
  if (!show) return null;

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl w-full max-w-md my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editMode ? "Edit Subcategory" : "Add New Subcategory"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                value={selectedCategory}
                onChange={handleChange2}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                {selectedCategory && (
                  <p className="text-gray-700 font-medium">
                    Selected: {categories.find((cat) => cat._id === selectedCategory)?.title}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={onImagePreviewClear}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label
                    className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="mt-2 text-base text-gray-600">
                      {imagePreview ? "Change image" : "Upload image"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onImageChange}
                      ref={fileInputRef}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Max file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-gray-100">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    editMode ? "Update" : "Add"
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  onClick={onClose}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

FormModal.displayName = 'FormModal';

const SubcategoryPage = () => {
  // State management
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = useSelector(selectToken);

  // Refs
  const fileInputRef = useRef(null);

  // API Calls
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
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  }, [token]);

  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getSubCategories.url, {
        method: SummaryApi.getSubCategories.method,
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
      console.error('Error fetching subcategories:', error);
      toast.error('Failed to fetch subcategories');
    }
  }, [token]);

  // Form handlers
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setImagePreview(null);
    setShowForm(false);
    setEditMode(false);
    setEditingId(null);
    setSelectedCategory("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleChange2 = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const validateImage = useCallback((file) => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) {
      toast.error(ERROR_MESSAGES.FILE_SIZE);
      return false;
    }
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      toast.error(ERROR_MESSAGES.FILE_TYPE);
      return false;
    }
    return true;
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file || !validateImage(file)) return;

    setFormData(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [validateImage]);

  const handleImagePreviewClear = useCallback(() => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleEdit = useCallback((id) => {
    const subcategory = subcategories.find(sub => sub.id === id);
    if (!subcategory) return;

    setFormData({
      category_id: subcategory.category_id,
      title: subcategory.title,
      description: subcategory.description,
      image: null, // We'll keep the image null since we can't edit it directly
    });
    setSelectedCategory(subcategory.category_id);
    setImagePreview(subcategory.image);
    setEditingId(id);
    setEditMode(true);
    setShowForm(true);
  }, [subcategories]);

  const handleAddOrEditSubcategory = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.category_id && !selectedCategory) {
      toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    if (!formData.title || !formData.description) {
      toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    // Only require image for new subcategories
    if (!editMode && !formData.image) {
      toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    setLoading(true);
    try {
      let imageUrl = editMode ? imagePreview : null;
      
      // Only process new image if one was uploaded
      if (formData.image) {
        imageUrl = URL.createObjectURL(formData.image);
      }

      if (editMode) {
        setSubcategories(prev =>
          prev.map(sub =>
            sub.id === editingId 
              ? { 
                  ...sub, 
                  ...formData,
                  category_id: selectedCategory,
                  image: imageUrl || sub.image // Keep old image if no new one
                } 
              : sub
          )
        );
        
        const response = await fetch(`${SummaryApi.updateSubCategory.url}`, {
          method: SummaryApi.updateSubCategory.method,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({
            id: editingId,
            category_id: selectedCategory,
            title: formData.title,
            description: formData.description,
            image: imageUrl || subcategories.find(sub => sub.id === editingId)?.image
          }),
        });

        const result = await response.json();
        if (result.status) {
          toast.success('Subcategory updated successfully');
          await Promise.all([fetchCategories(), fetchSubCategories()]);
        } else {
          toast.error(result.message || ERROR_MESSAGES.UPDATE_FAILED);
        }
      } else {
        if (!imageUrl) {
          toast.error("Please upload an image");
          return;
        }

        setSubcategories(prev => [
          ...prev,
          {
            id: prev.length + 1,
            category_id: selectedCategory,
            title: formData.title,
            description: formData.description,
            image: imageUrl,
          },
        ]);

        const response = await fetch(SummaryApi.addSubCategory.url, {
          method: SummaryApi.addSubCategory.method,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({
            category_id: selectedCategory,
            title: formData.title,
            description: formData.description,
            image: imageUrl
          }),
        });

        const result = await response.json();
        if (result.status) {
          toast.success('Subcategory added successfully');
          await Promise.all([fetchCategories(), fetchSubCategories()]);
        } else {
          toast.error(result.message || ERROR_MESSAGES.CREATE_FAILED);
        }
      }

      resetForm();
    } catch (error) {
      console.error('Error in handleAddOrEditSubcategory:', error);
      toast.error(editMode ? ERROR_MESSAGES.UPDATE_FAILED : ERROR_MESSAGES.CREATE_FAILED);
    } finally {
      setLoading(false);
    }
  }, [formData, editMode, editingId, resetForm, selectedCategory, imagePreview, token, subcategories, fetchCategories, fetchSubCategories]);

  const handleDelete = useCallback(async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
    if (!confirmDelete) return;

    setLoading(true);
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
        toast.success('Category deleted successfully');
        await Promise.all([fetchCategories(), fetchSubCategories()]);
        setSelectedCategory(null);
      } else {
        toast.error(result.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error in handleDelete:', error);
      toast.error(ERROR_MESSAGES.DELETE_FAILED);
    } finally {
      setLoading(false);
    }
  }, [token, fetchCategories, fetchSubCategories]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Effects
  useEffect(() => {
    Promise.all([fetchCategories(), fetchSubCategories()]).catch(error => {
      console.error('Error in initial data fetch:', error);
      toast.error('Failed to load initial data');
    });
  }, [fetchCategories, fetchSubCategories]);

  // Render functions
  const renderHeader = useCallback(() => (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Subcategories
      </h1>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        onClick={() => {
          setFormData(INITIAL_FORM_STATE);
          setEditMode(false);
          setShowForm(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Subcategory
      </motion.button>
    </div>
  ), []);

  const renderSearchBar = useCallback(() => (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search subcategories..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg
          className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  ), [searchQuery]);

  const filteredSubcategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return subcategories;
    
    return subcategories.filter(
      (sub) =>
        sub.title.toLowerCase().includes(query) ||
        sub.description.toLowerCase().includes(query)
    );
  }, [subcategories, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8">
          {renderHeader()}
          {renderSearchBar()}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="popLayout">
              {filteredSubcategories.map((subcategory) => (
                <SubcategoryCard
                  key={subcategory.id}
                  subcategory={subcategory}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showForm && (
              <FormModal
                show={showForm}
                editMode={editMode}
                formData={formData}
                imagePreview={imagePreview}
                loading={loading}
                onSubmit={handleAddOrEditSubcategory}
                onChange={handleChange}
                onImageChange={handleImageChange}
                onClose={resetForm}
                fileInputRef={fileInputRef}
                categories={categories}
                selectedCategory={selectedCategory}
                handleChange2={handleChange2}
                onImagePreviewClear={handleImagePreviewClear}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SubcategoryPage);
