import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaTimes, FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setUserPincode } from "../redux/slices/authSlice";

const LocationService = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // Store selected location
  const [showSuggestions, setShowSuggestions] = useState(false); // Control dropdown visibility

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmounted
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to fetch your location. Please try manually.");
          setIsLoading(false);
        }
      );
    }
  }, [isOpen]);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name);
      setSelectedLocation({ latitude: lat, longitude: lon, address: data.display_name }); // Set selected location
      return data.address.postcode
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Error fetching address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchManualLocation = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setSuggestions(data);
        setShowSuggestions(true); // Show dropdown when suggestions are available
      } else {
        setError("Location not found. Please try a different search.");
        setShowSuggestions(false); // Hide dropdown if no suggestions
      }
    } catch (error) {
      console.error("Error fetching manual location:", error);
      setError("Error fetching location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce(fetchManualLocation, 800),
    []
  );

  useEffect(() => {
    if (manualLocation) {
      debouncedSearch(manualLocation);
    } else {
      setSuggestions([]);
      setShowSuggestions(false); // Hide dropdown if input is empty
    }
  }, [manualLocation, debouncedSearch]);

  const handleSelectLocation = async(selected) => {
    const pinCode = await fetchAddress(selected.lat, selected.lon)
    dispatch(setUserPincode({ userPincode: pinCode }));
    setLocation({ latitude: selected.lat, longitude: selected.lon });
    setAddress(selected.display_name);
    setSelectedLocation({ latitude: selected.lat, longitude: selected.lon, address: selected.display_name }); // Set selected location
    setShowSuggestions(true); // Keep dropdown visible after selection
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      setShowSuggestions(false); // Hide dropdown after confirmation
      onClose(); // Close the modal
    } else {
      alert("Please select a location first.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-[450px] relative border border-gray-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-600" /> Select Location
            </h2>
            <button
              onClick={() => {
                onClose();
                document.body.style.overflow = "auto"; // Ensure scroll is re-enabled
              }}
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Location Info */}
          {isLoading ? (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <>
              {location ? (
                <p className="mb-6 text-gray-700 text-center bg-gray-100 p-4 rounded-xl shadow-sm">
                  <strong className="text-green-600">📍 Delivered Address:</strong> {address}
                </p>
              ) : (
                <p className="mb-6 text-gray-700 text-center">
                  Fetching location...
                </p>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}

              {/* Manual Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  className="border border-gray-300 p-3 rounded-xl w-full pl-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition-all"
                  placeholder="Enter location manually"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                />
                <FaSearchLocation className="absolute left-4 top-3.5 text-gray-500 text-lg" />
              </div>

              {/* Suggestions List */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="bg-white mt-2 border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {suggestions.map((place, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 cursor-pointer hover:bg-gray-100 transition-all border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSelectLocation(place)}
                    >
                      <p className="text-gray-700">{place.display_name}</p>
                      <p className="text-sm text-gray-500">{place.type}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Confirm Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold mt-6 hover:from-green-700 hover:to-green-800 transition-all"
            onClick={handleConfirmLocation}
          >
            Confirm Location
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationService;