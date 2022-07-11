import authHeader from '../services/auth-header';
import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });

const getAppointments = id => axios.get(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() });
const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
const postAppointment = (userId, doctorId, appointmentDate) => axios.post(`${API_URL}api/v1/users/${userId}/appointments`, { doctor_id: doctorId, appointment_date: appointmentDate }, { headers: authHeader() });
const deleteAppointment = (userId, appointmentId) => axios.delete(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });

export const fetchDoctors = () => {
    return (dispatch) => {
        fetch(`${API_URL}api/v1/doctors`, { headers: authHeader() })
        .then(resp => resp.json())
        // .then(doctors => console.log('fetchDoctors', doctors))
        .then(doctors => dispatch({ type: 'FETCH_DOCTORS', payload: doctors}))
    }
}

export const fetchAppointments = id => {
    return (dispatch) => {
        fetch(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() })
        .then(resp => resp.json())
        .then(appointments => console.log('fetchAppointments', appointments))
        // .then(appointments => dispatch({ type: 'FETCH_APPOINTMENTS', payload: appointments}))
    }
}

const doctorActions = {
    getDoctors,
    getDoctor,
    getAppointments,
    getAppointment,
    postAppointment,
    deleteAppointment
};
  
export default doctorActions;