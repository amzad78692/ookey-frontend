import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState("Login");
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Static admin credentials
  const ADMIN_CREDENTIALS = {
    email: "amzad.nnt@gmail.com",
    password: "Amzad@123"
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader("Processing...");

    // Check static credentials
    if (data.email === ADMIN_CREDENTIALS.email && data.password === ADMIN_CREDENTIALS.password) {
      // Set admin status in localStorage
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('userEmail', data.email);
      
      toast.success("Login successful!");
      navigate('/admin-panel');
    } else {
      toast.error("Invalid credentials!");
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
