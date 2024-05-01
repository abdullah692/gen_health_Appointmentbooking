import { Calendar, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAppointmentSlots,
  // setLoading,
  storeCheckSlot,
  storeLoading,
  storeSelectedDay,
  storeSelectedDayNDate,
} from '../Slices/PatientVerification'
import { useParams } from 'react-router'

// const onPanelChange = (value, mode) => {
//   console.log(value.format('YYYY-MM-DD'), mode, 'aaaaaaaa')
// }
// function handleSelect(date) {
//   console.log('Selected date:', date.format('YYYY-MM-DD'))
// }

function handleSelect(value, mode) {
  const dayName = dayjs(value).format('dddd').toLocaleLowerCase()

  console.log(dayName, 'daynamecccccccccccc') // e.g. "Monday", "Tuesday", etc.
}

const SideCalendar = () => {
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch()
  const appType = useSelector(
    (state) => state?.PatientReducer?.appointmentType?.type
  )
  // console.log('dayNameRedux', dayNameRedux)
  const { id } = useParams()

  const { token } = theme.useToken()
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  }

  
function handleChange(date) {
  console.log('Displayed month and year:', date.format('YYYY-MM'))
  // dispatch(getAppointmentSlots());
}


  function handleSelect(value, mode) {
    console.log('change year and days', value, value.format("YYYY-MM-DD"));
    debugger
    const selectedDate = value.toDate();
    console.log('selectedDate',selectedDate);
  const currentDate = new Date();
  console.log('currentDate',currentDate);
  if (selectedDate.toISOString().slice(0, 10) < currentDate.toISOString().slice(0, 10)) {
    dispatch(getAppointmentSlots());
  }
    // if(new Date(value.format("YYYY-MM-DD") < new Date())) return  dispatch(getAppointmentSlots());
    else 
    // if(selectedDate >= currentDate)
    {
      dispatch(storeLoading({loading:true}))
      const selectedDate = value.toDate()
      const dayName = dayjs(selectedDate).format('dddd').toLocaleLowerCase()
      const date = dayjs(selectedDate).format('YYYY/MM/DD')
      console.log(date, 'formattedDate')
  
      const previousDate = dayjs(selectedDate).subtract(1, 'day')
      console.log(previousDate, 'previousDate')
      const isPreviousDate = dayjs(date).isBefore(previousDate, 'day')
      console.log(isPreviousDate, 'isPreviousDate')
  
      if (isPreviousDate == false) {
        const dayNdate = {
          dayName,
          date,
        }
        // dispatch(storeLoading({loading:loading}))
        dispatch(storeSelectedDayNDate(dayNdate))
        dispatch(getAppointmentSlots({ dp_id: id, appType, dayName }))
          .unwrap()
          .then((x) => {
            console.log('xzzzzzzzzzzzzzzz', x)
            dispatch(storeLoading({loading:false}))
          })
      } else {
        // Handle the case when the date is today's previous date
        console.log("Date is today's previous date. Skipping API call.")
        dispatch(getAppointmentSlots())
      }
      console.log(dayName, 'daynameccccccccc') // e.g. "Monday", "Tuesday", etc.
    }
  }

  const handleSelectDay = () => {
    console.log('hello world')
  }

  const disabledDate = (current) => {
    // Disable dates prior to today
    return current && current < dayjs().startOf('day')
  }

  useEffect(() => {
    // const dayName = dayjs().format('dddd').toLocaleLowerCase();
    // const currentDate = new Date();
    // const date = dayjs(currentDate).format('YYYY/MM/DD');
    // console.log(date,'formattedDate');
    // dispatch(setLoading(true));
    dispatch(storeLoading({loading:true}))
    const dayName = dayjs().format('dddd').toLocaleLowerCase()
    const currentDate = new Date()
    const date = dayjs(currentDate).format('YYYY/MM/DD')
    console.log(date, 'formattedDate')

    const previousDate = dayjs(currentDate).subtract(1, 'day')
    console.log(previousDate, 'previousDate')
    const isPreviousDate = dayjs(date).isBefore(previousDate, 'day')
    console.log(isPreviousDate, 'isPreviousDate')
    if (!isPreviousDate) {
      const dayNdate = {
        dayName,
        date,
      }
      // dispatch(setLoading(false));
      dispatch(storeSelectedDayNDate(dayNdate))
      dispatch(getAppointmentSlots({ dp_id: id, appType, dayName }))
        .unwrap()
        .then((x) => {
          console.log('x', x)
          dispatch(storeLoading({loading:false}))
        })
    } else {
      // Handle the case when the date is today's previous date
      console.log("Date is today's previous date. Skipping API call.")
    }
  }, [])

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        // onPanelChange={handlePanelChange}
        onSelect={handleSelect}
        onChange={handleChange}
        disabledDate={disabledDate}
      />
    </div>
  )
}
export default SideCalendar
