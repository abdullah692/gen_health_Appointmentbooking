import React, { useState } from 'react'
import { Input, Button, Form, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { MdDelete } from 'react-icons/md'

function PatientDependentFields({
  index,
  patient,
  selected,
  isDisabled,
  handleRadioChange,
  handleFieldsChange,
  onDelete,
  _for,
  dependentInsurance
}) {
  const { Option } = Select

  const radioProp = `radioDependent${index}`
  const nameProp = `nameDependent${index}`
  const genderProp = `genderDependent${index}`
  const dobProp = `dobDependent${index}`
  const insuranceProp = `insuranceDependent${index}`

  const [selectedDate, setSelectedDate] = useState(null)

  console.log('index Dependent', index)
  console.log('PATIENTDETAILS', patient)
  console.log('dependentInsucrance', dependentInsurance)
  const dobInt = patient?.dob ? dayjs(patient?.dob, 'MM/DD/YYYY') : undefined;

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
    if (_for === 'dependent') {
      handleFieldsChange(field, values, index)
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
    if (_for === 'dependent') {
      handleFieldsChange(field, value, index)
    }
  }

  return (
    <div>
      {/* {index == 0 ? <hr className="border-[1px] border-slate-200 mb-5" /> : ''} */}
      <div className="flex justify-between">
        <div className="">
          <input
            type="radio"
            value={JSON.stringify({
              name: radioProp,
              phone: patient?.key,
              //   disabled: isDisabled,
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

        <div className="ml-8 grid grid-cols-4 gap-10 w-full">
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
            name={dobProp}
            format="MM/DD/YY"
            initialValue={patient?.dob ? dayjs(patient?.dob, 'YY-MM-DD') : ''}
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
          
            />
          </Form.Item>

          <Form.Item
            name={insuranceProp}
            // label="Gender"
            initialValue={
              patient?.Insurance?.name || null
            }
            rules={[
              { required: true, message: 'Please select Insurance Type!' },
            ]}
          >
            <Select
              name={insuranceProp}
              placeholder="Insurance Inherit From"
              onChange={(value) =>
                handleDropDownChange(`${insuranceProp}`, value)
              }
              disabled={isDisabled}
            >
              {dependentInsurance?.map((ins) => {
                return (
                  <Option value={JSON.stringify({
                    id: ins?.id,
                    name: ins?.name,
                  })}
                    key={ins?.id}>
                    {ins?.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

        </div>
        <div className="w-[50px] ml-5">
          <button
            onClick={() => onDelete(patient)}
            type="button"
            disabled={isDisabled}
          >
            <span
              className={`flex mt-2 ${isDisabled
                ? 'text-gray-400'
                : 'text-gray-700 hover:text-red-600 '
                }`}
            >
              <MdDelete size={20} />
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientDependentFields
