import React, { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import appointmentActions from '../actions/appointmentActions';
import doctorsActions from '../actions/doctorsActions';
import moment from 'moment';
import classes from '../styles/Doctors.module.css';

function Appointment() {
  const [appointment, setAppointment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);
  const alert = useAlert();
  const { id } = useParams();
  
  useEffect(() => {
    appointmentActions.getAppointment(currentUser.user.id, id)
      .then(response => {
        setAppointment(response.data);
        return response.data.doctor_id;
      },
      error => {
        setLoading(false);
        setError(true);
        const message = (error.response);
        setAppointment(message);
      },
    ).then(doctorId => doctorsActions.getDoctor(doctorId))
      .then(response => {
        setLoading(false);
        setDoctor(response.data);
      });
  }, [currentUser.user.id, id]);
  
  const handleSubmit = () => {
    setLoading(true);
    appointmentActions.deleteAppointment(currentUser.user.id, id).then(() => {
      alert.show('Appointment Deleted', {
        type: 'success',
        timeout: 5000,
      });
      setLoading(false);
      setSuccessful(true);
    });
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (successful) {
    return <Navigate to="/appointments" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {loading && <span className="spinner-border spinner-border-lg" />}
        {
          doctor && (
          <div>
            <img src={doctor.image} alt={doctor.name} className={`rounded-circle ${classes.img}`} />
            <br></br><br></br>
            <p>
              Appointment Id: &nbsp;
              {appointment.id}
            </p>
            <p>
              Provider: &nbsp;
              <Link to={`/doctors/${doctor.id}`}>
                {doctor.name} - {doctor.specialty} 
              </Link>
            </p>
            <p>
              Address: {doctor.address}
            </p>
            <p>
             When: &nbsp; 
              {moment(appointment.appointment_date).add(5, 'hours').format('LLL')} 
            </p>
            <p> What to bring: </p>
            <p>  1. Photo ID </p>
            <p>  2. Insurance Card </p>
            <p>  3. Arrive 10 minutes early to complete paperwork. </p>
            <p> * Any cancellations must be at least 24 hours in advance to avoid cancellation fees. </p>
            <button className="btn btn-primary btn-block" type="button" onClick={handleSubmit} disabled={loading}>
              Cancel
            </button>
          </div>
          )
        }
        {
          error && <p>{appointment}</p>
        }
      </header>
    </div>
  );
};

export default Appointment;
