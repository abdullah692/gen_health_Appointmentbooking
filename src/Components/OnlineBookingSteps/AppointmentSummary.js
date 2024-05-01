import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { columns, dataSource } from './data'
import CancelButton from '../CancelButton/CancelButton'
import { Modal } from 'antd'
import AppSummaryModal from '../Modal/AppointmentSummaryModal'
import { useSelector, useDispatch } from 'react-redux'
import {
  EditApp,
  deleteAppointmentBooked,
  setVerify,
  storeAddAnotherApp,
  storeAppFor_,
  storeAppointmentBooked,
  storeAppointmentType,
  storeDataSourceData,
  storeEditFor_,
  storeModalAppointment,
  storeModalSummaryData,
  storeSelectedRadio,
  storeVerify,
} from '../Slices/PatientVerification'
import { Space, Button } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'
// export const handleDelete=()=>{
//   console.log('Delete it');
// }

function AppointmentSummary({ setCurrent, current }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  

  const dispatch = useDispatch()
  const appBooked = useSelector(
    (state) => state?.PatientReducer?.setAppointmentBooked
  )
  
  const data = useSelector((state) => state?.PatientReducer?.appointmentInfo)
  const providerInfo = useSelector(
    (state) => state?.PatientReducer?.selectedProvider
  )
  const selectedDate = useSelector(
    (state) => state?.PatientReducer?.selectedDayNDate
  )
  const patientInfo = useSelector((state) => state?.PatientReducer?.patientInfo)
  const _Appfor = useSelector(
    (state) => state?.PatientReducer?.apptfor_?.apmntFor
  )
  const _forPatientData = useSelector(
    (state) => state?.PatientReducer?.storeDataSource
  )

  const selectedRadio = useSelector(
    (state) => state?.PatientReducer?.selectedRadio
  )

  const doctorList = useSelector(
    (state) => state?.PatientReducer?.appointmentSlots
  )

  const selectedAppointmentType = useSelector(
    (state) => state?.PatientReducer?.appointmentType
  )
  const setAppointmentBooked = useSelector(
    (state) => state?.PatientReducer?.setAppointmentBooked
  )
  const parentPatientData = useSelector(
    (state) => state?.PatientReducer?.parentPatientData
  )
  const childPatientData = useSelector(
    (state) => state?.PatientReducer?.childPatientRelationData
  )
  const appointmentTypes = useSelector(
    (state) => state?.PatientReducer?.appointmentTypes
  )

  const verifyPatient = useSelector((state) => state?.PatientReducer?.verify)
  console.log('_Appfor', _Appfor)
  console.log('datasssssssss', data)
  console.log('appBooked', appBooked)
  console.log('providerInfo', providerInfo)
  console.log('patientInfo', patientInfo)
  console.log('_forPatientData', _forPatientData)
  console.log('doctorListsss', doctorList)
  console.log('selectedAppointmentType', selectedAppointmentType)
  console.log('setAppointmentBooked', setAppointmentBooked)
  console.log('parentPatientData', parentPatientData)
  console.log('childPatientData', childPatientData)

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Doctor Name',
      dataIndex: 'providerName',
      key: 'providerName',
    },
    {
      title: 'Appointment Type',
      dataIndex: 'appointmentType',
      key: 'appointmentType',
    },
    {
      title: 'Appointment By',
      dataIndex: 'appointmentBy',
      key: 'appointmentBy',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="border-none text-[#14226D] hover:text-[#14226D]"
            icon={<FaEdit size={18} />}
            onClick={() => handleEdit(record?.patientPhoneNum)}
          />
          <Button
            className="border-none text-red-600 hover:text-red-600"
            icon={<MdDelete size={18} />}
            onClick={() => handleDelete(record?.patientPhoneNum)}
          />
        </Space>
      ),
    },
  ]

  function checkPhoneNumber(patientObj, phoneNumber) {
    // Check in the patient object
    if (patientObj.phone === phoneNumber) {
      // Return only specific properties except patientRelations
      const { appointments, dob, email, gender, maritalStatus, name, phone } =
        patientObj
      return { appointments, dob, email, gender, maritalStatus, name, phone }
    }

    // Check in the patientRelations array
    const filteredRelations = patientObj.patientRelations.filter(
      (relation) => relation.phone === phoneNumber
    )

    console.log(filteredRelations, 'filteredRelations')
    if (filteredRelations.length > 0) {
      const { appointments } = patientObj
      const { dob, email, gender, maritalStatus, name, phone } =
        filteredRelations[0]
      return { appointments, dob, email, gender, maritalStatus, name, phone }
    }

    // If no match is found
    return null
  }

  function formatTimeToAMPM(time) {
    const [hours, minutes, seconds] = time.split(':')
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(seconds)

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedTime
  }

  // let dataForTable = []

  // // const showTableData=()=>{
  //   const allDoctorList = [...doctorList.data, ...doctorList.earliestDentistList]

  //   for (let i = 0; i < data.length; i++) {
  //     const appointmentData = data[i]
  //     const currDentist = allDoctorList.find((x) => x.id == appointmentData.d_id)
  //     // debugger;

  //     if (patientInfo?.patient?.phone === appointmentData?._for) {
  //       dataForTable.push({
  //         key: i,
  //         patientName: patientInfo?.patient?.name,
  //         appointmentType: appointmentData?.appType,
  //         appointmentBy: 'Self',
  //         appointmentTime: currDentist?.firstAvailableTime
  //           ? currDentist?.firstAvailableTime?.startTime +
  //             '-' +
  //             currDentist?.firstAvailableTime?.endTime
  //           :formatTimeToAMPM(appointmentData?.startTime.split(' ')[1]) +
  //           '-' +
  //           formatTimeToAMPM(appointmentData?.endTime.split(' ')[1]),
  //         date: appointmentData?.startTime.substr(0, 10),
  //         providerName: appointmentData?.providerName,
  //         patientPhoneNum:appointmentData?._for
  //       })
  //       setTableData(dataForTable)
  //     } else {
  //       // debugger;
  //       patientInfo?.patient?.patientRelations.forEach((patRel) => {
  //         if (patRel?.phone === appointmentData?._for) {
  //           dataForTable.push({
  //             key: i,
  //             patientName: patRel?.name,
  //             appointmentType: appointmentData?.appType,
  //             appointmentBy: patientInfo?.patient?.name,
  //             appointmentTime: currDentist?.firstAvailableTime
  //               ? currDentist?.firstAvailableTime?.startTime +
  //                 '-' +
  //                 currDentist?.firstAvailableTime?.endTime
  //               : formatTimeToAMPM(appointmentData?.startTime.split(' ')[1]) +
  //                 '-' +
  //                 formatTimeToAMPM(appointmentData?.endTime.split(' ')[1]),
  //             date: appointmentData?.startTime.substr(0, 10),
  //             providerName: appointmentData?.providerName,
  //             patientPhoneNum:appointmentData?._for
  //           })
  //         }
  //       })
  //       setTableData(dataForTable)
  //     }
  //   }

  const populateTableData = () => {
    const allDoctorList = [
      ...doctorList.data,
      ...doctorList.earliestDentistList,
    ]
    const newDataForTable = []
    debugger
    for (let i = 0; i < data?.length; i++) {
      const appointmentData = data[i]
      const currDentist = allDoctorList.find(
        (x) => x?.id == appointmentData?.d_id
      )
        console.log('currDentist',currDentist);
      if (patientInfo?.patient?.key === appointmentData?._for) {
        newDataForTable.push({
          key: i,
          patientName: patientInfo?.patient?.name,
          appointmentType: appointmentData?.appType,
          appointmentBy: 'Self',
          appointmentTime: currDentist?.firstAvailableTime
            ? currDentist?.firstAvailableTime?.startTime +
              '-' +
              currDentist?.firstAvailableTime?.endTime
            : formatTimeToAMPM(appointmentData?.startTime.split(' ')[1]) +
              '-' +
              formatTimeToAMPM(appointmentData?.endTime.split(' ')[1]),
          date: dayjs(appointmentData?.startTime.substr(0, 10)).format(
            'MM/DD/YY'
          ),
          providerName: appointmentData?.providerName,
          patientPhoneNum: appointmentData?._for,
        })
      } else if (
        patientInfo?.patient?.patientPartner?.key === appointmentData?._for
      ) {
        newDataForTable.push({
          key: i,
          patientName: patientInfo?.patient?.patientPartner?.name,
          appointmentType: appointmentData?.appType,
          appointmentBy: patientInfo?.patient?.name,
          appointmentTime: currDentist?.firstAvailableTime
            ? currDentist?.firstAvailableTime?.startTime +
              '-' +
              currDentist?.firstAvailableTime?.endTime
            : formatTimeToAMPM(appointmentData?.startTime.split(' ')[1]) +
              '-' +
              formatTimeToAMPM(appointmentData?.endTime.split(' ')[1]),
          date: dayjs(appointmentData?.startTime.substr(0, 10)).format(
            'MM/DD/YY'
          ),
          providerName: appointmentData?.providerName,
          patientPhoneNum: appointmentData?._for,
        })
      } else {
        patientInfo?.patient?.dependents?.forEach((patRel) => {
          if (patRel?.id === appointmentData?._for) {
            newDataForTable.push({
              key: i,
              patientName: patRel?.name,
              appointmentType: appointmentData?.appType,
              appointmentBy: patientInfo?.patient?.name,
              appointmentTime: currDentist?.firstAvailableTime
                ? currDentist?.firstAvailableTime?.startTime +
                  '-' +
                  currDentist?.firstAvailableTime?.endTime
                : formatTimeToAMPM(appointmentData?.startTime.split(' ')[1]) +
                  '-' +
                  formatTimeToAMPM(appointmentData?.endTime.split(' ')[1]),
              date: dayjs(appointmentData?.startTime.substr(0, 10)).format(
                'MM/DD/YY'
              ),
              providerName: appointmentData?.providerName,
              patientPhoneNum: appointmentData?._for,
            })
          }
        })
      }
    }
    console.log('newDataForTable', newDataForTable)
    setTableData(newDataForTable)
  }

  // }

  // console.log(dataForTable, 'dataForTable')

  // const valuesWithKey = {
  //   ..._forPatientData,
  //   providerInfo: providerInfo,
  //   selectedDate: selectedDate,
  //   key: Object.keys(appBooked?.appointments).length,
  // }
  // console.log('valuesWithKey', valuesWithKey)
  // const dataSource = [
  //   {
  //     key: valuesWithKey?.key,
  //     patientName: valuesWithKey?.name,
  //     providerName: valuesWithKey?.providerInfo?.name,
  //     appointmentType: valuesWithKey?.providerInfo?.AppointmentTypes[0]?.type,
  //     appointmentBy: 'Self',
  //     date: valuesWithKey?.appointments.endTime.substr(0, 10),
  //     appointmentTime:
  //       valuesWithKey?.appointments.startTime.substr(11, 14) +
  //       '-' +
  //       valuesWithKey?.appointments.endTime.substr(11, 14),
  //   },
  // ]

  // console.log('dataSource', dataSource)

  const OpenPopup = () => {
    console.log('submit')
    const ModalData = {
      ...appBooked,
      providerInfo: providerInfo,
    }

    console.log('ModalDataaaaaaaaa', ModalData)
    dispatch(storeModalAppointment(ModalData))
    dispatch(storeModalSummaryData(tableData))
    setIsModalOpen(true)
  }

  const handleDelete = async (phoneNum) => {
    console.log('Delete it', phoneNum)

    // consttableData.filter((val) => val.patientPhoneNum !== phoneNum)
    // setTableData(newDataForTable);
    // debugger
    const updatedData = tableData.filter(
      (val) => val?.patientPhoneNum !== phoneNum
    )
    console.log('updatedData', updatedData)
    setTableData([...updatedData])
    const phoneExist = tableData.find((val) => val.patientPhoneNum == phoneNum)
    console.log('phoneExist', phoneExist)
    if (phoneExist) {
      const deleteAppointment = await data.find(
        (val) => val?._for === phoneExist?.patientPhoneNum
      )
      if (deleteAppointment) {
        const updateReduxData = data.filter(
          (val) => val._for !== deleteAppointment?._for
        )
        dispatch(deleteAppointmentBooked(updateReduxData))
        console.log('deleteAppointment', updateReduxData)
      }
    }

    // dispatch(storeModalSummaryData(dataForTable))
    // console.log('dataForTable',dataForTable);
    // const updatedData = dataForTable.filter((val) => val.patientPhoneNum !== phoneNum);
    // setDataForTable(updatedData);
    // dispatch(storeModalSummaryData(dataForTable))
  }
  console.log('setdataForTable', tableData)

  const  handleEdit = (phoneNum) => {
    console.log('edit', phoneNum)
    dispatch(EditApp(true))
    dispatch(storeEditFor_(phoneNum))
    dispatch(storeAppFor_({ apmntFor: phoneNum }))
    const updateAppointment = tableData.find(
      (val) => val.patientPhoneNum === phoneNum
    )
    const setEditAppointment = appointmentTypes.filter(
      (app) => app.type === updateAppointment.appointmentType
    )
    console.log('setEditAppointment', setEditAppointment)
    console.log('updateAppointment', updateAppointment)
    if (setEditAppointment) {
      dispatch(storeAppointmentType(...setEditAppointment))
      setCurrent(3)
    }
    // console.log('updateAppointment',updateAppointment);
  }

  const handleAnotherAppointment = () => {
    dispatch(EditApp(false))
    dispatch(storeVerify(verifyPatient))
    // dispatch(storeEditFor_())
    dispatch(storeAddAnotherApp('Add Appintment'))
    // dispatch(storeSelectedRadio())
    setCurrent(2)
  }

  // useEffect(() => {
  //   const matchedData = checkPhoneNumber(appBooked, _Appfor)
  //   console.log('Matched data:', matchedData)
  //   if (matchedData) {
  //     dispatch(storeDataSourceData(matchedData))
  //   }
  // }, [])

  // useEffect(()=>{
  //   showTableData();
  // },[])

  useEffect(() => {
    populateTableData()
  }, [doctorList, patientInfo])

  return (
    <>
      <div className="ml-10 mt-10">
        <p className="text-[#464D59]">
          <span className="border-b-2 border-[#5ECCB9]">Appoin</span>tment{' '}
          Summary
        </p>
      </div>
      <div className="my-5 mx-10">
        <Table dataSource={tableData} columns={columns} />
      </div>

      <div className="mt-[80px] flex justify-between">
        <div>
          <button
            className="m-2 px-8 py-[6px] rounded-md text-white bg-[#14226D]  "
            onClick={handleAnotherAppointment}
          >
            Add Another Appointment
          </button>
        </div>
        <div className="flex">
          <button
            className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]  "
            type="button"
            onClick={OpenPopup}
          >
            Submit
          </button>
          <CancelButton
            setCurrent={setCurrent}
            current={current}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>

      {isModalOpen ? (
        <>
          <AppSummaryModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setCurrent={setCurrent}
          />
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default AppointmentSummary
