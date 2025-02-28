import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaTimes, FaSearchLocation, FaMapMarkerAlt, FaCompass, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setUserPincode } from "../redux/slices/authSlice";

const LocationService = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUsingGPS, setIsUsingGPS] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsUsingGPS(true);
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
          setIsUsingGPS(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name);
      setSelectedLocation({ 
        latitude: lat, 
        longitude: lon, 
        address: data.display_name 
      });
      setIsUsingGPS(false);
      return data.address.postcode;
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Error fetching address. Please try again.");
      setIsUsingGPS(false);
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
        setShowSuggestions(true);
      } else {
        setError("Location not found. Please try a different search.");
        setShowSuggestions(false);
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
      setShowSuggestions(false);
    }
  }, [manualLocation, debouncedSearch]);

  const handleSelectLocation = async (selected) => {
    const pinCode = await fetchAddress(selected.lat, selected.lon);
    dispatch(setUserPincode({ userPincode: pinCode }));
    setLocation({ latitude: selected.lat, longitude: selected.lon });
    setAddress(selected.display_name);
    setSelectedLocation({ 
      latitude: selected.lat, 
      longitude: selected.lon, 
      address: selected.display_name 
    });
    setShowSuggestions(false);
    setManualLocation("");
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      setShowSuggestions(false);
      onClose();
    } else {
      setError("Please select a location first.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] relative overflow-hidden"
        >
          {/* Decorative Top Pattern */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Select your location
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-500 mt-1">For accurate delivery updates</p>
          </div>

          <div className="p-6">
            {/* Current Location Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getCurrentLocation}
              className="w-full flex items-center justify-between p-4 mb-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group"
              disabled={isUsingGPS}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl transition-colors ${
                  isUsingGPS ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <FaCompass className={`h-6 w-6 ${
                    isUsingGPS ? 'text-blue-600 animate-spin' : 'text-blue-600'
                  }`} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">
                    {isUsingGPS ? 'Getting location...' : 'Current Location'}
                  </p>
                  <p className="text-sm text-gray-500">Using GPS</p>
                </div>
              </div>
              {selectedLocation && !isUsingGPS && (
                <FaCheck className="h-5 w-5 text-blue-600" />
              )}
            </motion.button>

            {/* Search Box */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearchLocation className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-800 placeholder-gray-400"
                placeholder="Search for your location..."
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
              />
              {isLoading && !isUsingGPS && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-transparent"></div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-4 bg-red-50 rounded-xl border border-red-100"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Suggestions List */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-2 max-h-[240px] overflow-y-auto rounded-2xl border border-gray-100 shadow-lg divide-y divide-gray-100">
                {suggestions.map((place, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectLocation(place)}
                    className="flex items-start space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {place.display_name.split(',')[0]}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {place.display_name.split(',').slice(1).join(',')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Selected Location */}
            {selectedLocation && !showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <FaMapMarkerAlt className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Selected Location</p>
                    <p className="text-sm text-green-600 mt-1">
                      {selectedLocation.address}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirm Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmLocation}
              disabled={!selectedLocation || isLoading}
              className={`w-full mt-6 py-4 px-6 font-semibold rounded-2xl shadow-lg transition-all ${
                !selectedLocation || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200'
              }`}
            >
              {isLoading ? 'Loading...' : 'Confirm Location'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationService;