import { Input, Form, InputNumber } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storePatientPhoneNo } from '../Slices/PatientNoSlice'
import { setPatientPhone, getPatientOTP, getPatientVerification, setPatientNRealtionEmpty, storeChildPatientRelationData, storeParentPatientData, storeSid } from '../Slices/PatientVerification'
import { NotificationWithIcon } from '../../utils/Notification'
import { ClipLoader } from 'react-spinners'

// import { storePatientPhoneNo } from '../Slices/PatientNoSlice'

function PatientVerification({ current, setCurrent }) {
  console.log('the current state is', current)
  const phoneNum=useSelector((state)=>state?.VerifyPatientPhoneNo?.patientPhoneNo);
  let numberWithoutPrefix = phoneNum.substring(2);

  const [phoneNo, setPhoneNo] = useState(numberWithoutPrefix);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const PatientVerification = useSelector(
    (state) => state.PatientReducer.verifyPatient
  )
  
  //
  

  const handleInputChange = (e) => {
    const value = e.target.value
    const newValue = value.replace(/[^\+0-9]/g, '')
    e.target.value = newValue
    console.log('Phone No', newValue)
    
    setPhoneNo(e.target.value)
  }
  
  const numVerification = (newValue) => {
    dispatch(storePatientPhoneNo("+1"+newValue));
  }

  //   const handleSubmit = (values) => {
  //     form
  //       .validateFields()
  //       .then(() => {
  //         // if all fields are filled out, submit the form
  //         console.log('Form submitted successfully!', values)
  //         setCurrent(1)
  //       })
  //       .catch((error) => {
  //         console.log('Form submission error:', error)
  //       })
  //   }

  const handleSubmit = async (values) => {
    try {
      console.log(values,'vvvvv');
      setLoading(true);
      numVerification(phoneNo);
      console.log('Form submitted successfully!', values)
      setCurrent(1);
      setLoading(false)
      dispatch(setPatientPhone({ patientPhoneNo: phoneNo }))
      //   .unwrap()
      //   .then((x) => {
      //     console.log('xOTP', x)
          // if (x.message == "No Patient Found") {
          //   debugger
          //   setLoading(false);
          //   dispatch(setPatientNRealtionEmpty());
          //   setCurrent(2);
          // } else {
          //   setCurrent(1);
          //   dispatch(storeSid(x.sid))
          //   // NotificationWithIcon('error', 'There is some error with Network')
          // }
          // if(x){
          //   setCurrent(1);
          //   dispatch(storeSid(x.sid))
          // }
          
    } catch (error) {
      setLoading(false);
      console.log('Form submission error:', error)
    }
    //         console.log('Form submitted successfully!', values)
    //         setCurrent(1)
  }

  const validatePhoneNumber = (_, value) => {
    if (value && value.length !== 10) {
      return Promise.reject("Phone number must be 10 digits!");
    }
    return Promise.resolve();
  };

  const [form] = Form.useForm()

  return (
    <div>
      <div className="mt-10  ">
        <p className="flex justify-center text-[#464D59] text-[16px] font-semibold ">
          <span className="my-5 border-b-2 border-[#5ECCB9]">
            Enter Patient Phone Number
          </span>
        </p>
        <p className="mt-4 text-[#464D59] text-center mx-[150px]">
          In order to keep in touch with you, we kindly request that you provide
          us with your phone number. This information will be kept confidential
          and will only be used for the purposes of communicating with you about
          your medical care.
        </p>
      </div>
      <div className="text-center mt-10">
        {/* <input
          type="number"
          placeholder="Phone Number"
          className="p-3 m-2 w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%] border-2 border-slate-200  rounded-md"
          required
          name="fname"
          //   value={pateintInfo.fname}
          onChange={handleInputChange}
        /> */}
        <Form form={form} onFinish={handleSubmit} initialValues={{ phone: phoneNo }}>
          <Form.Item
            name="phone"
            // label="Phone Number"
            rules={[
              {
                required: true,
                message: "Phone number must be 10 digits!!",
                validator:validatePhoneNumber
              },
              
            ]}
          >
            <Input
              name="phone"
              addonBefore="+92"
              onChange={handleInputChange}
              maxLength={10}
              value={phoneNo}
              placeholder="Phone Number"
              className="p-3 m-2 w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]   rounded-md"
              onKeyDown={(e) => {
                if (
                  e.key !== 'Backspace' &&
                  e.key !== 'Delete' &&
                  e.key !== 'ArrowLeft' &&
                  e.key !== 'ArrowRight' &&
                  e.key !== 'ArrowUp' &&
                  e.key !== 'ArrowDown' &&
                  e.key !== 'Tab' &&
                  (e.key < '0' || e.key > '9')
                ) {
                  e.preventDefault()
                }
              }}
            />
          </Form.Item>
          <Form.Item>
            {
              !loading ? (
                <>
                  <button
              className="text-white bg-[#5ECCB9] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]
         py-2 rounded-md mb-10 mt-4" 
            >
            Enter
            </button>
                </>
              ): (
                <>
                <button
              className=" text-white bg-[#5ECCB9] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]
         py-2 rounded-md mb-10 mt-4" type='submit'
            >
             <div className='flex justify-center'>
             Enter <ClipLoader color="white" className='ml-5' size={25}/>
              </div>
            </button>
                </>
              )
            }
            
          </Form.Item>
        </Form>
        <br />

      
      </div>
    </div>
  )
}

export default PatientVerification
