import {
  DOCTORS_SUCCESS,
  DOCTORS_FAIL,
} from '../actions/permit';

export default function user(state = { doctors: [] }, action) {
  const { type, payload } = action;

  switch (type) {
    case DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: payload.doctors,
        // return new object to know when to update state
      };

      // state.doctors = payload.doctors vs updating current state object
      // when return from reducer redux checks for same object to know to object
    case DOCTORS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
