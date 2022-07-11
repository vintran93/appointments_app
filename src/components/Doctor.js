import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from '../styles/Doctor.module.css';
import doctorActions from '../actions/doctorActions';

function Doctor() {
  const [doctor, setDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    doctorActions.getDoctor(id)
    .then(response => {
        setLoading(false);
        setDoctor(response.data);
    },
    error => {
      setLoading(false);
      const message = (error.response
          && error.response.data
          && error.response.data.message)
      setDoctor(message);
    },
    );
  }, [id]);

  return (
    <div className="container">
      <div className="text-center">
        {loading && <span className="spinner-border spinner-border-lg" />}
      </div>
      <div className={classes.Doctor}>
        <img src={doctor.image} className={classes.doctorImg} alt=''/>
        <div>
          <h2>
            {doctor.name}
          </h2>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Evaluation Fee: &nbsp; $ 50.00
          </p>
          <p className={classes.badge}>
            Education: &nbsp;&nbsp;
            {doctor.education}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Specialty: &nbsp;&nbsp;
            {doctor.specialty}
          </p>
          <p className={classes.badge}>
            Experience: &nbsp;
            {doctor.experience}
          </p>
          <p className={`${classes.badge} ${classes.badgeSecondary}`}>
            Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {doctor.address}
          </p>
          <li>
            <Link
              to="/appointments/new"
              className={classes.btn}
            >
              Book An Appointment
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
