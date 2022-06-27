import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from './permit';
  
  import authService from '../services/auth.service';
  
  export const register = (name, email, password) => dispatch => authService.register(name, email, password)
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: response.data },
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
  
      return Promise.resolve();
    },
    error => {
      console.log(error.response);
      const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    },
  );
  
  export const login = (email, password) => dispatch => authService.login(email, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
  
      return Promise.resolve();
    },
    error => {
      const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    },
  );
  
  export const logout = () => dispatch => {
    authService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
  