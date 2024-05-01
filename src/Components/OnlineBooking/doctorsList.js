import React, { useState ,useEffect} from "react";
import { DoctorsInfo } from "./data";
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import dr1 from "..//../assets/images/dr1.jpg"
import { useParams } from "react-router-dom";

function DoctorsList(props) {
    
  const [drList, setDrList] = useState([]);
  const navigate = useNavigate();
  const dp_id=1;
  const {id}=useParams();
  console.log('Id is',id);

  const handleDrList=async()=>{
    const Apidata=await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/booking/dentist/${id}`)
    .then((res)=>{
      console.log('Api response dr list',res.data.data);
      setDrList(res.data.data)
    });
    // console.log('Api response',drList);
  }
  const handleInfo =(id) => {
    const filterData=drList.filter(info =>{
        return info.id===id
    })
    // setDrInfo(filterData)
    console.log(filterData)
     navigate(`/appTypes/${id}`,
    {state:{filterData}})
    
  };
useEffect(()=>{
  handleDrList()
},[])

  return (
    <div>
      <div className="max-w-[130vw] ">
        <div className="grid grid-cols-1  py-6 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="  row-span-1 rounded-[10px] ">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {drList?.map((item) => {
                return (
                  <>
                    <div
                      className="grid grid-cols-2 rounded-[10px] border-2 border-slate-200 p-4 cursor-pointer"
                      onClick={()=>handleInfo(item.id)}
                      key={item.id}
                      id={item.id}
                    >
                      <div className="">
                        {item.dp_url ? (<img
                          src={`${process.env.REACT_APP_BACKEND_API_URL}/api/files/${item.dp_url}`}
                          alt="doctors"
                          className="w-[100px] xl:w-[120px] h-[100px] rounded-[20px]"
                        />) : (<img
                          src={dr1}  
                          alt="doctors"
                          className="w-[100px] xl:w-[120px] h-[100px] rounded-[20px]"
                        />)}
                       </div>
                      <div className="ml-2 mt-5">
                        <p className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[25px]    font-semibold">{item.name}</p>
                        <p className="text-[14px]">{item.email}</p>
                      </div>
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

export default DoctorsList;
