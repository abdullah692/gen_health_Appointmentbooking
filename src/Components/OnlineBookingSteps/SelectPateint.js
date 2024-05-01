import React, { useEffect, useState, useRef } from 'react'
import { Input, Button, Form, Select, DatePicker, message, Modal } from 'antd'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import PatientInputFields from './PatientInputFields'
import dayjs from 'dayjs'
import CancelButton from '../CancelButton/CancelButton'
import { GiCheckMark } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import { useParams } from 'react-router'
import {
  deleteDependentPatient,
  deletePartner,
  fetchPatientForRelation,
  getInsuranceType,
  getPatientOTP,
  getPatientRelations,
  getPatientVerification,
  patientWithDependentsData,
  postDependentAdd,
  setPatientInfo,
  storeAddAnotherApp,
  storeAppFor_,
  storeChildPatientRelationData,
  storeParentPatientData,
  storePatientDependentData,
  storeSelectedRadio,
  storeSid,
  storeVerify,
  storeVerifyPatientRelationNo,
} from '../Slices/PatientVerification'
import { NotificationWithIcon } from '../../utils/Notification'
import { storePatientPhoneNo } from '../Slices/PatientNoSlice'
import Otp from './Otp'
import OtpModal from './OtpModal'
import { v4 as uuidv4 } from 'uuid'
import PatientDependentFields from './PatientDependentFields'
import { ClipLoader } from 'react-spinners'
import ModelDependentField from './ModelDependentField'
import { Insurance } from '../AppointmentTypes/data'

