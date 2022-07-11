import {
    DOCTORS_SUCCESS,
    DOCTORS_FAIL,
    // APPOINTMENTS_SUCCESS,
    // APPOINTMENTS_FAIL,
    SET_MESSAGE,
  } from './permit';
  
import doctorActions from './doctorActions';


const doctors = () => dispatch => doctorActions.getDoctors()
    .then(response => {
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
      const message = (error.response)
      dispatch({
        type: DOCTORS_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    }
    // .then(response => {
    //   dispatch({
    //     type: APPOINTMENTS_SUCCESS,
    //     payload: { appointments: response.data },
    //   });
  
    //   dispatch({
    //     type: SET_MESSAGE,
    //     payload: response.data.message,
    //   });
  
    //   return Promise.resolve();
    // },
    // error => {
    //   const message = (error.response)
    //   dispatch({
    //     type: APPOINTMENTS_FAIL,
    //   });
  
    //   dispatch({
    //     type: SET_MESSAGE,
    //     payload: message,
    //   });
  
    //   return Promise.reject();
    // },
   
);
  
export default doctors;