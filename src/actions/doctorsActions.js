import authHeader from '../services/auth-header';
import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const getDoctors = () => axios.get(`${API_URL}api/v1/doctors`, { headers: authHeader() });
const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });

const doctorActions = {
    getDoctors,
    getDoctor
};
  
export default doctorActions;