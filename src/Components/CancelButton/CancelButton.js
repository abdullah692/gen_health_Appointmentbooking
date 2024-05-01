import React from 'react'
import { resetUsers } from '../Slices/PatientVerification';
import { resetPhoneNo } from '../Slices/PatientNoSlice';
import { useDispatch } from 'react-redux';

function CancelButton({ setCurrent, current, isModalOpen }) {
  const dispatch=useDispatch();
  
  const handleCancel = () => {
    dispatch(resetUsers());
    dispatch(resetPhoneNo());
    setCurrent(0)
  }
  return (
    <div>
      <button
        className="relative border-2 border-slate-300 px-8 py-1 rounded-md mt-2 text-[#464D59]"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  )
}

export default CancelButton
