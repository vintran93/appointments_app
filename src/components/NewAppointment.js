import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useAlert } from 'react-alert';
import doctorActions from '../actions/doctorActions';
import { setMessage } from '../actions/message';
import getDoctors from '../actions/doctor';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

function NewAppointment() {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector(state => state.auth);
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const { message } = useSelector(state => state.message);
  const { doctors } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  
  useEffect(() => {
    if (doctorId) {
      setDoctorId(doctorId);
    } else {
      setDoctorId(1)
    }
    if (doctors.length === 0 && currentUser) {
      setLoadingDoctors(true);
      dispatch(getDoctors())
        .then(() => {
          setLoadingDoctors(false);
        })
        .catch(() => {
          dispatch(setMessage('Unable to get doctors list'));
        });
    }
  }, [currentUser, doctorId, doctors, dispatch]);

  const onChangeDoctorId = e => {
    const doctorId = e.target.value;
    setDoctorId(doctorId);
  };

  const onChangeAppointmentDate = e => {
    const appointmentDate = e.target.value;
    setAppointmentDate(appointmentDate);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
      doctorActions.postAppointment(currentUser.user.id, doctorId, appointmentDate)
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          alert.show('Appointment created', {
            type: 'success',
            timeout: 2000,
          });
        })
        .catch(() => {
          dispatch(setMessage('Something went wrong'));
          setLoading(false);
          setSuccessful(false);
        });
    } else {
      setLoading(false);
    }
  };
  const selection = doctors.map(doctor => (
    <option key={doctor.id} value={doctor.id}>
      {doctor.name} - {doctor.specialty}
    </option>
  ));
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (successful) {
    return <Navigate to="/appointments" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="appointmentDate"
                  value={appointmentDate}
                  onChange={onChangeAppointmentDate}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctorId">Select list:</label>
                <select className="form-control" id="doctorId" onChange={onChangeDoctorId} value={doctorId}>
                  {selection}
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading || loadingDoctors} type="submit">
                  {loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Book</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default NewAppointment;