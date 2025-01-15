import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/authSlice';
// import { setUserDetails } from './store/userSlice';
const App = () => {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    try {
      const queryKey = 'User'; // Define the key value
      const urlWithQuery = `${SummaryApi.current_user.url}?key=${encodeURIComponent(queryKey)}`; // Append query parameter

      const dataResponse = await fetch(urlWithQuery, {
        method: SummaryApi.current_user.method, // Ensure this is compatible with sending queries (e.g., GET or POST)
        credentials: 'include', // Send cookies with the request
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();
      console.log('User Details API Response:', dataApi);

      if (dataApi.status) {
        dispatch(setUser({
          user: dataApi.data,
          token: localStorage.getItem('token__data')
        }));
      } else {
        console.error('Error fetching user details:', dataApi.message);
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  };


  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  }, [])
  // This goes in your main file (e.g., index.js or App.js)


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Context.Provider value={{
        fetchUserDetails, // user detail fetch 
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart
      }}>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* <Header/> */}
        <main className='flex-grow pt-6'>
          <Outlet />
        </main>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default App;
