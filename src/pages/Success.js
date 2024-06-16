import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center flex-col p-4 items-center m-2 rounded'>
      <img src={SUCCESSIMAGE} alt="payment-done" width={250} height={250}/>
      <p className='text-green-600 font-bold text-xl m-2'>Payment Successfully Done</p>
      <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success
