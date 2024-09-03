import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
// import { debug } from 'console'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  patientData: {},
  patientRelation: [],
  patientPartner: {},
  patientDependent: [],
  verifyPatient: [],
  verifyPatientRelationNo: '',
  insuranceTypes: [],
  patientRelations: [],
  appointmentTypes: [],
  appointmentSlots: [],
  patientInfo: [],
  appointmentType: '',
  selectedDayNDate: '',
  selectedTimeSlot: '',
  patientData: [],
  apptfor_: '',
  selectedProvider: {},
  appointmentInfo: [],
  setAppointmentBooked: [],
  submitAppointmentBooked: '',
  modalData: {},
  resetUsers: [],
  storeDataSource: {},
  parentPatientData: [],
  childPatientRelationData: [],
  patientDependentData: [],
  modalSummaryData: [],
  edit_For: '',
  verify: true,
  loading: false,
  OTPResponse: '',
  OTP: '',
  sid: '',
  addPatientOtp: '',
  selectedRadio: '',
  addAnotherApp: '',
  appointmentInfoForReschedule: '',
  editApp:false
}

export const getPatientOTP = createAsyncThunk(
  'Patient/getPatientOTP',
  async ({ patientPhoneNo }, { rejectWithValue }) => {
    try {
      console.log('Patient Phone No', patientPhoneNo)
      const apiRes = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_API_URL
        }/api/booking/patient/otp?phone=${encodeURIComponent(patientPhoneNo)}`,
        { withCredentials: true }
      )
      console.log('Api Res phone', apiRes?.data)
      return apiRes.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getPatientVerification = createAsyncThunk(
  'Patient/getPatientVerification',
  async ({ patientPhoneNo, sid, otp }, { rejectWithValue }) => {
    try {
      console.log('Patient Phone No', patientPhoneNo)
      const apiRes = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_API_URL
        }/api/booking/patient/?phone=${encodeURIComponent(
          patientPhoneNo
        )}&sid=${sid}&otp=${otp}&isRelationReq=true`,
        { withCredentials: true }
      )
      console.log('Api Res phone', apiRes?.data)
      return apiRes.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deletePartner = createAsyncThunk(
  'Patient/deletePartner',
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log('PartnerId to delete', id)
      debugger

      const apiRes = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/patient/partner/${id}`,
        { withCredentials: true }
      )
      console.log('Api Res Delete PARTNER', apiRes?.data)
      return apiRes.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteDependentPatient = createAsyncThunk(
  'Patient/deleteDependentPatient',
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log('DependentId to delete', id)
      // debugger

      const apiRes = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/dependent/${id}`,
        { withCredentials: true }
      )
      console.log('Api Res Delete Dependent', apiRes?.data)
      return apiRes.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchPatientForRelation = createAsyncThunk(
  'Patient/fetchPatientForRelation',
  async ({ patientPhoneNo, sid, otp, patientId }, { rejectWithValue }) => {
    console.log({ patientPhoneNo }, 'fetchPatientForRelation:dataToBeSend')
    // debugger
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_API_URL
        }/api/booking/patient/partner-with-dependent?phone=${encodeURIComponent(
          patientPhoneNo
        )}&sid=${sid}&otp=${otp}&patientId=${patientId}&isRelationReq=false`,
        { withCredentials: true }
      )
      console.log(res.data, 'fetchPatientForRelation:res')
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const patientsWithDependentsData = createAsyncThunk(
  'Patient/patientsWithDependentsData',
  async (data, { rejectWithValue }) => {
    debugger
    // debugger
    console.log('aaaaaaaaaaaaaaaaaa', data)
    try {
      // const apiRes = await axios.post(
      //   `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/patient`,
      //   data.patient,
      //   { withCredentials: true }
      // )
      // console.log('Api Res Sumit Patient Data', apiRes.data)
      if(data)
        {

          return {success: true , message:"Info Added Successfully"}
        }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getInsuranceType = createAsyncThunk(
  'Patient/getInsuranceType',
  async (data, { rejectWithValue }) => {
    try {
      const apiRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/insurence`,
        { withCredentials: true }
      )
      console.log('Api Res', apiRes.data)
      return apiRes?.data?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getPatientRelations = createAsyncThunk(
  'Patient/getPatientRelations',
  async (data, { rejectWithValue }) => {
    try {
      const apiRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/relation`,
        { withCredentials: true }
      )
      console.log('Api Res', apiRes.data)
      return apiRes?.data?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getAppointmentType = createAsyncThunk(
  'Patient/getAppointmentType',
  async ({ dp_id }, { rejectWithValue }) => {
    // console.log('dp_id',dp_id);
    try {
      const apiRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointmenttypes/${dp_id}`,
        { withCredentials: true }
      )
      console.log('Api Res', apiRes.data)
      return apiRes?.data?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const submitAppointmentBooked = createAsyncThunk(
  'Patient/submitAppointmentBooked',
  async ({ data }, { rejectWithValue }) => {
    console.log('data', data)
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment`,
        data,
        { withCredentials: true }
      )
      console.log('Api Res Sumit App', apiRes.data)
      return apiRes?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const postDependentAdd = createAsyncThunk(
  'Patient/postDependentAdd',
  async ({ dependent }, { rejectWithValue }) => {
    
    console.log('datapostDpe', dependent)
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/patient/dependent`,
        dependent,
        { withCredentials: true }
      )
      console.log('Api Res Sumit App', apiRes.data)
      return apiRes?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const resetUsers = createAction('users/reset')

export const getAppointmentDetail = createAsyncThunk(
  'Patient/getAppointmentDetail',
  async ({ app_id }, { rejectWithValue }) => {
    console.log('app_id', app_id)
    // debugger
    try {
      const apiRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment/${app_id}`,
        { withCredentials: true }
      )
      console.log('Api Resaaaaaaaaa', apiRes.data)
      return apiRes?.data?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const putRescheduleAppointment = createAsyncThunk(
  'Patient/putRescheduleAppointment',
  async ({ app_id, d_id, startTime, endTime }, { rejectWithValue }) => {
    // console.log('app_id',app_id);
    debugger
    try {
      const apiRes = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment/reschedule/${app_id}`,
        {
          d_id: d_id.toString(),
          startTime,
          endTime,
        }
      )
      console.log('Api Resaaaaaaaaaxxxxxxx', apiRes.data)
      return apiRes?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const cancelAppointment = createAsyncThunk(
  'Patient/cancelAppointment',
  async ({ app_id}, { rejectWithValue }) => {
    // console.log('app_id',app_id);
    // debugger
    try {
      const apiRes = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/booking/appointment/cancel/${app_id}`
      )
      console.log('Api Resaaaaaaaaaxxxxxxx', apiRes.data)
      return apiRes?.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)



export const getAppointmentSlots = createAsyncThunk(
  'Patient/getAppointmentSlots',
  async (params, { rejectWithValue }) => {
    if (params) {
      const { dp_id, appType, dayName } = params
      // debugger
      try {
        const apiRes = await axios.get(
          `${
            process.env.REACT_APP_BACKEND_API_URL
          }/api/booking/dentistbyapmnttypes/${dp_id}?type=${encodeURIComponent(
            appType
          )}&day=${dayName}&providerId=&searchBy=`,
          { withCredentials: true }
        )
        console.log('Api Res Slots', apiRes.data)
        return apiRes?.data
      } catch (error) {
        return rejectWithValue(error)
      }
    } else {
      return {}
    }
  }
)

function transformPatientData(
  patient,
  patientRelation,
  patientDependent,
  dp_id
) {
  // debugger
  console.log(patientRelation, 'patientRelationsssssssss')
  console.log('patientRedux', patient)

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
          ins_id: patientRelation.insurance?.id,
          key: patientRelation.id,
        }
      : null

  const patientInfo = {
    patient: {
      id: patient?.id ? patient?.id : '',
      name: patient?.name,
      email: patient?.email,
      dob: dayjs(patient?.dob).format('MM/DD/YY'),
      gender: patient?.gender,
      phone: patient?.phone,
      maritalStatus: patient?.maritalStatus,
      ins_id: patient?.insurance?.id,
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

function transformParentPatient(patient) {
  console.log('ccccccccccccccccccparent', patient)
  const parentpatient = {
    id: patient?.id ? patient?.id : null,
    name: patient?.name,
    email: patient?.email,
    // dob: dayjs(patient?.dob).format('MM/DD/YY'),
    dob: patient?.dob,
    gender: patient?.gender,
    phone: patient?.phone,
    maritalStatus: patient?.maritalStatus,
    Insurance: patient?.Insurance,
    key: patient?.indexId,
    // dp_url: patient?.dpUrl,
  }

  return parentpatient
}

const PatientVerificationSlice = createSlice({
  name: 'Patient',
  initialState,
  reducers: {
    setPatientPhone: (state, action) => {
      // console.log('patienntInfo', state.patientInfo)
      console.log('patient Payload Phone', action.payload)
      },
    setPatientInfo: (state, action) => {
      // console.log('patienntInfo', state.patientInfo)
      console.log('patient Payload', action.payload.patient)
      console.log(
        'PatientRelation Payload',
        action.payload.patientRelationState
      )
      console.log('RelationId Payload', action.payload.relationsData)
      // const dd=transformPatientData(
      //   action.payload?.patientState,
      //   action.payload?.patientRelationState,
      //   action.payload?.relationsData
      // )
      // state.patientInfo.push(dd
      // )
      // debugger

      
      state.patientInfo = action.payload
      

    },
    storeAppointmentType: (state, action) => {
      console.log('storeAppointmentType', action.payload)
      state.appointmentType = action.payload
      // state.address=action.payload
    },
    storeSelectedDayNDate: (state, action) => {
      console.log('storeSelectedDay', action.payload)
      state.selectedDayNDate = action.payload
      // state.address=action.payload
    },
    storeSelectedTimeSlot: (state, action) => {
      console.log('storeSelectedTimeSlot', action.payload)
      state.selectedTimeSlot = action.payload
      // state.address=action.payload
    },
    storePatientData: (state, action) => {
      console.log('storePatientData', action.payload)
      state.patientData = action.payload
      // state.address=action.payload
    },
    storeAppFor_: (state, action) => {
      console.log('storeAppFor_', action.payload)
      state.apptfor_ = action.payload
      // state.address=action.payload
    },
    storeSelectedProvider: (state, action) => {
      console.log('storeSelectedProvider', action.payload)
      state.selectedProvider = action.payload
      // state.address=action.payload
    },
    storeAppointmentBooked: (state, action) => {
      // debugger
      console.log('storeAppointmentBooked', action.payload)

      state.appointmentInfo.push(action.payload)
    },
    deleteAppointmentBooked: (state, action) => {
      console.log('deleteAppointmentBooked', action.payload)
      // const filterDeleteData=state.appointmentInfo.filter((val)=> val?._for !== action.payload?._for)
      // console.log('filterDeleteData',filterDeleteData);
      // if(filterDeleteData)
      // {
      //   state.appointmentInfo=filterDeleteData;
      // }
      state.appointmentInfo = action.payload
    },
    updateAppoitmentBooked: (state, action) => {
      // debugger
      console.log('updateAppoitmentBooked', action.payload)

      state.appointmentInfo = action.payload
    },
    setAppointmentBooked: (state, action) => {
      console.log('setAppointmentBooked', action.payload)
      state.setAppointmentBooked = action.payload
    },
    storeVerifyPatientRelationNo: (state, action) => {
      console.log('verifyPatientRelationNo', action.payload)
      state.verifyPatientRelationNo = action.payload
    },
    storeModalAppointment: (state, action) => {
      console.log('storeModalAppointment', action.payload)
      state.modalData = action.payload
    },
    storeDataSourceData: (state, action) => {
      console.log('storeDataSourceData', action.payload)
      state.storeDataSource = action.payload
    },
    storeParentPatientData: (state, action) => {
      // debugger
      console.log('storeParentPatientData', action.payload)
      state.parentPatientData = transformParentPatient(action?.payload?.patient)
    },
    storeChildPatientRelationData: (state, action) => {
      console.log('childPatientRelationData', action.payload)
      state.childPatientRelationData = action.payload
    },
    storePatientDependentData: (state, action) => {
      console.log('storePatientDependentData', action.payload)
      state.patientDependentData = action.payload
    },
    storeModalSummaryData: (state, action) => {
      console.log('storeModalSummaryData', action.payload)
      state.modalSummaryData = action.payload
    },
    storeEditFor_: (state, action) => {
      console.log('storeEditFor_', action.payload)
      state.edit_For = action.payload
    },
    storeLoading: (state, action) => {
      // console.log('storeModalSummaryData', action.payload)
      state.loading = action.payload
    },
    storeVerify: (state, action) => {
      // console.log('storeModalSummaryData', action.payload)
      state.verify = action.payload
    },
    storeSid: (state, action) => {
      console.log('sid', action.payload)
      state.sid = action.payload
    },
    storeOTP: (state, action) => {
      console.log('otpSotre', action.payload)
      state.OTP = action.payload
    },
    storeAddPatientOtp: (state, action) => {
      console.log('storeAddPatientOtp', action.payload)
      state.addPatientOtp = action.payload
    },
    storeSelectedRadio: (state, action) => {
      console.log('storeSelectedRadio', action.payload)
      state.selectedRadio = action.payload
    },
    storeAddAnotherApp: (state, action) => {
      console.log('storeAddAnotherApp', action.payload)
      state.addAnotherApp = action.payload
    },
    storeReschduleAppInfo: (state, action) => {
      console.log('storeReschduleAppInfo', action.payload)
      state.appointmentInfoForReschedule = action.payload
    },
    EditApp: (state, action) => {
      console.log('EditApp', action.payload)
      state.editApp = action.payload
    },
    setPatientNRealtionEmpty: (state, action) => {
      // console.log('sid', action.payload)
      state.patientData = []
      state.patientRelation = []
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getPatientVerification.fulfilled, (state, { payload }) => {
        console.log('PatientVerificationaaaaaaaaaaaaaaaaa', payload)
        // debugger
        // let updatedData;
        if (payload?.message == 'patient phone added') {
          state.verifyPatient = payload
          state.patientData = payload?.data
          state.patientPartner = payload?.partner
          state.patientDependent = []
          // state.patientRelation=payload?.patient
        } else {
          state.verifyPatient = payload
          state.patientData = { ...payload?.data }
          const patientData = state.patientData
          console.log('check patientData', patientData)
          const mergedDependents = [...payload?.data?.Dependents]
          if (payload?.data?.partner !== null) {
            mergedDependents.push(...payload?.data?.partner?.Dependents)
          }
          // if(payload?.data?.partner == null){
          //   updatedData = mergedDependents.map((item) => ({
          //     ...item,
          //     insurance_inherit_from: {
          //       ...item.insurance_inherit_from,
          //       name: 'Self',
          //     },
          //   }));
          // }else{
          // debugger
          const addKeyInDependent = mergedDependents.map((item) => {
            return {
              ...item,
              key: uuidv4(), // Replace 'newKey' with the desired key name and 'value' with the corresponding value
            }
          })

          // if(addKeyInDependent.length == 0)
          // {
          //   return {
          //     insurance_inherit_from: {
          //       id:patientData?.id,
          //       name: 'Self',
          //     },
          //   }
          // }
          // else{}
          const updatedData = addKeyInDependent.map((item) => {
            if (patientData.id == item.insurance_inherit_from.id) {
              return {
                ...item,
                insurance_inherit_from: {
                  ...item.insurance_inherit_from,
                  name: 'Self',
                },
              }
            } else {
              return {
                ...item,
                insurance_inherit_from: {
                  ...item.insurance_inherit_from,
                  name: 'partner',
                },
              }
            }
          })
          // }
          state.patientDependent = updatedData
          // state.patientRelation = [...payload?.patient?.patientRelations]
          // state.patientDependent = [...payload?.data?.Dependents]
          delete payload.patient?.patientRelations
          state.patientData = { ...payload?.data }
          state.patientPartner = { ...payload?.data?.partner }
        }
        // state.verifyPatient=payload
      })
      .addCase(fetchPatientForRelation.fulfilled, (state, { payload }) => {
        console.log('fetchPatientForRelation', payload)
        state.verifyPatient = payload
      })
      .addCase(getPatientOTP.fulfilled, (state, { payload }) => {
        console.log('getPateintOTP', payload)
        state.OTPResponse = payload
      })
      .addCase(getInsuranceType.fulfilled, (state, { payload }) => {
        console.log('Insurance type', payload)
        state.insuranceTypes = payload
      })
      .addCase(getPatientRelations.fulfilled, (state, { payload }) => {
        console.log('patientRealtions', payload)
        state.patientRelations = payload
      })
      .addCase(getAppointmentType.fulfilled, (state, { payload }) => {
        console.log('Appointment type', payload)
        state.appointmentTypes = payload
      })
      .addCase(getAppointmentSlots.fulfilled, (state, { payload }) => {
        console.log('Appointment Slots', payload)
        state.appointmentSlots = payload
      })
      .addCase(submitAppointmentBooked.fulfilled, (state, { payload }) => {
        console.log('submitAppointmentBooked', payload)
        state.submitAppointmentBooked = payload
      })
      .addCase(resetUsers, (state, action) => {
        return { ...initialState }
      }),
})

export const {
  setPatientPhone,
  setPatientInfo,
  storeAppointmentType,
  storeSelectedDayNDate,
  storeSelectedTimeSlot,
  storePatientData,
  storeAppFor_,
  storeSelectedProvider,
  setAppointmentBooked,
  deleteAppointmentBooked,
  updateAppoitmentBooked,
  storeAppointmentBooked,
  storeVerifyPatientRelationNo,
  storeModalAppointment,
  storeDataSourceData,
  storeParentPatientData,
  storeChildPatientRelationData,
  storePatientDependentData,
  storeModalSummaryData,
  storeEditFor_,
  storeVerify,
  storeLoading,
  storeOTP,
  storeSid,
  storeAddPatientOtp,
  storeSelectedRadio,
  storeAddAnotherApp,
  storeReschduleAppInfo,
  EditApp,
  setPatientNRealtionEmpty,
} = PatientVerificationSlice.actions

export default PatientVerificationSlice.reducer
