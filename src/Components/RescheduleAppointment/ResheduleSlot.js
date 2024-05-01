import React, { useEffect, useState } from 'react'
import SideCalendar from '../SideCalendar/SideCalendar'
import { AvailableSlots, SlotsDummy } from '../OnlineBookingSteps/data'
import CancelButton from '../CancelButton/CancelButton'
import { useSelector, useDispatch } from 'react-redux'
import {
  putRescheduleAppointment,
  storeSelectedTimeSlot,
} from '../Slices/PatientVerification'
import { BounceLoader } from 'react-spinners'
import { NotificationWithIcon } from '../../utils/Notification'
import ReschduleSideCal from './RescheduleSideCal'
import dayjs from 'dayjs'
import RescheduleSideCal from './RescheduleSideCal'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

function RescheduleSlot({ setCurrent, current }) {
    const selectTimeSlot = useSelector(
        (state) => state?.PatientReducer?.selectedTimeSlot
      )
      console.log(selectTimeSlot,'vvvvvvvv');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [rescheduleAppointment, setRescheduleAppointment] = useState(false)
  // const [loading, setLoading] = useState(false);
  const timeSlots =
    useSelector(
      (state) => state?.PatientReducer?.appointmentSlots?.uniqueTimeSlots
    ) || {}

    const RescheduleAppInfo = useSelector(
        (state) => state?.PatientReducer?.appointmentInfoForReschedule
      )

      console.log('RescheduleAppInfo',RescheduleAppInfo);

  const loading = useSelector(
    (state) => state?.PatientReducer?.loading?.loading
  )
  const dayNdate = useSelector(
    (state) => state?.PatientReducer?.selectedDayNDate
  )
  const { id } = useParams()
  const navigate = useNavigate()
  console.log('loadingaaaaaaaaaaaaa', loading)
  // const checkSlots =
  // useSelector(
  //   (state) => state?.PatientReducer?.checkSlots
  // ) ;

  console.log('timeSlotsCheckfffffff', timeSlots)
  
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (selectTimeSlot) {
      console.log('selectTimeSlotccccccccaa', selectTimeSlot)
      setRescheduleAppointment(true)
    } else {
      NotificationWithIcon('error', 'Please select any time slot')
    }
    // console.log('handleSubmit');
    // if (appointment.length > 0) {
    //   console.log('handleSubmit current')
    //   setCurrent(3)
    // }
    // else{
    //     NotificationWithIcon("error", "Please select any appointment type");
    // }
  }

  const ConvertDatanTime = (date, time) => {
    const dateStr = date + ' ' + time
    const convertedDate = dayjs(dateStr, 'YYYY/MM/DD h:mm A').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    return convertedDate
  }

  const handleSlots = (slots) => {
    console.log('Slotsssssssss', slots)
    console.log('vvvvv', ConvertDatanTime(dayNdate?.date, slots?.startTime))
    console.log('cccc', ConvertDatanTime(dayNdate?.date, slots?.endTime))
    dispatch(storeSelectedTimeSlot(slots))
    setSelectedTimeSlot(slots)
  }
  const { uniqueTimeSlots } = SlotsDummy
  console.log('uniqueTimeSlots', uniqueTimeSlots)

  const handleCheck = () => {
    NotificationWithIcon(
      'error',
      'Please select any available appointment slot'
    )
  }

  const handleReschedule = () => {
    dispatch(
      putRescheduleAppointment({
        app_id: id,
        d_id: selectTimeSlot?.d_id[0],
        startTime: ConvertDatanTime(dayNdate?.date, selectTimeSlot?.startTime),
        endTime: ConvertDatanTime(dayNdate?.date, selectTimeSlot?.endTime),
      })
    )
      .unwrap()
      .then((x) => {
        console.log('result is', x)
        if (x) {
          setRescheduleAppointment(false)
          navigate('/rescheduleAppointmentConfirmed')
          console.log('ccccccsuccess')
        }
      })
  }

  function formatTimeToAMPM(time) {
    // Remove milliseconds and 'Z' from the time string
    // const timeWithoutMilliseconds = time.split('.')[0];
    // const [hours, minutes, seconds] = timeWithoutMilliseconds.split(':');
    
    // const date = new Date();
    // date.setHours(hours);
    // date.setMinutes(minutes);
    // date.setSeconds(seconds);
  
    // const formattedTime = date.toLocaleTimeString('en-US', {
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   hour12: true,
    // });
  
    // return formattedTime;
    const dateObject = dayjs(time);

// Step 2: Format the date object to get the time in the desired format
const formattedTime = dateObject.format("h:mm A");
return formattedTime;
  }

