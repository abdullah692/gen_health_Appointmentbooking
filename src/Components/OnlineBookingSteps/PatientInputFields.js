import React, { useState } from 'react'
import { Input, Button, Form, Select, DatePicker } from 'antd'
import { MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'

function PatientInputFields({
  patient,
  index,
  key,
  addRelation,
  patientInfo,
  PhoneNoVerification,
  verify,
  selectedPhone,
  selected,
  setSelected,
  handleEdit,
  handleRadioChange,
  handleFieldsChange,
  id,
  handleChange,
  selectedPatientIndex,
  onDelete,
  isDisabled,
  patientData,
  _for,
}) {
  const { Option } = Select
  const dateFormat = 'YYYY/MM/DD'
  const InsuranceType = useSelector(
    (state) => state?.PatientReducer?.insuranceTypes
  )
  const patientRelations = useSelector(
    (state) => state?.PatientReducer?.patientRelations
  )
  console.log('cccccccccccc', patientInfo)

  console.log('idccccccccccc', id)
  console.log('selected', selected)
  console.log('isDisabled', isDisabled)
  console.log('handleRadioChange', handleRadioChange)
  console.log('patientRelations', patientRelations)

  //   const dateFormat = 'YYYY-MM-DD';
  console.log('indesss', index)
  console.log('index', selectedPatientIndex)
  console.log('patientData11', patient)
  const phoneNum = useSelector(
    (state) => state?.VerifyPatientPhoneNo?.patientPhoneNo
  )
  const [selectedDate, setSelectedDate] = useState(null)

  // const PatientName = () => {
  //   if (patientData?.message && patientData?.success) {
  //     return null
  //   } else if (patientData?.patient && patientData?.success) {
  //     return patientData?.patient?.fname + ' ' + patientData?.patient?.lname
  //   }
  // }

  // Calculate the minimum selectable date based on the date of birth
  const getMinDate = () => {
    console.log('initialDob', new Date(patient?.dob))
    const dob = patient?.dob ? new Date(patient.dob) : null // Replace with the actual date of birth

    if (dob) {
      dob.setHours(0, 0, 0, 0) // Set time to midnight
    }

    return dob
  }

  const disabledDate = (current) => {
    // Disable future dates
    if (current && current > new Date().setHours(0, 0, 0, 0)) {
      return true
    }

    return false
  }

  const handleChangeInput = (field, value) => {
    //
    console.log('fieldsss', field)
    console.log('valuess', value.target.value)
    const values = value.target.value
    if (_for === 'child') {
      handleFieldsChange(field, values, index)
    } else {
      handleFieldsChange(field, values)
    }
  }
  const handleDropDownChange = (field, value) => {
    console.log('fieldsss', field)
    console.log('valuess', value)
    if (field?.includes('dob')) {
      const dobValue = dayjs(value).format('MM/DD/YY')
      console.log('dobValue', dobValue)
      // Update selectedDate with the selected value
      setSelectedDate(dobValue)
    }
    // const values=value.target.value;
    if (_for === 'child') {
      handleFieldsChange(field, value, index)
    } else {
      handleFieldsChange(field, value)
    }
  }

  // const handleChangeInput = (value) => {
  //   if (_for === 'child') {
  //     handleFieldsChange(name, value, index);
  //   } else {
  //     handleFieldsChange(name, value);
  //   }
  // };
  // const renderDeleteButton = () => {
  //   if (patientInfo === patient) {
  //     return null // Hide delete button for patient state
  //   } else {
  //     return (
  //       // <button onClick={() => onDelete(patientInfo?.indexId)} className="">
  //         <button onClick={onDelete} className="">
  //         <span className="hover:text-red-600 flex mt-2">
  //           <MdDelete size={20} />
  //           Delete
  //         </span>
  //       </button>
  //     )
  //   }
  // }
  const radioProp = _for === 'parent' ? 'radio' : _for === 'child' ? 'radioChild' : 'radioChild' 
  const nameProp =  _for === 'parent' ? 'name' : _for === 'child' ? 'nameChild' : 'nameChild'
  const emailProp = _for === 'parent' ? 'email' : _for === 'child' ? 'emailChild' : 'emailChild'
  const phoneProp = _for === 'parent' ? 'phone' : _for === 'child' ? 'phoneChild' : 'phoneChild'
  const maritalstatusProp =
  _for === 'parent' ? 'maritalStatus' : _for === 'child' ? 'maritalStatusChild' : 'maritalStatusChild'
  const genderProp =  _for === 'parent' ? 'gender' : _for === 'child' ? 'genderChild' : 'genderChild'
  const dobProp = _for === 'parent' ? 'dob' : _for === 'child' ? 'dobChild' : 'dobChild'
  const insuranceProp =  _for === 'parent' ? 'Insurance' : _for === 'child' ? 'InsuranceChild' : 'InsuranceChild'
  // const relationProp = index === undefined ? 'relation' : `relation${index}`
  // console.log('relationProp', relationProp)
  const init = {}
  // const initialValue = patient?.dob ? dayjs(patient?.dob, 'YYYY-MM-DD').format('MM/DD/YY') : '';

  const validatePhoneNumber = (_, value) => {
    if (value && value.length !== 10) {
      return Promise.reject('Phone number must be 10 digits!')
    }
    return Promise.resolve()
  }

  return (
    <div key={key}>
      {index == 0 ? <hr className="border-[1px] border-slate-200 mb-5" /> : ''}
      <div className="flex justify-between">
        <div className="">
          <input
            type="radio"
            value={JSON.stringify({
              name: radioProp,
              phone: patient?.key,
              disabled: isDisabled,
            })}
            name={radioProp}
            checked={
              selected === radioProp ||
              (selected === '' && radioProp === 'radio')
            }
            onChange={handleRadioChange}
            disabled={isDisabled}
          />
        </div>

        <div className="ml-8 grid grid-cols-4 gap-4 w-full">
          <Form.Item
            style={{ marginBottom: 0 }}
            name={nameProp}
            //    initialValue={
            //     patientData ? patientData?.patient?.fname + " " + patientData?.patient?.lname : ""
            //    }
            initialValue={patient?.name || ''}
            rules={[
              {
                required: true,
                message: 'Please Enter Patient Full Name',
              },
            ]}
          >
            <Input
              name={nameProp}
              onChange={(value) => handleChangeInput(`${nameProp}`, value)}
              placeholder="Enter Full Name"
              disabled={isDisabled}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={emailProp}
            rules={[
              {
                required: true,
                message: 'Please Enter Email',
              },
              {
                type: 'email',
                message: 'Please Enter a valid Email',
              },
            ]}
            initialValue={patient?.email || ''}
          >
            <Input
              name={emailProp}
              onChange={(value) => handleChangeInput(`${emailProp}`, value)}
              disabled={isDisabled}
              placeholder="Email Address"
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={phoneProp}
            initialValue={
              patient?.phone ? patient?.phone : phoneNum
              // verify ? patientData?.patient?.phone : index === 0 ?  phoneNum : !verify && index !== 0 ? PhoneNoVerification : ""
            }
            // initialValue={verify && index=== 0 ? patientData?.patient?.phone : (index === 0 ? phoneNum : PhoneNoVerification)}
            rules={[
              {
                required: true,
                message: 'Please Enter Phone Number',
                // validator:validatePhoneNumber
              },
            ]}
          >
            <div className="flex">
              <Input
                // defaultValue={patient?.phone ? patient?.phone : phoneNum}
                name={phoneProp}
                onChange={(value) => handleChangeInput(`${phoneProp}`, value)}
                disabled={true}
                placeholder="Phone Number"
                onKeyDown={(e) => {
                  if (
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete' &&
                    e.key !== 'ArrowLeft' &&
                    e.key !== 'ArrowRight' &&
                    e.key !== 'ArrowUp' &&
                    e.key !== 'ArrowDown' &&
                    e.key !== 'Tab' &&
                    (e.key < '0' || e.key > '9') &&
                    e.key !== '+'
                  ) {
                    e.preventDefault()
                  }
                }}
                defaultValue={patient?.phone ? patient?.phone : phoneNum}
                style={{ marginRight: '8px' }}
                value={patient?.phone ? patient?.phone : phoneNum}
                //   style={{ width: 180 }}
              />
              <Button
                // type="link"

                className="right-0 border-none text-[#14226D]"
                disabled={isDisabled}
                icon={<AiOutlineEdit />}
                onClick={() =>
                  handleEdit(patient?.phone ? patient?.phone : phoneNum)
                }
              />
            </div>
          </Form.Item>
          <Form.Item
            name={genderProp}
            // label="Gender"
            initialValue={patient?.gender || null}
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select
              name={genderProp}
              placeholder="Select Gender"
              onChange={(value) => handleDropDownChange(`${genderProp}`, value)}
              disabled={isDisabled}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={maritalstatusProp}
            // label="Gender"
            initialValue={patient?.maritalStatus || null}
            rules={[
              { required: true, message: 'Please select Marital Status!' },
            ]}
          >
            <Select
              placeholder="Marital Status"
              name={maritalstatusProp}
              onChange={(value) =>
                handleDropDownChange(`${maritalstatusProp}`, value)
              }
              disabled={isDisabled}
            >
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
              <Option value="divorced">Divorced</Option>
              <Option value="widowed">Widowed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={dobProp}
            format="MM/DD/YY"
            initialValue={patient?.dob ? dayjs(patient?.dob, 'YYYY-MM-DD') : ''}
            rules={[
              { required: true, message: 'Please Select Date Of Birth!' },
            ]}
          >
            <DatePicker
              format={'MM/DD/YY'}
              placeholder="Date Of Birth"
              className="w-full"
              onChange={(value) => handleDropDownChange(`${dobProp}`, value)}
              disabled={isDisabled}
              disabledDate={disabledDate}
              // defaultValue={
              //   patient?.dob ? dayjs(patient?.dob, 'YYYY/MM/DD') : ''
              // }
            />
          </Form.Item>
          <Form.Item
            name={insuranceProp}
            // label="Gender"
            initialValue={
              insuranceProp === 'Insurance'
                ? patient?.Insurance?.type
                :  insuranceProp === 'InsuranceChild'? patient?.Insurance?.type
                : null
            }
            rules={[
              { required: true, message: 'Please select Insurance Type!' },
            ]}
          >
            <Select
              name={insuranceProp}
              placeholder="Insurance Type"
              onChange={(value) =>
                handleDropDownChange(`${insuranceProp}`, value)
              }
              disabled={isDisabled}
            >
              {InsuranceType?.map((ins) => {
                return (
                  <Option  value={JSON.stringify({
                    id: ins?.id ,
                    type: ins?.type,
                    //   disabled: isDisabled,
                  })} key={ins?.id}>
                    {ins?.type}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          {/* Relation drop down closed */}


          {/* {patientInfo !== patient ? (
            <>
              <Form.Item
                style={{ marginBottom: 0 }}
                name={relationProp}
                initialValue={patient.relation || null}
                rules={[
                  {
                    required: true,
                    message: 'Enter your relation with patient',
                  },
                ]}
              >
                <Select
                  placeholder="Enter Relation"
                  name={`relation${index}`}
                  onChange={(value) =>
                    handleDropDownChange(`relation${index}`, value)
                  }
                   disabled={isDisabled}
                >
                  {patientRelations?.map((relation) => {
                    return (
                      <Option value={relation.relation} key={relation.id}>
                        {relation.relation}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </>
          ) : (
            ''
          )} */}
        </div>
        <div className="w-[50px] ml-5">
          {_for !== 'parent' && (
            <button
              onClick={() => onDelete(patient)}
              type="button"
              disabled={isDisabled}
            >
              <span
                className={`flex mt-2 ${
                  isDisabled
                    ? 'text-gray-400'
                    : 'text-gray-700 hover:text-red-600 '
                }`}
              >
                <MdDelete size={20} />
                Delete
              </span>
            </button>
          )}
          </div>
          {/* {selectedPatientIndex == id && ( */}
          {/* <button onClick={() => onDelete(id)} className=''>
             <span className='hover:text-red-600 flex mt-2'><MdDelete size={20} />Delete</span> 
            </button> */}
          {/* {renderDeleteButton()} */}
          {/* )} */}
      </div>
    </div>
  )
}

export default PatientInputFields
