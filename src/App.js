import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Step from './Components/OnlineBookingSteps/Step'
import Welcome from './Components/Welcome/WelcomePage'
import './App.css';
import AppointmentConfirmed from './Components/AppointmentConfirmed/AppointmentConfirmed';
import RescheduleApp from './Components/RescheduleAppointment/ReschduleApp';
import RescheduleApproved from './Components/RescheduleAppointment/RescheduleApproved';
import CancelPage from './Components/RescheduleAppointment/CancelPage';
import CancelAppointment from './Components/RescheduleAppointment/CancelAppointment';


function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        {/* <Route exact path="/" element={<Welcome />} /> */}
        <Route exact path="/" element={<Step/>} />
        <Route path="/appConfirmed" element={<AppointmentConfirmed/>} />
        <Route path="/reschduleApp/:id" element={<RescheduleApp/>} />
        <Route  path="/rescheduleAppointmentConfirmed" element={<RescheduleApproved/>} /> 
        <Route  path="/cancelAppointment/:id" element={<CancelAppointment/>} />
        <Route  path="/cancelAppointmentConfirmed" element={<CancelPage/>} />
      </Routes>
      {/* <Route exact path="/:id" element={<OnlineBooking/>} />
          <Route  path="/appTypes/:id" element={<AppointmentTypes/>} />
          <Route  path="/insuranceTypes" element={<InsuranceTypes/>} />
          <Route  path="/slots" element={<Slots/>} />
          <Route  path="/patientInfo" element={<PatientInfo/>} />
          <Route  path="/appointmentBook" element={<AppointmentBook/>} />
          
          <Route  path="/rescheduleAppointment/:id" element={<RescheduleApp/>} />
        <Route  path="/rescheduleAppointmentConfirmed" element={<RescheduleApproved/>} /> */}
          
    </div>
  )
}

export default App
