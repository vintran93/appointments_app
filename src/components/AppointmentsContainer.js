import { Component } from 'react'

import AppointmentsList from './AppointmentsList';

class AppointmentsContainer extends Component {
    
    render() {
        return (
            <div className="container text-center">
                <h3>Appointments</h3>
                <p className="text-secondary">Here are your scheduled dates.</p>
                <AppointmentsList />
            </div>
        )
    }
}

export default AppointmentsContainer;
