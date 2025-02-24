import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SummaryApi from './common';
import Context from './context';
import { setUser } from './redux/slices/authSlice';
import { addCategory } from './redux/slices/categorySlice';


const App = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const [cartProductCount, setCartProductCount] = useState(0);
  const [pincode, setPincode] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);

  /** Fetch user details */
  const fetchUserDetails = async () => {
    try {
      const queryKey = 'User';
      const urlWithQuery = `${SummaryApi.current_user.url}?key=${encodeURIComponent(queryKey)}`;

      const response = await fetch(urlWithQuery, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.status) {
        dispatch(setUser({
          user: data.data,
          token: localStorage.getItem('token__data'),
        }));
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  /** Fetch user cart product count */
  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });

      const data = await response.json();
      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error.message);
    }
  };

  /** Fetch user pincode if location is allowed */
  const fetchUserPincode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const pincode = data.features[0].properties.postcode;
        if (pincode) {
          const urlWithQuery = `${SummaryApi.getCategoriesByPincode.url}?pincode=${pincode}`;
          const response = await fetch(urlWithQuery, {
            method: SummaryApi.getCategoriesByPincode.method,
            credentials: 'include',
          });

          const categoryData = await response.json()
          if (categoryData.status) {
            dispatch(addCategory(categoryData.data))
            setPincode(pincode);
          } else {
            Navigate('/not-serving')
          }

        }
        else {
          console.error("Pincode not found.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch pincode:", error.message);
    }
  };



  /** Check user location */
  const checkUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
          fetchUserPincode(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocationAllowed(false); // Location access denied
        }
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    checkUserLocation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        pincode,
      }}>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
        <main className="flex-grow pt-6">
          <Outlet />
        </main>
        {locationAllowed && pincode && (
          <p className="text-center text-gray-600 mt-2">📍 Your Pincode: {pincode}</p>
        )}
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default App;
