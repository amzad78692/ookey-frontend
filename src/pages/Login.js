import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginIcons from '../assest/signin.gif';
import SummaryApi from '../common';

const Login = () => {
  const [loader, setLoader] = useState("Login");
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();

  // Regular expressions for validation
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const mobilePattern = /^[0-9]{10}$/; // Adjust this regex based on your country's mobile format

  // Form submit handler
  const onSubmit = async(data) => {

    // Check if the input is email or mobile

      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signUP.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:data.emailOrMobile,password:data.password }),
      });
  
      const result = await response.json();
      console.log(result)
  
      if (result.status) {
        toast.success(result.message);
        reset()
        navigate('/');
      } else {
        toast.error(result.message);
      }

  };

  return (
    <section
      id="login"
      className="bg-gradient-to-r from-[#73EC8B] to-[#FEFF9F] min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-6 py-12 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105">
          {/* Login Icon */}
          <div className="w-24 h-24 mx-auto">
            <img src={loginIcons} alt="Login Icon" className="rounded-full shadow-md" />
          </div>

          {/* Form */}
          <form className="pt-6 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email or Mobile Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email or Mobile"
                {...register('emailOrMobile', {
                  required: 'Email or Mobile is required.',
                  validate: value => emailPattern.test(value) || mobilePattern.test(value) || 'Please enter a valid email or mobile number.',
                })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.emailOrMobile ? 'ring-2 ring-red-500' : ''}`}
              />
              {errors.emailOrMobile && (
                <p className="text-red-500 text-xs mt-1">{errors.emailOrMobile.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long.',
                  },
                })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.password ? 'ring-2 ring-red-500' : ''}`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {loader}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-green-600 hover:text-green-700">
                Forgot Password?
              </Link>
              <Link to="/sign-up" className="text-green-600 hover:text-green-700">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
