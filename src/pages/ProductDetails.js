import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import Loader from '../components/loader/loader';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [Id, setId] = useState("");
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const navigate = useNavigate();

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productId: params?.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const dataResponse = await response.json();

      if (dataResponse?.status) {
        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0]);
      } else {
        toast.error(dataResponse?.message || 'Failed to load product details');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Error loading product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchProductDetails();
    }
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    setId(id);
    setLoader(true);
    await addToCart(e, id);
    fetchUserAddToCart();
    setLoader(false);
    setId("");
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 animate-pulse">
          <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200"></div>
            <div className="flex gap-2 lg:flex-col">
              {productImageListLoading.map((_, index) => (
                <div key={index} className="h-20 w-20 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-12 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-slate-200 rounded w-1/3"></div>
              <div className="h-12 bg-slate-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img 
              src={activeImage} 
              alt={data.productName}
              className='h-full w-full object-scale-down mix-blend-multiply' 
              onMouseMove={handleZoomImage} 
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* Product zoom */}
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className='h-full'>
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {data?.productImage?.map((imgURL, index) => (
                <div 
                  className='h-20 w-20 bg-slate-200 rounded p-1' 
                  key={imgURL}
                >
                  <img 
                    src={imgURL} 
                    alt={`${data.productName} view ${index + 1}`}
                    className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className='flex flex-col gap-1'>
          <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>
            {data?.brandName}
          </p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
          <p className='capitalize text-slate-400'>{data?.category}</p>

          <div className='text-red-600 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
            <span className='text-slate-600 text-sm'>(4.5)</span>
          </div>

          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-red-600'>
              {displayINRCurrency(data?.sellingPrice || data?.price)}
            </p>
            {data?.sellingPrice && (
              <p className='text-slate-400 line-through'>
                {displayINRCurrency(data?.price)}
              </p>
            )}
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button
              className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600'
              onClick={(e) => handleAddToCart(e, data?._id)}
              disabled={loader && Id === data?._id}
            >
              {loader && Id === data?._id ? (
                <Loader color="white" size={20} />
              ) : (
                'Add to Cart'
              )}
            </button>
            <button
              className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600'
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy Now
            </button>
          </div>

          <div>
            <p className='text-slate-600 font-medium my-1'>Description:</p>
            <p className='text-slate-500'>{data?.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <section className='my-8'>
        <h3 className='text-2xl font-medium mb-4'>Similar Products</h3>
        <CategroyWiseProductDisplay />
      </section>
    </div>
  );
};

export default ProductDetails;