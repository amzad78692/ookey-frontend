import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiUpload } from 'react-icons/fi';

const ImageUploadModal = ({ isOpen, onClose, onUpload, type = 'profile' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onUpload(selectedImage);
      onClose();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Upload {type === 'profile' ? 'Profile Picture' : 'Cover Photo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Preview"
                className={`mx-auto ${
                  type === 'profile'
                    ? 'w-32 h-32 rounded-full object-cover'
                    : 'w-full h-48 rounded-lg object-cover'
                }`}
              />
              <p className="text-sm text-gray-500">Click or drag to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <FiUpload className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedImage}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              selectedImage
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Upload Image
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageUploadModal;
