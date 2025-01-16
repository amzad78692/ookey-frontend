import React, { useState } from "react";

const SubcategoryPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [subcategories, setSubcategories] = useState([
    {
      id: 1,
      category_id: "1",
      title: "Apples",
      description: "Fresh apples",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      category_id: "2",
      title: "Bananas",
      description: "Yellow bananas",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEditSubcategory = (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.category_id || !formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editMode) {
      setSubcategories((prev) =>
        prev.map((sub) =>
          sub.id === editingId ? { ...sub, ...formData } : sub
        )
      );
      setEditMode(false);
      setEditingId(null);
    } else {
      setSubcategories([
        ...subcategories,
        {
          id: subcategories.length + 1,
          ...formData,
        },
      ]);
    }

    setFormData({
      category_id: "",
      title: "",
      description: "",
      image: "",
    });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const subcategory = subcategories.find((sub) => sub.id === id);
    setFormData(subcategory);
    setEditingId(id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setSubcategories((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Fruit Subcategories</h1>

        {/* Subcategory Table */}
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Category ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td className="border px-4 py-2">{subcategory.category_id}</td>
                  <td className="border px-4 py-2">{subcategory.title}</td>
                  <td className="border px-4 py-2">{subcategory.description}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={subcategory.image}
                      alt={subcategory.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(subcategory.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(subcategory.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Subcategory Button */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => {
            setFormData({
              category_id: "",
              title: "",
              description: "",
              image: "",
            });
            setEditMode(false);
            setShowForm(true);
          }}
        >
          Add a Subcategory
        </button>

        {/* Add/Edit Subcategory Form */}
        {showForm && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
            <form onSubmit={handleAddOrEditSubcategory}>
              {/* Category ID */}
              <div className="mb-4">
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category_id"
                  name="category_id"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category_id}
                  onChange={handleChange}
                />
              </div>

              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Image */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              {/* Form Buttons */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="mr-3 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  {editMode ? "Update Subcategory" : "Add Subcategory"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
