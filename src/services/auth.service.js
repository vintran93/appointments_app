import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const register = (name, email, password) => axios.post(`${API_URL}api/v1/users`, {
  name,
  email,
  password,
})
  .then(response => {
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });

const login = (email, password) => axios.post(`${API_URL}login`, {
    email,
    password,
  })
  .then(response => {
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService
