import React from 'react'
import genesisWelcome from '../../assets/images/genesisWelcome.png'
import healthWelcome from '../../assets/images/healthWelcome.png'
import { useNavigate } from 'react-router'
import Header from '../Header/Header'
import { useDispatch } from 'react-redux'
import { resetUsers } from '../Slices/PatientVerification'
import { resetPhoneNo, resetState } from '../Slices/PatientNoSlice'


function AppointmentConfirmed(props) {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleConfirmed=()=>{
    dispatch(resetUsers());
    dispatch(resetPhoneNo());
    navigate('/1');


  }
  return (
    <div>
      <div>
        <img src={healthWelcome} className="fixed top-0 left-0" />
      </div>
      <div>
        <img src={genesisWelcome} className="absolute bottom-0 right-0 z-[9]" />
      </div>
      <div className="relative !mt-[100px] mx-[100px] rounded-md  bg-white opacity-90 z-[9999]">
        <Header />
        <div className="mt-100 text-center">
          <p className="text-[#464D59] text-[25px] font-semibold">
            Your App
            <span className="border-b-[2px] border-[#5ECCB9]">
              ointment is Co
            </span>
            nfirmed
          </p>

          <p className="my-[70px] text-[18px] mx-[65px]  text-[#464D59]">
            If you need to reschedule or cancel your appointment, please let us
            know as soon as possible. Our team is always available to answer any
            questions you may have. Thank you for choosing our services, and we
            look forward to seeing you soon.
          </p>
          <button
            className="text-white bg-[#5ECCB9] px-[100px] py-2 rounded-md mb-[150px] "
            onClick={handleConfirmed}
          >
            Okay
          </button>
        </div>
      </div>

      {/* <div className='text-white bg-[#5ECCB9]' onClick={() => navigate('/Step')}>
        
      </div> */}
    </div>
  )
}

export default AppointmentConfirmed
