import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
// import { DatePicker, Space } from "antd";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";

function PatientInfo(props) {
  const location = useLocation();
  const AddSlot = location?.state;
  console.log('final data on last page',AddSlot);
  // const avId = AddSlot?.AddSlot?.arr[0][0]?.id;
  const avId = AddSlot?.arr[0][0]?.id;
  const DocId = AddSlot?.AddSlot?.arr[0][0]?.id;
  const atId = AddSlot?.AddSlot?.arr[1][0]?.id;
  const priority = AddSlot?.AddSlot?.arr[1][0]?.priority;
  const InsId = AddSlot?.AddSlot?.arr[2][0]?.id;
  const startTime = AddSlot?.AddSlot?.arr[3][0]?.startTime;
  const endTime = AddSlot?.AddSlot?.arr[3][0]?.endTime;

  const [loading, setLoading] = useState(false);

  // const inputDateStr = startTime.toString();
 console.log('Start Time',startTime);
  console.log('End Time',endTime);
  console.log('AVid',avId);
  
  // console.log('atId',AddSlot.AddSlot.arr[1][0].id);
  // console.log('Time Slots',AddSlot.AddSlot.arr[2][0]);
  const [pateintInfo, setPatientInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    avId: avId.toString(),
    atId: atId.toString(),
    startTime: startTime.toString(),
    endTime:endTime.toString(),
    d_id: DocId.toString(),
    insId:parseInt(InsId),
    priority:parseInt(priority)
  });
  const navigate = useNavigate();

  //   const handleInput = (e) => {
  //     const name = e.target.name;
  //     const value = e.target.value;
  //     console.log(name, value);
  //     setPatientInfo({ ...pateintInfo, [name]: value });
  //   };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setPatientInfo({
      ...pateintInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("PatientInfo", pateintInfo);
    const ApiCall = await axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment`, pateintInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate("/appointmentBook", { state: { AddSlot } });
        } else {
          alert("Something wrong in filling up the form");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    
  };
  //   const onChange = (date, dateString) => {
  //     console.log(date, dateString);
  //   };

  const handleDateChange = (date) => {
    // console.log(formattedDate);
    setPatientInfo({
      ...pateintInfo,
      dob: date,
    });
  };

  const onChange=(date, dateString)=>{
    setPatientInfo({
      ...pateintInfo,
      dob: dateString,
    });
  }

  return (
    <div>
      <div className="max-w-[130vw]">
        <div className="flex justify-center  py-6 px-16">
          <div className="py-10 px-4 md-px-10 m-4 border-2 border-slate-200 drop-shadow-lg w-[15pc] sm:w-[20pc] md:w-[25pc] lg:w-[45pc] xl:w-[65%] rounded-[10px]">
            <div>
              <p className="mb-3">
                Enter Patients Info<span className="text-[red]">*</span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="md:flex lg:flex lg:justify-between xl:flex xl:justify-between">
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="p-3 m-2 w-[100%] md:w-[50%] lg:w-[50%] xl:w-[45%]"
                    required
                    name="fname"
                    value={pateintInfo.fname}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="p-3 m-2 w-[100%] md:w-[50%] lg:w-[50%] xl:w-[45%]"
                    required
                    name="lname"
                    value={pateintInfo.lname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-0 md:my-6 lg:my-6 lg:mr-4 xl:my-6">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="p-3 m-2 w-full"
                    required
                    name="email"
                    value={pateintInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-2 md-flex  md:my-6 lg:flex lg:my-6 xl:flex xl:my-6">
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="p-3 m-2 w-full lg:w-[50%] xl:w-[50%]"
                    required
                    name="phone"
                    value={pateintInfo.phone}
                    onChange={handleInputChange}
                  />
                  <div className="ml-0 px-2 mt-2 lg:mt-4 md:ml-20 xl:ml-20 lg:ml-10">
                    <label>
                      Gender:
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={pateintInfo.gender === "male"}
                        onChange={handleInputChange}
                        className="ml-2 sm:ml-6 md:ml-4 lg:ml-4 xl:ml-4"
                      />
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={pateintInfo.gender === "female"}
                        onChange={handleInputChange}
                        className="ml-2 sm:ml-6 md:ml-4 lg:ml-4 xl:ml-4"
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className="my-2 md-flex  md:my-6 lg:flex lg:my-6 lg:mr-3 lg:ml-2 xl:flex xl:my-6">
                  {/* <DatePicker
                    selected={pateintInfo.dob}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Enter Dob"
                    className="w-[210px]   sm:w-[290px] md:w-[370px] lg:w-[345px] xl:w-[430px] p-2"
                    name="dob"
                  /> */}

<Space direction="vertical">
    <DatePicker onChange={onChange} 
    // value={pateintInfo.dob}
     placeholderText="Enter Dob"
     className="w-[210px]   sm:w-[290px] md:w-[370px] lg:w-[345px] xl:w-[430px] p-2"
     name="dob" />
    </Space>
                  <div className="mt-3 mb-2 md:mt-5 lg:mt-0  xl:mt-0 lg:ml-0 xl:ml-[100px]">
                    <label>
                      Marital Status: 
                      <select
                        name="maritalStatus"
                        value={pateintInfo.maritalStatus}
                        onChange={handleInputChange}
                        className="px-6 sm:px-4 md:px-10 lg:px-6 xl:px-6 ml-3 py-2 rounded-lg drop-shadow-lg"
                      >
                        <option value="">-- Please select --</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="text-center mt-[50px] ">
                  <button
                    className="w-full rounded-lg bg-gradient-to-r flex justify-center items-center from-sea-green to-dashboard-green 
                    text-white p-2 "
                    type="submit"
                  >
                    SUBMIT
                    <span>
                        <ClipLoader
                          cssOverride={{ display: "block", marginLeft: "1rem", borderColor: "white",}}
                          color={"black"}
                          loading={loading}
                          size={20}
                        />
                      </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
