import React from 'react';
import CANCELIMAGE from '../assest/cancel.gif';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center flex-col p-4 items-center m-2 rounded'>
      <img
        src={CANCELIMAGE}
        alt="payment-done"
        width={250}
        height={250}
        // style={{ backgroundColor: 'transparent' }}
        className='mix-blend-multiply'
      />
      <p className='text-red-600 font-bold text-xl m-2'>Payment Cancelled</p>
      <Link
        to={"/cart"}
        className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default Cancel;
