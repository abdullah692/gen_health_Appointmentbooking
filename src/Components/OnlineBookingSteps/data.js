import drImg from '../../assets/images/drImg1.png'
import drImg2 from "../../assets/images/drImg2.png"
import drImg3 from "../../assets/images/drImg3.png"
import drImg4 from "../../assets/images/drImg4.png"
import { handleDelete } from './AppointmentSummary'

export const AppointmentTypes = [
  {
    id: '1',
    appointment: 'Consultation',
  },
  {
    id: '2',
    appointment: 'Crown Delivery',
  },
  {
    id: '3',
    appointment: 'Crown Preparation',
  },
  {
    id: '4',
    appointment: 'Denture Insertion',
  },
  {
    id: '5',
    appointment: 'Denture Step',
  },
  {
    id: '6',
    appointment: 'Extraction',
  },

  {
    id: '7',
    appointment: 'Post & core/ Core buildup',
  },
  {
    id: '8',
    appointment: 'Root Canal Treatment',
  },
  {
    id: '9',
    appointment: 'Braces / Invisalign ',
  },
]

export const AvailableSlots = [
  {
    SlotTime: '1 Hour Slot',
    data: [
      {
        id: '1',
        startTime: '12:00 AM',
        endTime: '1:00 AM',
      },
      {
        id: '2',
        startTime: '1:00 AM',
        endTime: '2:00 AM',
      },
      {
        id: '3',
        startTime: '2:00 AM',
        endTime: '3:00 AM',
      },
      {
        id: '4',
        startTime: '3:00 AM',
        endTime: '4:00 AM',
      },
      {
        id: '5',
        startTime: '4:00 AM',
        endTime: '5:00 AM',
      },
      {
        id: '6',
        startTime: '5:00 AM',
        endTime: '6:00 AM',
      },
    ],
  },
  {
    SlotTime: '1/2 Hour Slot',
    data: [
      {
        id: '1',
        startTime: '11:00 AM',
        endTime: '11:30 AM',
      },
      {
        id: '2',
        startTime: '11:30 AM',
        endTime: '12:00 PM',
      },
      {
        id: '3',
        startTime: '12:00 PM',
        endTime: '12:30 AM',
      },
      {
        id: '4',
        startTime: '12:30 PM',
        endTime: '01:00 PM',
      },
      {
        id: '5',
        startTime: '01:00 PM',
        endTime: '01:30 PM',
      },
      {
        id: '6',
        startTime: '01:30 PM',
        endTime: '02:00 PM',
      },
    ],
  },
]


export const SlotsDummy={
  success: true,
  data: [
      {
          "id": 4,
          "name": "Dr Tom Phatka",
          "email": "tom1@cartoon.com",
          "gender": "male",
          "dp_url": "fa53b09da9b5c63d46b547bbc1163a7bd96f90ff-tom-and-jerry.jpg",
          "dp_id": 1,
          "max_chair_size": 4,
          "phone": "+912302",
          "marital_status": "divorced",
          "AppointmentTypes": [
              {
                  "id": 12,
                  "type": "Test",
                  "duration": "00:10:00"
              }
          ],
          "Availabilities": [
              {
                  "id": 22,
                  "days": "sunday",
                  "start_time": "15:00:00",
                  "end_time": "19:30:00",
                  "break_start_time": "17:20:00",
                  "break_end_time": "05:40:00"
              },
              {
                  "id": 24,
                  "days": "monday",
                  "start_time": "02:00:00",
                  "end_time": "05:30:00",
                  "break_start_time": null,
                  "break_end_time": null
              },
              {
                  "id": 27,
                  "days": "thursday",
                  "start_time": "16:00:00",
                  "end_time": "19:00:00",
                  "break_start_time": "16:30:00",
                  "break_end_time": "16:40:00"
              }
          ]
      },
      {
          "id": 6,
          "name": "Dr Ben Ten",
          "email": "drben@benten.com",
          "gender": "female",
          "dp_url": "e843e76e2b3deccc6bfe01c65e51bcc0875c36e8-ben10.jpg",
          "dp_id": 1,
          "max_chair_size": 4,
          "phone": "+92129",
          "marital_status": "single",
          "AppointmentTypes": [
              {
                  "id": 15,
                  "type": "Test",
                  "duration": "00:20:00"
              }
          ],
          "Availabilities": [
              {
                  "id": 36,
                  "days": "tuesday",
                  "start_time": "15:00:00",
                  "end_time": "18:00:00",
                  "break_start_time": null,
                  "break_end_time": null
              },
              {
                  "id": 37,
                  "days": "friday",
                  "start_time": "16:30:00",
                  "end_time": "19:30:00",
                  "break_start_time": null,
                  "break_end_time": null
              }
          ]
      }
  ],
  uniqueTimeSlots: {
      // "10min": [
      //     {
      //         d_id: [
      //             4
      //         ],
      //         startTime: "1:00 PM",
      //         endTime: "1:10 PM"
      //     },
      //     {
      //         d_id: [
      //             4
      //         ],
      //         startTime: "1:20 PM",
      //         endTime: "1:30 PM"
      //     },
      //     {
      //         d_id: [
      //             4
      //         ],
      //         startTime: "12:00 PM",
      //         endTime: "12:10 PM"
      //     },
      // ],
      // "20min": [
      //     {
      //         d_id: [
      //             6
      //         ],
      //         startTime: "3:00 PM",
      //         endTime: "3:20 PM"
      //     },
      //     {
      //         d_id: [
      //             6
      //         ],
      //         startTime: "3:20 PM",
      //         endTime: "3:40 PM"
      //     },
      // ]
  },
  "earliestDentistList": []
}

export const ProviderDetails=[
  {
    id:1,
    pic:drImg4,
    name:"Dr. Irfan Ali",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789"
  },
  {
    id:2,
    pic:drImg,
    name:"Dr. Nikita S.",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789"
  },
  {
    id:3,
    pic:drImg2,
    name:"Dr. John T.",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789"
  },
  {
    id:4,
    pic:drImg3,
    name:"Dr. Siro J.",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789"
  },
  {
    id:5,
    pic:drImg3,
    name:"Dr. Siro J.",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789"
  },
  
]

export const OtherDrs=[
  {
    id:1,
    pic:drImg4,
    name:"Dr. Irfan Ali",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789",
    date:"24/03/2023",
    slotTime:"09:00 PM - 10:00 PM"
  },
  {
    id:2,
    pic:drImg,
    name:"Dr. Nikita S.",
    email:"asadkhan@email.com",
    phoneNo:"+123 123456789",
    date:"24/03/2023",
    slotTime:"09:00 PM - 10:00 PM"
  }
]


export const dataSource = [
  {
    key: '1',
    patientname: 'John Memoa',
    drname: 'Dr.Irfan Ali',
    apptype: 'Denture Setup',
    appby: 'Self',
    date: '20/04/2023',
    time: '09:00 AM - 10:00 AM',
  },
  {
    key: '2',
    patientname: 'John Memoa',
    drname: 'Dr.Irfan Ali',
    apptype: 'Denture Setup',
    appby: 'Self',
    date: '20/04/2023',
    time: '09:00 AM - 10:00 AM',
  },
  
  
];

