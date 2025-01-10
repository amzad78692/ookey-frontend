import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import Loader from '../components/loader/loader'

const SignUp = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(loginIcons);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setProfilePic(imagePic);
  };

  const onSubmit = async (data) => {
    console.log(data)
    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, role: 2 }),
    });

    const result = await response.json();
    console.log(result)

    if (result.status) {
      toast.success(result.message);
      reset()
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section
      id="signup"
      className="bg-gradient-to-r from-[#73EC8B] to-[#FEFF9F] min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-6 py-12 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105">
          <h1 className="text-center text-2xl font-bold text-green-500 mb-6">
            Welcome, Create an Account!
          </h1>
          {/* Profile Picture */}
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden shadow-md">
            <img
              src={profilePic}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <label className="absolute bottom-4 w-full bg-black bg-opacity-50 text-white text-xs text-center cursor-pointer">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>

          {/* Form */}
          <form
            className="pt-6 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                {...register('first_name', { required: 'First Name is required.' })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.first_name ? 'ring-2 ring-red-500' : ''
                  }`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                {...register('last_name', { required: 'Last Name is required.' })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.last_name ? 'ring-2 ring-red-500' : ''
                  }`}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="relative">
              <input
                type="text"
                placeholder="Address"
                {...register('address', { required: 'Address is required.' })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.address ? 'ring-2 ring-red-500' : ''
                  }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>


            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email (Optional)"
                {...register('email')}
                className="peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Contact Number */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Contact Number"
                {...register('mobile', {
                  required: 'Contact Number is required.',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit contact number.',
                  },
                })}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.mobile ? 'ring-2 ring-red-500' : ''
                  }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Password */}
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
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.password ? 'ring-2 ring-red-500' : ''
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex justify-center items-center"
            >
              {isSubmitting ? <Loader /> : "Sign Up"}
            </button>
          </form>

          {/* Delivery Partner Link */}
          <p className="mt-6 text-center text-gray-700 text-sm">
            Are you a delivery partner?{' '}
            <Link
              to="/delivery-partner"
              className="text-green-700 hover:text-green-600 hover:underline transition-all"
            >
              Click here
            </Link>
          </p>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-700 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-green-700 hover:text-green-600 hover:underline transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
