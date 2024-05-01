import { configureStore } from '@reduxjs/toolkit'
// import { storePatientPhoneNo } from './Components/Slices/PatientNoSlice'
import patientNoReducer from './Components/Slices/PatientNoSlice'
import PatientReducer from './Components/Slices/PatientVerification';

export const store = configureStore({
  reducer: {
    VerifyPatientPhoneNo: patientNoReducer,
    PatientReducer:PatientReducer
  },
})
