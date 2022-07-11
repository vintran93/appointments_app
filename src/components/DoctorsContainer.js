import React, { Component } from 'react'
import DoctorsList from './DoctorsList';
import { connect } from 'react-redux';
import { fetchDoctors } from '../actions/doctorActions';

class DoctorsContainer extends Component {
    
    componentDidMount() {
        this.props.fetchDoctors() 
    }

    render() {
        return (
            <div className="container text-center">
                <h3>Doctors List</h3>
                <p className="text-secondary">Please select a doctor for more details.</p>
                <DoctorsList />
            </div>
        )
    }
}


// export default DoctorsContainer;


export default connect(null, { fetchDoctors })(DoctorsContainer);