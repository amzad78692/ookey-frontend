import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaStar,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaMinus,
  FaPlus,
  FaRegHeart,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import Context from '../context';
import Loader from '../components/loader/loader';
import displayINRCurrency from '../helpers/displayCurrency';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchUserAddToCart } = useContext(Context);

  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product details
  console.log('first', id)
  useEffect(() => {
    const fetchProductDetails = async () => {
      console.log('first2', id);
      setLoading(true);
      try {
        const url = `${SummaryApi.getProducts.url}?id=${id}`; // Add id as query parameter
        const response = await fetch(url, {
          method: SummaryApi.getProducts.method,
          headers: { "content-type": "application/json" }
        });

        console.log(response);

        if (!response.ok) throw new Error('Failed to fetch product details');

        const data = await response.json();
        if (data?.status) {
          setProduct(data.data);
          setSelectedImage(0);
        } else {
          toast.error(data?.message || 'Failed to load product details');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);


  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity
        })
      });

      const data = await response.json();

      if (data.status) {
        toast.success('Added to cart successfully');
        fetchUserAddToCart();
      } else {
        toast.error(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          {/* Main Image with Zoom */}
          <div
            className="relative overflow-hidden aspect-square rounded-lg bg-gray-100"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.productImage[selectedImage]}
              alt={product.productName}
              className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'
                }`}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.productImage.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.brandName}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-4">
            <p className="text-3xl font-bold text-gray-900">
              {displayINRCurrency(product.sellingPrice)}
            </p>
            {product.price !== product.sellingPrice && (
              <>
                <p className="text-lg text-gray-500 line-through">
                  {displayINRCurrency(product.price)}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
                </p>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex space-x-4">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
            >
              {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>Wishlist</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.productName,
                    text: product.description,
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <FaShare />
              <span>Share</span>
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaTruck className="text-blue-500" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaShieldAlt className="text-blue-500" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaExchangeAlt className="text-blue-500" />
                <span>7 Days Replacement</span>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;