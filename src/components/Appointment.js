import React, { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert'; //package for making alerts
// import doctorActions from '../actions/doctorActions';
import doctorActions from '../actions/doctorActions';
import moment from 'moment';
import classes from '../styles/Doctors.module.css';

function Appointment() {
  // What does useState return? 
  // It returns a pair of values: the initial current state and a function that updates it. 
  const [appointment, setAppointment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);


  // ** component localized, global variable, useState sets variable name to represent, second variable will change
  // when calling setter, automatically tells component reload what is displaying
  // global variables is always watching for any changing variables when 
  
  // useSelector allows you to extract data from the Redux store state, using a selector function


  const { user: currentUser } = useSelector(state => state.auth); //making user part of state, make auth part of state
  const alert = useAlert();

  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. 
  // Child routes inherit all params from their parent routes.
  // direct user to a new Route from the current URL
  // access the parameters of the current route

  const { id } = useParams(); // helps pull id from URL
  
  //  lets you perform side effects in function components
  //  tell React that your component needs to do something after render
  
  useEffect(() => { //trigger in component when something changes do this
    doctorActions.getAppointment(currentUser.user.id, id)
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
    ).then(doctorId => doctorActions.getDoctor(doctorId))
      .then(response => {
        setLoading(false);
        setDoctor(response.data);
      });
  }, [currentUser.user.id, id]); // dependencies inside dependecy array; Run the side effect any time the variable(s) change
  
  const handleSubmit = () => {
    setLoading(true); //set buffering signal until data is loaded
    doctorActions.deleteAppointment(currentUser.user.id, id)
    .then(() => {
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