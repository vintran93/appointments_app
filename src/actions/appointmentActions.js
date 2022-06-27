import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL = 'http://localhost:3000/';

const getAppointments = id => axios.get(`${API_URL}api/v1/users/${id}/appointments`, { headers: authHeader() });
const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });
const postAppointment = (userId, doctorId, appointmentDate) => axios.post(`${API_URL}api/v1/users/${userId}/appointments`, { doctor_id: doctorId, appointment_date: appointmentDate }, { headers: authHeader() });
const deleteAppointment = (userId, appointmentId) => axios.delete(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });

const appointmentActions = {
    getAppointments,
    getAppointment,
    postAppointment,
    deleteAppointment,
};
  
export default appointmentActions;