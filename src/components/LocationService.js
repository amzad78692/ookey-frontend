import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaTimes, FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";

const LocationService = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
      } else {
        setError("Location not found. Please try a different search.");
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
    }
  }, [manualLocation, debouncedSearch]);

  const handleSelectLocation = (selected) => {
    setLocation({ latitude: selected.lat, longitude: selected.lon });
    setAddress(selected.display_name);
    setSuggestions([]);
    setManualLocation("");
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
          className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-[400px] relative border border-gray-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Select Location
            </h2>
            <button
              onClick={() => {
                onClose();
                document.body.style.overflow = "auto"; // Ensure scroll is re-enabled
              }}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Location Info */}
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {location ? (
                <p className="mb-4 text-gray-700 text-center">
                  <strong>📍 Delieverd Address:</strong> {address}
                </p>
              ) : (
                <p className="mb-4 text-gray-700 text-center">
                  Fetching location...
                </p>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {error}
                </p>
              )}

              {/* Manual Search */}
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 p-3 rounded-lg w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Enter location manually"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                />
                <FaSearchLocation className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              </div>

              {/* Suggestions List */}
              {suggestions.length > 0 && (
                <div className="bg-white mt-2 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {suggestions.map((place, index) => (
                    <div
                      key={index}
                      className="p-3 cursor-pointer hover:bg-gray-200 transition-all"
                      onClick={() => handleSelectLocation(place)}
                    >
                      {place.display_name}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationService;
