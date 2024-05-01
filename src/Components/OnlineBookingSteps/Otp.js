import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import otpImage from '../../assets/images/otp.png'
import { useRef } from 'react'
import { getPatientVerification, storeOTP } from '../Slices/PatientVerification'
import { NotificationWithIcon } from '../../utils/Notification'
import { useDispatch, useSelector } from 'react-redux'

const Otp = ({ setCurrent, current }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  // const dataToBeSend = useSelector(state => ({ ...state.Patient.patientSearchData, sid: state.Patient.sid }));
  const sid = useSelector(state => state?.PatientReducer?.sid);
  console.log('sidddddddddd', sid);
  const phoneNum = useSelector(
    (state) => state?.VerifyPatientPhoneNo?.patientPhoneNo
  )

  console.log('phoneNumaaaaaaaa', phoneNum);
  const [loading, setLoading] = useState(false)
  const [otpInputs, setOtpInputs] = useState(['', '', '', ''])
  const otpInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ])

  const handleKeyPress = (e) => {
    const regex = /^[0-9]*$/
    const isValid = regex.test(e.key)
    if (!isValid) {
      e.preventDefault()
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    const otp = otpInputs.join('')
    console.log(otp, 'Otttttttttttttppppppp')
    dispatch(storeOTP(otp))
    if(otp =="1234")
    {
      NotificationWithIcon('success', 'OTP Verified Successfully!')
      setTimeout(() => {
        setCurrent(2)
      }, 1000);
    }
    else{
      NotificationWithIcon('error', 'Wrong OTP')
      setOtpInputs(['', '', '', ''])
      otpInputRefs.current[0].current.focus()
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
          Please Enter <span className="font-bold">1234 OTP</span> in below box
        </p>
      </div>
      <div className="w-full mt-3 flex justify-center">
        <Form form={form} onFinish={() => { }}>
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
                onKeyPress={handleKeyPress}
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

export default Otp
