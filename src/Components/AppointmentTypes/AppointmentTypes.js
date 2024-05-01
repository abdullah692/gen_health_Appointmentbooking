import { App } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function AppointmentTypes(filterData) {
  const [appTypes, setAppTypes] = useState([]);
  const [data,setData]=useState();
  const arr = [];
  const location = useLocation();
  const navigate = useNavigate();

  const d_id = location.state.filterData[0].id;
  console.log('d_id apt types',d_id);

  const handleAppTypes = async () => {
    const Apidata = await axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointmenttypes/${d_id}`)
      .then((res) => {
        // console.log('Api response',res.data.data);
        setAppTypes(res.data.data);
      });
    // console.log('Api response',appTypes);
  };

  const handleClick = (id) => {
    const AppointmentVal = location.state.filterData;
    // AppointmentVal.forEach((appointment) => {
    //   appointment.appointmentType = value;
    // });

    console.log("Appointment", AppointmentVal);
    const filterData = appTypes.filter((info) => {
      return info.id === id;
    });
    // console.log("Filter data", filterData);
    arr.push(AppointmentVal,filterData)
    console.log("Appointment", arr);
    navigate("/insuranceTypes", { state: {arr} });
  };

  useEffect(() => {
    handleAppTypes();
  }, []);

  return (
    <div>
      <div className="max-w-[130vw] ">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 gap-6">
            <p className="mb-3 text-[16px] font-semibold">
              Which type of appointment you want ?<span className="text-[red]"> * </span>
              </p>
              {appTypes.map((item) => {
                return (
                  <>
                    <div
                      className="grid grid-cols-1 rounded-[10px] drop-shadow-lg p-4 bg-[#f2f3f4] hover:bg-slate-100 cursor-pointer"
                      id={item.id}
                      key={item.id}
                      // onClick={handleClick.bind(this, item.type)}
                      onClick={()=>handleClick(item.id)}
                    >
                      <p className="text-[18px]">{item.type}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentTypes;
