import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState("Sign Up");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    if (!data.name.trim()) {
      tempErrors.name = "Name is required.";
      valid = false;
    }
    if (!data.email.includes('@')) {
      tempErrors.email = "Please enter a valid email.";
      valid = false;
    }
    if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    if (data.password !== data.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader("Processing...");
    const dataResponse = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/login");
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
    setLoader("Sign Up");
  };

  return (
    <section
      id="signup"
      className="bg-gradient-to-r from-[#73EC8B] to-[#FEFF9F] min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-6 py-12 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105">
          {/* Profile Picture */}
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden shadow-md">
            <img
              src={data.profilePic || loginIcons}
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
          <form className="pt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                name="name"
                value={data.name}
                onChange={handleOnChange}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.name ? 'ring-2 ring-red-500' : ''
                }`}
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600 transition">
                Name
              </label>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                }`}
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600 transition">
                Email
              </label>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.password ? 'ring-2 ring-red-500' : ''
                }`}
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600 transition">
                Password
              </label>
              <div
                className="absolute right-3 top-3 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder=" "
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className={`peer bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.confirmPassword ? 'ring-2 ring-red-500' : ''
                }`}
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600 transition">
                Confirm Password
              </label>
              <div
                className="absolute right-3 top-3 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex justify-center items-center"
            >
              {loader === "Processing..." ? (
                <div className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin"></div>
              ) : (
                loader
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-700 text-sm">
            Already have an account?{" "}
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
