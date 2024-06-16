import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const deleteProduct = async(id) => {
    const fetchData = await fetch(SummaryApi.DeleteProduct.url, {
      method: SummaryApi.DeleteProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div className="flex justify-between items-center">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit ml-auto p-2 text-red-600 rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
              onClick={() => deleteProduct(data._id)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

AdminProductCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productImage: PropTypes.arrayOf(PropTypes.string).isRequired,
    productName: PropTypes.string.isRequired,
    sellingPrice: PropTypes.number.isRequired,
  }).isRequired,
  fetchdata: PropTypes.func.isRequired,
};

export default AdminProductCard;