function SelectPateint({ setCurrent, current }) {
  const verifyPatient = useSelector((state) => state?.PatientReducer?.verify)
  const PatientVerification = useSelector(
    (state) => state?.PatientReducer?.verifyPatient
  )
  const selectedRadio = useSelector(
    (state) => state?.PatientReducer?.selectedRadio
  )

  const appointmentsForList = useSelector(
    (state) => state.PatientReducer.appointmentInfo
  ).map((x) => x._for)

  const appointmentsBooked = useSelector(
    (state) => state.PatientReducer.appointmentInfo
  )

  const addAnotherApp = useSelector(
    (state) => state?.PatientReducer?.addAnotherApp
  )
  // const data = useSelector((state) => state?.PatientReducer?.appointmentInfo)
  console.log('verifyPatient', verifyPatient)
  console.log('appointmentsForList', appointmentsForList)


  console.log('appointmentsBooked', appointmentsBooked)
  const [verify, setVerify] = useState(false)
  const [addRelation, setAddRelation] = useState(false)
  const [selectedPatientIndex, setSelectedPatientIndex] = useState('')
  const [showField, setShowField] = useState(false)
  const [PhoneNoVerification, setPhoneNoVerification] = useState('')
  const [IndexPatient, setIndexPatient] = useState(0)
  const [selected, setSelected] = useState(
    selectedRadio ? selectedRadio : 'radio'
  )
  const [appBookedRadio, setAppBookedRadio] = useState('radio')
  const [otpModal, setOTPModal] = useState(false)
  const [otpCheckForPhone, setOtpCheckForPhone] = useState(false)
  const [editPhoneModal, setEditPhoneModal] = useState(false)
  const [selectEditPhoneNo, setSelectEditPhoneNo] = useState('')
  const [editPhoneVerification, setEditPhoneVerification] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDependentModal, setIsDependentModal] = useState(false)

  console.log('setCureent Select Patient', current)
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const patientPhoneNo = useSelector(
    (state) => state.VerifyPatientPhoneNo.PatientPhoneNo
  )

  const relationsData = useSelector(
    (state) => state?.PatientReducer?.patientRelations
  )

  const PatientRelationNum = useSelector(
    (state) => state?.PatientReducer?.verifyPatientRelationNo
  )
  const parentPatientData = useSelector(
    (state) => state?.PatientReducer?.parentPatientData
  )
  const childPatientData = useSelector(
    (state) => state?.PatientReducer?.childPatientRelationData
  )
  const patientDependents = useSelector(
    (state) => state?.PatientReducer?.patientDependentData
  )
  console.log('patientDependentsyyyyyyyyyyyyy', patientDependents)
  const otp = useSelector((state) => state?.PatientReducer?.OTP)
  const sid = useSelector((state) => state?.PatientReducer?.sid)

  const phoneNumbers = useSelector((state) =>
    state?.PatientReducer?.appointmentInfo.map((item) => item?._for)
  )
  console.log('phoneNumbers', phoneNumbers)
  console.log('otppppppppp', otp)
  // console.log(patientDependentData,'patientDependentDataaaaaaaa');
  const editFor_ = useSelector((state) => state?.PatientReducer?.edit_For)
  console.log('editFor_', editFor_)
  const patientData = useSelector((state) => state?.PatientReducer?.patientData)

  const patientRelationData = useSelector(
    (state) => state?.PatientReducer?.patientRelation
  )

  const patientPartnerData = useSelector(
    (state) => state?.PatientReducer?.patientPartner
  )

  const patientDependentsData = useSelector(
    (state) => state?.PatientReducer?.patientDependent
  )

  console.log('patientPartnerData', patientPartnerData)
  console.log('patientDependentsData', patientDependentsData)
  const phoneNum = useSelector(
    (state) => state?.VerifyPatientPhoneNo?.patientPhoneNo
  )

  const apmntFor_ = useSelector((state) => state?.PatientReducer?.apptfor_)
  const PatientInfoWithDependent = useSelector(
    (state) => state?.PatientReducer?.patientInfo
  )
  console.log('PatientInfoWithDependent', PatientInfoWithDependent)

  const appointmentBookInfo = useSelector(
    (state) => state?.PatientReducer?.appointmentInfo
  )

  const addPatientRes = useSelector(
    (state) => state?.PatientReducer?.addPatientOtp
  )

  const isMounted = useRef(false)
  const [form1] = Form.useForm();

  console.log('appointmentBookInfo', appointmentBookInfo)
  console.log('Patient Phone No', patientPhoneNo)
  console.log('Patient selectedRadio', selectedRadio)
  console.log('aaaaaaaaaaaaaa', PatientVerification)
  console.log('PatienrRelationNum', PatientRelationNum)
  console.log('childPatientData', childPatientData)
  console.log('parentPatientData', parentPatientData)
  console.log('apmntFor_', apmntFor_)

  console.log('selectedaaaaaaa',selected)
  console.log('addPatientRes', addPatientRes)

  console.log('addAnotherApp', addAnotherApp)
  console.log('patientDatayyyyyyyyyyyyyy', patientData)
  console.log('patientRelationData', patientRelationData)
  const { id } = useParams()
  console.log('dp_id', id)
  const [patient, setPatient] = useState({
    id: patientData ? patientData.id : '',
    name: parentPatientData?.name ? parentPatientData?.name : patientData?.name,
    email: parentPatientData.email
      ? parentPatientData.email
      : patientData?.email,
    phone: parentPatientData?.phone
      ? parentPatientData?.phone
      : patientData?.phone
      ? patientData?.phone
      : phoneNum,
    gender: parentPatientData.gender
      ? parentPatientData.gender
      : patientData?.gender,
    maritalStatus: parentPatientData?.maritalStatus
      ? parentPatientData?.maritalStatus
      : patientData?.maritalStatus,
    dob: parentPatientData?.dob ? parentPatientData?.dob : patientData?.dob,
    Insurance: parentPatientData?.Insurance
      ? parentPatientData?.Insurance
      : patientData?.Insurance,
    // relation: PatientVerification?.patient
    //   ? PatientVerification?.patient?.patientRelations
    //   : [],
  })
  const [patientRelationInfo, setPatientRelationInfo] = useState(
    childPatientData?.length !== 0
      ? childPatientData
      : patientPartnerData
      ? patientPartnerData
      : {}
  )

  const [patientDependent, setPatientDependent] = useState(
    patientDependents.length != 0
      ? patientDependents
      : patientDependentsData
      ? patientDependentsData
      : []
  )

  const [dependentInsurance, setDependentInsurance] = useState([])
  const [addDependent, setAddDependent] = useState({
    name: '',
    gender: '',
    dob: '',
    insurance: '',
  })
  const [selectedPhone, setSelectedPhone] = useState(
    patient?.phone ? patient?.phone : phoneNum
  )
  console.log('selected PhoneNo', selectedPhone)
  console.log(patientRelationInfo, 'patientRelationInfo')

  const indexFunction = (i) => {
    console.log(i, 'iiiiiiiiiiiiiiiiiiiii')
    if (IndexPatient >= 0) {
      console.log('indessadasdad')
      setIndexPatient(i)
    }
  }
  const handleVerify = () => {
    console.log('check it that')
    if (
      PatientVerification?.message === 'No Patient Found' ||
      patientData.length == 0
    ) {
      dispatch(storeVerify(false))
      setVerify(false)
    } else if (PatientVerification?.message === 'Patient Found') {
      dispatch(storeVerify(true))
      setVerify(true)
    }
  }

  const handleDependentChange = (field, value) => {
    console.log('fieldssssssssssssssssss', field)
    console.log('vlauesssssssssss', value)
    if (field === 'dob') {
      const formattedDOB = dayjs(value).format('MM/DD/YY')
      setAddDependent((prevState) => ({
        ...prevState,
        [field]: formattedDOB,
        created_by: patient?.id,
      }))
    } else if (field === 'insurance') {
      const convertValue = JSON.parse(value)
      setAddDependent((prevState) => ({
        ...prevState,
        [field]: convertValue?.id,
        Insurance: convertValue,
        created_by: patient?.id,
      }))
    } else {
      setAddDependent((prevState) => ({
        ...prevState,
        [field]: value,
        created_by: patient?.id,
      }))
    }
  }

  console.log('ModelDependentFieldsaaaaaaaaaaaaa', addDependent)

  const clearDependentFormFields = () => {
    // Clear the form fields in ModelDependentField
    setAddDependent({
      name: '',
      gender: '',
      dob: '',
      insurance: '',
    });
  };
  const handleDependentFields = () => {
    debugger
    dispatch(postDependentAdd({ dependent: addDependent }))
      .unwrap()
      .then((x) => {
        console.log('xxxxxxxxxxxxxxxxxx', x)
        if (x.message == 'dependent added') {
          // const updatedData = patientDependent.map((item) => {
          const getResultValue = () => {
            if (patient?.id == x?.data?.insurance_inherit_from?.id) {
              return {
                ...x?.data,
                insurance_inherit_from: {
                  ...x.data.insurance_inherit_from,
                  name: 'self',
                },
              }
            } else {
              return {
                ...x?.data,
                insurance_inherit_from: {
                  ...x.data.insurance_inherit_from,
                  name: 'partner',
                },
              }
            }
          }
          // })

          const result = getResultValue()
          console.log('updatedDataaaaaaaaaaaaaaaaaaaaa', result)
          setPatientDependent((prevState) => [...prevState, result])
          // clearDependentFormFields();
          // form.setFieldsValue({ dependentName: '' });
          setIsDependentModal(false)
          form1.setFieldsValue({
            name: '',
            gender: undefined,
            dob: undefined,
            insurance: undefined
          });
        }
      })

    // setIsDependentModal(false)
    // setAddDependent({
    //   name: '',
    //   gender: '',
    //   dob: '',
    //   insurance: '',
    // })
  }

  const handleInputFieldsChange = (field, value, index) => {
    console.log('fieldssssssssssssssssss', field)
    console.log('vlauesssssssssss', value)

    if (index === -1) {
      if (field === 'Insurance') {
        const convertValue = JSON.parse(value)
        setPatient((prevState) => ({
          ...prevState,
          [field]: convertValue,
        }))
      } else {
        setPatient((prevState) => ({
          ...prevState,
          [field]: value,
        }))
      }
    } else if (field.includes('Dependent')) {
      setPatientDependent((prevState) => {
        const updatedPatientDependent = [...prevState]
        const fieldValue = field.replace(/Dependent\d+$/, '')

        if (fieldValue === 'insurance') {
          const convertValue = JSON.parse(value)

          updatedPatientDependent[index] = {
            ...updatedPatientDependent[index],
            // [fieldValue]: value,
            insurance_inherit_from: convertValue,
          }
        } else {
          updatedPatientDependent[index] = {
            ...updatedPatientDependent[index],
            [fieldValue]: value,
          }
        }

        return updatedPatientDependent
      })
    } else {
      // debugger
      const fieldValue = field.replace(/Child/g, '')
      if (fieldValue === 'Insurance') {
        const convertValue = JSON.parse(value)
        setPatientRelationInfo((prevState) => ({
          ...prevState,
          [fieldValue]: convertValue,
        }))
      } else {
        setPatientRelationInfo((prevState) => ({
          ...prevState,
          [fieldValue]: value,
        }))
      }
      // setPatientRelationInfo((prevState) => ({
      //   ...prevState,
      //   [fieldValue]: value,
      // }))
      // setPatientRelationInfo((prevState) => {
      //   const updatedPatientRelationInfo = [...prevState]
      //   const fieldValue = field.replace(/Child\d+$/, '') // Remove the number from the end of the field name
      //   updatedPatientRelationInfo[index] = {
      //     ...updatedPatientRelationInfo[index],
      //     [fieldValue]: value,
      //   }
      //   return updatedPatientRelationInfo
      // })
    }
  }

  console.log('DpendentPatients', patientDependent)

  const handleChange = (event) => {
    const { value } = event?.target
    setSelectedPatientIndex(value)
    console.log('value', value)
    console.log('patientId', patient.id)
    // Check if selected ID belongs to a patient in the patient state
    if (patient.id == value) {
      console.log('value', value)
      console.log(patient, 'checked')
      return
    }

    // Check if selected ID belongs to a patient in the patientRelationInfo state
    const selectedPatient = patientRelationInfo.find(
      (patient) => patient.id == value
    )
    if (selectedPatient) {
      console.log(selectedPatient, 'checked')
      return
    }
  }
  const handleCancel = () => {
    console.log('Cancel ')
    setShowField(false)
  }
  console.log('setSelectedPatientIndex', selectedPatientIndex)

  const handleDeletePartner = (patient) => {
    // Check if ID belongs to a patient in the patient state
    console.log('Idsssssssssssss', patient)
    debugger
    dispatch(deletePartner({ id: patient.id }))
      .unwrap()
      .then((x) => {
        console.log(x, 'xxxxxxxxxxxxxxxxxxxxxx')
        if (x.message === 'partner deleted and depenedent insurance updated' || x.message == 'Partner does not exist') {
          const idToMatch = patientRelationInfo?.id
          const deleteDependentOfPartner = patientDependent.filter((obj) => {
           return(

             obj.created_by !== idToMatch
           )
          })
          // const deleteDependentOfPartner = patientDependent.map((obj) => {
          //   if (obj.created_by === idToMatch) {
          //     return { ...obj, isShow: false }
          //   }
          //   return obj
          // })
          console.log('updatedData', deleteDependentOfPartner)
          setPatientDependent(deleteDependentOfPartner)
          setPatientRelationInfo({})
          const filterPartnerFromInsurance=dependentInsurance.filter((val)=> val.id !== idToMatch)
          setDependentInsurance(filterPartnerFromInsurance);
        }
      })
  }

  const handleDeleteDependent = (patient) => {
    // Check if ID belongs to a patient in the patient state
    console.log('Idsssssssssssss', patient)

    dispatch(deleteDependentPatient({ id: patient?.id }))
      .unwrap()
      .then((x) => {
        console.log('xxxxxxaaa',x);
        if(x?.message === "Dependent deleted")
        {
            const updateDependents= patientDependent.filter((val)=> val?.id != patient?.id);
            console.log('updateDependents',updateDependents);
            setPatientDependent(updateDependents);
        }
    })

    // const deleteDependentPatients = patientDependent?.map((dependent, i) => {
    //   if (dependent?.key === patient?.key)
    //     return { ...dependent, isDeleted: true }
    //   return dependent
    // })
    // console.log('deleteDependentPatients', deleteDependentPatients)
    // // // console.log('updatedPatientsWithIndex',updatedPatientsWithIndex);
    // setPatientDependent(deleteDependentPatients)
    // setSelectedPatientIndex('')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    const newValue = value.replace(/[^\+0-9]/g, '')
    console.log('Phone No', newValue)
    setPhoneNoVerification(newValue)
    dispatch(storeVerifyPatientRelationNo(newValue))
  }

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')
    return id
  }

  function getPatientData(selected) {
    let key
    debugger

    if (selected === 'radio') {
      key = patient?.id
    } else if (selected === 'radioChild') {
      key = patientRelationInfo?.id
    } else if (selected.startsWith('radioDependent')) {
      const index = parseInt(selected.slice('radioDependent'.length), 10)
      if (!isNaN(index) && index >= 0 && index < patientDependent.length) {
        const dependentObj = patientDependent[index]
        if (dependentObj.hasOwnProperty('id')) {
          key = dependentObj.id
        }
      }

    return key
  }
  }

  const handleSubmit = (saveAction) => async (values) => {
    console.log('The values are', values)
    console.log('SaveAction', saveAction)
debugger
    // if (!selectedRadio) {
    //   NotificationWithIcon('error', 'Please select a radio button');
    // // } else {
    //   const radioButton = document.querySelector(`input[name="option"][value="${selected}"]`);
      
      if (selected == " ") {
        NotificationWithIcon('error', 'Please add and select patient to book appointment');
      // } else if (selected === selectedRadio) {
      //   NotificationWithIcon('error', 'Select any patient to book an appointment');
      }
      else
      {
                // dispatch(storeSelectedRadio(appBookedRadio))
                // setCurrent(3)
                  if (saveAction === 'save') {
                    console.log('patientRelationssssss', patientRelationInfo)
                    console.log('patientssss', patient)
                    debugger
                    let key;
                    if (selected === 'radio') {
                      key = patient?.id
                    } else if (selected === 'radioChild') {
                      key = patientRelationInfo?.id
                    } else if (selected.startsWith('radioDependent')) {
                      const index = parseInt(selected.substring("radioDependent".length), 10);
                      key=index
                    }
                    if(key != undefined)
                    {
            
                      console.log(key, 'apmntForccccccccccccccccccccccc')
                      const uniqueAppointmentBooked = appointmentBookInfo.find(
                        (app) => app?._for == key
                      )
                      console.log('uniqueAppointmentBooked', uniqueAppointmentBooked)
              
                      if (
                        editFor_ == undefined &&
                        appointmentBookInfo.length !== 0 &&
                        uniqueAppointmentBooked !== undefined
                      ) {
                        NotificationWithIcon(
                          'error',
                          'You already booked the appointment for this patient'
                        )
                      } else {
                        setLoading(true)
                        const patientRelationState = patientDependent.filter((val) => {
                          if (!val?.isDeleted && !val?.isNew) return val
                          else if (!val?.isDeleted && val?.isNew) return val
                          else if (val?.isDeleted && val?.id) return val
                        })
              
                        console.log('filteredDatasssssssssss', patientRelationState)
                        // console.log('filterIdData',filterIdData);
                        // setPatient(values)
                        // getPatientData(values);
              
                        console.log(selected, 'apmntFor')
              
                        dispatch(storeSelectedRadio(appBookedRadio))
                        dispatch(storeAppFor_({ apmntFor: key }))
                        dispatch(storeParentPatientData({ patient }))
                        dispatch(storeChildPatientRelationData(patientRelationInfo))
                        dispatch(storePatientDependentData(patientDependent))
                        

              
                        const patientInfo = transformPatientData(
                          patient,
                          patientRelationInfo,
                          patientDependent,
                          id
                        )
              
                        console.log('finalSubmitPatientInfo', patientInfo)
                        if (patientInfo) {
                          dispatch(setPatientInfo(patientInfo))
                          dispatch(patientWithDependentsData(patientInfo))
                            .unwrap()
                            .then((x) => {
                              console.log('xxxxxxxxxxxxxxxx', x)
                              if (x.message === 'patient data added') {
                                setLoading(false)
                                dispatch(storeAddAnotherApp(''));
                                setCurrent(3)
                              }
                            })
                        }
                      }
                    }
                  }
      }
    }

    // if (selected === selectedRadio) {
    //   NotificationWithIcon('error', 'Select any patient to book appointment')
    // } 
    
    // else {
    //     }
    //     // const key=getPatientData(selected);

          // await setCurrent(3)
        // }
      // }
        console.log('patientRelationssssss', patientRelationInfo)
        // setCurrent(2)
  //     }
  //   }
  // }

  function transformPatientData(
    patient,
    patientRelation,
    patientDependent,
    dp_id
  ) {
    // debugger
    console.log(patientRelation, 'patientRelationsssssssss')
    console.log('patientRedux', patient)
    console.log(patientDependent, 'patientDependentzzzzzzzzz')
    const patientPartner =
      patientRelation && Object.keys(patientRelation).length > 0
        ? {
            id: patientRelation.id ? patientRelation.id : '',
            name: patientRelation.name,
            email: patientRelation.email,
            dob: dayjs(patientRelation.dob).format('MM/DD/YY'),
            gender: patientRelation.gender,
            phone: patientRelation.phone,
            maritalStatus: patientRelation.maritalStatus,
            dp_url: patientRelation.dpUrl,
            isDeleted: patientRelation.isDeleted
              ? patientRelation.isDeleted
              : false,
            ins_id: patientRelation?.Insurance?.id,
            key: patientRelation.id,
          }
        : {}

    const patientInfo = {
      patient: {
        id: patient?.id ? patient?.id : '',
        name: patient?.name,
        email: patient?.email,
        dob: dayjs(patient?.dob).format('MM/DD/YY'),
        gender: patient?.gender,
        phone: patient?.phone,
        maritalStatus: patient?.maritalStatus,
        ins_id: patient?.Insurance?.id,
        key: patient?.id ? patient?.id : '',
        dp_id: dp_id,
        // dp_url: patient?.dpUrl,
        // patientPartner: patientRelation?.map((pr) => {
        //   const relationData = data.find((d) => d.relation === pr.relation)
        //   return {
        // id: pr?.id ? pr?.id : null,
        patientPartner,
        dependents: patientDependent?.map((pd) => {
          return {
            id: pd?.id,
            name: pd?.name,
            dob: pd?.dob,
            gender: pd?.gender,
            insurance: pd?.insurance_inherit_from?.id,
            key: pd?.key,
            isDeleted: pd.isDeleted ? pd.isDeleted : false,
          }
        }),
        //   }
        // }),
      },
    }
    return patientInfo
  }

  const handleAddField = () => {
    // console.log(event,'assa');
    setShowField(true)
  }

  const handleRadioChange = (e) => {
    console.log(e.target.value, 'radiooo')
    const { name, phone, disabled } = JSON.parse(e.target.value) // Parse the value object to extract the name and phone
    console.log('Radio Name:', name)
    if (!disabled) {
      setSelected(name)
    }

    console.log('Phone Value:', phone)
    setAppBookedRadio(name)
    setSelectedPhone(phone)
    setSelected(name)
  }

  const handleModal = (x) => {
    console.log('open Modalaaaaaa', x)
    // setOTPModal(true);
  }

  console.log('selectedaaaaRdio', selected)

  const handleAddPatient = (x) => {
    console.log('aaaaaaaaaaaaaaaaabudllah', x)
    try {
      // debugger
      const newPatientFields = {
        indexId: generateId(),
        id: x?.data?.id ? x?.data?.id : '',
        name: x?.data?.name ? x?.data?.name : '',
        email: x?.data?.email ? x?.data?.email : '',
        phone: x?.data?.phone ? x?.data?.phone : '+1' + PatientRelationNum,
        gender: x?.data?.gender ? x?.data?.gender : '',
        maritalStatus: x?.data?.maritalStatus ? x?.data?.maritalStatus : '',
        dob: x?.data?.dob ? x?.data?.dob : '',
        Insurance: x?.data?.Insurance ? x?.data?.Insurance : '',
        isDeleted: false,
        isNew: true,
      }
      const insurancePartner = {
        id: newPatientFields?.id,
        name: 'partner',
      }

      setDependentInsurance((preState) => [...preState, insurancePartner])
      if (
        Object.keys(x?.data).length != 0 &&
        x?.data?.Dependents != undefined &&
        x?.data?.Dependents?.length !== 0
      ) {
        const updatedData = x?.data?.Dependents?.map((item) => {
          return {
            ...item,
            insurance_inherit_from: {
              ...item.insurance_inherit_from,
              name: 'partner',
            },
            key: uuidv4(),
          }
        })
        console.log('cccccccccczzzzzzzzz', updatedData)
        setPatientDependent((preState) => [...preState, ...updatedData])
      }

      console.log('newPatientFields', newPatientFields)
      const updatedPatients = newPatientFields
      console.log('sssddd', updatedPatients)
      setPatientRelationInfo(updatedPatients)
      setAddRelation(true)
      setOTPModal(false)
      // setPhoneNoVerification('');
      setShowField(false)
    } catch (error) {
      console.log('Error Message', error)
    }
    // setOTPModal(false);
  }

  const handlePatientDependent = () => {
    setIsDependentModal(true)
    // const addDependent = {
    //   id: patientDependentsData?.id ? patientDependentsData?.id : '',
    //   key: uuidv4(),
    //   name: '',
    //   dob: '',
    //   gender: '',
    //   // insurance_inherit_from:{
    //   //     id:patient?.id,
    //   //     name:'self'
    //   // },
    //   isDeleted: false,
    //   isNew: true,
    // }
    // const updatedPatients = [...patientDependent, addDependent]
    // console.log('addDependent', addDependent)
    // console.log('updatedPatients', updatedPatients)
    // setPatientDependent(updatedPatients)
  }

  const handleSelect = () => {
    NotificationWithIcon('error', 'Please check  to book the appointment')
  }

  //Edit phone No functionality and OTP

  const validatePhoneNumber = (_, value) => {
    if (value && value.length !== 10) {
      return Promise.reject('Phone number must be 10 digits!')
    }
    return Promise.resolve()
  }

  const handlePhoneChange = (e) => {
    console.log('valuesaaaaaaaaaa', e.target.value)
    setEditPhoneVerification(e.target.value)
  }

  const handleEdit = (num) => {
    console.log('numberis', num)
    setEditPhoneModal(true)
    setSelectEditPhoneNo(num)
  }

  const handlePhoneNo = () => {
    console.log('Verified Phone Number:', editPhoneVerification)
    if (editPhoneVerification.length <= 0) {
      console.log('fill the field')
      // form.validateFields(['modalPhoneField'])
      NotificationWithIcon('error', 'Please edit number to proceed')
    } else {
      dispatch(getPatientOTP({ patientPhoneNo: editPhoneVerification }))
        .unwrap()
        .then((x) => {
          console.log('check itaaaaaaaaaa', x)
          if (x) {
            setOtpCheckForPhone(true)
            setOTPModal(true)
            dispatch(storeSid(x.sid))
          }
        })
      setEditPhoneModal(false)
    }
  }

  const updatePhoneField = () => {
    console.log('patientssss', patient)
    console.log('editPhoneVerification', editPhoneVerification)
    console.log('selectEditPhoneNo', selectEditPhoneNo)
    // debugger
    if (patient.phone === selectEditPhoneNo) {
      // Update the phone field in the patient object
      const updatedPatient = { ...patient, phone: '+1' + editPhoneVerification }
      console.log('updatedPatient', updatedPatient)
      setPatient(updatedPatient)
      form.setFieldsValue({ phone: editPhoneVerification })
      // console.log('patientssssaaaaaa', patient)
      return
    }

    if (patientRelationInfo.phone === selectEditPhoneNo) {
      // Update the phone field in the patient object
      const updatedPatient = {
        ...patientRelationInfo,
        phone: '+1' + editPhoneVerification,
      }
      console.log('updatedPatient', updatedPatient)
      setPatientRelationInfo(updatedPatient)
      form.setFieldsValue({ phone: editPhoneVerification })
      // console.log('patientssssaaaaaa', patient)
      return
    }
  }

  console.log('patientssssaaaaaaccccccccc', patient)
  console.log('patientRelationssssss', patientRelationInfo)

  const handleCheck = (event) => {
    // console.log('Events',event.target.name);
    // if(event.target.name === "check")
    // {

    try {
      console.log('Patient Phone Noaaaaaaaaaaaaaa', PhoneNoVerification)
      // setPhoneNoVerification('');
      if (PhoneNoVerification.length <= 0) {
        console.log('fill the field')
        form.validateFields(['phoneNum'])
      } else {
        const numExistsInParentPatient =
          Object.values(patient).find(
            (value) => value === '+1' + PhoneNoVerification
          ) !== undefined

        const numExistsInPatientPartner =
          Object.values(patientRelationInfo).find(
            (value) => value === '+1' + PhoneNoVerification
          ) !== undefined

      
        if (numExistsInParentPatient || numExistsInPatientPartner) {
          NotificationWithIcon('error', 'Number already exists')
        } else {
          dispatch(getPatientOTP({ patientPhoneNo: PhoneNoVerification }))
            .unwrap()
            .then((x) => {
              console.log('check itaaaaaaaaaa', x)
              if (x) {
                setOTPModal(true)
                dispatch(storeSid(x.sid))
              }
            })
        }
      }
      // setPhoneNoVerification('')
    } catch (error) {
      console.log('Error Message', error)
    }
  }

  const addInsurance = () => {
    // debugger
    let mergeInsuranceTypes
    let data
    mergeInsuranceTypes = { id: patientData?.id, name: 'self' }
    const updateInsurance = [mergeInsuranceTypes]
    setDependentInsurance(updateInsurance)
    if (patientPartnerData != undefined) {
      if (Object?.keys(patientPartnerData).length !== 0) {
        data = {
          id: patientRelationInfo?.id,
          name: 'partner',
        }
        const updateInsurance = [mergeInsuranceTypes, data]
        setDependentInsurance(updateInsurance)
        // console.log('data',data);
      }
    }
    // else {
    //   const updateInsurance = [mergeInsuranceTypes]
    //   setDependentInsurance(updateInsurance)

    //   console.log('updateInsurance', updateInsurance)
    // }

    console.log('mergeInsuranceTypes', mergeInsuranceTypes)
  }
  console.log('Patient Insurance', dependentInsurance)

 
  useEffect(() => {
    handleVerify()
  }, [])

  useEffect(() => {
    dispatch(getInsuranceType())
    dispatch(getPatientRelations())
  }, [])

  useEffect(() => {
    addInsurance()
  }, [])

  useEffect(()=>{
    if(appointmentsBooked?.length > 0 && addAnotherApp == "Add Appintment"){
      let booked = [];
      debugger
      for(let i=0; i < appointmentsBooked?.length; i++){
        if(appointmentsBooked[i]?.key === patient?.id &&  appointmentsBooked[i]?.isDependent === false){
          booked.push("parent");
        }
        else if(appointmentsBooked[i]?.key === patientRelationInfo?.id &&  appointmentsBooked[i]?.isDependent === false){
          booked.push("partner");
        }
        else {
          booked.push(appointmentBookInfo[i]?.key);
        }
      }
      console.log('bookedaaaaaaa',booked);
      // setAllBookedApmnt(booked);
      if(!booked.includes("parent")){
        setSelected("radio");
      }
      else if(!booked.includes("partner")){
        setSelected("radioChild");
      }
      else{
        let foundMatch = false;
        for (let j = 0; j < patientDependent?.length; j++) {
          const dep = patientDependent[j];
          if(!booked.includes(dep?.id)){
            setSelected(`radioDependent${dep?.id}`);
            foundMatch=true;
            break
          }
        }
        if (!foundMatch) {
          // Additional condition after else block
          setSelected(" ");
        }
      }
    }
  },[])


  return (
    <>
      <div className="ml-10 mt-10">
        <p className="text-[#464D59]">
          <span className="border-b-2 border-[#5ECCB9]">Patient</span> Details
        </p>
        {!verify ? (
          <p className="mt-4 pr-10 text-[#464D59]">
            We apologize, but it appears that we do not have a record of your
            number in our system. In order to proceed with your medical care, we
            kindly ask that you provide us with your information so that we can
            update our records.
          </p>
        ) : (
          ''
        )}
      </div>

      <div className="mt-10 px-10">
        <Form form={form} onFinish={handleSubmit('save')}>
          <PatientInputFields
            key={patient?.indexId}
            patientInfo={patient}
            patient={patient}
            selectedPhone={selectedPhone}
            selected={selected}
            setSelected={setSelected}
            handleRadioChange={handleRadioChange}
            addRelation={addRelation}
            id={patient.id}
            verify={verify}
            handleFieldsChange={(field, value) =>
              handleInputFieldsChange(field, value, -1)
            }
            isDisabled={
              appointmentsForList?.includes(patient.id) &&
              !(patient.id === editFor_)
            }
            handleChange={(event) => handleChange(event)}
            selectedPatientIndex={selectedPatientIndex}
            // onDelete={handleDeletePatient}
            handleEdit={handleEdit}
            patientData={PatientVerification}
            PhoneNoVerification={PhoneNoVerification}
            _for="parent"
          />

          {/* {patientRelationInfo.map((patients, index) => {
            console.log('patientsaaaaaaaaaaaaavvvvvvvvvvvvvvv', patients)
            if (!patients.isDeleted) {
              let isDisabled
              if (editFor_ !== undefined) {
                isDisabled =
                  patients.phone !== editFor_ &&
                  phoneNumbers.includes(patients.phone)
              }

              console.log('isDisabled', patients.phone)
              return ( */}

          {Object.keys(patientRelationInfo).length > 0 && (
            <PatientInputFields
              // key={patients?.indexId}
              patientInfo={patientRelationInfo}
              patient={patientRelationInfo}
              // index={index}
              addRelation={addRelation}
              id={patientRelationInfo.id}
              handleFieldsChange={(field, value) =>
                handleInputFieldsChange(field, value)
              }
              // isDisabled={isDisabled}
              selected={selected}
              setSelected={setSelected}
              handleRadioChange={handleRadioChange}
              isDisabled={
                appointmentsForList?.includes(patientRelationInfo.id) &&
                !(patientRelationInfo.id === editFor_)
              }
              // initialValues={form.getFieldsValue()}
              verify={verify}
              handleChange={(event) => handleChange(event)}
              selectedPatientIndex={selectedPatientIndex}
              onDelete={handleDeletePartner}
              handleEdit={handleEdit}
              patientData={PatientVerification}
              PhoneNoVerification={PhoneNoVerification}
              _for="child"
            />
          )}
          {/* )
            }
          })} */}

          {patientDependent.length !== 0 &&
          patientDependent.some((dependent) => !dependent?.isDeleted) ? (
            <p className="my-5 text-[18px] font-medium text-grey">
              Patient Dependents:
            </p>
          ) : null}

          {patientDependent.map((patients, index) => {
            // if (!patients?.isDeleted) {
              let isDisabled
              if (editFor_ !== undefined) {
                isDisabled =
                  patients.id !== editFor_ && phoneNumbers.includes(patients.id)
              }
              // if (!patients?.isShow === false || !('isShow' in patients)) {
                return (
                  <PatientDependentFields
                    index={patients?.id}
                    patient={patients}
                    isDisabled={isDisabled}
                    selected={selected}
                    handleRadioChange={handleRadioChange}
                    onDelete={handleDeleteDependent}
                    handleFieldsChange={(field, value) =>
                      handleInputFieldsChange(field, value, index)
                    }
                    _for="dependent"
                    dependentInsurance={dependentInsurance}
                    setDependentInsurance={setDependentInsurance}
                    // setSelected={setSelected}
                  />
                )
              // }
            // }
          })}

          <div className="flex ">
            {!showField ? (
              <div className="">
                <Button
                  className="border-2 border-[#14226D] text-[#14226D]  rounded-lg mt-10"
                  onClick={handleAddField}
                  disabled={Object.keys(patientRelationInfo).length != 0}
                >
                  Add Partner
                </Button>
              </div>
            ) : (
              <div className="flex mt-[30px]">
                <hr className="border-[1px] border-slate-200 mb-5 " />
                <Form.Item
                  name="phoneNum"
                  label="Enter Phone No"
                  initialValue={PhoneNoVerification}
                  rules={[
                    {
                      required: true,
                      message: "Please input patient's phone number!",
                      validator: validatePhoneNumber,
                    },
                  ]}
                >
                  <Input
                    name="phoneNum"
                    onChange={handleInputChange}
                    value={PhoneNoVerification}
                    maxLength={10}
                    addonBefore="+1"
                    // initialValues={PhoneNoVerification}
                    placeholder="Phone Number"
                    className=" m-2 w-[100%]  border-2 border-slate-200  rounded-md"
                    onKeyDown={(e) => {
                      if (
                        e.key !== 'Backspace' &&
                        e.key !== 'Delete' &&
                        e.key !== 'ArrowLeft' &&
                        e.key !== 'ArrowRight' &&
                        e.key !== 'ArrowUp' &&
                        e.key !== 'ArrowDown' &&
                        e.key !== 'Tab' &&
                        (e.key < '0' || e.key > '9')
                      ) {
                        e.preventDefault()
                      }
                    }}
                  />
                </Form.Item>
                <div className=" ml-10 mt-[10px]">
                  <button
                    className="p-2 rounded-full mr-4  bg-green-400 text-white"
                    name="check"
                    type="button"
                    onClick={handleCheck}
                  >
                    <GiCheckMark />
                  </button>
                  <button
                    className="p-2 rounded-full mr-4  bg-red-600 text-white cursor-pointer"
                    onClick={handleCancel}
                  >
                    <RxCross1 />
                  </button>
                </div>
              </div>
            )}

            <Button
              className="mx-4 border-2 border-[#14226D] text-[#14226D]  rounded-lg mt-10"
              onClick={handlePatientDependent}
            >
              Add Dependent
            </Button>
          </div>

          <div className="mt-[50px] flex justify-end">
            <Form.Item>
              {/* {selected.length != 0 ? (
                <button
                  className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]"
                  htmlType="submit"
                >
                  Submit
                </button>
              ) : (
                <button
                  className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]"
                  type="button"
                  onClick={handleSelect}
                >
                  Submit
                </button>
              )} */}
              {loading == false ? (
                <>
                  <button
                    className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]"
                    htmlType="submit"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]"
                    // htmlType="submit"
                  >
                    Submit{' '}
                    <ClipLoader size={12} color="white" className="ml-2" />
                  </button>
                </>
              )}
              {/* <button
                className="m-2 px-8 py-[6px] rounded-md text-white bg-[#5ECCB9]"
                htmlType="submit"
              >
                Submit
              </button> */}
            </Form.Item>
            {/* <Form.Item>
              <Button className="m-2" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item> */}
            <CancelButton setCurrent={setCurrent} current={current} />
          </div>
        </Form>

        {/* {
          otpModal ? (
            <> */}
        <Modal
          title="OTP Verification"
          open={otpModal}
          onCancel={() => setOTPModal(false)}
          onOk={() => handleAddPatient('hello')}
          footer={false}
        >
          <OtpModal
            patientId={patient?.id}
            PhoneNoVerification={PhoneNoVerification}
            editPhoneVerification={'+1' + editPhoneVerification}
            setEditPhoneVerification={setEditPhoneVerification}
            handleAddPatient={handleAddPatient}
            setOTPModal={setOTPModal}
            setOtpCheckForPhone={setOtpCheckForPhone}
            otpCheckForPhone={otpCheckForPhone}
            updatePhoneField={updatePhoneField}
            setSelected={setSelected}
            selected={selected}
          />
        </Modal>

        <Modal
          title="Verify Patient Number"
          open={editPhoneModal}
          onCancel={() => setEditPhoneModal(false)}
          onOk={() => handlePhoneNo()}
        >
          <>
            <div className="mt-10 text-center">
              <Form form={form}>
                <Input
                  type="text"
                  name="modalPhoneField"
                  placeholder="Enter Phone No"
                  value={editPhoneVerification}
                  onChange={handlePhoneChange}
                  className=" mb-10"
                  maxLength={10}
                  addonBefore="+1"
                  rules={[
                    { required: true, message: 'Phone number is required' },
                    { validator: validatePhoneNumber },
                  ]}
                  onKeyDown={(e) => {
                    if (
                      e.key !== 'Backspace' &&
                      e.key !== 'Delete' &&
                      e.key !== 'ArrowLeft' &&
                      e.key !== 'ArrowRight' &&
                      e.key !== 'ArrowUp' &&
                      e.key !== 'ArrowDown' &&
                      e.key !== 'Tab' &&
                      (e.key < '0' || e.key > '9')
                    ) {
                      e.preventDefault()
                    }
                  }}
                />
              </Form>
            </div>
          </>
        </Modal>

        <Modal
          title="Add Dependent"
          open={isDependentModal}
          className="!w-[850px]"
          onCancel={() => setIsDependentModal(false)}
          // onOk={() => handleDependentFields()}
          footer={[]}
          // handleSubmit={handleDependentFields}
        >
          <ModelDependentField
            form={form1}
            _for="addDependent"
            dependentInsurance={dependentInsurance}
            handleFieldsChange={(field, value) =>
              handleDependentChange(field, value)
            }
            addDependent={addDependent}
            handleSubmit={handleDependentFields}
            isDependentModal={isDependentModal}
            setIsDependentModal={setIsDependentModal}
          />
        </Modal>

        {/* </>
          ):("")
        } */}
      </div>
    </>
  )
}

export default SelectPateint
