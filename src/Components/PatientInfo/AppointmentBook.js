import React from "react";
import tick from "../../assets/images/tick.png"
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

function AppointmentBook(props) {
  const location = useLocation();
  const AddSlot = location.state;
  console.log('Add slot',AddSlot);
  const navigate=useNavigate();
  const id=1;
  const d_id=AddSlot.AddSlot.AddSlot.arr[1][0].d_id;
  const handleCancel=()=>{
    navigate(`/cancelAppointment/${id}`)
  }
  const handleReschedule=()=>{
    navigate(`/slots/?d_id=${d_id}&id=${id}`)
  }
  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center mt-[200px]">
              <p className="text-[20px] font-medium text-center">
                
                Appointment Booked Successfully
              </p>
                <img src={tick} className="w-[30px] h-[30px]"/>
              </div>
              {/* <div className="flex justify-center">
                <button className="m-4 border-2 py-2 px-4 rounded-md " onClick={handleCancel}>Cancel Appointment</button>
                <button className="m-4 border-2 py-2 px-4 rounded-md" onClick={handleReschedule}>Reschedule Appointment</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBook;
