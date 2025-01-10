import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState("Login");
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const validateForm = () => {
    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!data.email.includes('@')) {
      tempErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader("Processing...");
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
    setLoader("Login");
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
          <form className="pt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email Field */}
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
                Email Address
              </label>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
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
            <Link
              to={'/forgot-password'}
              className="block w-fit ml-auto text-sm text-green-700 hover:underline hover:text-green-600 transition-all"
            >
              Forgot password?
            </Link>

            {/* Submit Button */}
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex justify-center items-center"
              type="submit"
            >
              {loader === "Processing..." ? (
                <div className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin"></div>
              ) : (
                loader
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-700 text-sm">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-green-700 hover:text-green-600 hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
