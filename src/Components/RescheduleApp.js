import React from 'react';
import { useParams } from 'react-router';

function RescheduleApp(props) {
    const { id } = useParams();
    return (
        <div>
         Reschedule Appointment  of id {id} 
        </div>
    );
}

export default RescheduleApp;