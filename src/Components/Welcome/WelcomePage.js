import React from 'react'
import genesisWelcome from '../../assets/images/genesisWelcome.png'
import healthWelcome from '../../assets/images/healthWelcome.png'
import { useNavigate } from 'react-router'
import Header from '../Header/Header'

function Welcome(props) {
  const navigate = useNavigate()

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
          <p className="text-[#464D59] text-[30px] font-semibold">
            Welco
            <span className="border-b-[2px] border-[#5ECCB9]">
              me to Genesis
            </span>{' '}
            Health
          </p>

          <p className="my-[70px] text-[17px] mx-[65px] text-[#464D59]">
            We would like to remind you to schedule your upcoming dental
            appointment with us. Regular dental check-ups are an important part
            of maintaining good oral health, and our team of experienced dental
            professionals is here to help you every step of the way. To book
            your appointment, simply give us a call or use our online booking
            system to find a time and date that works best for you. We offer a
            range of dental services, including cleanings, fillings, and
            cosmetic procedures, and we strive to provide our patients with the
            highest quality care possible. Don't hesitate to contact us today to
            book your next appointment and take the first step towards a
            healthier smile.
          </p>
          <button
            className="text-white bg-[#5ECCB9] px-8 py-2 rounded-md mb-10"
            onClick={() => navigate('/Step')}
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* <div className='text-white bg-[#5ECCB9]' onClick={() => navigate('/Step')}>
        
      </div> */}
    </div>
  )
}

export default Welcome
