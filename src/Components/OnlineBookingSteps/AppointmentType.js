import React, { useState, useEffect } from 'react'
import { appTypes } from '../AppointmentTypes/data'
import { AppointmentTypes } from './data'
import CancelButton from '../CancelButton/CancelButton'
import { Input, Space } from 'antd'
import { FaSearch } from 'react-icons/fa'
import { NotificationWithIcon } from '../../utils/Notification'
import { useParams } from 'react-router'
import {
  getAppointmentType,
  storeAppointmentType,
} from '../Slices/PatientVerification'
import { useDispatch, useSelector } from 'react-redux'
import { BounceLoader } from 'react-spinners'

function AppointmentType({ setCurrent, current }) {
  const app = useSelector((state) => state?.PatientReducer?.appointmentType)
  const apptfor_ = useSelector((state) => state?.PatientReducer?.apptfor_)
  console.log('apptfor_aaaaa',apptfor_);
  const [searchTerm, setSearchTerm] = useState('')
  const [appointment, setAppointment] = useState('')
  const [appId, setAppId] = useState(app?.type ? app?.type : '')
  const [loading, setLoading] = useState(true)

  const appointmentTypes = useSelector(
    (state) => state?.PatientReducer?.appointmentTypes
  )

  console.log('Appoint Typeaaaaaaaaaaaaaaaaa', app)

  console.log('Appoint Types', appointmentTypes)

  const dispatch = useDispatch()
  let appIds
  const handleInputChange = (event) => {
    console.log('search item', event.target.value)
    setSearchTerm(event.target.value)
  }

  const { id } = useParams()

  const filteredAppointmentTypes = appointmentTypes?.filter((item) =>
    item?.type?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAppointment = (appointment) => {
    console.log('dsadsadsads', appointment)
    dispatch(storeAppointmentType(appointment))
    setAppointment([appointment])
    setAppId(appointment)
    // appId=appointment.id;
  }

  const handleSubmit = () => {
    // console.log('handleSubmit');
    if (app) {
      console.log('handleSubmit current')
      setAppId(app.type)
      setCurrent(4)
    } else {
      NotificationWithIcon('error', 'Please select any appointment type')
    }
  }

  const handleCheck = () => {
    NotificationWithIcon('error', 'Please select appointment type')
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getAppointmentType({ dp_id: id }))
  }, [])

  useEffect(() => {
    if (filteredAppointmentTypes) {
      
      setLoading(false)
    }
  }, [appointmentTypes])

  console.log('Appointment', appointment)
  console.log('AppointmentId', appId)
  return (
    <>
      <div className="flex justify-between ">
        <div className="ml-10 mt-10">
          <p className="text-[#464D59]">
            <span className="border-b-2 border-[#5ECCB9]">Select</span>{' '}
            Appointment Type
          </p>
        </div>
        <div className="mr-10 mt-10">
          <div className="flex items-center border border-gray-400 rounded-lg py-1 px-10 bg-[#f1f4f9]">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name"
              className="bg-transparent focus:outline-none w-full"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 px-10">
        {loading ? (
          <>
            <div className="flex justify-center mt-20">
              <BounceLoader color="#34d5b5" />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-6 mb-10">
              {filteredAppointmentTypes?.map((item) => {
                const isSelected = app?.type === item?.type
                return (
                  <div
                    className={`py-5 ${
                      isSelected
                        ? 'bg-[#14226D] text-white'
                        : 'bg-[#f1f4f9] text-[#464D59]'
                    } text-center text-[16px] rounded-md mx-2 my-4 p-3 text-[#464D59] cursor-pointer`}
                    key={item?.type}
                    onClick={() => handleAppointment(item)}
                  >
                    {item?.type}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <div className="mt-[50px] flex justify-end"> 
        {appId.length != 0 ? (
          <button
            className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]  "
            htmlType="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]  "
            type="button"
            onClick={handleCheck}
          >
            Submit
          </button>
        )}
        <CancelButton setCurrent={setCurrent} current={current} />
      </div>
    </>
  )
}

export default AppointmentType
