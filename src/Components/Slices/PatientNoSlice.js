import { createSlice } from '@reduxjs/toolkit'
import { createAction } from '@reduxjs/toolkit';
// import { combineReducers } from '@reduxjs/toolkit'

const initialState = {
  patientPhoneNo: '',
}
export const resetPhoneNoVerification = createAction('users/reset')

export const patientPhoneNoSlice = createSlice({
  name: 'patientNo',
  initialState: initialState,
  reducers: {
    storePatientPhoneNo: (state, action) => {
      console.log('storePatientPhoneNo', action.payload)
      state.patientPhoneNo = action.payload;
      // state.address=action.payload
    },
    resetPhoneNo: (state) => initialState
  },
 
});

export const { storePatientPhoneNo,resetPhoneNo } = patientPhoneNoSlice.actions;
export default patientPhoneNoSlice.reducer;
