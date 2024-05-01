import React, { useEffect, useState } from 'react'
import SideCalendar from '../SideCalendar/SideCalendar'
import { AvailableSlots, SlotsDummy } from './data'
import CancelButton from '../CancelButton/CancelButton'
import { useSelector, useDispatch } from 'react-redux'
import { storeSelectedTimeSlot } from '../Slices/PatientVerification'
import { BounceLoader } from 'react-spinners'
import { NotificationWithIcon } from '../../utils/Notification'

function DateTimeSlot({ setCurrent, current }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  // const [loading, setLoading] = useState(false);
  const timeSlots =
    useSelector(
      (state) => state?.PatientReducer?.appointmentSlots?.uniqueTimeSlots
    ) || {}

  const loading = useSelector(
    (state) => state?.PatientReducer?.loading?.loading
  )
  console.log('loadingaaaaaaaaaaaaa', loading)
  // const checkSlots =
  // useSelector(
  //   (state) => state?.PatientReducer?.checkSlots
  // ) ;

  console.log('timeSlots', timeSlots)
  const selectTimeSlot = useSelector(
    (state) => state?.PatientReducer?.selectedTimeSlot
  )
  console.log('selectTimeSlotcccccccc', selectTimeSlot)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (selectTimeSlot) {
      setCurrent(5)
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

  const handleSlots = (slots) => {
    console.log('Slotsssssssss', slots)
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
            <SideCalendar />
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
    </div>
  )
}

export default DateTimeSlot
