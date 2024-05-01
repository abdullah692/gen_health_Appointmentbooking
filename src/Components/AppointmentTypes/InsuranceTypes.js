import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Insurance } from "./data";
import { useNavigate } from "react-router";
import axios from "axios";

function InsuranceTypes(props) {
  const [active, setActive] = useState(false);
  const [Isinsurance, setIsInsurance] = useState([]);
  const arr = [];
  const location = useLocation();
  const navigate = useNavigate();

  const handleNoInsurance = (id) => {
    console.log("No Insuracne id", id);
    const Appointment = location.state.arr;
    const filterData = Insurance.filter((info) => {
      return info.id === id;
    });
    // console.log("Filter data", filterData);
    arr.push(...Appointment, filterData);
    navigate("/slots", { state: { arr } });
    console.log("Appointment Insuranace", arr);
    // console.log("Appoitment Insurance", Appointment);
  };
  const handleClick = () => {
    setActive(true);
  };

  const handleInsuranceTypes = (id) => {
    console.log('Id is',id);
    const Appointment = location.state.arr;
    const filterData = Isinsurance.filter((info) => {
        return info.id == id;
      });
      // console.log("Filter data", filterData);
      arr.push(...Appointment, filterData);
      navigate("/slots", { state: { arr } });
      console.log("Appointment Insuranace", arr);
  };

  const handleApi = async () => {
    const Apidata = await axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/booking/insurence`)
      .then((res) => {
        console.log("Api response", res.data.data);
        setIsInsurance(res.data.data);
      });
  };

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <div>
      <div className="max-w-[130vw] ">
        <div className="grid grid-cols-1  py-6 px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 gap-6">
              <p className="mb-3 text-[16px] font-semibold">
                Choose your Insucrance type ?
                <span className="text-[red]"> * </span>
              </p>
              {/* <div> */}
              {Insurance.map((item) => {
                return (
                  <div
                    className="grid grid-cols-1 rounded-[30px] drop-shadow-lg p-4 bg-[#c3ced8]  cursor-pointer"
                    // onClick={handleClick.bind(this, item.type)}
                    id={item.id}
                    key={item.id}
                    onClick={() => handleNoInsurance(item.id)}
                  >
                    <p className="text-[18px]">{item.insurance}</p>
                  </div>
                );
              })}
              {/* </div> */}
              <div
                className="grid grid-cols-1 rounded-[30px] drop-shadow-lg p-4 bg-[#c3ced8]  cursor-pointer"
                onClick={handleClick}
                // onClick={handleClick.bind(this, item.type)}
                //   onClick={()=>handleClick(item.id)}
              >
                <p className="text-[18px]">Choose Carrier and Plan</p>
              </div>
              {active ? (
                <>
                  {Isinsurance.map((item) => {
                    return (
                      <>
                        <div
                          className="grid grid-cols-1 rounded-[10px] drop-shadow-lg p-4 bg-[#f2f3f4] hover:bg-slate-100 cursor-pointer"
                          id={item.id}
                          key={item.id}
                          onClick={() => handleInsuranceTypes(item.id)}
                          // onClick={handleClick.bind(this, item.type)}
                          //   onClick={()=>handleClick(item.id)}
                        >
                          <p className="text-[18px]">{item.type}</p>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceTypes;
