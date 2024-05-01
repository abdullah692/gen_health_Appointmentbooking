import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { AvailableSlots } from './data'
import PatientInfo from '../PatientInfo/PatientInfo'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Button, Modal } from 'antd'
import dayjs from 'dayjs'
import { BounceLoader } from 'react-spinners'
import {
  convertTimeToMinutes,
  generateTimeSlots,
  getTodayDay,
} from '../../utils/util'

function Slots(props) {
  const [selected, setSelected] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [active, setActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSlots, setShowSlots] = useState([])
  const [rescheduleDuration, setRescheduleDuration] = useState()

  const slotsData = AvailableSlots
  const arr = []
  let selectedDaySlot
  const navigate = useNavigate()
  const location = useLocation()
  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP EEEE')}</p>
    console.log('Date fomrat', format(selected, 'PP'))
    console.log('Selected', selected)
  }
  console.log('true', isModalOpen)
  const [queryFetch] = useSearchParams()
  const idManual = queryFetch.get('id')
  const d_idManual = queryFetch.get('d_id')
  console.log('manunal', idManual)
  console.log('Dr manual', d_idManual)

  const AddSlot = location.state
  console.log('Add Slots', AddSlot)
  const handleSlots = (id, startTime, endTime) => {
    console.log('StartTimeaaaaaaaaaaaaaaaaaa', startTime)
    console.log('EndTime', endTime)
    const date = new Date(format(selected, 'PP'))
    console.log('Date is', date)
    const startDate = new Date(`${date?.toDateString()} ${startTime}`)
    console.log('startDate', startDate)
    const endDate = new Date(`${date?.toDateString()} ${endTime}`)
    console.log('endDate', endDate)
    setStartTime(startDate)
    setEndTime(endDate)

    const actualData = slotsData.map(slot => {
      return {
        ...slot,
        startTime: startDate,
        endTime: endDate,
      }
    })

    console.log('Available Slots', AvailableSlots)

    const SlotfilterData = actualData.filter(info => {
      return info.id === id
    })
    console.log('Slots Filter data', SlotfilterData)
    AddSlot?.arr?.push(SlotfilterData)
    let SlotValue
    if (selected) {
      const sel = format(selected, 'EEEE').toLowerCase()
      SlotValue = availableSlots.filter(eachDay => eachDay.days === sel)
    }
    console.log('Select Day Slot', SlotValue)
    arr?.push(SlotValue)

    console.log('Slot Appointment', AddSlot)

    if (idManual && d_idManual) {
      setIsModalOpen(true)
    } else {
      navigate('/patientInfo', { state: { AddSlot, arr } })
    }
  }

  const handleOk = async () => {
    console.log('StartTime Api', startTime)
    console.log('endTime Api', endTime)
    console.log('You cancel the Appointment')
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment/reschedule/${idManual}`,
      {
        startTime: startTime.toString(),
        endTime: endTime.toString(),
      }
    )

    console.log('Put request ', res.data)

    setIsModalOpen(false)
    navigate('/rescheduleAppointmentConfirmed')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleTimeSlots =async () => {
    const Docid = AddSlot?.arr[0][0]?.id
    console.log('DocId', Docid)
    setLoading(true)
    let docId
    if (!d_idManual) docId = Docid
    else docId = d_idManual

    const res =await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/availability/${docId}`
    )

    const data = res?.data?.data
    console.log('Slots Api response Dr', data)
    setAvailableSlots(data)
    const dayOfWeek = getTodayDay();
    console.log('dayOfWeek',dayOfWeek);
    const selectedDaySlot = data?.filter(eachDay => eachDay.days === dayOfWeek)
    console.log(selectedDaySlot, 'selectedDaySlotselectedDaySlot')
    const duration = convertTimeToMinutes(AddSlot.arr[1][0].duration)

    let timeSlots = []
    if (selectedDaySlot[0]?.start_time && selectedDaySlot[0]?.end_time) {
      timeSlots = generateTimeSlots(
        selectedDaySlot[0]?.start_time,
        selectedDaySlot[0]?.end_time,
        duration
      )
    }
    console.log(timeSlots, 'timeSlotstimeSlots')
    setShowSlots(timeSlots)

    setLoading(false)
  }

  const handleReschedule =async () => {
    setLoading(true)

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment/detail/${idManual}`
    )

    const data = res?.data?.data
    console.log('Set Slots Api response ', data)
    setAvailableSlots(data.Availability)
    const duration = convertTimeToMinutes(data.AppointmentType.duration)
    setRescheduleDuration(duration)
    const dayOfWeek = getTodayDay()
    console.log('dayOfWeek',dayOfWeek);
    const selectedDaySlot = data.Availability.filter(
      eachDay => eachDay.days === dayOfWeek
    )
    console.log(selectedDaySlot, 'selectedDaySlotselectedDaySlot reschedule')

    if (selectedDaySlot[0]?.start_time && selectedDaySlot[0]?.end_time) {
      let timeSlots = []
      timeSlots = generateTimeSlots(
        selectedDaySlot[0]?.start_time,
        selectedDaySlot[0]?.end_time,
        duration
      )
      console.log(timeSlots, 'timeSlotstimeSlots')
      setShowSlots(timeSlots)
    }

    setLoading(false)
  }

  console.log('Pathname', location.pathname)

  useEffect(() => {
    if (selected && availableSlots.length) {
      const sel = format(selected, 'EEEE').toLowerCase()
      selectedDaySlot = availableSlots.filter(eachDay => eachDay.days === sel)
      let duration
      if (!d_idManual)
        duration = convertTimeToMinutes(AddSlot.arr[1][0].duration)
      else duration = rescheduleDuration
      let timeSlots = []
      if (selectedDaySlot[0]?.start_time && selectedDaySlot[0]?.end_time) {
        timeSlots = generateTimeSlots(
          selectedDaySlot[0]?.start_time,
          selectedDaySlot[0]?.end_time,
          duration
        )
      }
      console.log(timeSlots, 'timeSlotstimeSlots')
      setShowSlots(timeSlots)

      if (selectedDaySlot.length > 0) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
  }, [availableSlots, selected, rescheduleDuration])

  console.log('Add Slot', AddSlot)

  useEffect(() => {
    if (d_idManual) handleReschedule()
    else handleTimeSlots()
  }, [])
  return (
    <div>
      <div className='max-w-[130vw]'>
        <div className='grid grid-cols-1  py-6 px-16'>
          <div className='  row-span-1 rounded-[10px] '>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
              <div className='col-span-1 w-[400px]'>
                <DayPicker
                  mode='single'
                  selected={selected}
                  onSelect={setSelected}
                  footer={footer}
                  showOutsideDays
                  className='text-[18px]'
                />
              </div>
              <div className='grid grid-cols-3 h-[200px] ml-0 sm:ml-0 md:ml-0 xl:ml-[-100px] !mb-3'>
                {active == true ? (
                  <>
                    {showSlots.map(val => {
                      return (
                        <>
                          {/* <div className="row-span-2"> */}

                          <div
                            className='w-[250px] md:w-[200px] lg:w-[180px] xl:w-[220px] h-[70px] mb-3 text-center border-2 border-slate-300 p-5 m-3 cursor-pointer hover:bg-slate-100'
                            onClick={() =>
                              handleSlots(val.id, val.startTime, val.endTime)
                            }
                            key={val.id}
                            id={val.id}
                          >
                            <p>
                              {val?.startTime} - {val?.endTime}
                            </p>
                          </div>
                          {/* </div> */}
                        </>
                      )
                    })}
                  </>
                ) : loading == true ? (
                  <div className='flex justify-center mt-20'>
                    <BounceLoader color='#34d5b5' />
                  </div>
                ) : (
                  <p className='p-4 text-[20px] font-semibold'>
                    No Slots Available
                  </p>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {isModalOpen == true ? (
          <Modal
            title='Reschedule Appointment'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key='back'
                onClick={handleCancel}
                style={{ color: 'black', backgroundColor: '#f27e93' }}
              >
                No
              </Button>,
              <Button
                key='submit'
                type='primary'
                onClick={handleOk}
                style={{ color: 'black', backgroundColor: 'lightblue' }}
              >
                Yes
              </Button>,
            ]}
          >
            <p className='text-[15px] font-semibold mt-10'>
              Do you want to Reschedule the Appointment?
            </p>
          </Modal>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Slots