//   console.log('checkaaaaaaa',formatTimeToAMPM(RescheduleAppInfo?.end_time?.split('T')[1]));

  useEffect(()=>{
    if(RescheduleAppInfo)
    {
        const previouseAppSlot={
            av_id:RescheduleAppInfo?.av_id,
            d_id:[RescheduleAppInfo?.patient?.dp_id],
            startTime:formatTimeToAMPM(RescheduleAppInfo?.start_time) , 
            endTime:formatTimeToAMPM(RescheduleAppInfo?.end_time)
        }

        console.log('previouseAppSlot',previouseAppSlot);
        setSelectedTimeSlot(previouseAppSlot)
        // dispatch(storeSelectedTimeSlot(previouseAppSlot))
    }

  },[RescheduleAppInfo])



  // useEffect(() => {
  //   setLoading(true)
  //   if (timeSlots) {
  //     setLoading(false)
  //   }
  // }, [timeSlots])

  return (
    <div className="ml-10 mt-5">
      <div className="grid grid-cols-2">
        <div>
          <p className="text-[#464D59]">
            <span className="border-b-2 border-[#5ECCB9]">Select</span> Date
          </p>
          <div className="my-5">
            <RescheduleSideCal />
          </div>
        </div>

        <div className="ml-[-50px] mb-10">
          <p className="text-[#464D59]">
            <span className="border-b-2 border-[#5ECCB9]">Select</span> Time
          </p>

          {loading ? (
            <>
              <div className="flex justify-center mt-20">
                <BounceLoader color="#34d5b5" />
              </div>
            </>
          ) : Object?.keys(timeSlots)?.length == 0 ? (
            <>
              <p className="text-center mt-20 text-[20px] text-[#14226D] font-semibold">
                No Slots Available
              </p>
            </>
          ) : (
            <>
              {Object.entries(timeSlots)?.map(([interval, slots]) => {
                return (
                  <div className="mt-6">
                    {slots.length == 0 ? (
                      <p className="text-center mt-20 text-[20px] text-[#14226D] font-semibold">
                        No Slots Available
                      </p>
                    ) : (
                      <>
                        <p className="text-[14px] text-[#676e7a] font-semibold">
                          {interval} Slots
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-7 cursor-pointer">
                          {slots?.map((slot,index) => {
                            debugger
                            const isSelected = slot === selectedTimeSlot;
                            return (
                              <div
                                key={slot} 
                                className={`${
                                  isSelected
                                    ? 'bg-[#14226D] text-white'
                                    : 'bg-[#f1f4f9] text-[#464D59]'
                                } p-3 text-center rounded-lg border-[1px] border-slate-400`}
                                onClick={() => handleSlots(slot)}
                              >
                                <p>
                                  {slot?.startTime} - {slot?.endTime}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </>
          )}

          {/* {loading && (timeSlots===undefined || timeSlots===null) ? (
            <>
              <div className="flex justify-center mt-20">
                <BounceLoader color="#34d5b5" />
              </div>
            </>
          ) : (
            <> */}

          {/*             
              {Object?.keys(timeSlots)?.length == 0 ? (
                <>
                  <p className="text-center mt-20 text-[20px] text-[#14226D] font-semibold">
                    No Slots Available
                  </p>
                </>
              ) : (
                <>
                  {Object?.entries(timeSlots)?.map(([interval, slots]) => {
                    return (
                      <div className="mt-6">
                        <p className="text-[14px] text-[#676e7a] font-semibold">
                          {interval} Slots
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-7 cursor-pointer">
                          {slots?.map((slot) => {
                            const isSelected = slot === selectedTimeSlot
                            return (
                              <div
                                className={`${
                                  isSelected
                                    ? 'bg-[#14226D] text-white'
                                    : 'bg-[#f1f4f9] text-[#464D59]'
                                } p-3 text-center rounded-lg border-[1px] border-slate-400`}
                                onClick={() => handleSlots(slot)}
                              >
                                <p>
                                  {slot?.tartTime} - {slot?.endTime}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </>
              )} */}
          {/* </>
          )} */}
        </div>
      </div>

      <div className="mt-[30px] flex justify-end">
        {selectedTimeSlot.length != 0 ? (
          <button
            className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9] z-[9999] "
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

        {/* <CancelButton setCurrent={setCurrent} current={current} /> */}

        <Modal
          title="Reschedule Appointment"
          open={rescheduleAppointment}
            onCancel={() => setRescheduleAppointment(false)}
          //   onOk={() => handleReschedule()}
          footer={[
            <Button
              key="back"
              onClick={() => setRescheduleAppointment(false)}
              style={{ color: 'white', backgroundColor: '#f27e93' }}
            >
              No
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleReschedule()}
              style={{ color: 'white', backgroundColor: 'purple' }}
            >
              Yes
            </Button>,
          ]}
        >
          <>
            <p className="text-[15px] font-semibold mt-10">
              Do you want to Reschedule the Appointment?
            </p>
          </>
        </Modal>
      </div>
    </div>
  )
}

export default RescheduleSlot
