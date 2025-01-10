import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhoneCall } from 'react-icons/fi';
import { AiOutlineApple, AiFillAndroid } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-[#435B66] text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Ookey Essentials</h2>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for unique and high-quality essentials. From everyday items to luxury finds, we deliver the best products directly to your doorstep with care and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-100 transition duration-200">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-100 transition duration-200">About Us</a>
              </li>
              <li>
                <a href="/products" className="hover:text-gray-100 transition duration-200">Products</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-100 transition duration-200">Contact</a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FiPhoneCall className="text-lg" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-lg" />
                <span>support@ookeyessentials.com</span>
              </li>
              <li>
                <a href="/faqs" className="hover:text-gray-100 transition duration-200">FAQs</a>
              </li>
              <li>
                <a href="/help" className="hover:text-gray-100 transition duration-200">Help Center</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center gap-8">
          {/* Download Our App */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Download Our App</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition duration-200 text-white px-4 py-2 rounded-lg"
              >
                <AiFillAndroid className="text-xl" />
                <span>Google Play</span>
              </a>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition duration-200"
                title="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition duration-200"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition duration-200"
                title="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-200"
                title="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ookey Essentials. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy-policy" className="hover:text-gray-100 transition duration-200">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gray-100 transition duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
