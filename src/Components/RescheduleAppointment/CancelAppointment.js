import React, { useState } from "react";
import { useParams } from "react-router";
import { CancelReason } from "../PatientInfo/data";
import Popup  from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { IoClose } from "react-icons/io5";
import { Button, Modal } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import healthH from '../../assets/images/healthH.png'
import genesisG from '../../assets/images/genesisG.png'
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../Slices/PatientVerification";
// import { useSearchParams } from "react-router-dom";

function CancelAppointment(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
//     const [queryFetch] = useSearchParams();
//   const idManual = queryFetch.get("id");
  const { id } = useParams();
const navigate=useNavigate();
const dispatch=useDispatch();


  const handleOk = () => {
    console.log('You cancel the Appointment');
    dispatch(cancelAppointment({app_id:+id})).unwrap().then((x)=>{
      console.log('canclexxxxxxxxxxx',x);
      if(x)
      {
        setIsModalOpen(false);
        navigate('/cancelAppointmentConfirmed')

      }
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClick = (id) => {
   
        setIsModalOpen(true);
      };
  return (
    <div>
      {/* Cancel Appointment of Patient {id} */}

      <div>
        <img src={healthH} className="fixed top-0 left-0" />
      </div>
      <div>
        <img src={genesisG} className="opacity-70 fixed bottom-0 right-0" />
      </div>
      <Header/>
      {/* <div className="max-w-[130vw] ">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 gap-6"> */}
            <div className="mx-[100px]">
              <p className="mb-3 text-[16px] font-semibold">
                Why are you cancel the Appointment? Kindly provide us the
                reason..!!
                <span className="text-[red]"> * </span>
              </p>
              {CancelReason?.map((item) => {
                return (
                  <>
                    <div
                      className="grid grid-cols-1 p-4 mt-5  rounded-[10px] drop-shadow-lg  bg-[#f2f3f4] hover:bg-slate-100 cursor-pointer"
                      id={item.id}
                      key={item.id}
                      // onClick={handleClick.bind(this, item.type)}
                      onClick={() => handleClick(item?.id)}
                    >
                      <p className="text-[18px]">{item?.reason}</p>
                    </div>
                  </>
                );
              })}
              
              </div>
         
        <Modal title="Cancel the Appointment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              No
            </Button>,
            <Button key="submit"   onClick={handleOk} style={{color:'white'}} 
            >
              Yes
            </Button>]}>
        <p className="text-[15px] font-semibold mt-10">Are you sure to cancel the Appointment?</p>
      </Modal>
  </div>
  );
}

export default CancelAppointment;
