import React from 'react'
import Header from '../Header/Header'
import healthH from '../../assets/images/healthH.png'
import genesisG from '../../assets/images/genesisG.png'

function RescheduleApproved(props) {
  return (
    <div>
      <div>
             <div>
        <img src={healthH} className="fixed top-0 left-0" />
      </div>
      <div>
        <img src={genesisG} className="opacity-70 fixed bottom-0 right-0" />
      </div>
      <Header/>
      </div>
          <div className="flex justify-center mt-[200px] text-[20px] font-serif text-center">
            Appointment has been Rescheduled Successfully..!!
          </div>
        </div>
     
  )
} 

export default RescheduleApproved
