import React from 'react'
import healthH from '../../assets/images/healthH.png'
import genesisG from '../../assets/images/genesisG.png'
import Header from '../Header/Header'

function CancelPage(props) {
  return (
    <div>
      <div>
        <img src={healthH} className="fixed top-0 left-0" />
      </div>
      <div>
        <img src={genesisG} className="opacity-70 fixed bottom-0 right-0" />
      </div>
      <Header />

      <div className="text-[20px] mt-[200px] font-serif text-center">
        Appointment has been Cancelled Successfully..!!
      </div>
    </div>
  )
}

export default CancelPage
