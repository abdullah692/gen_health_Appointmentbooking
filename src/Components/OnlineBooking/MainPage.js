import React from 'react';
import { useNavigate } from 'react-router';

function MainPage(props) {
    const navigate=useNavigate('');
    const id=1;
    const handleNext=()=>{
        navigate(`/onlineBooking/${id}`)
    }
    return (
        <div>
            <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className='flex justify-center'>
                <p className='text-[20px] font-bold'>Welcome to Genesis Health Online Booking</p>
                </div>
                <div className='flex justify-center mt-5'>
                    <button className='border-2 px-4 py-2 ' onClick={handleNext}>Next</button>
                </div>
          </div>
          </div>

        </div>
    );
}

export default MainPage;