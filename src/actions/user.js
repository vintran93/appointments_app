import {
    DOCTORS_SUCCESS,
    DOCTORS_FAIL,
    SET_MESSAGE,
  } from './permit';
  
  import doctorService from '../actions/doctorsActions';
  
  const user = () => dispatch => doctorService.getDoctors().then(
    response => {
      dispatch({
        type: DOCTORS_SUCCESS,
        payload: { doctors: response.data },
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
  
      return Promise.resolve();
    },
    error => {
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message
          || error.toString();
      dispatch({
        type: DOCTORS_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    },
  );
  
  export default user;