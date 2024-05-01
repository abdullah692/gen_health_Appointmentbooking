import React from 'react';
import ReschduleSideCal from './RescheduleSideCal';
import RescheduleSlot from './ResheduleSlot';
import healthH from '../../assets/images/healthH.png'
import genesisG from '../../assets/images/genesisG.png'
import Header from '../Header/Header';

function RescheduleApp(props) {
    return (
        <div>
             <div>
        <img src={healthH} className="fixed top-0 left-0" />
      </div>
      <div>
        <img src={genesisG} className="opacity-70 fixed bottom-0 right-0" />
      </div>
      <Header/>
      <div className="!mt-[50px] mx-[100px] md:max-h-[400px] lg:max-h-[520px] xl:max-h-[600px] overflow-auto rounded-md mb-10 bg-white px-8 py-2">
        <RescheduleSlot/>
      </div>

        </div>
    );
}

export default RescheduleApp;