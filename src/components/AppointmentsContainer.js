import { Component } from 'react'
import { connect } from 'react-redux';
import { fetchAppointments } from '../actions/doctorActions';

import AppointmentsList from './AppointmentsList';

class AppointmentsContainer extends Component {
    
    componentDidMount() {
        this.props.fetchAppointments() 
    }

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

// export default AppointmentsContainer;


export default connect(null, { fetchAppointments })(AppointmentsContainer);