import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import Loader from '../components/loader/loader';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaCamera, FaTruck, FaHome, FaLeaf } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl w-full space-y-8 flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left Side - Welcome Message */}
        <div className="md:w-5/12 space-y-6 hidden md:block mt-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Welcome to Ookey
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your gateway to premium real estate and fresh produce, all in one place.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
                  <FaHome className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Premium Properties</h3>
                  <p className="text-gray-600">Find your dream property with our curated listings</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                <div className="bg-green-500 p-3 rounded-xl shadow-lg">
                  <FaLeaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fresh Produce</h3>
                  <p className="text-gray-600">Quality fruits and vegetables delivered to you</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors">
                <div className="bg-purple-500 p-3 rounded-xl shadow-lg">
                  <FaTruck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600">Swift and reliable delivery service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="md:w-7/12">
          <div className="bg-white/90 mt-3 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Join our community today</p>
            </div>

            {/* Profile Picture */}
            <div className="relative mx-auto w-32 h-32 mb-8 group">
              <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <FaCamera className="h-5 w-5 text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register('first_name', { required: 'First Name is required.' })}
                    className={`pl-10 w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.first_name ? 'border-red-500' : 'border-gray-200'
                    } hover:bg-white`}
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.first_name.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register('last_name', { required: 'Last Name is required.' })}
                    className={`pl-10 w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.last_name ? 'border-red-500' : 'border-gray-200'
                    } hover:bg-white`}
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('address', { required: 'Address is required.' })}
                  className={`pl-10 w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  } hover:bg-white`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  {...register('email')}
                  className="pl-10 w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                />
              </div>

              {/* Contact Number */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
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
                  className={`pl-10 w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.mobile ? 'border-red-500' : 'border-gray-200'
                  } hover:bg-white`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-500">{errors.mobile.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
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
                  className={`pl-10 w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } hover:bg-white`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader /> : "Create Account"}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              {/* Delivery Partner Link */}
              <div className="flex items-center justify-center space-x-3 text-sm bg-blue-50 p-3 rounded-xl">
                <FaTruck className="text-blue-600" />
                <span className="text-gray-600">Are you a delivery partner?</span>
                <Link
                  to="/delivery-partner"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Join here
                </Link>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
