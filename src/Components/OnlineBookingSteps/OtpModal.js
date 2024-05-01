import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import otpImage from '../../assets/images/otp.png'
import { useRef } from 'react'
import {
  fetchPatientForRelation,
  getPatientVerification,
  storeAddPatientOtp,
  storeOTP,
} from '../Slices/PatientVerification'
import { NotificationWithIcon } from '../../utils/Notification'
import { useDispatch, useSelector } from 'react-redux'

const OtpModal = ({
  setCurrent,
  current,
  patientId,
  PhoneNoVerification,
  editPhoneVerification,
  handleAddPatient,
  setOTPModal,
  otpCheckForPhone,
  setOtpCheckForPhone,
  updatePhoneField,
  setEditPhoneVerification,
  setSelected,
  selected  
}) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  // const dataToBeSend = useSelector(state => ({ ...state.Patient.patientSearchData, sid: state.Patient.sid }));
  const sid = useSelector((state) => state?.PatientReducer?.sid)
  console.log('sidddddddddd', sid)
  //   const phoneNum = useSelector(
  //     (state) => state?.VerifyPatientPhoneNo?.patientPhoneNo
  //   )
  const [loading, setLoading] = useState(false)
  const [otpInputs, setOtpInputs] = useState(['', '', '', ''])
  const otpInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ])

  //   const handleKeyPress = (e) => {
  //     const regex = /^[0-9]*$/
  //     const isValid = regex.test(e.key)
  //     if (!isValid) {
  //       e.preventDefault()
  //     }
  //   }

  const handleSubmit = () => {
    setLoading(true)
    const otp = otpInputs.join('')
    console.log(otp, 'Otttttttttttttppppppp')
    // debugger
    dispatch(storeOTP(otp))
    // console.log({ dataToBeSend })
debugger
    //For Add New Patient
    if (otpCheckForPhone == false) {
      debugger
      dispatch(
        fetchPatientForRelation({
          patientPhoneNo: "+1"+PhoneNoVerification,
          sid,
          otp,
          patientId
        })
      )
        .unwrap()
        .then((x) => {
          console.log(x, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
          setLoading(false)
          dispatch(storeAddPatientOtp(x))
          handleAddPatient(x)
          setOtpInputs(['', '', '', ''])
          setOTPModal(false)
          setOtpCheckForPhone(false)
          // setCurrent(2)
        })
        .catch((e) => {
          setLoading(false)
          // console.log(e.response.data.message, 'error in otp component')
          if (e?.response?.data?.message === 'OTP does not match') {
            NotificationWithIcon('error', 'Wrong OTP')
            setOtpInputs(['', '', '', ''])
            otpInputRefs.current[0].current.focus()
          }
        })
    } else {
      //For Edit phone number
      dispatch(
        fetchPatientForRelation({
          patientPhoneNo: editPhoneVerification,
          sid,
          otp,
          patientId
        })
      ).unwrap()
        .then((x) => {
          console.log(x, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
          setLoading(false)
          dispatch(storeAddPatientOtp(x))
          //   handleAddPatient(x)
          updatePhoneField()
          setOtpInputs(['', '', '', ''])
          setOTPModal(false)
          setOtpCheckForPhone(false)
          setEditPhoneVerification('')
        //   setSelected(selected);
          // setCurrent(2)
        })
        .catch((e) => {
          setLoading(false)
          console.log(e?.response.data?.message, 'error in otp component')
          if (e?.response?.data?.message === 'OTP does not match') {
            NotificationWithIcon('error', 'Wrong OTP')
            setOtpInputs(['', '', '', ''])
            otpInputRefs.current[0].current.focus()
          }
        })
    }
  }

  const handleOtpInputChange = (value, index) => {
    const updatedInputs = [...otpInputs]
    updatedInputs[index] = value
    setOtpInputs(updatedInputs)

    // Automatically focus on the next input if a number is entered
    if (value && index < otpInputs.length - 1) {
      otpInputRefs.current[index + 1].current.focus()
    }
  }

  // Check if the current input is the last one and all inputs are filled
  // if (index === otpInputs.length - 1 && updatedInputs.every(input => input !== "")) {
  //     // Call your function here
  //     handleSubmit();
  // }

  useEffect(() => {
    if (otpInputs.join('').length === 4) {
      handleSubmit()
      console.log(otpInputs)
    }
  }, [otpInputs])

  return (
    <div className="w-full min-h-full bg-white">
      <div className="w-full h-[350px] mt-4 flex justify-center">
        <img src={otpImage} alt="otp" height={330} />
      </div>
      <div className="w-full mt-5 flex justify-center items-center flex-col">
        <p className="text-center text-gray-500 ">
          An <span className="font-bold">OTP</span> has been send on your
          registered number
        </p>
        <p className="text-center text-gray-500 ">
          Please Enter <span className="font-bold">OTP</span> in below box
        </p>
      </div>
      <div className="w-full mt-3 flex justify-center">
        <Form form={form} onFinish={() => {}}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Enter Patient's Mobile Number",
              },
            ]}
          >
            {otpInputs.map((inputValue, index) => (
              <Input
                key={index}
                size="large"
                style={{
                  width: 60,
                  border: '2px solid #2E8B57',
                  marginRight: 8,
                  textAlign: 'center',
                  color: '#2E8B57',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
                autoFocus={index === 0} // Autofocus only on the first input
                value={inputValue}
                placeholder="0"
                // onKeyPress={handleKeyPress}
                maxLength={1} // Limit each input to a single character
                onChange={(e) => handleOtpInputChange(e.target.value, index)}
                ref={otpInputRefs.current[index]}
              />
            ))}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default OtpModal
