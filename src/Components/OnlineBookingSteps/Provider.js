import React, { useEffect, useState } from 'react'
import CancelButton from '../CancelButton/CancelButton'
import drImg from '../../assets/images/drImg1.png'
import { OtherDrs, ProviderDetails } from './data'
import AppointmentSummary from './AppointmentSummary'
import { useSelector, useDispatch } from 'react-redux'
import dr from '../../assets/images/dr4.jpg'
import AppointmentType from './AppointmentType'
import {
  setAppointmentBooked,
  storeAppointmentBooked,
  storePatientData,
  storeSelectedProvider,
  updateAppoitmentBooked,
} from '../Slices/PatientVerification'
import dayjs from 'dayjs'
import { NotificationWithIcon } from '../../utils/Notification'
import { BounceLoader } from 'react-spinners'

function Provider({ setCurrent, current }) {
  const [providerData, setProviderData] = useState([])
  const [insId, setInsId] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const filterProviderData = useSelector(
    (state) => state?.PatientReducer?.selectedTimeSlot?.d_id
  )
  const earliestDentistList = useSelector(
    (state) => state?.PatientReducer?.appointmentSlots?.earliestDentistList
  )
  // const earliestDentistList=[];

  const doctorData = useSelector(
    (state) => state?.PatientReducer?.appointmentSlots?.data
  )
  const patientInfo = useSelector((state) =>
    state?.PatientReducer?.patientInfo?.patient
      ? state?.PatientReducer?.patientInfo?.patient
      : state
  )
  console.log('patientInfo', patientInfo)
  const appType = useSelector((state) => state?.PatientReducer?.appointmentType)
  const dayNdate = useSelector(
    (state) => state?.PatientReducer?.selectedDayNDate
  )
  const appTime = useSelector(
    (state) => state?.PatientReducer?.selectedTimeSlot
  )
  const apptfor_ = useSelector((state) => state?.PatientReducer?.apptfor_)
  const selectedProviderInfo = useSelector(
    (state) => state?.PatientReducer?.selectedProvider
  )
  const patients = useSelector((state) => state?.PatientReducer?.patientInfo)
  const appointmentData = useSelector(
    (state) => state.PatientReducer.appointmentBooked
  )
  const selectedAppointmentType = useSelector(
    (state) => state?.PatientReducer?.appointmentType
  )
  const parentPatientData = useSelector(
    (state) => state?.PatientReducer?.parentPatientData
  )
  const childPatientData = useSelector(
    (state) => state?.PatientReducer?.childPatientRelationData
  )
  const appointmentBookInfo = useSelector(
    (state) => state?.PatientReducer?.appointmentInfo
  )
  const InsuranceType = useSelector(
    (state) => state?.PatientReducer?.insuranceTypes
  )

  const patientDependents = useSelector(
    (state) => state?.PatientReducer?.patientDependentData
  )
  console.log('InsuranceType', InsuranceType)
  console.log('earliestDentistList', earliestDentistList)
  console.log('appTime', appTime)
  console.log('apptfor_', apptfor_)
  console.log('dayNdatessss', dayNdate)
  console.log('appType', appType)
  console.log('patients', patients)
  console.log('selectedProviderInfo', selectedProviderInfo)
  console.log('appointmentBookInfo', appointmentBookInfo)

  const handleProvider = () => {
    const filteredData = doctorData?.filter((item) =>
      filterProviderData?.includes(item.id)
    )
    setProviderData(filteredData)
    console.log('Final Provider Data', filteredData)
  }

  const handleAddProvider = (provider) => {
    console.log('Provider', provider)
    dispatch(storeSelectedProvider(provider))
    setSelectedProvider(provider)
  }

  const handleCheck = () => {
    NotificationWithIcon('error', 'Please select any provider')
  }

  function findInsuranceTypeBykey(
    phoneNumber,
    singleObject,
    childPatientData,
    arrayObjects
  ) {
    debugger
    if (singleObject.key === phoneNumber) {
      console.log('singleObject.insurance', singleObject.insurance)
      const filterInsuracneId = InsuranceType.find(
        (ins) => ins?.type == singleObject?.insurance
      )
      console.log('filterInsuracneId', filterInsuracneId)
      setInsId(filterInsuracneId?.id)
      return singleObject.insurance
    } else if (childPatientData.key === phoneNumber) {
      console.log('childPatientData.insurance', childPatientData.insurance)
      const filterInsuracneId = InsuranceType.find(
        (ins) => ins?.type == childPatientData?.insurance
      )
      console.log('filterInsuracneId', filterInsuracneId)
      setInsId(filterInsuracneId?.id)
      return childPatientData?.insurance
    }
    for (const obj of arrayObjects) {
      if (obj.key === phoneNumber) {
        console.log('obj.insurance;', obj.insurance)
        const filterInsuracneId = InsuranceType.find(
          (ins) => ins?.type == obj?.insurance
        )
        console.log('filterInsuracneId', filterInsuracneId)
        setInsId(filterInsuracneId?.id)
        return obj.insurance
      }
    }

    return null // No match found
  }

  const ConvertDatanTime = (date, time) => {
    const dateStr = date + ' ' + time
    const convertedDate = dayjs(dateStr, 'YYYY/MM/DD h:mm A').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    return convertedDate
  }
  console.log('Ins Id', insId)
  const handleSubmit = () => {
    // if(selectedProviderInfo)
    // {
    // debugger
    let appointmentData;
    const checkVal=patientInfo?.dependents.some((val)=> val.id == apptfor_?.apmntFor)
    console.log('checkValccccccc',checkVal);
    if(checkVal)
    {
       appointmentData = {
        startTime: ConvertDatanTime(dayNdate?.date, appTime?.startTime),
        endTime: ConvertDatanTime(dayNdate?.date, appTime?.endTime),
        avId: appTime?.av_id,
        atId: selectedProviderInfo['AppointmentTypes'][0]?.id,
        d_id: selectedProviderInfo?.id,
        insId: 15,
        priority: appType?.priority,
        _for: apptfor_?.apmntFor,
        key:apptfor_?.apmntFor,
        appType: selectedAppointmentType?.type,
        providerName: selectedProviderInfo?.name,
        booked_by: patients?.patient?.id,
        isDependent:true
      }
    }
      else{
         appointmentData = {
          startTime: ConvertDatanTime(dayNdate?.date, appTime?.startTime),
          endTime: ConvertDatanTime(dayNdate?.date, appTime?.endTime),
          avId: appTime?.av_id,
          atId: selectedProviderInfo['AppointmentTypes'][0]?.id,
          d_id: selectedProviderInfo?.id,
          insId: 15,
          priority: appType?.priority,
          _for: apptfor_?.apmntFor,
          key:apptfor_?.apmntFor,
          appType: selectedAppointmentType?.type,
          providerName: selectedProviderInfo?.name,
          booked_by: patients?.patient?.id,
          isDependent:false
      }

    }

    const dataToBeSend = {
      ...patients?.patient,
      appointments: appointmentData,
    }
    console.log(dataToBeSend, 'dataToBesend')

    console.log(appointmentData, 'appointmentData')

    // debugger
    let filterOtherAppointments = appointmentBookInfo.filter(
      (app) => app?._for !== appointmentData?._for
    )
    const uniqueAppointment = appointmentBookInfo.find(
      (app) => app?._for == appointmentData?._for
    )
    console.log('uniqueAppointment', uniqueAppointment)
    console.log('filterOtherAppointments', filterOtherAppointments)

    if (uniqueAppointment !== undefined) {
      filterOtherAppointments.push(appointmentData)
      console.log('editAppointmentData', filterOtherAppointments)
      dispatch(updateAppoitmentBooked(filterOtherAppointments))
      dispatch(setAppointmentBooked(dataToBeSend))
      console.log('Not to push appointment')
    } else {
      dispatch(storeAppointmentBooked(appointmentData))
      dispatch(setAppointmentBooked(dataToBeSend))
      console.log(appointmentData, 'appointmentData')
    }
    ConvertDatanTime(dayNdate?.date, appTime?.startTime)
    console.log('result', ConvertDatanTime(dayNdate?.date, appTime?.startTime))

    setCurrent(6)
  }
  // else{
  //   NotificationWithIcon('error', 'Please select any Provider')
  // }

  useEffect(() => {
    handleProvider()
    findInsuranceTypeBykey(
      apptfor_?.apmntFor,
      parentPatientData,
      childPatientData,
      patientDependents
    )
  }, [])

  useEffect(() => {
    setLoading(true)
    if (providerData.length > 0) {
      setLoading(false)
    }
  }, [providerData])

  return (
    <div className="m-10">
      <div className="mb-4">
        <p className="text-[#464D59]">
          <span className="border-b-2 border-[#5ECCB9]">Select</span> Provider
        </p>
      </div>

      {loading ? (
        <>
          <div className="flex justify-center mt-20">
            <BounceLoader color="#34d5b5" size={40} />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-4 mt-5 mb-5 gap-6">
            {providerData?.map((provider) => {
              const isSelected = provider === selectedProviderInfo
              console.log('isSelected', isSelected)
              return (
                <>
                  <div
                    className={`${
                      isSelected
                        ? 'bg-[#14226D] text-white'
                        : 'bg-[#f1f4f9] text-[#464D59]'
                    }  border-[1px] border-slate-400 rounded-lg cursor-pointer`}
                    onClick={() => handleAddProvider(provider)}
                    key={provider?.id}
                  >
                    <div className="flex p-2">
                      <div>
                        <img
                          src={
                            provider?.dp_url
                              ? `${process.env.REACT_APP_BACKEND_API_URL}/api/files/${provider.dp_url}`
                              : dr
                          }
                          className="h-20 w-16"
                        />
                      </div>
                      <div className="ml-5">
                        <p className="text-[18px] font-semibold">
                          {provider?.name}
                        </p>
                        <p className="text-[16px]">{provider?.email}</p>
                        <p className="text-[16px]">{provider?.phone}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )}

      <div className="mt-10">
        <p className="text-[#464D59]">
          <span className="border-b-2 border-[#5ECCB9]">Other</span> Doctors
        </p>
      </div>

      {loading ? (
        <>
          <div className="flex justify-center mt-20">
            <BounceLoader color="#34d5b5" size={40} />
          </div>
        </>
      ) : earliestDentistList?.length == 0 ? (
        <>
          <p className="mt-10 text-[18px] text-[#14226D] font-semibold">
            No other Doctor available
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-4 mt-5 mb-5 gap-6">
            {earliestDentistList?.map((provider) => {
              const isSelected = provider === selectedProviderInfo
              return (
                <>
                  <div
                    className={`${
                      isSelected
                        ? 'bg-[#14226D] text-white'
                        : 'bg-[#f1f4f9] text-[#464D59]'
                    }  border-[1px] border-slate-400 rounded-lg cursor-pointer`}
                    onClick={() => handleAddProvider(provider)}
                    key={provider?.id}
                  >
                    <div className="flex p-2">
                      <div>
                        <img
                          src={
                            provider?.dp_url
                              ? `${process.env.REACT_APP_BACKEND_API_URL}/api/files/${provider.dp_url}`
                              : dr
                          }
                          className="h-20 w-16"
                        />
                      </div>
                      <div className="ml-5">
                        <p className="text-[18px] font-semibold m-0">
                          {provider?.name}
                        </p>
                        <p className="text-[16px] m-0">{provider?.email}</p>
                        <p className="text-[16px] m-0">{provider?.phone}</p>
                        {/* <p className="text-[16px] m-0">{provider.date}</p> */}
                        <p className="text-[16px] m-0">
                          {provider?.firstAvailableTime?.startTime} -{' '}
                          {provider?.firstAvailableTime?.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )}

      <div className="mt-[30px] mb-10 flex justify-end">
        {selectedProvider.length != 0 ? (
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

export default Provider
