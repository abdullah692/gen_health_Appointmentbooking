import React, { useState } from 'react'
import { Modal } from 'antd'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { resetUsers, submitAppointmentBooked } from '../Slices/PatientVerification'
import { NotificationWithIcon } from '../../utils/Notification'
import { ClipLoader } from 'react-spinners'
import { resetPhoneNo } from '../Slices/PatientNoSlice'
import dayjs from 'dayjs'

function AppSummaryModal({ isModalOpen, setIsModalOpen, setCurrent }) {
  const appointmentData = useSelector(
    (state) => state?.PatientReducer?.appointmentInfo
  )
  const patientInfo = useSelector((state) => state?.PatientReducer?.patientInfo)
  console.log('patientInfo',patientInfo);
  const patientDataModel = useSelector(
    (state) => state?.PatientReducer?.setAppointmentBooked
  )
  const ModalData=useSelector((state)=>state?.PatientReducer?.modalData);
  const showModalData = useSelector(
    (state) => state?.PatientReducer?.modalSummaryData
  )
  const providerInfo = useSelector(
    (state) => state?.PatientReducer?.selectedProvider
  )
  console.log('showModalData', showModalData)
  console.log('ModalDataaaaaaa',ModalData)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const patientRelation = patientInfo?.patient?.patientRelations

  console.log('patientRelation', patientRelation)
  console.log('appointmentData', appointmentData)
  console.log('c', showModalData)

  // console.log('ModalData',ModalData);
  const handleConfirm = () => {

    const matchedIds = showModalData.map(item => item.patientPhoneNum);
    const filteredAppointments = appointmentData.filter(item => matchedIds.includes(item._for));
    
    console.log('filteredAppointments',filteredAppointments);
    setLoading(true)
    const dobFormat=dayjs(patientInfo.patient.dob).format("YYYY-MM-DD")
    const dataToBeSend = {
      ...patientInfo?.patient,
      dob: dobFormat,
      appointments: filteredAppointments,
    }
    console.log('dobFormat',dobFormat);
    console.log('dataToBeSendModel', dataToBeSend)
    dispatch(submitAppointmentBooked({ data:dataToBeSend }))
      .unwrap()
      .then((x) => {
        console.log('x', x)
        if (x?.message === 'appointment booked successfully') {
          setLoading(false)
          navigate('/appConfirmed')
          // setCurrent(1);
        }
        console.log(dataToBeSend, 'dataToBesend')
      })
      .catch((error) => {
        setLoading(false)
        NotificationWithIcon('error', error.message)
      })
  }

  const cancelAppointment = () => {
    console.log('cancel Submit')
    setIsModalOpen(false);
    // dispatch(resetUsers());
    // dispatch(resetPhoneNo());
    // setCurrent(0)
  }
  return (
    <div>
      {isModalOpen ? (
        <>
          <Modal
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            maskClosable={false}
            className="w-[500px]"
          >
            <div className="">
              <div className="">
                <p className="text-[#464D59] text-[16px] font-medium">
                  <span className="border-b-2 border-[#5ECCB9]">Appoin</span>
                  tment Confirmation
                </p>
              </div>

              {showModalData.map((modalData, index) => {
                return (
                  <div className="mt-6" key={index}>
                    <p className="text-[14px] font-medium text-black mb-4">
                      Appointment {index + 1}
                    </p>
                    <p className="mt-5 text-[16px]">
                      Your dental appointment at Genesis Health has been
                      confirmed for{' '}
                      <span className="text-[#5ECCB9] font-medium">
                        {modalData?.providerName}
                      </span>{' '}
                      at{' '}
                      <span className="font-medium text-black">
                        {modalData?.date}
                      </span>{' '}
                      at{' '}
                      <span className="font-medium text-black">
                        {modalData?.appointmentTime}{' '}
                        {/* {modalData?.appointmentTime.slice(8,17)}{' '} */}
                      </span>
                      for{' '}
                      <span className="font-medium text-black">
                        {modalData?.patientName}
                      </span>
                      . <br></br>We look forward to seeing you then.
                    </p>
                  </div>
                )
              })}

              <div className="mt-10">
                <p className="text-black font-medium">
                  Thank you for choosing Genesis Health for your dental needs.
                </p>
              </div>

              <div className="mt-[30px] flex justify-end">
                {!loading ? (
                  <button
                    className="m-2 px-6 py-[6px] rounded-lg text-white bg-[#5ECCB9]"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className="m-2 px-6 py-[6px] rounded-lg text-white bg-[#5ECCB9]  "
                    htmlType="submit"
                    // onClick={handleConfirm}
                  >
                    <div className="flex justify-center">
                      Confirm{' '}
                      <ClipLoader color="white" className="ml-5" size={25} />
                    </div>
                  </button>
                )}

                <button
                  className="m-2 px-6 py-[6px] rounded-md text-red-600 "
                  onClick={cancelAppointment}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default AppSummaryModal
