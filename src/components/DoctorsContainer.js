import { Component } from 'react'
import DoctorsList from './DoctorsList';

class DoctorsContainer extends Component {
    render() {
        return (
            <div className="container text-center">
                <h3>Doctors List</h3>
                <p className="text-secondary">Please select a doctor to view details.</p>
                <DoctorsList />
            </div>
        )
    }
}

export default DoctorsContainer;

// export default connect(null, { fetchDoctors })(DoctorsContainer);